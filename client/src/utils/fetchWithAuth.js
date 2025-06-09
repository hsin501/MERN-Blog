import { store } from '../redux/store';
import { signoutSuccess } from '../redux/user/userSlice';

export const fetchWithAuth = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (response.status === 401) {
      // Token 無效或過期
      console.warn('接收到未授權，正在登出...');
      store.dispatch(signoutSuccess()); // 派發登出 action
      // 抛出錯誤，以便調用函數知道發生了什麼
      // PrivateRoute/AdminPrivateRoute 或重新定向
      const errorData = await response
        .json()
        .catch(() => ({ message: '未授權訪問或憑證已過期' }));
      throw {
        status: 401,
        message: errorData.message || '未授權訪問或憑證已過期',
      };
    }

    return response;
  } catch (error) {
    if (error.status === 401) {
      throw error;
    }
    //其他錯誤
    console.error('Fetch 請求錯誤:', error);
    throw {
      status: error.status || 500,
      message: error.message || '發生網路錯誤，請稍後再試',
    };
  }
};
