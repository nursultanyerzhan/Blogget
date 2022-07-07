import style from './Post.module.css';
import PropTypes from 'prop-types';
import formDate from '../../../../utils/formatDate';
import Rating from './Rating';
import Content from './Content';
import {ReactComponent as DeleteImg} from './img/delete.svg';
import {Thumbnail} from './Thumbnail/Thumbnail';

export const Post = ({postData}) => {
  const {
    title,
    author,
    ups,
    date,
    thumbnail,
    selftext: markdown,
  } = postData;
  console.log(postData);
  return (
    <li className={style.post}>
      <Thumbnail thumbnail={thumbnail}/>

      <Content title={title} author={author} markdown={markdown}/>

      <Rating ups={ups} />

      <DeleteImg className={style.delete} />

      <time className={style.date} dateTime={date}>{formDate(date)}</time>
    </li>
  );
};

Post.propTypes = {
  postData: PropTypes.object,
};
