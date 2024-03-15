import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen'>
        {children}
      </div>
    </div>
  );
}
//對ThemeProvider組件的children屬性進行驗證
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
