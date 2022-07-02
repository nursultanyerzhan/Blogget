import style from './Tabs.module.css';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import {assignId} from '../../../utils/generateRandomId';
import {debounceRaf} from '../../../utils/debounce';

import {ReactComponent as ArrowIcon} from './img/arrow.svg';
import {ReactComponent as EyeIcon} from './img/eye.svg';
import {ReactComponent as HomeIcon} from './img/home.svg';
import {ReactComponent as PostIcon} from './img/post.svg';
import {ReactComponent as SaveIcon} from './img/save.svg';

const LIST = [
  {value: 'Главная', Icon: HomeIcon},
  {value: 'Просмотренные', Icon: EyeIcon},
  {value: 'Сохраненные', Icon: SaveIcon},
  {value: 'Мои посты', Icon: PostIcon},
].map(assignId);

export const Tabs = ({list, setList, addItem}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(true);
  const [menu, setMenu] = useState('Меню');

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
          LIST.map(({value, id, Icon}) => (
            <li className={style.item} key={id}>
              <button className={style.btn} onClick={() => setMenu(value)}>
                {value}
                {Icon && <Icon width={30} height={30} />}
              </button>
            </li>
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
