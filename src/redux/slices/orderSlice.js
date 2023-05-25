import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../components/Util";

export const newOrder = createAsyncThunk(
  "orders/newOrder",
  async (data, thunkAPI) => {
    try {
      const {
        userId,
        products,
        address,
        totalAmount,
        orderNumber,
        discount,
        subTotal,
        token,
      } = data;
      const response = await api.post(
        "orders/newOrder",
        {
          userId,
          products,
          address,
          totalAmount,
          orderNumber,
          subTotal,
          discount,
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
export const customerOrder = createAsyncThunk(
  "orders/userOrders",
  async (data, thunkAPI) => {
    try {
      const { userId, token } = data;
      const response = await api.get("orders/userOrders?userId=" + userId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
export const sellerOrder = createAsyncThunk(
  "orders/sellerOrders",
  async (data, thunkAPI) => {
    try {
      const { sellerId, token } = data;
      const response = await api.get(
        "orders/sellerOrders?sellerId=" + sellerId,
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
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrdersStatus",
  async (data, thunkAPI) => {
    console.log("data is ", data);
    try {
      const { orderId, orderStatus, token } = data;
      const response = await api.post(
        "orders/updateOrderStatus",
        { orderId, orderStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response ", response.data);
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
  orders: [],
  error: null,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = null;
    },
    setSuccess: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: {
    [newOrder.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    [newOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    [newOrder.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload.err;
    },
    [customerOrder.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    [customerOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.orders = action.payload;
    },
    [customerOrder.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload.err;
    },
    [sellerOrder.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    [sellerOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.orders = action.payload;
    },
    [sellerOrder.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload.err;
    },
    [updateOrderStatus.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    [updateOrderStatus.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = false;
    },
    [updateOrderStatus.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload.err;
    },
  },
});
export const { setError, setSuccess } = orderSlice.actions;
export default orderSlice.reducer;
