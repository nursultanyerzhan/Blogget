import style from './Auth.module.css';
import PropTypes from 'prop-types';
import {ReactComponent as LoginIcon} from './img/login.svg';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../UI/Text';
import {useState, useEffect} from 'react';
import {deleteToken} from '../../../store/tokenReducer';
import {useDispatch} from 'react-redux';
import {useAuth} from '../../../hooks/useAuth';
import AuthLoader from '../../../UI/AuthLoader';
import {useNavigate} from 'react-router-dom';

export const Auth = () => {
  const dispatch = useDispatch();
  const [showClose, setShowClose] = useState(false);
  const [auth, loading, clearAuth] = useAuth();
  const navigate = useNavigate();

  const handleShowClose = () => {
    setShowClose(!showClose);
  };

  const handleLogout = () => {
    dispatch(deleteToken());
    clearAuth();
  };

  useEffect(() => {
    if (auth.name) {
      navigate('/');
    }
  }, []);

  return (
    <div className={style.container}>
      {
        loading ? (<AuthLoader />) : auth.name ? (
          <button className={style.btn}>
            <img className={style.img} src={auth.img} title={auth.name}
              alt={'Аватар'} onClick={handleShowClose}/>
            {
              showClose === true &&
              (<span className={style.logout} onClick={handleLogout}>
                Выйти</span>)
            }
          </button>
        ) : (
          <Text className={style.authLink} As='a' href={urlAuth}>
            <LoginIcon className={style.svg}/>
          </Text>
        )
      }
    </div>
  );
};

Auth.propTypes = {
  token: PropTypes.string,
};
