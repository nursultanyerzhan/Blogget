import style from './Rating.module.css';
import PropTypes from 'prop-types';
import {Text} from '../../../../../UI/Text';

export const Rating = ({ups}) => {
  console.log(style);
  return (
    <Text As='div' className={style.rating}>
      <button className={style.up} />
      <Text As='p' medium size={12} color='#8f8f8f'
        className={style.ups}>{ups}</Text>
      <button className={style.down} />
    </Text>
  );
};

Rating.propTypes = {
  ups: PropTypes.number,
};
