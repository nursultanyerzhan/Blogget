import style from './Rating.module.css';
import PropTypes from 'prop-types';

export const Rating = ({ups}) => {
  console.log(style);
  return (
    <div className={style.rating}>
      <button className={style.up} />
      <p className={style.ups}>{ups}</p>
      <button className={style.down} />
    </div>
  );
};

Rating.propTypes = {
  ups: PropTypes.number,
};
