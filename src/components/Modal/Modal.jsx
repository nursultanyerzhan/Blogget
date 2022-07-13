import style from './Modal.module.css';
import {ReactComponent as CloseIcon} from './img/close.svg';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import ReactDOM from 'react-dom';
import {useRef, useEffect, useState} from 'react';
import {useCommentsData} from '../../hooks/useCommentsData';
import {Text} from '../../UI/Text';
import FormComment from './FormComment';
import Comments from './Comments';
import {useSelector} from 'react-redux';

export const Modal = ({id, closeModal}) => {
  useCommentsData(id);
  const overlayRef = useRef(null);
  const commentsData = useSelector(state =>
    state.commentsDataReducer.data
  );
  const status = useSelector(state => state.commentsDataReducer.status);
  const _post = {selftext: ''};
  const [post, setPost] = useState(_post);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (commentsData.length < 1) return;

    setPost(commentsData.post);
    setComments(commentsData.comments);
  }, [commentsData]);

  const handleClick = e => {
    const target = e.target;
    if (target === overlayRef.current) {
      closeModal();
    }
  };

  const handleEscape = e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);
  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        {status === 'loading' && 'Загрузки...'}
        {status === 'error' && 'ошибка'}
        {status === 'loaded' && (
          <>
            <h2 className={style.title}>
              {post && post.title}
            </h2>

            <div className={style.content}>
              <Markdown options={{
                overrides: {
                  a: {
                    props: {
                      target: '_blank',
                    },
                  },
                },
              }}>
                {post && post.selftext}
              </Markdown>
            </div>

            <Text As='p' className={style.author}>{post && post.author}</Text>

            <FormComment />
            {comments.length ? <Comments comments={comments} /> :
              <p>Загрузка...</p>
            }
          </>
        )}

        <button className={style.close} onClick={closeModal}>
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  markdown: PropTypes.string,
  closeModal: PropTypes.func,
};
