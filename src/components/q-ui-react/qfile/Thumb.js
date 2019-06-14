import React,{Component,Fragment} from "react";// Fragment
import {ButtonGroup,Button,Progress,Badge} from 'reactstrap';
// import Qswal from '../Qswal';
import {Qswal} from '../';// Flex

export default class Thumb extends Component{
  constructor(props){
    super(props);
    this.state = {
      err:false
    };
    this.errNotImg = this.errNotImg.bind(this);
  }

  errNotImg(i){
    const {removeFile} = this.props;

    this.setState(
      {err:true},
      () => {
        removeFile(i);
        this.setState({err:false});
        // console.log('File not image');
        Qswal.fire({
          type:"error",
          title:"File is Not image (FROM Thumb)",
          text:"Please insert file jpg, jpeg or png",
          // confirmButtonText:"Try again"
        });
      }
    );
  }

  renderMeta(alt, progressItem){
    return (
      <div className="upload-meta small">
        <div className="text-truncate mb-2" title={alt}>{alt}</div>
        {progressItem &&
          <div className="d-flex justify-content-between align-items-stretch">
            {/* DEV FOR file upload progress */}
            <div className="w-100 pr-2">
              <Badge color="primary">25%</Badge>
              <Progress value="25" className="h4px mt-1" />
            </div>

            <ButtonGroup size="sm" className="ml-auto">
              <Button outline className="i q-delete-forever-outline scale12" title="Cancel & delete" />
              <Button outline className="i q-play scale12" title="Pause" />
            </ButtonGroup>
          </div>
        }
      </div>
    )
  }

  renderThumb(){
    const {type, src, alt, modalPrev, removeFile, progressItem, ...attr} = this.props;

    return (
      <div className="file-item">
        {type !== "video/mp4" ?
          <Fragment>
            <div className="tmb-prev select-no">
              <ButtonGroup size="sm">
                <Button onClick={modalPrev} color="light" className="mi q-image-filter scale12" title="Edit" />
                <Button onClick={removeFile} color="light" className="i q-close scale12" title="Remove" />
              </ButtonGroup>

              <img
                onClick={modalPrev}
                className="img-thumbnail"
                alt={alt}
                src={src}
                draggable={false}
                onError={this.errNotImg}
                onContextMenu={attr.noop}
              />
            </div>

            {this.renderMeta(alt, progressItem)}
          </Fragment>
          :
          <Fragment>
            <div className="tmb-prev select-no">
              <Button onClick={removeFile} size="sm" color="light" className="i q-close scale12" title="Remove" />
              <video
                onContextMenu={this.noop}
                controlsList="nodownload noremoteplayback"
                controls
                playsInline
                disablepictureinpicture="true"
                tabIndex="-1"
                className="rounded"
                id={attr.id}
                type={type}
                src={src}
              />
            </div>

            {this.renderMeta(alt, progressItem)}
          </Fragment>
        }
      </div>
    );
  }

  render(){
    const {err} = this.state;
    if(err) return null;

    return this.renderThumb();
  }
}
