import React,{Component,Fragment} from "react";
import {ButtonGroup,Button} from 'reactstrap';
import Qswal from '../Qswal';

export default class Thumb extends Component{
  constructor(props){
    super(props);
    this.state = {
      err:false
    };
    this.errNotImg = this.errNotImg.bind(this);
  }

  errNotImg(){
    const {removeFile} = this.props;

    this.setState(
      {err:true},
      () => {
        removeFile();
        this.setState({err:false});
        Qswal.fire({
          type:"error",
          title:"File is Not image (FROM Thumb)",
          text:"Please insert file jpg, jpeg or png",
          // confirmButtonText:"Try again"
        });
      }
    );
  }

  render(){
    const {err} = this.state;
    const {src,alt,modalPrev,removeFile, ...attr} = this.props;

    return (
      <Fragment>
        {err ?
          <div>File not image</div>
          :
          <div className="tmb-prev select-no">{/*  data-prev={attr.id} */}
            <ButtonGroup size="sm">
              <Button onClick={modalPrev} color="light" className="mi mi-image-filter scale12" title="Edit" />
              <Button onClick={removeFile} color="danger" className="mi mi-close scale12" title="Remove" />
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
        }
      </Fragment>
    );
  }
}