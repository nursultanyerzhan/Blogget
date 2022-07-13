import style from './List.module.css';
import Post from './Post';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import PostPreloader from '../../../UI/PostPreloader';

export const List = () => {
  const [postsData, setPostsData] = useState([]);
  const posts = useSelector(state => state.postReducer.data);
  const loading = useSelector(state => state.postReducer.loading);

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    setPostsData(posts.map(item => {
      item.data.date = item.data.created;
      return item.data;
    }));
  }, [posts]);

  return (
    <ul className={style.list}>
      {loading ? <PostPreloader /> :
        postsData.map((postData) => (
          <Post key={postData.id} postData={postData} />
        ))
      }
    </ul>
  );
};
