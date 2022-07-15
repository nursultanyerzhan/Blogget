import style from './List.module.css';
import Post from './Post';
import {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PostPreloader from '../../../UI/PostPreloader';
import {postRequestAsync} from '../../../store/post/postAction';
import {useParams, Outlet} from 'react-router-dom';

export const List = () => {
  const posts = useSelector(state => state.postReducer.data);
  const loading = useSelector(state => state.postReducer.loading);
  const endList = useRef(null);
  const dispatch = useDispatch();
  const {page} = useParams();

  useEffect(() => {
    dispatch(postRequestAsync(page));
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(postRequestAsync());
      }
    }, {
      rootMargin: '0px',
    });

    observer.observe(endList.current);

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current]);

  return (
    <>
      <ul className={style.list}>
        {loading ? <PostPreloader /> :
          posts.map((postData) => (
            <Post key={postData.data.id} postData={postData.data} />
          ))
        }
        <li ref={endList} className={style.end} />
      </ul>
      <Outlet />
    </>
  );
};
