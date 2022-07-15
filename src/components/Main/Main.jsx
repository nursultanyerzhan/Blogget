import style from './Main.module.css';
import Layout from '../Layout';
import Tabs from './Tabs';
import List from './List';
import MainPage from './MainPage';
import {Routes, Route} from 'react-router-dom';
import Modal from '../Modal';
import NotFound from './NotFound';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Tabs />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
        <Route>
          <Route path='/category/:page' element={<List />}>
            <Route path='post/:id' element={<Modal />}/>
          </Route>
        </Route>
      </Routes>
    </Layout>
  </main>
);
