import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditPelangganModal({ isOpen, onClose, onUpdate, pelanggan }) {
    const [formData, setFormData] = useState({
        id: '',
        nama: '',
        domisili: '',
        jenis_kelamin: ''
    });

    useEffect(() => {
        if (pelanggan) {
            setFormData(pelanggan);
        }
    }, [pelanggan]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://192.168.100.19/api/v1/pelanggan/update/${formData.id}`, formData)
            .then(response => {
                onUpdate(response.data);
                onClose();
                window.alert('Pelanggan berhasil di update!');
            })
            .catch(error => {
                console.error('There was an error updating the form!', error);
                window.alert('Gagal mengupdate pelanggan!');
            });
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Pelanggan</h2>
                <form onSubmit={handleSubmit}>
                    <div className='input-container'>
                        <label>Nama :</label>
                        <input type="text" name="nama" value={formData.nama} onChange={handleChange} required />
                    </div>
                    <div className='input-container'>
                        <label>Domisili :</label>
                        <input type="text" name="domisili" value={formData.domisili} onChange={handleChange} required />
                    </div>
                    <div className='input-container'>
                        <label>Jenis Kelamin :</label>
                        <select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="Pria">Pria</option>
                            <option value="Wanita">Wanita</option>
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EditPelangganModal;
