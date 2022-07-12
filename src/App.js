import Header from './components/Header';
import Main from './components/Main';
import {PostsContextProvider} from './context/postsContext';
import {useDispatch} from 'react-redux';
import {updateToken} from './store/tokenReducer';
import {getToken} from './api/token';

const App = () => {
  const dispatch = useDispatch();
  dispatch(updateToken(getToken()));
  return (
    <PostsContextProvider>
      <Header />
      <Main />
    </PostsContextProvider>
  );
};

export default App;
