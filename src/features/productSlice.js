import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// -------------------- READ --------------------
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://dummyjson.com/products/");
      return response.data.products; // API returns { products: [...] }
    } catch (err) {
      return rejectWithValue("Failed to fetch products");
    }
  }
);

// -------------------- ADD --------------------
export const addProductAPI = createAsyncThunk(
  "products/addProductAPI",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://dummyjson.com/products/add",
        productData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data; // new product returned by API
    } catch (err) {
      return rejectWithValue("Failed to add product");
    }
  }
);

// -------------------- UPDATE --------------------
export const updateProductAPI = createAsyncThunk(
  "products/updateProductAPI",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue("Failed to update product");
    }
  }
);

// -------------------- DELETE --------------------
export const deleteProductAPI = createAsyncThunk(
  "products/deleteProductAPI",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      return data; // deleted product
    } catch (err) {
      return rejectWithValue("Failed to delete product");
    }
  }
);

// -------------------- SLICE --------------------
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ---------- FETCH ----------
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------- ADD ----------
      .addCase(addProductAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProductAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------- UPDATE ----------
      .addCase(updateProductAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductAPI.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(updateProductAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------- DELETE ----------
      .addCase(deleteProductAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (p) => p.id !== action.payload.id
        );
      })
      .addCase(deleteProductAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
