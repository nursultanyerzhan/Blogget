import style from './Heading.module.css';
import PropTypes from 'prop-types';

export const Heading = ({text}) => (
  <h2 className={style.heading}>{text}</h2>
);

Heading.propTypes = {
  text: PropTypes.string,
};
