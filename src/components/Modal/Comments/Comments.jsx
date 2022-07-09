import style from './Comments.module.css';
import {Text} from '../../../UI/Text';
import PropTypes from 'prop-types';
import formDate from '../../../utils/formatDate';

export const Comments = ({comments}) => (comments ? (
  <ul className={style.list}>
    {comments.map((comment) => (
      <li key={comment.id} className={style.item}>
        <Text As='h3' className={style.author} size={18} tsize={22}>
          {comment.author}
        </Text>
        <Text As='p' className={style.comment} size={14} tsize={18}>
          {comment.body}
        </Text>
        <time className={style.date}>
          {formDate(comment.created)}
        </time>
      </li>
    ))}
  </ul>
) : (<p>Нет комментариев</p>));

Comments.propTypes = {
  comments: PropTypes.array,
};
