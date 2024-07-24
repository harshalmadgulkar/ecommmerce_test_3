import { configureStore } from '@reduxjs/toolkit';

// import reducers
import { productReducer } from './reducers/productReducer';
// import middleware
// import { loggerMiddleware } from './middlewares/loggerMiddleware';

export const store = configureStore({
  reducer: {
    productReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(loggerMiddleware),
});
