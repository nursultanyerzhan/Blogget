const formDate = date => {
  try {
    const d = date * 1000;
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Intl.DateTimeFormat('ru', options)
      .format(new Date(d));
  } catch (e) {
    formDate(1000000000);
  }
};

export default formDate;
