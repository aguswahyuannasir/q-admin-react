import React from 'react';
// import PropTypes from 'prop-types';

export default function Csrf(){ // props

  // defaultValue
  return (
    <input type="hidden" name="_csrf" value={window._csrf}/>
  );
}