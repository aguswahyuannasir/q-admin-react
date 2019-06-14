// import './style.scss';
import React from 'react';

export default (props) => {
  const {active, onClick, className, ...attr} = props;// 
  return (
    <div
      onClick={() => onClick()}
      className={'bf-switch' + (active ? ' active' : '') + (className ? ' '+className : '')}
			{...attr} // Q-CUSTOM
    />
  )
}

/*
    <div
      onClick={() => onClick()}
      className={'bf-switch ' + className + (active ? ' active' : '')}
			{...attr} // Q-CUSTOM
    />
*/