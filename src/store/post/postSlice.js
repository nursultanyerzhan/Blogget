import {createSlice} from '@reduxjs/toolkit';
import {postRequestAsync} from './postAction';

const initialState = {
  loading: false,
  data: [],
  error: '',
  after: '',
  page: '',
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [postRequestAsync.pending.type]: (state) => {
      state.error = '';
      state.loading = true;
    },
    [postRequestAsync.fulfilled.type]: (state, action) => {
      state.data = action.payload.posts;
      state.page = action.payload.page;
      state.error = '';
      state.loading = false;
      state.after = action.payload.after;
    },
    [postRequestAsync.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  }
});

export default postSlice.reducer;
