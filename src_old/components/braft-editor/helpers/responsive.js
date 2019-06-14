import {BaseUtils} from 'braft-utils';

let resizeEventHandlers = [];
let responsiveHelperInited = false;
let debouce = false;

export default{
  resolve(eventHandler){
    let id = BaseUtils.UniqueIndex();
    resizeEventHandlers.push({id, eventHandler});
    return id;
  },
  unresolve(id){
    resizeEventHandlers = resizeEventHandlers.filter(item => item.id !== id);
  }
}

if(!responsiveHelperInited && typeof window === 'object'){
  window.addEventListener('resize',(e) => {
    clearTimeout(debouce);
    debouce = setTimeout(() => {
      resizeEventHandlers.map((item) => {
        return typeof item.eventHandler === 'function' && item.eventHandler(e);
      })
      debouce = false;
    }, 100);
  })
  responsiveHelperInited = true;
}