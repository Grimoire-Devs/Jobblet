import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseUrl = import.meta.env.VITE_BASE_URL;
const initialState = {
  user: {
    id: null,
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
  },
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const signup = createAsyncThunk(
  "user/signup",
  async (formData, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Some Error Occurred");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          phone: credentials.phone,
          password: credentials.password,
        }),
      });
      if (!response.ok) {
        throw new Error("Some Error Occurred");
      }
      const data = await response.json();
      return data.payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logout = () => (dispatch) => {
  // optional: revoke token on server here
  dispatch(userSlice.actions.clearUser());
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload.user || initialState.user;
      state.token = payload.token || null;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser: () => initialState,
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (s) => {
        s.loading = true;
      })
      .addCase(signup.fulfilled, (s, a) => {
        s.loading = false;
        s.error = null;
      })
      .addCase(signup.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error.message;
      });

    /* --- login flow --- */
    builder
      .addCase(login.pending, (s) => {
        s.loading = true;
      })
      .addCase(login.fulfilled, (s, a) => {
        s.loading = false;
        s.error = null;
        s.user = a.user;
        s.token = a.token;
        s.isAuthenticated = true;
      })
      .addCase(login.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error.message;
      });
  },
});

export const selectUser = (state) => state.user.user;

export const selectAuth = (state) => state.user.isAuthenticated;

export const selectBusy = (state) => state.user.loading;

export const selectError = (state) => state.user.error;

export const { setUser, clearUser, startLoading, stopLoading, setError } =
  userSlice.actions;
export default userSlice.reducer;
