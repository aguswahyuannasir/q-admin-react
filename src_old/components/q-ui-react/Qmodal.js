import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap';// Button
import {Btn} from './';

export default function Qmodal(props){
  let {size, drop, keyboard, center, open, toggle, toggleHead, headCustom,
       closeTitle, closeIco, modalClass, dropClass, fade, zIndex,
       headClass, head, bodyClass, body, footClass, foot,
       focus, enter, exit, opened, closed} = props;// ,modalTrans, dropTrans, ...attr

  const closeNode = closeIco ? closeIco : `×`;

  return (
    <Modal
      size={size}// "sm" | "lg" | "xl" | Default = none 500px | Q-CUSTOM = fw = max-width:100% | page = full page
      backdrop={drop}// bool | "static"
      keyboard={keyboard}// bool
      centered={center}// bool
      isOpen={open}
      autoFocus={focus}// bool
      toggle={toggle}// callback for toggling isOpen in the controlling component
      modalClassName={modalClass}// "modalFilePrev modalSetImg"
      backdropClassName={dropClass}
      fade={fade}// boolean to control whether the fade transition occurs (default: true)
      zIndex={zIndex}// zIndex defaults to 1000
      onEnter={enter}// called on componentDidMount
      onExit={exit}// called on componentWillUnmount
      onOpened={opened}// called when done transitioning in
      onClosed={closed}// called when done transitioning out

      // backdropTransition={dropTrans ? {timeout:dropTrans} : null}
      // modalTransition={modalTrans ? {timeout:modalTrans} : null}
    >
      {headCustom ?
        <div className={classNames('modal-header',headClass)}>
          <h5 className="modal-title">{headCustom.title}</h5>
          {head}
          <Btn close className={headCustom.closeClass} onClick={toggle} tip={closeTitle}>{closeNode}</Btn>
        </div>
        :
        <ModalHeader
          className={headClass}
          toggle={toggleHead ? toggle : null}
          close={toggleHead && toggle ? <Btn close onClick={toggle} tip={closeTitle}>{closeNode}</Btn> : null}
        >
          {head}
        </ModalHeader>
      }

      <ModalBody className={bodyClass}>{/* "d-flex" */}
        {body}
      </ModalBody>

      {foot &&
        <ModalFooter className={footClass}>
          {foot}
        </ModalFooter>
      }
    </Modal>
  );
}

Qmodal.propTypes = {
  size: PropTypes.string,
  drop: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['static'])
  ]),
  keyboard: PropTypes.bool,
  center: PropTypes.bool,
  open: PropTypes.bool,
  toggle: PropTypes.func,
  toggleHead: PropTypes.bool,
  modalClass: PropTypes.string,
  dropClass: PropTypes.string,
  closeTitle: PropTypes.string,
  closeIco: PropTypes.node,
  fade: PropTypes.bool,// boolean to control whether the fade transition occurs (default: true)
  zIndex: PropTypes.oneOfType([// zIndex defaults to 1000.
    PropTypes.number,
    PropTypes.string
  ]),

  headClass: PropTypes.string,
  headCustom: PropTypes.shape({
    title: PropTypes.string,
    closeClass: PropTypes.string
  }),
  head: PropTypes.node,
  bodyClass: PropTypes.string,
  body: PropTypes.node,
  footClass: PropTypes.string,
  foot: PropTypes.node,

  focus: PropTypes.bool,
  enter: PropTypes.func,// called on componentDidMount
  exit: PropTypes.func,// called on componentWillUnmount
  opened: PropTypes.func,// called when done transitioning in
  closed: PropTypes.func,// called when done transitioning out

  // dropTrans: PropTypes.number,// PropTypes.object,
  // modalTrans: PropTypes.number, // PropTypes.shape({timeout:PropTypes.number}),
};

Qmodal.defaultProps = {
  toggleHead: true,
  closeTitle: "Close"
};
