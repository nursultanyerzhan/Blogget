import {
  POST_REQUEST,
  POST_REQUEST_SUCCESS,
  POST_REQUEST_SUCCESS_AFTER,
  POST_REQUEST_ERROR,
  CHANGE_PAGE,
} from './postActionOld';

const initialState = {
  loading: false,
  data: [],
  error: '',
  after: '',
  isLast: false,
  page: '',
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
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.page,
        after: '',
        isLast: false,
      };

    default: return state;
  }
};
