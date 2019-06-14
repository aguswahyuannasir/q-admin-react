// import './style.scss';
import React from 'react';
import {getHeadings} from '../../../configs/maps';// 'configs/maps'
import DropDown from '../../common/DropDown';// 'components/common/DropDown'

export default (p) => {
  let dropDownInstance = null
  const headings = getHeadings(p.language).filter(item => p.headings.indexOf(item.key) !== -1)
  const currentHeadingIndex = headings.findIndex((item) => item.command === p.current)
  const caption = headings[currentHeadingIndex] ? headings[currentHeadingIndex].title : p.language.controls.normal

  return (
    <DropDown
      caption={caption}
      autoHide={true}
      getContainerNode={p.getContainerNode}
      title={p.language.controls.headings}
      arrowActive={currentHeadingIndex === 0}
      ref={(instance) => dropDownInstance = instance}
      className={'control-item dropdown headings-dropdown'}
    >
      <ul className='menu'>
        {
          headings.map((v, i) => {
            let isActive = p.current === v.command
            return (
              <li
                key={i}
                className={'menu-item' + (isActive ? ' active' : '')}
                onClick={() => {
                  p.onChange(v.command, v.type)
                  dropDownInstance.hide()
                }}
              >
                {v.text}
              </li>
            )
          })
        }
      </ul>
    </DropDown>
  )
}
