// import './style.scss';
import React from 'react';
import DropDown from '../../common/DropDown';// 'components/common/DropDown'
import {ContentUtils} from 'braft-utils';

const toggleFontSize = (e, p) => {
  let fontSize = e.currentTarget.dataset.size;
  const hookReturns = p.hooks('toggle-font-size', fontSize)(fontSize);

  if(hookReturns === false){
    return false;
  }

  if(!isNaN(fontSize)){
    fontSize = hookReturns;
  }

  p.editor.setValue(ContentUtils.toggleSelectionFontSize(p.editorState, fontSize));
  p.editor.requestFocus();
}

export default (p) => {
  let caption = null
  let currentFontSize = null
  let dropDownInstance = null

  p.fontSizes.find((v) => {
    if(ContentUtils.selectionHasInlineStyle(p.editorState, 'FONTSIZE-' + v)){
      caption = v
      currentFontSize = v
      return true
    }
    return false
  })

  return (
    <DropDown
      autoHide={true}
      caption={caption || p.defaultCaption}
      getContainerNode={p.getContainerNode}
      title={p.language.controls.fontSize}
      ref={(instance) => dropDownInstance = instance}
      className={'control-item dropdown bf-font-size-dropdown'}
    >
      <ul className='bf-font-sizes'>
        {p.fontSizes.map((v, i) => {
          return (
            <li
              key={i}
              className={v === currentFontSize ? 'active' : null}
              data-size={v}
              onClick={(e) => {
                toggleFontSize(e, p)
                dropDownInstance.hide()
              }}
            >{v}</li>
          )
        })}
      </ul>
    </DropDown>
  )
}
