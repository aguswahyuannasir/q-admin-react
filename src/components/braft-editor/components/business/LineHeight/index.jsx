// import './style.scss';
import React from 'react';
import DropDown from '../../common/DropDown';// 'components/common/DropDown'
import {ContentUtils} from 'braft-utils';

const toggleLineHeight = (e, p) => {
  let lineHeight = e.currentTarget.dataset.size;
  const hookReturns = p.hooks('toggle-line-height', lineHeight)(lineHeight);

  if(hookReturns === false){
    return false;
  }

  if(!isNaN(hookReturns)){
    lineHeight = hookReturns;
  }

  p.editor.setValue(ContentUtils.toggleSelectionLineHeight(p.editorState, lineHeight));
  p.editor.requestFocus();
}

export default (props) => {
  let caption = null
  let currentLineHeight = null
  let dropDownInstance = null

  props.lineHeights.find((item) => {
    if(ContentUtils.selectionHasInlineStyle(props.editorState, 'LINEHEIGHT-' + item)){
      caption = item
      currentLineHeight = item
      return true
    }
    return false
  })

  return (
    <DropDown
      autoHide={true}
      caption={caption || props.defaultCaption}
      getContainerNode={props.getContainerNode}
      title={props.language.controls.lineHeight}
      ref={(instance) => dropDownInstance = instance}
      className={'control-item dropdown bf-line-height-dropdown'}
    >
      <ul className='bf-line-heights'>
        {props.lineHeights.map((v, i) => {
          return (
            <li
              key={i}
              className={v === currentLineHeight ? 'active' : null}
              data-size={v}
              onClick={(e) => {
                toggleLineHeight(e, props)
                dropDownInstance.hide()
              }}
            >{v}</li>
          )
        })}
      </ul>
    </DropDown>
  )
}
