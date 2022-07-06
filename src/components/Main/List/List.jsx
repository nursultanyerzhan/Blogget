import style from './List.module.css';
import Post from './Post';
// import {assignId} from '../../../utils/generateRandomId';
import {useContext, useEffect, useState} from 'react';
import {postsContext} from '../../../context/postsContext';

export const List = () => {
  const [postsData, setPostsData] = useState([]);
  const {posts} = useContext(postsContext);

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    setPostsData(posts.map(item => {
      item.data.date = item.data.created;
      return item.data;
    }));
  }, [posts]);

  return (
    <ul className={style.list}>
      {postsData.map((postData) => (
        <Post key={postData.id} postData={postData} />
      ))}
    </ul>
  );
};
