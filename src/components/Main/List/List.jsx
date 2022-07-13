import style from './List.module.css';
import Post from './Post';
import {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PostPreloader from '../../../UI/PostPreloader';
import {postRequestAsync} from '../../../store/post/postAction';

export const List = () => {
  const [postsData, setPostsData] = useState([]);
  const posts = useSelector(state => state.postReducer.data);
  const loading = useSelector(state => state.postReducer.loading);
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    setPostsData(posts.map(item => {
      item.data.date = item.data.created;
      return item.data;
    }));
  }, [posts]);

  useEffect(() => {
    // if (!posts.length) return;
    console.log(0);
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(postRequestAsync());
      }
    }, {
      rootMargin: '0px',
    });

    observer.observe(endList.current);
  }, [endList.current]);

  return (
    <ul className={style.list}>
      {loading ? <PostPreloader /> :
        postsData.map((postData) => (
          <Post key={postData.id} postData={postData} />
        ))
      }
      <li ref={endList} className={style.end}/>
    </ul>
  );
};
