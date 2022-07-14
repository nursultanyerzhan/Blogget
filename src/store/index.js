import {commentReducer} from './commentReducer';
import {tokenMiddleware, tokenReducer} from './tokenReducer';
import {authReducer} from './auth/authReducer';
import {postReducer} from './post/postReducer';
import {commentsDataReducer} from './commentsData/commentsDataReducer';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    commentReducer,
    auth: authReducer,
    postReducer,
    commentsDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenMiddleware)
});
