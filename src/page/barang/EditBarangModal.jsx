import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditBarangModal({ isOpen, onClose, onUpdate, barang }) {
    const [formData, setFormData] = useState({
        id: '',
        nama: '',
        kategori: '',
        harga: ''
    });

    useEffect(() => {
        if (barang) {
            setFormData(barang);
        }
    }, [barang]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://192.168.100.19/api/v1/barang/update/${formData.id}`, formData)
            .then(response => {
                onUpdate(response.data);
                onClose();
                window.alert('Barang berhasil diupdate!');
            })
            .catch(error => {
                console.error('There was an error updating the form!', error);
                window.alert('Gagal mengupdate barang!');
            });
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Barang</h2>
                <form onSubmit={handleSubmit}>
                    <div className='input-container'>
                        <label>Nama :</label>
                        <input type="text" name="nama" value={formData.nama} onChange={handleChange} required />
                    </div>
                    <div className='input-container'>
                        <label>Kategori :</label>
                        <input type="text" name="kategori" value={formData.kategori} onChange={handleChange} required />
                    </div>
                    <div className='input-container'>
                        <label>Harga :</label>
                        <input type="text" name="harga" value={formData.harga} onChange={handleChange} required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EditBarangModal;
