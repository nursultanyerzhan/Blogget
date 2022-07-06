import {useState, useEffect, useContext} from 'react';
import {URL_API} from '../api/const';
import {tokenContext} from '../context/tokenContext';

export const usePosts = () => {
  const [posts, setPostsData] = useState([]);
  const {token} = useContext(tokenContext);

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
        // console.log(data);
      })
      .catch(err => {
        console.error(err);
        setPostsData({});
      });
  }, [token]);

  return [posts];
};
