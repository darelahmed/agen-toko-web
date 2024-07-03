import React, { useState } from 'react';
import axios from 'axios';

function AddBarangModal({ isOpen, onClose, onAdd }) {
    const [formData, setFormData] = useState({
        nama: '',
        kategori: '',
        harga: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://192.168.100.19/api/v1/barang/store', formData)
            .then(response => {
                onAdd(response.data);
                onClose();
                window.alert('Barang berhasil ditambahkan!');
            })
            .catch(error => {
                console.error('There was an error submitting the form!', error);
                window.alert('Gagal menambahkan barang!');
            });
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add New Barang</h2>
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

export default AddBarangModal;
