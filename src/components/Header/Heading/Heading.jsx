import style from './Heading.module.css';

export const Heading = ({text}) => {
  return (
    <h2 className={style.heading}>{text}</h2>
  )
}