import './App.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import AllProducts from './components/AllProducts';
import Navigation from './components/Navigation';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import AddProduct from './components/AddProduct';

// react toasts
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Navigation />,
      children: [
        { index: true, element: <Navigate to='/all-products' /> },
        { path: 'all-products', element: <AllProducts /> },
        { path: 'add-product', element: <AddProduct /> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer position='bottom-right' />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
