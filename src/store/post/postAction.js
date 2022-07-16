import axios from 'axios';
import {URL_API} from '../../api/const';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const postRequestAsync = createAsyncThunk(
  'posts/fetch',
  (newPage, {getState}) => {
    let page = getState().postReducer.page;
    if (newPage) {
      page = newPage;
    }

    const token = getState().token.token;
    let after = getState().postReducer.after;
    // const loading = getState().postReducer.loading;
    // const isLast = getState().postReducer.isLast;

    if (!token) return; // || loading || isLast

    console.log(page);
    // eslint-disable-next-line max-len
    return axios(`${URL_API}/${page}?limit=7&${after ? `after=${after}` : ''}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(({data}) => {
        let posts = data.data.children.map(item => item.data);
        after = data.data.after;
        const beforePosts = getState().postReducer.data;
        posts = [...beforePosts, ...posts];
        console.log(posts);

        return {posts, page, after};
      })
      .catch((error) => ({error: error.toString()}));
  });
