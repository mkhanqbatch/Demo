import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../components/Util";

export const addProduct = createAsyncThunk(
  "products/AddProduct",
  async (values, thunkAPI) => {
    try {
      const { name, asin, price, description, token, sellerId } = values;
      const response = await api.post(
        "products/addProduct",
        { name, asin, price, description, sellerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      }
      return thunkAPI.rejectWithValue({
        err: {
          error: "Network Error",
        },
      });
    }
  }
);
export const allProducts = createAsyncThunk(
  "products/allProducts",
  async ({ token, sellerId }, thunkAPI) => {
    try {
      const response = await api.post(
        "products/allProducts?sellerId",
        {
          sellerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      }
      return thunkAPI.rejectWithValue({
        err: {
          error: "Network Error",
        },
      });
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ token, id, sellerId }, thunkAPI) => {
    try {
      const response = await api.post(
        "products/deleteProduct",
        {
          id,
          sellerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      }
      return thunkAPI.rejectWithValue({
        err: {
          error: "Network Error",
        },
      });
    }
  }
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (values, thunkAPI) => {
    try {
      const { _id, name, price, asin, description, token, sellerId } = values;
      // console.log("seller id ", sellerId);
      const response = await api.post(
        "products/updateProduct",
        {
          _id,
          name,
          price,
          asin,
          description,
          sellerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      }
      return thunkAPI.rejectWithValue({
        err: {
          error: "Network Error",
        },
      });
    }
  }
);
const initialState = {
  loading: false,
  success: false,
  products: [],
  error: null,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = null;
    },
    setSucess: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: {
    [addProduct.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    [addProduct.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    [allProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [allProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload?.products;
    },
    [allProducts.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteProduct.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
    },
    [updateProduct.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.err;
    },
  },
});
export const { setError, setSucess } = productSlice.actions;
export default productSlice.reducer;
