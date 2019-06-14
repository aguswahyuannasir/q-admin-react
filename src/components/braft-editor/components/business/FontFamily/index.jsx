//import './style.scss';
import React from 'react';
import DropDown from '../../common/DropDown';// 'components/common/DropDown'
import {ContentUtils} from 'braft-utils';

const toggleFontFamily = (e, p) => {
  let fontFamilyName = e.currentTarget.dataset.name;
  const hookReturns = p.hooks('toggle-font-family', fontFamilyName)(fontFamilyName, p.fontFamilies);

  if(hookReturns === false){
    return false;
  }

  if(typeof hookReturns === 'string'){
    fontFamilyName = hookReturns;
  }

  p.editor.setValue(ContentUtils.toggleSelectionFontFamily(p.editorState, fontFamilyName));
  p.editor.requestFocus();
}

export default (p) => {
  let caption = null
  let currentIndex = null
  let dropDownInstance = null

  p.fontFamilies.find((v, i) => {
    if(ContentUtils.selectionHasInlineStyle(p.editorState, 'FONTFAMILY-' + v.name)){
      caption = v.name
      currentIndex = i
      return true
    }
    return false
  })

  return (
    <DropDown
      caption={caption || p.defaultCaption}
      getContainerNode={p.getContainerNode}
      title={p.language.controls.fontFamily}
      autoHide={true}
      arrowActive={currentIndex === 0}
      ref={(instance) => dropDownInstance = instance}
      className={'control-item dropdown font-family-dropdown'}
    >
      <ul className='menu'>
        {p.fontFamilies.map((v, i) => {
          return (
            <li
              key={i}
              className={'menu-item ' + (i === currentIndex ? 'active' : '')}
              data-name={v.name}
              onClick={(e) => {
                toggleFontFamily(e, p)
                dropDownInstance.hide()
              }}
            >
              <span style={{fontFamily: v.family}}>{v.name}</span>
            </li>
          )
        })}
      </ul>
    </DropDown>
  )
}
