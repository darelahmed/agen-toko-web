import React, { useEffect, useState } from 'react';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import axios from 'axios';
import DetailPenjualanModal from './DetailPenjualanModal';
import AddPenjualanModal from './AddPenjualanModal';
import EditPenjualanModal from './EditPenjualanModal';

function Penjualan() {
  const [penjualan, setPenjualan] = useState([]);
  const [selectedPenjualan, setSelectedPenjualan] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://192.168.100.19/api/v1/penjualan/all')
      .then(response => {
        setPenjualan(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        window.alert('Gagal mengambil data penjualan!');
      });
  }, []);

  const handleDetailClick = (id) => {
    axios.get(`http://192.168.100.19/api/v1/penjualan/detail/${id}`)
      .then(response => {
        setSelectedPenjualan(response.data);
        setIsDetailModalOpen(true);
      })
      .catch(error => {
        console.error('There was an error fetching the detail data!', error);
        window.alert('Gagal mengambil detail penjualan!');
      });
  };

  const handleEditClick = (id) => {
    axios.get(`http://192.168.100.19/api/v1/penjualan/detail/${id}`)
      .then(response => {
        setSelectedPenjualan(response.data);
        setIsEditModalOpen(true);
      })
      .catch(error => {
        console.error('There was an error fetching the detail data!', error);
        window.alert('Gagal mengambil detail penjualan!');
      });
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Apakah kamu yakin ingin menghapus item penjualan ini?')) {
      axios.delete(`http://192.168.100.19/api/v1/penjualan/delete/${id}`)
        .then(() => {
          setPenjualan(penjualan.filter(p => p.id !== id));
          window.alert('Penjualan berhasil dihapus!');
        })
        .catch(error => {
          console.error('There was an error deleting the data!', error);
          window.alert('Gagal menghapus penjualan!');
        });
    }
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedPenjualan(null);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleAddPenjualan = (newPenjualan) => {
    setPenjualan([...penjualan, newPenjualan]);
  };

  const handleUpdatePenjualan = (updatedPenjualan) => {
    setPenjualan(penjualan.map(p => (p.id === updatedPenjualan.id ? updatedPenjualan : p)));
  };

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>PENJUALAN</h3>
        <button className='btn-add' onClick={handleAddClick}>
          <BsDatabaseFillAdd className='icon' /> Penjualan
        </button>
      </div>
      <div className="table-container">
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Nota</th>
              <th>Tanggal</th>
              <th>ID Pelanggan</th>
              <th>Sub Total</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {penjualan.map(p => (
              <tr key={p.id}>
                <td data-label="ID">{p.id}</td>
                <td data-label="ID Nota">{p.id_nota}</td>
                <td data-label="Tanggal">{p.tanggal}</td>
                <td data-label="ID Pelanggan">{p.id_pelanggan}</td>
                <td data-label="Sub Total">{p.sub_total}</td>
                <td>
                  <button className='btn-detail' onClick={() => handleDetailClick(p.id)}>Detail</button>
                  <button className='btn-edit' onClick={() => handleEditClick(p.id)}>Edit</button>
                  <button className='btn-delete' onClick={() => handleDeleteClick(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DetailPenjualanModal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        penjualanDetail={selectedPenjualan}
      />
      <AddPenjualanModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onAddPenjualan={handleAddPenjualan}
      />
      <EditPenjualanModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        penjualan={selectedPenjualan}
        onUpdatePenjualan={handleUpdatePenjualan}
      />
    </main>
  );
}

export default Penjualan;
