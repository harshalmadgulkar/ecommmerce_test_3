import React, { useEffect, useState, useRef } from 'react';
// import components
import ProductCardDetails from '../components/ProductCardDetails.jsx';
// import react-icons
import { IoCloseCircle } from 'react-icons/io5';
// imports redux methods
// import { productSelector } from '../redux/reducers/productReducer.js';
// import { useSelector, useDispatch } from 'react-redux';
// import { actions } from '../redux/reducers/productReducer';
// import react-toastify elements
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
import { db } from '../firebaseinit.js';

const Cart = () => {
  // for redux use
  // const products = useSelector(productSelector);
  const [products, setProducts] = useState();

  // for react-redux
  // const dispatch = useDispatch();

  useEffect(() => {
    syncData();
    toast.dismiss();
    toast.success('Products retrived successfully.');
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  // whenever db changes
  const syncData = async () => {
    const unsub = onSnapshot(collection(db, 'products'), (snapshot) => {
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(products);
      console.log(products);
    });
  };
  return (
    <div className='container mx-auto'>
      {products?.map((product, index) =>
        product.inCart ? (
          <ProductCardDetails
            product={product}
            key={product.itemId}
            itemId={product.itemId}
            itemName={product.itemName}
            itemPrice={product.itemPrice}
            itemRating={product.itemRating}
            description={product.description}
            inCart={product.inCart}
            // firebase doc id
            firebaseDocid={product.id}
          />
        ) : null
      )}
    </div>
  );
};

export default Cart;
