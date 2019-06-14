import {getDefaultKeyBinding, KeyBindingUtil} from 'draft-js';

// TODO
// 允许自定义的快捷键设置
export default (customKeyBindingFn) => (e) => {
  if(e.keyCode === 83 && (KeyBindingUtil.hasCommandModifier(e) || KeyBindingUtil.isCtrlKeyCommand(e))){
    return 'braft-save'
  }
  if(customKeyBindingFn){
    return customKeyBindingFn(e) || getDefaultKeyBinding(e)
  }
  return getDefaultKeyBinding(e)
}
