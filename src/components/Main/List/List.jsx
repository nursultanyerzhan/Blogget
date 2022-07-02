import style from './List.module.css';
import Post from './Post';

export const List = () => {
  const postsData = [
    {
      thumbnail: '',
      title: 'Title',
      author: 'NickName',
      ups: 24,
      date: '2022-02-24T00:45:00.000Z',
    },
    {
      thumbnail: '',
      title: 'Title2',
      author: 'NickName3',
      ups: 22,
      date: '2022-02-22T00:45:00.000Z',
    },
  ];
  return (
    <ul className={style.list}>
      {postsData.map((postData) => (
        <Post key={postData.id} postData={postData} />
      ))}
    </ul>
  );
};
