import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditItemPenjualanModal({ isOpen, onClose, itemPenjualan, onUpdateItemPenjualan }) {
    const [formData, setFormData] = useState({
        id_barang: '',
        qty: ''
    });

    const [barangList, setBarangList] = useState([]);

    useEffect(() => {
        if (isOpen) {
            axios.get('http://192.168.100.19/api/v1/barang/all')
                .then(response => {
                    setBarangList(response.data);
                })
                .catch(error => {
                    console.error('Error fetching barang list:', error);
                });

            setFormData({
                id_barang: itemPenjualan?.id_barang || '',
                qty: itemPenjualan?.qty || ''
            });
        }
    }, [isOpen, itemPenjualan]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://192.168.100.19/api/v1/itempenjualan/update/${itemPenjualan.id}`, formData)
            .then(response => {
                onUpdateItemPenjualan(response.data);
                onClose();
                window.alert('Item penjualan berhasil diperbarui!');
            })
            .catch(error => {
                console.error('Error updating item penjualan:', error);
                if (error.response) {
                    console.error('Error response:', error.response.data);
                    window.alert(`Error: ${error.response.data.message}`);
                } else {
                    window.alert('Unknown error occurred. Please try again later.');
                }
            });
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Item Penjualan</h2>
                <form onSubmit={handleSubmit}>
                    <div className='input-container'>
                        <label>Barang :</label>
                        <select name="id_barang" value={formData.id_barang} onChange={handleChange} required>
                            <option value="">Select Barang</option>
                            {barangList.map(barang => (
                                <option key={barang.id} value={barang.id}>{barang.nama}</option>
                            ))}
                        </select>
                    </div>
                    <div className='input-container'>
                        <label>Quantity :</label>
                        <input type="number" name="qty" value={formData.qty} onChange={handleChange} required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EditItemPenjualanModal;
