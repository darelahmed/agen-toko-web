import React from 'react'

function DetailPenjualanModal({ isOpen, onClose, penjualanDetail }) {
    if (!isOpen || !penjualanDetail) return null
  return (
    <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Detail Penjualan</h2>
            <div className='input-container'>
                <label>ID :</label>
                <p>{penjualanDetail.id}</p>
            </div>
            <div className='input-container'>
                <label>ID Nota :</label>
                <p>{penjualanDetail.id_nota}</p>
            </div>
            <div className='input-container'>
                <label>Tanggal :</label>
                <p>{penjualanDetail.tanggal}</p>
            </div>
            <div className='input-container'>
                <label>ID Pelanggan :</label>
                <p>{penjualanDetail.id_pelanggan}</p>
            </div>
            <div className='input-container'>
                <label>Sub Total :</label>
                <p>{penjualanDetail.sub_total}</p>
            </div>
        </div>
    </div>
  )
}

export default DetailPenjualanModal