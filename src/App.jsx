import './App.css';
// import react router methods
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
// import components
import AllProducts from './pages/AllProducts';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';
import Navigation from './components/Navigation';
// import redux methods
import { Provider } from 'react-redux';
import { store } from './redux/store';
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
        { path: '/all-products', element: <AllProducts /> },
        { path: '/add-product', element: <AddProduct /> },
        { path: '/cart', element: <Cart /> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer position='bottom-right' />
      {/* uncomment Provider if you want to use redux */}
      {/* <Provider store={store}> */}
      <RouterProvider router={router} />
      {/* </Provider> */}
    </>
  );
}

export default App;
