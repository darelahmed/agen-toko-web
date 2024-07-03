import React, { useEffect, useState } from 'react';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import axios from 'axios';
import AddItemPenjualanModal from './AddItemPenjualanModal';
import DetailItemPenjualanModal from './DetailItemPenjualanModal';
import EditItemPenjualanModal from './EditItemPenjualanModal';

function ItemPenjualan() {
  const [itempenjualan, setItemPenjualan] = useState([]);
  const [selectedItemPenjualan, setSelectedItemPenjualan] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://192.168.100.19/api/v1/itempenjualan/all')
      .then(response => {
        setItemPenjualan(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        window.alert('Gagal mengambil data item penjualan!');
      });
  }, []);

  const handleDetailClick = (id) => {
    axios.get(`http://192.168.100.19/api/v1/itempenjualan/detail/${id}`)
      .then(response => {
        setSelectedItemPenjualan(response.data);
        setIsDetailModalOpen(true);
      })
      .catch(error => {
        console.error('There was an error fetching the detail data!', error);
        window.alert('Gagal mengambil detail item penjualan!');
      });
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleEditClick = (id) => {
    const itemPenjualanToEdit = itempenjualan.find(i => i.id === id);
    setSelectedItemPenjualan(itemPenjualanToEdit);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Apakah kamu yakin ingin menghapus item penjualan ini?')) {
      axios.delete(`http://192.168.100.19/api/v1/itempenjualan/delete/${id}`)
        .then(() => {
          setItemPenjualan(itempenjualan.filter(i => i.id !== id));
          window.alert('Item Penjualan berhasil dihapus!');
        })
        .catch(error => {
          console.error('There was an error deleting the data!', error);
          window.alert('Gagal menghapus item penjualan!');
        });
    }
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedItemPenjualan(null);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedItemPenjualan(null);
  };

  const handleAddItemPenjualan = (newItemPenjualan) => {
    setItemPenjualan([...itempenjualan, newItemPenjualan]);
  };

  const handleUpdateItemPenjualan = (updatedItemPenjualan) => {
    setItemPenjualan(itempenjualan.map(i => (i.id === updatedItemPenjualan.id ? updatedItemPenjualan : i)));
  };

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>ITEM PENJUALAN</h3>
        <button className='btn-add' onClick={handleAddClick}>
          <BsDatabaseFillAdd className='icon' /> Item Penjualan
        </button>
      </div>
      <div className="table-container">
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Barang</th>
              <th>Kuantitas</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {itempenjualan.map(i => (
              <tr key={i.id}>
                <td data-label="ID">{i.id}</td>
                <td data-label="ID Barang">{i.id_barang}</td>
                <td data-label="Quantity">{i.qty}</td>
                <td>
                  <button className='btn-detail' onClick={() => handleDetailClick(i.id)}>Detail</button>
                  <button className='btn-edit' onClick={() => handleEditClick(i.id)}>Edit</button>
                  <button className='btn-delete' onClick={() => handleDeleteClick(i.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddItemPenjualanModal isOpen={isAddModalOpen} onClose={closeAddModal} onAddItemPenjualan={handleAddItemPenjualan} />
      <DetailItemPenjualanModal isOpen={isDetailModalOpen} onClose={closeDetailModal} itemPenjualanDetail={selectedItemPenjualan} />
      <EditItemPenjualanModal isOpen={isEditModalOpen} onClose={closeEditModal} itemPenjualan={selectedItemPenjualan} onUpdateItemPenjualan={handleUpdateItemPenjualan} />
    </main>
  );
}

export default ItemPenjualan;
