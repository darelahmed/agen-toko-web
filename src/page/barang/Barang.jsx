import React, { useEffect, useState } from 'react';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import axios from 'axios';
import DetailBarangModal from './DetailBarangModal';
import AddBarangModal from './AddBarangModal';
import EditBarangModal from './EditBarangModal';

function Barang() {
  const [barang, setBarang] = useState([]);
  const [selectedBarang, setSelectedBarang] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://192.168.100.19/api/v1/barang/all')
      .then(response => {
        setBarang(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        window.alert('Gagal mengambil data barang!');
      });
  }, []);

  const handleDetailClick = (id) => {
    axios.get(`http://192.168.100.19/api/v1/barang/detail/${id}`)
      .then(response => {
        setSelectedBarang(response.data);
        setIsDetailModalOpen(true);
      })
      .catch(error => {
        console.error('There was an error fetching the detail data!', error);
        window.alert('Gagal mengambil detail barang!');
      });
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleEditClick = (id) => {
    const barangToEdit = barang.find(b => b.id === id);
    setSelectedBarang(barangToEdit);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Apakah kamu yakin ingin menghapus barang ini?')) {
      axios.delete(`http://192.168.100.19/api/v1/barang/delete/${id}`)
        .then(() => {
          setBarang(barang.filter(b => b.id !== id));
          window.alert('Barang berhasil dihapus!');
        })
        .catch(error => {
          console.error('There was an error deleting the data!', error);
          window.alert('Gagal menghapus barang!');
        });
    }
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedBarang(null);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedBarang(null);
  };

  const handleAddBarang = (newBarang) => {
    setBarang([...barang, newBarang]);
  };

  const handleUpdateBarang = (updatedBarang) => {
    setBarang(barang.map(b => (b.id === updatedBarang.id ? updatedBarang : b)));
  };

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>BARANG</h3>
        <button className='btn-add' onClick={handleAddClick}>
          <BsDatabaseFillAdd className='icon' /> Barang
        </button>
      </div>
      <div className="table-container">
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {barang.map(b => (
              <tr key={b.id}>
                <td data-label="ID">{b.id}</td>
                <td data-label="Nama">{b.nama}</td>
                <td data-label="Kategori">{b.kategori}</td>
                <td data-label="Harga">{b.harga}</td>
                <td>
                  <button className='btn-detail' onClick={() => handleDetailClick(b.id)}>Detail</button>
                  <button className='btn-edit' onClick={() => handleEditClick(b.id)}>Edit</button>
                  <button className='btn-delete' onClick={() => handleDeleteClick(b.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DetailBarangModal isOpen={isDetailModalOpen} onClose={closeDetailModal} barangDetail={selectedBarang} />
      <AddBarangModal isOpen={isAddModalOpen} onClose={closeAddModal} onAdd={handleAddBarang} />
      <EditBarangModal isOpen={isEditModalOpen} onClose={closeEditModal} onUpdate={handleUpdateBarang} barang={selectedBarang} />
    </main>
  );
}

export default Barang;
