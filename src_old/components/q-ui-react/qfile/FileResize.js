import React,{Component} from 'react';


// let ScalingUpload = React.createClass({
class ScalingUpload extends Component{
    // getInitialState(){
    //     return {};
    // }
    constructor(props){
        super(props);
        this.state = {
            dataUrl:null
        };

        this.onChange = this.onChange.bind(this);
        this.resizeImage = this.resizeImage.bind(this);
        this.resize = this.resize.bind(this);
    }

    onChange(e){
        var files = e.target.files;
        var self = this;
        var maxWidth = this.props.maxWidth;
        var maxHeight = this.props.maxHeight;
        this.resize(files[0], maxWidth, maxHeight,function(resizedDataUrl){
            self.setState({dataUrl:resizedDataUrl});
        });
    }

    resize(file,maxWidth,maxHeight,fn){
        const me = this;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(event){
            let dataUrl = event.target.result;

            let image = new Image();
            image.src = dataUrl;
            image.onload = function(){
                let resizedDataUrl = me.resizeImage(image,maxWidth,maxHeight,0.7);
                fn(resizedDataUrl);
            };
        };
    }

    resizeImage(image,maxWidth,maxHeight,quality){
        let canvas = document.createElement('canvas');
        let width = image.width;
        let height = image.height;

        if(width > height){
            if(width > maxWidth){
                height = Math.round(height * maxWidth / width);
                width = maxWidth;
            }
        }else{
            if(height > maxHeight){// max_height
                width = Math.round(width * maxHeight / height);
                height = maxHeight;
            }
        }

        canvas.width = width;
        canvas.height = height;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(image,0,0,width,height);
        return canvas.toDataURL("image/jpeg",quality);
    }

    render(){
        const {dataUrl} = this.state;
        // let image;
        // if(dataUrl){
        //     image = <img alt="pict" src={dataUrl} />
        // }

        return (
            <div>
                <input ref="upload" type="file" accept="image/*" onChange={this.onChange}/>
                {dataUrl && <img alt="pict" src={dataUrl} />}
            </div>
        );
    }
}

// var Test = React.createClass({
export default class FileResize extends Component{
    onChange(file){
        console.log('done',file);
    }

    render(){
        return <div>
            <ScalingUpload maxHeight={150} maxWidth={150} onChange={this.onChange} />
        </div>
    }
}