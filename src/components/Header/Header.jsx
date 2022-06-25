import style from './Header.module.css';
import Layout from '../Layout';
import Logo from './Logo';
import Search from './Search';
import Auth from './Auth';

export const Header = () => {
  return (
    <header className={style.header}>
      <Layout>
        <div className={style.gridContainer}>
          <Logo />
          <h1>заголовок</h1>
          <Search />
          <Auth auth='nurs' />
        </div>
      </Layout>
    </header>
  )
}