import {
  COMMENTS_DATA_REQUEST,
  COMMENTS_DATA_REQUEST_SUCCESS,
  COMMENTS_DATA_REQUEST_ERROR,
} from './commentsDataAction';

const initialState = {
  data: [],
  error: '',
  status: 'loading',
};

export const commentsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_DATA_REQUEST:
      return {
        ...state,
        error: '',
        status: 'loading',
      };
    case COMMENTS_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: '',
        status: 'loaded',
      };
    case COMMENTS_DATA_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        status: 'error',
      };

    default: return state;
  }
};

