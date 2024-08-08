// eslint-disable-next-line react/prop-types, no-unused-vars
const Vector = ({ progress = 0, ...props }) => {
  return (
    // eslint-disable-next-line react/prop-types
    <svg viewBox='0 0 54 369' fill={props.fill || 'none'} {...props}>
      <path
        className='svg-path'
        stroke='#000'
        strokeWidth='2px'
        d='M27 368.5s-1-36 0-52.5 24-13.5 25 0-8 24.5-25 25-25.5-13.5-25-25 7.56-22.42 25-25V0'
      />
    </svg>
  );
};

export default Vector;
