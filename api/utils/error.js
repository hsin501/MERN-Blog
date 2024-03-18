/**
 * 建立錯誤處理函式
 * @param {number} statusCode - 錯誤狀態碼
 * @param {string} message - 錯誤訊息
 * @returns {Error} - 回傳一個包含狀態碼和訊息的 Error 物件
 */

export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
