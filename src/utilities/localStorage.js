const LocalStorage = (key = "af-user") => {
  let item = localStorage.getItem(key);
  if (item) item = JSON.parse(item);

  const set = (v) => {
    localStorage.setItem(key, JSON.stringify(v));
    item = v;
  };

  const get = () => {
    return item ? item : null;
  };

  const remove = () => {
    localStorage.removeItem(key);
    item = null;
  };

  return {
    set,
    get,
    remove,
  };
};

export default LocalStorage;
