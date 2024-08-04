import React, { useState } from 'react';
// import nanoid for unique ids
import { nanoid } from 'nanoid';
// imports redux methods
// import { useDispatch } from 'react-redux';
// import { actions } from '../redux/reducers/productReducer';
// import react-toastify
import { toast, ToastContainer } from 'react-toastify';
// firebase imports
import {
  doc,
  collection,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebaseinit';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState(0);

  // for react-redux
  // const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Call API to add product to database
    const newProduct = {
      itemId: nanoid(),
      itemName: name,
      itemPrice: parseFloat(price),
      itemRating: parseInt(rating),
      description: description,
      inCart: false,
    };
    // Add product to database
    const productRef = collection(db, 'products');
    const docRef = await addDoc(productRef, newProduct);

    // for redux
    // dispatch(actions.add(newProduct));

    console.log('Product added:', { name, description, price, rating });
    resetFields();
    toast.success('New product succssfully added.');
  };

  const resetFields = () => {
    setName('');
    setDescription('');
    setPrice('');
    setRating(0);
  };

  return (
    <div className='max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded-2xl align flex flex-col mt-4'>
      <h1 className='text-2xl mb-4'>Add a Product</h1>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <div className='mb-4'>
          <label className='block mb-2' htmlFor='name'>
            Name
          </label>
          <input
            className='w-full p-2 pl-4 text-sm text-gray-700 border border-black'
            id='name'
            type='text'
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2' htmlFor='description'>
            Description
          </label>
          <textarea
            className='w-full p-4 pl-4 text-sm text-gray-700 border border-black'
            id='description'
            value={description}
            required
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2 ' htmlFor='price'>
            Price
          </label>
          <input
            className='w-full p-2 pl-4 text-sm text-gray-700 border border-black'
            id='price'
            type='number'
            value={price}
            required
            onChange={(event) => setPrice(event.target.valueAsNumber)}
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2' htmlFor='rating'>
            Rating
          </label>
          <input
            type='number'
            value={rating}
            required
            onChange={(e) => {
              const newValue = e.target.valueAsNumber;
              if (newValue >= 0 && newValue <= 5) {
                setRating(newValue);
              } else {
                // alert('Rating must be between 0 and 5');
                toast.warn('Rating must be between 0 and 5.', {
                  theme: 'dark',
                  // autoClose: false,
                });
              }
            }}
            min={0}
            max={5}
            className='p-2 pl-4 text-sm text-gray-700 border-black border'
          />
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
