import style from './Post.module.css';
import notphoto from './img/notphoto.jpg';
import PropTypes from 'prop-types';
import formDate from '../../../../utils/formatDate';
import Rating from './Rating';

export const Post = ({postData}) => {
  const {title, author, ups, date} = postData;
  return (
    <li className={style.post}>
      <img className={style.img} src={notphoto} alt="" />

      <div className={style.content}>
        <h2 className={style.title}>
          <a className={style.linkPost} href='#post'>
            {title}
          </a>
        </h2>
        <a className={style.linkAuthor} href='#author'>{author}</a>
      </div>

      <Rating ups={ups}/>

      <time className={style.date} dateTime={date}>{formDate(date)}</time>
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
