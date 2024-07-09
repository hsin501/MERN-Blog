import { useEffect, useRef } from 'react';

// creating the custom useInterval hook
export default function useInterval(callback, delay) {
  // Creating a ref
  const savedCallback = useRef();

  // 記住最新回調函數
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  //設定定時器
  useEffect(() => {
    function func() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(func, delay);
      //清理定時器
      return () => clearInterval(id);
    }
  }, [delay]);
}
