import style from './Post.module.css';
import notphoto from './img/notphoto.jpg';
import PropTypes from 'prop-types';
import formDate from '../../../../utils/formatDate';
import Rating from './Rating';
import Content from './Content';
import deleteImg from './img/delete.svg';

export const Post = ({postData}) => {
  const {title, author, ups, date} = postData;
  return (
    <li className={style.post}>
      <img className={style.img} src={notphoto} alt="" />

      <Content title={title} author={author}/>
      <Rating ups={ups}/>
      <button className={style.delete}>
        <img src={deleteImg}/>
      </button>
      <time className={style.date} dateTime={date}>{formDate(date)}</time>
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
