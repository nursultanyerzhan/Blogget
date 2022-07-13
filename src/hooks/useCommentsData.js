import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  commentsDataRequestAsync,
} from '../store/commentsData/commentsDataAction';

export const useCommentsData = (id) => {
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;
    dispatch(commentsDataRequestAsync(id));
  }, []);
};
