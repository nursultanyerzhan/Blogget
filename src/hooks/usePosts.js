import {useState, useEffect} from 'react';
import {URL_API} from '../api/const';
import {useSelector} from 'react-redux';

export const usePosts = () => {
  const [posts, setPostsData] = useState([]);
  const token = useSelector(state => state.tokenReducer.token);

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/best?limit=20`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }).then(response => {
      if (response.status === 401) {
        throw new Error(response.status);
      }
      return response.json();
    })
      .then(({data}) => {
        setPostsData(data.children);
      })
      .catch(err => {
        console.error(err);
        setPostsData({});
      });
  }, [token]);

  return [posts];
};
