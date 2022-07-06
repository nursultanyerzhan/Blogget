import style from './Thumbnail.module.css';
import notphoto from './img/notphoto.jpg';
import PropTypes from 'prop-types';

export const Thumbnail = ({thumbnail}) => {
  console.log(style);
  return (
    <img className={style.img} src={thumbnail.length > 5 ? thumbnail :
      notphoto} alt={thumbnail} />
  );
};

Thumbnail.propTypes = {
  thumbnail: PropTypes.string,
};
