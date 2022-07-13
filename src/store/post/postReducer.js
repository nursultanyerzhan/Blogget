import {
  POST_REQUEST,
  POST_REQUEST_SUCCESS,
  POST_REQUEST_SUCCESS_AFTER,
  POST_REQUEST_ERROR,
} from './postAction';

const initialState = {
  loading: false,
  data: [],
  error: '',
  after: '',
  isLast: false,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case POST_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        error: '',
        after: action.after,
        isLast: !action.after,
      };
    case POST_REQUEST_SUCCESS_AFTER:
      return {
        ...state,
        data: [...state.data, ...action.data],
        loading: false,
        error: '',
        after: action.after,
        isLast: !action.after,
      };
    case POST_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default: return state;
  }
};

