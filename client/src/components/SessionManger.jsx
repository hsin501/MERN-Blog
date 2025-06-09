import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { fetchWithAuth } from '../utils/fetchWithAuth';

const CHECK_SESSION_URL = '/api/user/check-session';
const SESSION_CHECK_INTERVAL = 10 * 60 * 1000;
const DEBOUNCE_TIME = 60 * 1000;

export default function SessionMange() {
  const { currentUser } = useSelector((state) => state.user);
  const lastCheckTime = useRef(0);
  const isChecking = useRef(false);
  const IntervalIdRef = useRef(null);

  const SessionCheck = async () => {
    if (!currentUser || isChecking.current) {
      return;
    }
    const now = Date.now();
    if (now - lastCheckTime.current < DEBOUNCE_TIME) return;

    isChecking.current = true;
    lastCheckTime.current = now;
    try {
      await fetchWithAuth(CHECK_SESSION_URL);
    } catch (error) {
      if (error.state === 400) {
        console.error('Session check failed:', error);
      } else {
        console.error('Session check failed:', error);
      }
    } finally {
      isChecking.current = false;
    }
  };

  useEffect(() => {
    const handleActivity = () => {
      if (document.visibilityState === 'visible') {
        SessionCheck();
      }
    };
    const handleFocus = () => {
      SessionCheck();
    };
    if (currentUser) {
      SessionCheck();
      document.addEventListener('visibilitychange', handleActivity);
      window.addEventListener('focus', handleFocus);
      IntervalIdRef.current = setInterval(SessionCheck, SESSION_CHECK_INTERVAL);
      return () => {
        document.removeEventListener('visibilitychange', handleActivity);
        window.removeEventListener('focus', handleFocus);
        if (IntervalIdRef.current) {
          clearInterval(IntervalIdRef.current);
        }
      };
    } else {
      document.removeEventListener('visibilitychange', handleActivity);
      window.removeEventListener('focus', handleFocus);
      clearInterval(IntervalIdRef.current);
    }
  }, [currentUser]);
  return null;
}
