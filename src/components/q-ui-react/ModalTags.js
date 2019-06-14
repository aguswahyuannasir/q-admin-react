import React,{Component} from 'react';
// import classNames from 'classnames';
import {Modal,ModalHeader,ModalBody,ModalFooter,UncontrolledTooltip} from 'reactstrap';

export default class ModalTags extends Component{
  constructor(props){
    super(props);

    bindMethods.call(this,[
      'tagsFile',// DEV FOR tags file
    ]);
  }



  render(){
    const {tagModal, imgTag} = this.state;

    return (
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        centered
        isOpen={tagModal}
        toggle={this.tagsFile}
        modalClassName="modalFilePrev modalSetImg"
      >
        <ModalHeader toggle={this.tagsFile}>Tags</ModalHeader>
        <ModalBody className="d-flex">
          <div className="img-edit w-75" style={{height:'75vh'}}>
            {imgTag &&
              <Fragment>
                <div className="tagWrap" style={{width:'889.77px',height:'500'}}>
                  <svg className="svgmap" viewBox="0 0 889 500" width="889.77" height="500" preserveAspectRatio="xMinYMin meet">
                    <a href="/" className="tipTag" id="tag1">
                      <circle className="pulse" cx="94.015625" cy="117.86378479003906" r="10" />
                      <circle cx="94.015625" cy="117.86378479003906" r="8" />
                    </a>

                    <a href="/" className="tipTag" id="tag2">
                      <circle className="pulse" cx="452.53125" cy="389.12332916259766" r="10" />
                      <circle cx="452.53125" cy="389.12332916259766" r="8" />
                    </a>

                    <a href="/" className="tipTag" id="tagRect1">
                      <rect x="710" y="46.123329162597656" width="45" height="49" />
                    </a>
                  </svg>
                </div>

                <UncontrolledTooltip autohide={false} placement="auto" target="tag1">
                  Hello world! - tag1
                </UncontrolledTooltip>
                <UncontrolledTooltip autohide={false} placement="auto" target="tag2">
                  tag2
                </UncontrolledTooltip>
                <UncontrolledTooltip autohide={false} placement="auto" target="tagRect1">
                  tagRect1
                </UncontrolledTooltip>

                <img className="w-auto" alt={imgTag.name} src={imgTag.thumb} draggable="false" />
              </Fragment>
            }
          </div>

          <div className="w-25 bg-light">
            panel edit
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.tagsFile}>Close</Button>
          <Button color="primary" onClick={this.tagsFile}>Save</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
