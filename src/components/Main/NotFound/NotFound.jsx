import style from './NotFound.module.css';

export const NotFound = () => {
  console.log(style);
  return (
    <div>
      <center>
        <h1 className={style.error}>404 Error, NotFound</h1>
      </center>
    </div>
  );
};
