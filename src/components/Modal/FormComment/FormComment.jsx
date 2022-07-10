import style from './FormComment.module.css';
import {Text} from '../../../UI/Text';
import React, {useContext} from 'react';
import {authContext} from '../../../context/authContext';
import {useSelector, useDispatch} from 'react-redux';
import {updateComment} from '../../../store';

export const FormComment = () => {
  const value = useSelector(state => state.comment);
  const dispatch = useDispatch();

  const {auth} = useContext(authContext);

  const handleSend = e => {
    e.preventDefault();
  };

  const handleChange = e => {
    dispatch(updateComment(e.target.value));
  };

  return (
    <form className={style.form}>
      <Text As='h3' size={14} tsize={18}>{auth.name}</Text>
      <textarea className={style.textarea}
        value={value}
        onChange={handleChange}>
      </textarea>
      <button className={style.btn} onClick={handleSend}>
        Отправить
      </button>
    </form>
  );
};
