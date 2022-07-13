import axios from 'axios';
import {URL_API} from '../../api/const';

export const POST_REQUEST = 'POST_REQUEST';
export const POST_REQUEST_SUCCESS = 'POST_REQUEST_SUCCESS';
export const POST_REQUEST_SUCCESS_AFTER = 'POST_REQUEST_SUCCESS_AFTER';
export const POST_REQUEST_ERROR = 'POST_REQUEST_ERROR';

export const postRequest = () => ({
  type: POST_REQUEST,
});

export const postRequestSuccess = (data) => ({
  type: POST_REQUEST_SUCCESS,
  data: data.children,
  after: data.after,
});

export const postRequestSuccessAfter = (data) => ({
  type: POST_REQUEST_SUCCESS_AFTER,
  data: data.children,
  after: data.after,
});

export const postRequestError = (error) => ({
  type: POST_REQUEST_ERROR,
  error,
});

export const postRequestAsync = () => (dispatch, getState) => {
  const token = getState().token.token;
  const after = getState().postReducer.after;
  const loading = getState().postReducer.loading;
  const isLast = getState().postReducer.isLast;

  if (!token || loading || isLast) return;
  dispatch(postRequest());
  axios(`${URL_API}/best?limit=10&${after ? `after=${after}` : ''}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(({data}) => {
      if (after) {
        dispatch(postRequestSuccessAfter(data.data));
      } else {
        dispatch(postRequestSuccess(data.data));
      }
    })
    .catch(err => {
      dispatch(postRequestError(err.toString()));
    });
};
