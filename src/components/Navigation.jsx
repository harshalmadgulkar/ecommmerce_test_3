import React from 'react';

import { FaPlus, FaShoppingCart } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

const Navigation = () => {
  return (
    <>
      <div
        className={`w-full flex flex-row items-center justify-between px-2 py-3 bg-white sticky top-0`}
      >
        <div>
          <ul className='flex flex-row items-center list-none gap-3'>
            <li>
              <span className='text-xl font-semibold italic text-blue-700'>
                eCommerce
              </span>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => ({
                  borderBottom: isActive ? '2px solid blue' : '',
                })}
                className='p-1'
                to='/all-products'
              >
                All Products
              </NavLink>
            </li>
            <li className=''>
              <NavLink
                to='/add-product'
                className='flex items-center gap-2 p-1'
                style={({ isActive }) => ({
                  borderBottom: isActive ? '2px solid blue' : '',
                })}
              >
                Add a Product
                <FaPlus color='#5fa9fc' />
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='flex items-center gap-7'>
          <NavLink
            to='/cart'
            className='flex items-center gap-1 p-1'
            style={({ isActive }) => ({
              borderBottom: isActive ? '2px solid blue' : '',
            })}
          >
            <span>Cart</span>
            <FaShoppingCart />
          </NavLink>
          <div className='flex items-center gap-2'>
            <span>John Doe</span>
            <img
              src='/avatar.jpg'
              alt='profile avatar'
              className='rounded-full w-16 h-16'
            />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
