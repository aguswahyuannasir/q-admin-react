// import './style.scss';
import React from 'react';
import DropDown from '../../common/DropDown';// 'components/common/DropDown'
import {ContentUtils} from 'braft-utils';

const toggleLetterSpacing = (e, p) => {
  let letterSpacing = e.currentTarget.dataset.size;
  const hookReturns = p.hooks('toggle-letter-spacing', letterSpacing)(letterSpacing);

  if(hookReturns === false){
    return false;
  }

  if(!isNaN(hookReturns)){
    letterSpacing = hookReturns;
  }

  p.editor.setValue(ContentUtils.toggleSelectionLetterSpacing(p.editorState, letterSpacing));
  p.editor.requestFocus();
}

export default (p) => {
  let caption = null
  let currentLetterSpacing = null
  let dropDownInstance = null

  p.letterSpacings.find((v) => {
    if(ContentUtils.selectionHasInlineStyle(p.editorState, 'LETTERSPACING-' + v)){
      caption = v
      currentLetterSpacing = v
      return true
    }
    return false
  })

  return (
    <DropDown
      autoHide={true}
      caption={caption || p.defaultCaption}
      getContainerNode={p.getContainerNode}
      title={p.language.controls.letterSpacing}
      ref={(instance) => dropDownInstance = instance}
      className={'control-item dropdown bf-letter-spacing-dropdown'}
    >
      <ul className='bf-letter-spacings'>
        {p.letterSpacings.map((v, i) => {
          return (
            <li
              key={i}
              className={v === currentLetterSpacing ? 'active' : null}
              data-size={v}
              onClick={(e) => {
                toggleLetterSpacing(e, p)
                dropDownInstance.hide()
              }}
            >{v}</li>
          )
        })}
      </ul>
    </DropDown>
  )
}
