import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("fetchProducts", async (value) => {
  const response = await axios.get(
    value?.search
      ? `https://dummyjson.com/products/search?q=${value.search}`
      : value?.category
      ? `https://dummyjson.com/products/category/${value.category}`
      : "https://dummyjson.com/products"
  );  
  return response.data.products;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    productData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
