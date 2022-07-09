import style from './FormComment.module.css';
import {Text} from '../../../UI/Text';
import React, {useContext} from 'react';
import {authContext} from '../../../context/authContext';

export const FormComment = () => {
  const {auth} = useContext(authContext);
  const myComment = React.createRef();

  const handleSend = e => {
    e.preventDefault();
    const myCommentText = myComment.current;
    console.log(myCommentText.value);
  };

  return (
    <form className={style.form}>
      <Text As='h3' size={14} tsize={18}>{auth.name}</Text>
      <textarea className={style.textarea} ref={myComment}></textarea>
      <button className={style.btn} onClick={handleSend}>
        Отправить
      </button>
    </form>
  );
};
