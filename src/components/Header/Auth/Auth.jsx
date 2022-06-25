import style from './Auth.module.css';
import login from './img/login.svg';

export const Auth = ({ auth }) => {
  return (
    <button className={style.button}>
      {
        auth ? auth :
        <img className={style.photo} src={login} alt="Авторизация" />
      }
    </button>
  )
}