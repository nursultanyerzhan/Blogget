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

export const Modal = ({id, closeModal}) => {
  const overlayRef = useRef(null);
  const [commentsData] = useCommentsData(id);
  const _post = {selftext: ''};
  const [post, setPost] = useState(_post);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (commentsData.length < 1) return;

    setPost(commentsData[0]);
    setComments(commentsData[1]);
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
        {comments.length ? <Comments comments={comments}/> :
          <p>Загрузка...</p>
        }

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
