import React from 'react'

function DetailItemPenjualanModal({ isOpen, onClose, itemPenjualanDetail }) {
    if (!isOpen || !itemPenjualanDetail) return null
  return (
    <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Detail Barang</h2>
                <div className='input-container'>
                    <label>ID :</label>
                    <p>{itemPenjualanDetail.id}</p>
                </div>
                <div className='input-container'>
                    <label>ID Barang :</label>
                    <p>{itemPenjualanDetail.id_barang}</p>
                </div>
                <div className='input-container'>
                    <label>Kuantitas :</label>
                    <p>{itemPenjualanDetail.qty}</p>
                </div>
            </div>
        </div>
  );
}

export default DetailItemPenjualanModal