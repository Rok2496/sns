import Cookies from 'js-cookie';

export const setAuthToken = (token: string) => {
  Cookies.set('admin_token', token, { expires: 1 }); // 1 day
};

export const getAuthToken = () => {
  return Cookies.get('admin_token');
};

export const removeAuthToken = () => {
  Cookies.remove('admin_token');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};