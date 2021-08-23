import React from 'react';
import './Loader.scss';
const Loader = (props) => {
  return (
    <div className='Loader'>
      <div className='progress-container'>
        <div
          className='progress resize'
          style={{ backgroundColor: props.color || '#f345f2' }}
        ></div>
        <div
          className='progress resize'
          style={{ backgroundColor: props.color || '#f345f2' }}
        ></div>
      </div>
    </div>
  );
};
export default Loader;
