import React from 'react';

function DetailBarangModal({ isOpen, onClose, barangDetail }) {
    if (!isOpen || !barangDetail) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Detail Barang</h2>
                <div className='input-container'>
                    <label>ID :</label>
                    <p>{barangDetail.id}</p>
                </div>
                <div className='input-container'>
                    <label>Nama :</label>
                    <p>{barangDetail.nama}</p>
                </div>
                <div className='input-container'>
                    <label>Kategori :</label>
                    <p>{barangDetail.kategori}</p>
                </div>
                <div className='input-container'>
                    <label>Harga :</label>
                    <p>{barangDetail.harga}</p>
                </div>
            </div>
        </div>
    );
}

export default DetailBarangModal;
