import style from './Modal.module.css';
import {ReactComponent as CloseIcon} from './img/close.svg';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import ReactDOM from 'react-dom';
import {useRef, useEffect} from 'react';
import {useCommentsData} from '../../hooks/useCommentsData';
import {Text} from '../../UI/Text';
import FormComment from './FormComment';
import Comments from './Comments';
import {useParams, useNavigate} from 'react-router-dom';

export const Modal = () => {
  const {id, page} = useParams();
  const navigate = useNavigate();
  const commentsData = useCommentsData(id);
  const overlayRef = useRef(null);

  const handleClick = e => {
    const target = e.target;
    if (target === overlayRef.current) {
      navigate(`/category/${page}`);
    }
  };

  const handleEscape = e => {
    if (e.key === 'Escape') {
      navigate(`/category/${page}`);
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
        {commentsData.status === 'loading' && 'Загрузки...'}
        {commentsData.status === 'error' && 'ошибка'}
        {commentsData.status === 'loaded' && (
          <>
            <h2 className={style.title}>
              {commentsData.post && commentsData.post.title}
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
                {commentsData.post && commentsData.post.selftext}
              </Markdown>
            </div>

            <Text As='p' className={style.author}>{
              commentsData.post && commentsData.post.author
            }</Text>

            <FormComment />
            {commentsData.comments.length ? <Comments comments={
              commentsData.comments
            } /> :
              <p>Загрузка...</p>
            }
          </>
        )}

        <button className={style.close} onClick={() => {
          navigate(`/category/${page}`);
        }
        }>
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
};
