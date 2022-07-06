import style from './Search.module.css';
import searchImg from './img/search.svg';

export const Search = () => (
  <form>
    <input className={style.search} type="search" />
    <button className={style.button}>
      <img src={searchImg} className={style.svg}/>
    </button>
  </form>
);
