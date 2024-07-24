import React, { useState } from 'react';
// import react-icons
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { RxStarFilled, RxStar } from 'react-icons/rx';
// imports redux methods
import { useDispatch } from 'react-redux';
import { actions } from '../redux/reducers/productReducer';
// import react-toastify components
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

const ProductCardDetails = ({
  itemId,
  itemName,
  itemPrice,
  itemRating,
  description,
  firebaseDocid,
}) => {
  const [allowEdit, setAllowEdit] = useState(false);
  const [localItemName, setLocalItemName] = useState(itemName);
  const [localItemPrice, setLocalItemPrice] = useState(itemPrice);
  const [localItemRating, setLocalItemRating] = useState(itemRating);
  const [localDescription, setLocalDescription] = useState(description);

  const dispatch = useDispatch();

  const handleDelete = async () => {
    console.log(itemId);
    // for redux
    // dispatch(actions.delete({ itemId }));

    // for firebase
    const productRef = collection(db, 'products');
    await deleteDoc(doc(productRef, firebaseDocid));

    toast.error('Item deleted successfully.');
  };

  const handleEdit = () => {
    setAllowEdit(true);
  };

  const handleSave = async () => {
    // update state with new value
    const editedProduct = {
      itemId,
      itemName: localItemName,
      itemPrice: localItemPrice,
      itemRating: localItemRating,
      description: localDescription,
    };
    // for redux
    // dispatch(actions.edit(editedProduct));

    // for firebase db
    const productRef = collection(db, 'products');
    const docRef = doc(productRef, firebaseDocid);
    await updateDoc(docRef, editedProduct);

    setAllowEdit(false);
    toast.success('Product edited successfully.');
  };

  const handleCancel = () => {
    setAllowEdit(false);
    setLocalItemName(itemName);
    setLocalItemPrice(itemPrice);
    setLocalItemRating(itemRating);
    setLocalDescription(description);
  };

  return (
    <div className='my-4'>
      {allowEdit ? (
        <EditForm
          localItemName={localItemName}
          setLocalItemName={setLocalItemName}
          localItemPrice={localItemPrice}
          setLocalItemPrice={setLocalItemPrice}
          localItemRating={localItemRating}
          setLocalItemRating={setLocalItemRating}
          localDescription={localDescription}
          setLocalDescription={setLocalDescription}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <DisplayCard
          localItemName={localItemName}
          localItemPrice={localItemPrice}
          localItemRating={localItemRating}
          localDescription={localDescription}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

const EditForm = ({
  localItemName,
  setLocalItemName,
  localItemPrice,
  setLocalItemPrice,
  localItemRating,
  setLocalItemRating,
  localDescription,
  setLocalDescription,
  onSave,
  onCancel,
}) => {
  return (
    <div className='flex items-center justify-around bg-white p-5 rounded-2xl'>
      <div className='flex items-center justify-around'>
        <div className=''>
          <img
            src='https://m.media-amazon.com/images/I/71iuUqL36KL._SY879_.jpg'
            alt='Product image'
            className='w-40 h-40'
          />
        </div>
        <div>
          <div>
            <input
              type='text'
              value={localItemName}
              onChange={(e) => setLocalItemName(e.target.value)}
              className='border-black border'
            />
          </div>
          <div>
            <p>
              Rs.{' '}
              <span>
                <input
                  type='text'
                  value={localItemPrice}
                  onChange={(e) => setLocalItemPrice(e.target.value)}
                  className='border-black border'
                />
              </span>
            </p>
          </div>
          <div>
            <p>Rating</p>
            <input
              type='number'
              value={localItemRating}
              onChange={(e) => {
                const newValue = e.target.value;
                if (newValue >= 0 && newValue <= 5) {
                  setLocalItemRating(newValue);
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
              className='border-black border'
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col px-12 items-center'>
        <div className=''>
          <textarea
            rows='5'
            cols='65'
            value={localDescription}
            onChange={(e) => setLocalDescription(e.target.value)}
            className='border-black border p-2 resize-none'
          />
        </div>
        <div className='flex gap-5'>
          <button onClick={onSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const DisplayCard = ({
  localItemName,
  localItemPrice,
  localItemRating,
  localDescription,
  onEdit,
  onDelete,
}) => {
  return (
    <div className='flex items-center justify-evenly bg-white p-5 rounded-2xl'>
      <div className='flex items-center w-96'>
        <div className=''>
          <img
            src='https://m.media-amazon.com/images/I/71iuUqL36KL._SY879_.jpg'
            alt='Product image'
            className='w-40 h-40'
          />
        </div>
        <div>
          <div>
            <p>
              <span>{localItemName} </span>
            </p>
          </div>
          <div>
            <p>
              Rs. <span>{localItemPrice} </span>
            </p>
          </div>
          <div className='flex'>
            {Array.from({ length: Number(localItemRating) }, (_, index) => (
              <RxStarFilled color='gold' key={index} />
            ))}
            {Array.from({ length: Number(5 - localItemRating) }, (_, index) => (
              <RxStar key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center w-1/2'>
        <div className='text-center'>
          <p>{localDescription}</p>
        </div>
        <div className='flex gap-5'>
          <button onClick={onEdit}>
            <FaEdit />
          </button>
          <button onClick={onDelete}>
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDetails;
