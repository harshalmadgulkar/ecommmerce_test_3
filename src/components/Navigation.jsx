import React from 'react';

import { FaPlus, FaShoppingCart } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';

const Navigation = () => {
  return (
    <>
      <div
        className={`w-full flex flex-row items-center justify-between px-2 py-3 bg-white`}
      >
        <div>
          <ul className='flex flex-row items-center list-none gap-3'>
            <li>
              <span className='text-xl font-semibold italic text-blue-700'>eCommerce</span>
            </li>
            <li>
              <Link to='/all-products'>All Products</Link>
            </li>
            <li className=''>
              <Link to='/add-product' className='flex items-center gap-1'>
                Add a Product
                <FaPlus color='#5fa9fc' />
              </Link>
            </li>
          </ul>
        </div>
        <div className='flex items-center gap-7'>
          <div className='flex items-center gap-1'>
            <span>Cart</span>
            <FaShoppingCart />
          </div>
          <div className='flex items-center gap-2'>
            <span>John Doe</span>
            <img src='/avatar.jpg' alt='profile avatar' className='rounded-full w-16 h-16'/>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
