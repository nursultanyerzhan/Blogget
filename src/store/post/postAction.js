import axios from 'axios';
import {URL_API} from '../../api/const';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const postRequestAsync = createAsyncThunk(
  'posts/fetch',
  (newPage, {getState}) => {
    let page = getState().postReducer.page;
    let isNewPage = false;
    if (newPage) {
      if (newPage !== page) {
        isNewPage = true;
      }
      page = newPage;
    }

    const token = getState().token.token;
    let after = getState().postReducer.after;

    if (!token) return;

    // eslint-disable-next-line max-len
    return axios(`${URL_API}/${page}?limit=7&${after ? `after=${after}` : ''}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(({data}) => {
        after = data.data.after;
        let posts = data.data.children.map(item => item.data);

        if (isNewPage) {
          return {posts, page, after};
        } else {
          const beforePosts = getState().postReducer.data;
          posts = [...beforePosts, ...posts];
          posts = [...new Map(posts.map(item =>
            [item['id'], item])).values()];

          return {posts, page, after};
        }
      })
      .catch((error) => ({error: error.toString()}));
  });
