import React from 'react';

export default (props) => {
  const {children, entityKey, contentState} = props
  const {href, target} = contentState.getEntity(entityKey).getData()

  return (
    <span className='bf-link-wrap'>
      <a onClick={(e) => viewLink(e, href)} className='bf-link' href={href} target={target}>{children}</a>
    </span>
  )
}

const viewLink = (e, link) => {
  // Ketika Anda menekan Ctrl / command, klik untuk membuka url di teks tautan.
  if(e.getModifierState('Control') || e.getModifierState('Meta')){
    const tempLink = document.createElement('a')
    tempLink.href = link
    tempLink.target = e.currentTarget.target
    tempLink.click()
  }
}