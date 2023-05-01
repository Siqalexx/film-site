const OK = 200;
const CREATE_OBJECT = 201;
const VALIDERR = 400;
const DATA_ERROR = 401;
const NO_ACCESS = 403;
const ERRORSRC = 404;
const DUBLICATE_DATA = 409;
const OTHERERR = 500;
const REQUIRED_PARAMETER = 422;
const ADRESS_ERROR = 'Неправильный адрес';
const START_SERVER = 'Сервер запущен';
const NOTFOUND_CARD = 'Карточка не найдена';
const NOTYOUR_CARD = 'Карточка не принадлежит вам';
const NOTFOUND_USER = 'Пользователь не найден';
const UNCORRECT_DATA = 'email or password is not correct';
const DOWNLOAD_COOKIE = 'cookie is download';
const LOGOUT = 'User logged out successfully';
const NEED_AUTORIZ = 'Необходима авторизация';
const SERVER_ERROR = 'Ошибка сервера';
const REGEPX_URL = /https?:\/\/[www.]?[a-z1-9\-*.*_*~*:*/*?*#*[*\]*@*!*$*&*'*(*)***+*,*;*=*]+\.[a-z]+[a-z1-9\-*.*_*~*:*/*?*#*[*\]*@*!*$*&*'*(*)***+*,*;*=*]*/im;
const REGEPX_EMAIL = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
module.exports = {
  OK,
  VALIDERR,
  OTHERERR,
  ERRORSRC,
  REQUIRED_PARAMETER,
  DATA_ERROR,
  DUBLICATE_DATA,
  NO_ACCESS,
  CREATE_OBJECT,
  REGEPX_URL,
  ADRESS_ERROR,
  START_SERVER,
  NOTFOUND_CARD,
  NOTYOUR_CARD,
  NOTFOUND_USER,
  UNCORRECT_DATA,
  DOWNLOAD_COOKIE,
  LOGOUT,
  NEED_AUTORIZ,
  SERVER_ERROR,
  REGEPX_EMAIL,
};
