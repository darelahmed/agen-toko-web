import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Modal.css'
import Home from './Home'
import Header from './Header'
import Sidebar from './Sidebar'
import Pelanggan from './Pelanggan';
import Barang from './page/barang/Barang';
import ItemPenjualan from './page/itempenjualan/ItemPenjualan';
import Penjualan from './page/penjualan/Penjualan';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <Router>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Routes>
          <Route path="/" element={<Pelanggan />} />
          <Route path="/barang" element={<Barang />} />
          <Route path="/item-penjualan" element={<ItemPenjualan />} />
          <Route path="/penjualan" element={<Penjualan />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
