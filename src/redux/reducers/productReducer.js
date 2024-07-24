import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  products: [
    {
      itemId: 11,
      itemName: 'Red Seat',
      itemPrice: '2500',
      itemRating: '3',
      description:
        'This is well designed and crafted product that will suit many needs in terms of quality craftmanship and asthetics',
    },
    {
      itemId: 12,
      itemName: 'Violet Seat',
      itemPrice: '4800',
      itemRating: '4',
      description:
        'This is well designed and crafted product that will suit many needs in terms of quality craftmanship and asthetics',
    },
  ],
};

// Creating productReducer using ReduxToolkit
const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    // this is add action
    add: (state, action) => {
      state.products.push({
        itemId: action.payload.newItemId,
        itemName: action.payload.newItemName,
        itemPrice: action.payload.newItemPrice,
        itemRating: action.payload.newItemRating,
        description: action.payload.newItemDescription,
      });
    },
    // this is edit action
    edit: (state, action) => {
      const itemId = action.payload.itemId;
      const productIndex = state.products.findIndex(
        (product) => product.itemId === itemId
      );

      if (productIndex !== -1) {
        state.products[productIndex] = {
          ...state.products[productIndex],
          itemName: action.payload.editItemName,
          itemPrice: action.payload.editItemPrice,
          itemRating: action.payload.editItemRating,
          description: action.payload.editItemDescription,
        };
      }
    },
    // this is delete action
    delete: (state, action) => {
      console.log('Before filter:', state.products);
      state.products = state.products.filter(
        (product) =>
          // filter out that id
          product.itemId !== action.payload.itemId
      );
      console.log('After filter:', state.products);
    },
  },
});

// Reducer
export const productReducer = productSlice.reducer;
// Actions
export const actions = productSlice.actions;
// export selector
export const productSelector = (state) => state.productReducer.products;
