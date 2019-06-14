//import './style.scss';
import React from 'react';
import DropDown from '../../common/DropDown';// 'components/common/DropDown'
import {ContentUtils} from 'braft-utils';

const insertEmoji = (e, p) => {
  let emoji = e.currentTarget.dataset.emoji
  const hookReturns = p.hooks('insert-emoji', emoji)(emoji)

  if(hookReturns === false){
    return false
  }

  if(typeof hookReturns === 'string'){
    emoji = hookReturns
  }

  p.editor.setValue(ContentUtils.insertText(p.editorState, emoji))
  p.editor.requestFocus()
}

export default (p) => { // props
  return (
    <DropDown
      caption={p.defaultCaption}
      autoHide={true}
      showArrow={false}
      getContainerNode={p.getContainerNode}
      title={p.language.controls.emoji}
      className={'control-item dropdown bf-emoji-dropdown'}
    >
      <div className='bf-emojis-wrap'>
        <ul className='bf-emojis'>
          {p.emojis.map((v, i) => {
            return (
              <li
                key={i}
                data-emoji={v}
                onClick={(e) => insertEmoji(e, p)}
              >{v}</li>
            )
          })}
        </ul>
      </div>
    </DropDown>
  )
}
