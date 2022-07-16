import {commentReducer} from './commentReducer';
import {tokenMiddleware, tokenReducer} from './tokenReducer';
import {authReducer} from './auth/authReducer';
import postSlice from './post/postSlice';
import commentsSlice from './commentsData/commentsSlice';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    commentReducer,
    auth: authReducer,
    postReducer: postSlice,
    comments: commentsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenMiddleware)
});
