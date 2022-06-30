import style from './Post.module.css';
import notphoto from './img/notphoto.jpg';
import PropTypes from 'prop-types';
import formDate from '../../../../utils/formatDate';


export const Post = ({postData}) => {
  const {title, author, ups, date} = postData;
  console.log(title, author, ups, date);
  console.log(style);
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

      <div className={style.rating}>
        <button className={style.up} />
        <p className={style.ups}>{ups}</p>
        <button className={style.down} />
      </div>

      <time className={style.date} dateTime={date}>{formDate(date)}</time>
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
