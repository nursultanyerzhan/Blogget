import style from './Tabs.module.css';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import {assignId} from '../../../utils/generateRandomId';
import {debounceRaf} from '../../../utils/debounce';
import {Text} from '../../../UI/Text';

import {ReactComponent as ArrowIcon} from './img/arrow.svg';
import {ReactComponent as HomeIcon} from './img/home.svg';
import {ReactComponent as Top} from './img/top.svg';
import {ReactComponent as Best} from './img/best.svg';
import {ReactComponent as Hot} from './img/hot.svg';
import {useNavigate} from 'react-router-dom';

const LIST = [
  {value: 'Главная', Icon: HomeIcon, link: '/'},
  {value: 'Топ', Icon: Top, link: 'top'},
  {value: 'Лучшие', Icon: Best, link: 'best'},
  {value: 'Горячие', Icon: Hot, link: 'hot'},
].map(assignId);

export const Tabs = ({list, setList, addItem}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(true);
  const [menu, setMenu] = useState('Меню');
  const navigate = useNavigate();

  const handleResize = () => {
    if (document.documentElement.clientWidth < 768) {
      setIsDropdown(true);
    } else {
      setIsDropdown(false);
    }
  };

  useEffect(() => {
    const debounceResize = debounceRaf(handleResize);
    debounceResize();
    window.addEventListener('resize', debounceResize);
    return () => {
      window.removeEventListener('resize', debounceResize);
    };
  }, []);

  return (
    <div className={style.container}>
      {isDropdown && <div className={style.wrapperBtn}>
        <button className={style.btn} onClick={() =>
          setIsDropdownOpen(!isDropdownOpen)}>
          {menu}
          <ArrowIcon width={15} height={15}/>
        </button>
      </div>}

      {(isDropdownOpen || !isDropdown) && <ul className={style.list}
        onClick={() => setIsDropdownOpen(false)}>
        {
          LIST.map(({value, link, id, Icon}) => (
            <Text As='li' className={style.item} key={id}>
              <button className={style.btn} onClick={() => {
                setMenu(value);
                if (link === '/') {
                  navigate(`/`);
                } else {
                  navigate(`/category/${link}`);
                }
              }}>
                {value}
                {Icon && <Icon width={30} height={30} />}
              </button>
            </Text>
          ))
        }
      </ul>}
    </div>
  );
};

Tabs.propTypes = {
  list: PropTypes.array,
  setList: PropTypes.func,
  addItem: PropTypes.func,
};
