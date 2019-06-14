import React from 'react';
import {ContentUtils} from 'braft-utils';
// import './styles.scss';

// https://www.iconfinder.com/iconsets/emoji-18
export const defaultEmoticons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map(item => `${item}.png`);

const insertEmoticon = (editor, editorState, src) => {
  editor.setValue(ContentUtils.insertText(editorState, ' ', null,{
    type: 'EMOTICON',
    mutability: 'IMMUTABLE',
    data: {src}
  }))
};

let controlRef = null;
const bindControlRef = (ref) => controlRef = ref;

export default (options) => {
  options = {
    emoticons: [],
    closeOnSelect: true,// false
    closeOnBlur: true,// false
    ...options
  };

  const {emoticons, closeOnSelect, closeOnBlur, includeEditors, excludeEditors} = options;

  return {
    type: 'entity',
    includeEditors, excludeEditors,
    name: 'EMOTICON',
    control: (props) => ({
      key: 'EMOTICON',
      replace: 'emoji',
      type: 'dropdown',
      text: <i className="bfi-emoji" />,
      showArrow: false,
      ref: bindControlRef,
      autoHide: closeOnBlur,
      component: (
        <div className="braft-emoticon-picker">
          <div className="braft-emoticons-list">
            {emoticons.map((item, index) => <img onClick={() => {
              insertEmoticon(props.editor, props.editorState, item)
              closeOnSelect && controlRef && controlRef.hide()
            }} key={index} src={item} alt="emot" />)}
          </div>
        </div>
      )
    }),
    mutability: 'IMMUTABLE',
    component: (props) => {
      const entity = props.contentState.getEntity(props.entityKey);
      const {src} = entity.getData();
      return <span className="braft-emoticon-in-editor"><img src={src} alt="emot" />{props.children}</span>;
    },
    importer: (nodeName, node) => {
      if(nodeName.toLowerCase() === 'span' && node.classList && node.classList.contains('braft-emoticon-wrap')){
        const imgNode = node.querySelector('img')
        const src = imgNode.getAttribute('src')
        // Hapus simpul img untuk menghindari menghasilkan blok atom
        node.removeChild(imgNode)
        return {
          mutability: 'IMMUTABLE',
          data: {src},
        }
      }
    },
    exporter: (entityObject, initialText) => {
      const {src} = entityObject.data;
      return <span className="braft-emoticon-wrap"><img src={src} alt="emot" />{initialText}</span>;
    }
  }
}