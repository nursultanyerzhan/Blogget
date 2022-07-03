import style from './Auth.module.css';
import PropTypes from 'prop-types';
import {ReactComponent as LoginIcon} from './img/login.svg';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../UI/Text';
import {useState, useEffect} from 'react';
import {URL_API} from '../../../api/const';

export const Auth = ({token, delToken}) => {
  const [auth, setAuth] = useState({});
  const [showClose, setShowClose] = useState(false);

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/api/v1/me`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }).then(response => {
      if (response.status === 401) {
        delToken();
      }
      return response.json();
    })
      .then(({name, icon_img: iconImg}) => {
        const img = iconImg.replace(/\?.*$/, '');
        setAuth({name, img});
      })
      .catch(err => {
        console.error(err);
        setAuth({});
      });
  }, [token]);

  const handleShowClose = () => {
    setShowClose(!showClose);
  };

  const handleLogout = () => {
    delToken();
    window.location.href = 'http://localhost:3000/';
  };

  return (
    <div className={style.container}>
      {
        auth.name ? (
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
  delToken: PropTypes.func,
};
