import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditPenjualanModal({ isOpen, onClose, penjualan, onUpdatePenjualan }) {
  const [formData, setFormData] = useState({
    id_nota: '',
    tanggal: new Date().toISOString().slice(0, 10), // Initialize with today's date
    id_pelanggan: '',
    sub_total: 0
  });

  const [itemPenjualanList, setPenjualanList] = useState([]);
  const [pelangganList, setPelangganList] = useState([]);
  const [barangList, setBarangList] = useState([]);

  useEffect(() => {
    if (penjualan) {
      setFormData({
        id_nota: penjualan.id_nota,
        tanggal: penjualan.tanggal,
        id_pelanggan: penjualan.id_pelanggan,
        sub_total: penjualan.sub_total
      });
    }
  }, [penjualan]);

  useEffect(() => {
    axios.get('http://192.168.100.19/api/v1/itempenjualan/all')
      .then(response => {
        setPenjualanList(response.data);
      })
      .catch(error => {
        console.error('Error fetching item penjualan list:', error);
      });

    axios.get('http://192.168.100.19/api/v1/pelanggan/all')
      .then(response => {
        setPelangganList(response.data);
      })
      .catch(error => {
        console.error('Error fetching pelanggan list:', error);
      });

    axios.get('http://192.168.100.19/api/v1/barang/all')
      .then(response => {
        setBarangList(response.data);
      })
      .catch(error => {
        console.error('Error fetching barang list:', error);
      });
  }, []);

  const calculateSubTotal = (idNota) => {
    const selectedNota = itemPenjualanList.find(item => item.id === idNota);
    if (selectedNota) {
      const selectedBarang = barangList.find(barang => barang.id === selectedNota.id_barang);
      if (selectedBarang) {
        return selectedNota.qty * selectedBarang.harga;
      }
    }
    return 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => {
      const updatedFormData = {
        ...prevFormData,
        [name]: value
      };

      if (name === 'id_nota') {
        const subTotal = calculateSubTotal(parseInt(value));
        updatedFormData.sub_total = subTotal;
      }

      return updatedFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://192.168.100.19/api/v1/penjualan/update/${penjualan.id}`, formData)
      .then(response => {
        onUpdatePenjualan(response.data);
        onClose();
        window.alert('Penjualan berhasil diperbarui!');
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        if (error.response) {
          console.error('Error response:', error.response.data);
          window.alert(`Error: ${error.response.data.message}`);
        } else if (error.request) {
          console.error('Error request:', error.request);
          window.alert('Error: No response received from the server. Please check your network connection.');
        } else {
          console.error('General error:', error.message);
          window.alert(`Error: ${error.message}`);
        }
      });
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Penjualan</h2>
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <label>ID Nota :</label>
            <select name="id_nota" value={formData.id_nota} onChange={handleChange} required>
              <option value="">Select Nota</option>
              {itemPenjualanList.map(itempenjualan => (
                <option key={itempenjualan.id} value={itempenjualan.id}>
                  {itempenjualan.id}. Kuantitas: {itempenjualan.qty}
                </option>
              ))}
            </select>
          </div>
          <div className='input-container'>
            <label>Tanggal :</label>
            <input type="date" name="tanggal" value={formData.tanggal} onChange={handleChange} required />
          </div>
          <div className='input-container'>
            <label>ID Pelanggan :</label>
            <select name="id_pelanggan" value={formData.id_pelanggan} onChange={handleChange} required>
              <option value="">Select Pelanggan</option>
              {pelangganList.map(pelanggan => (
                <option key={pelanggan.id} value={pelanggan.id}>{pelanggan.nama}</option>
              ))}
            </select>
          </div>
          <div className='input-container'>
            <label>Sub Total :</label>
            <input type="text" name="sub_total" value={formData.sub_total} readOnly />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EditPenjualanModal;
