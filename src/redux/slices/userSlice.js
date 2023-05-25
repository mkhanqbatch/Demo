import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../components/Util";
export const logIn = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const { email, password } = user;
    const response = await api.post("auth/signin", { email, password });
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
});
export const signUp = createAsyncThunk(
  "auth/signup",
  async (user, thunkAPI) => {
    // console.log(user);
    try {
      const { name, email, password } = user;
      const response = await api.post("auth/signUp", { name, email, password });
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
  token: "",
  user: {},
  success: false,
  error: null,
  isSubscription: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = null;
    },
    resetUserSlice: (state, action) => {
      state.loading = false;
      state.token = "";
      state.user = {};
      state.error = null;
    },
    setSubscriptionId: (state, action) => {
      state.user = {
        ...state.user,
        subscriptionId: action.payload,
      };
    },
  },
  extraReducers: {
    [logIn.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    [logIn.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.success = true;
      state.loading = false;
    },
    [logIn.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload.err;
    },
    [signUp.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    [signUp.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
      state.success = true;
    },
    [signUp.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload.err;
    },
  },
});
export const { resetUserSlice, setError, setSubscriptionId } =
  userSlice.actions;
export default userSlice.reducer;
