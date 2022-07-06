import React from 'react';
import PropTypes from 'prop-types';
import {usePosts} from '../hooks/usePosts';

export const postsContext = React.createContext({});

export const PostsContextProvider = ({children}) => {
  const [posts] = usePosts();

  return (
    <postsContext.Provider value={{posts}}>
      {children}
    </postsContext.Provider>
  );
};

PostsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
