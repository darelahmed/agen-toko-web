import React, { useEffect, useState } from 'react';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import axios from 'axios';
import DetailPelangganModal from './DetailPelangganModal';
import AddPelangganModal from './AddPelangganModal';
import EditPelangganModal from './EditPelangganModal';

function Pelanggan() {
  const [pelanggan, setPelanggan] = useState([]);
  const [selectedPelanggan, setSelectedPelanggan] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://192.168.100.19/api/v1/pelanggan/all')
      .then(response => {
        setPelanggan(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        window.alert('Gagal mengambil data pelanggan!');
      });
  }, []);

  const handleDetailClick = (id) => {
    axios.get(`http://192.168.100.19/api/v1/pelanggan/detail/${id}`)
      .then(response => {
        setSelectedPelanggan(response.data);
        setIsDetailModalOpen(true);
      })
      .catch(error => {
        console.error('There was an error fetching the detail data!', error);
        window.alert('Gagal mengambil detail pelanggan!');
      });
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleEditClick = (id) => {
    const pelangganToEdit = pelanggan.find(p => p.id === id);
    setSelectedPelanggan(pelangganToEdit);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Apakah kamu yakin ingin menghapus pelanggan ini?')) {
      axios.delete(`http://192.168.100.19/api/v1/pelanggan/delete/${id}`)
        .then(() => {
          setPelanggan(pelanggan.filter(p => p.id !== id));
          window.alert('Pelanggan berhasil dihapus!');
        })
        .catch(error => {
          console.error('There was an error deleting the data!', error.response);
          if (error.response) {
            window.alert(`Gagal menghapus pelanggan! Error: ${error.response.data.message || error.response.statusText}`);
          } else {
            window.alert('Gagal menghapus pelanggan! Error: Tidak diketahui');
          }
        });
    }
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedPelanggan(null);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPelanggan(null);
  };

  const handleAddPelanggan = (newPelanggan) => {
    setPelanggan([...pelanggan, newPelanggan]);
  };

  const handleUpdatePelanggan = (updatedPelanggan) => {
    setPelanggan(pelanggan.map(p => (p.id === updatedPelanggan.id ? updatedPelanggan : p)));
  };

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>PELANGGAN</h3>
        <button className='btn-add' onClick={handleAddClick}>
          <BsDatabaseFillAdd className='icon' /> Pelanggan
        </button>
      </div>
      <div className="table-container">
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Domisili</th>
              <th>Jenis Kelamin</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pelanggan.map(p => (
              <tr key={p.id}>
                <td data-label="ID">{p.id}</td>
                <td data-label="Nama">{p.nama}</td>
                <td data-label="Domisili">{p.domisili}</td>
                <td data-label="Jenis Kelamin">{p.jenis_kelamin}</td>
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
      <DetailPelangganModal isOpen={isDetailModalOpen} onClose={closeDetailModal} pelangganDetail={selectedPelanggan} />
      <AddPelangganModal isOpen={isAddModalOpen} onClose={closeAddModal} onAdd={handleAddPelanggan} />
      <EditPelangganModal isOpen={isEditModalOpen} onClose={closeEditModal} onUpdate={handleUpdatePelanggan} pelanggan={selectedPelanggan} />
    </main>
  );
}

export default Pelanggan;
