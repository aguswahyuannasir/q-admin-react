import React from 'react';
import {string} from 'prop-types';// , object, bool | PropTypes
import Cls from 'classnames';
// import {mapToCssModules, tagPropType} from './utils';

export default function CheckBox({as: As, display, noSelect, className, labelClass, id, label, onChange, checked, val}){ // , dropdown, cssModule, ...attr
	
  return (
    <As
      className={
        Cls("q-checkbox",{
          [`d-${display}`] : display,
					"select-no" : noSelect
        },className)
      }
    >
      <label
        className={labelClass ? labelClass : null} // dd | `${dropdown ? `dropdown-item justify-content-end` : undefined}`
      >
        <input onChange={onChange} type="checkbox" className="checkbox" id={id} checked={checked} value={val} /> {label}
        <span />
      </label>
    </As>
  );
}

CheckBox.propTypes = {
  as: string, // tagPropType
  className: string,
  display: string,
  id: string
};

CheckBox.defaultProps = {
  as: 'div',
  display: 'flex'
};

// export default CheckBox;// {CheckBox}
