import React from 'react'
import { Link } from 'react-router-dom';
import { BsCart3, BsPeopleFill, BsBox2Fill, BsListCheck, BsGrid1X2Fill, BsArrowBarLeft } from 'react-icons/bs'

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    return (
        <aside id='sidebar' className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <BsGrid1X2Fill className='icon_header' /> Agen Toko
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>
                    <BsArrowBarLeft />
                </span>
            </div>
            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <Link to="/">
                        <BsPeopleFill className='icon' /> Pelanggan
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/barang">
                        <BsBox2Fill className='icon' /> Barang
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/item-penjualan">
                        <BsCart3 className='icon' /> Item Penjualan
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/penjualan">
                        <BsListCheck className='icon' /> Penjualan
                    </Link>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar