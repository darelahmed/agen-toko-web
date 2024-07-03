import React from 'react'

function DetailPelangganModal({ isOpen, onClose, pelangganDetail }) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Detail Pelanggan</h2>
                {pelangganDetail ? (
                    <div>
                        <p>ID: {pelangganDetail.id}</p>
                        <p>Nama: {pelangganDetail.nama}</p>
                        <p>Domisili: {pelangganDetail.domisili}</p>
                        <p>Jenis Kelamin: {pelangganDetail.jenis_kelamin}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default DetailPelangganModal