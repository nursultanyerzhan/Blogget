import axios from 'axios';
import {URL_API} from '../../api/const';

export const COMMENTS_DATA_REQUEST = 'COMMENTS_DATA_REQUEST';
export const COMMENTS_DATA_REQUEST_SUCCESS = 'COMMENTS_DATA_REQUEST_SUCCESS';
export const COMMENTS_DATA_REQUEST_ERROR = 'COMMENTS_DATA_REQUEST_ERROR';

export const commentsDataRequest = () => ({
  type: COMMENTS_DATA_REQUEST,
});

export const commentsDataRequestSuccess = (data) => ({
  type: COMMENTS_DATA_REQUEST_SUCCESS,
  data,
});

export const commentsDataRequestError = (error) => ({
  type: COMMENTS_DATA_REQUEST_ERROR,
  error,
});

export const commentsDataRequestAsync = (id) => (dispatch, getState) => {
  const token = getState().token.token;
  if (!token) return;
  dispatch(commentsDataRequest());
  axios(`${URL_API}/comments/${id}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(
      ({
        data: [
          {
            data: {
              children: [{data: post}],
            },
          },
          {
            data: {children},
          },
        ],
      }) => {
        const comments = children.map((item) => item.data);
        dispatch(commentsDataRequestSuccess({post, comments}));
      },
    );
};
