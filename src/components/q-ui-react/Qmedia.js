import React,{Component} from 'react';
import {bindMethods, addEvent, removeEvent} from '../utils/Qutils';
import Classes from 'classnames';
import {Progress, Dropdown, DropdownToggle, DropdownMenu, 
        CustomInput, TabContent, TabPane} from 'reactstrap';// DropdownItem

import Flex from './Flex';
import Btn from './Btn';
import Ico from './Ico';
// import A from './A';
import Img from './Img';

export default class Qmedia extends Component{
  constructor(props){
    super(props);
    this.state = {
      autoPlay:false,
      mediaDuration: null,
      durationDisplay: "00:00",
      videoSrc:null,
      volume:100,
      paused:false,
      currentTime:0,
      curTimeDisplay:"00:00",
      progress:0,
      loop:false,

      activeTabSet:'1',
      pip:false, // FOR check PIP support
      isFullScreen:false, // FOR Fullscreen 
      ddSettings: false, // FOR dropdown settings menu
      hideTool:false, // DEV FOR idle tool

      topRight:false,// FOR toogle topTight panel
    };

    // this.videoSrc = null;
    this.timerId = null;

    bindMethods.call(this,[
      'toObjUrl',
      'onProgress',
      'onLoadedDataVideo','onErrorMedia', // 'onVolume',
      'playMedia','onTimeUpdate','onChangeVolume','setAutoPlay',
      'onChangeCurrentTime','setVideoLoop',
      'onTabSet'
    ]);
  }

	componentDidMount(){
    console.log('componentDidMount in Qmedia');
    
    if('pictureInPictureEnabled' in document){
      // this.btnPip
      this.setState({pip:true});
    }

    this.toObjUrl(this.props.src);// this.video.src

    addEvent(this.qmedia,"fullscreenchange",this.onFullscreenEvt);// useCapture
    // addEvent(this.qmedia,"fullscreenerror",(e) => this.onFullscreen(e));
	}
  
  componentWillUnmount(){
    console.log('componentWillUnmount in Qmedia');

    removeEvent(this.qmedia,"fullscreenchange",this.onFullscreenEvt);// useCapture
    // removeEvent(this.qmedia,"fullscreenerror",this.onFullscreen);

    if(this.timerId){
      window.clearTimeout(this.timerId);// DEV FOR idle tool
    }
  }

  onFullscreenEvt = () => {
    const doc = document.documentElement;
    if(document.fullscreenElement){
      this.setState({isFullScreen:true});
      doc.classList.add("QmediaFullScreen");
    }else{
      this.setState({isFullScreen:false});
      doc.classList.remove("QmediaFullScreen");
    }
  }

// FOR button Fullscreen
  onFullscreen = (e) => {
    const media = this.qmedia;
    if(!document.fullscreenElement){
      if(e.type === "click"){
        media.requestFullscreen();// document.documentElement.requestFullscreen();
      }
    }else{
      if(document.exitFullscreen){
        if(e.type === "click"){
          document.exitFullscreen();// document.exitFullscreen(); 
        }
      }
    }
  }

// FOR dropdown settings menu
  onMenuSetting = () => {
    this.setState(state => ({
      ddSettings: !state.ddSettings
    }),() => {
      if(!this.state.ddSettings){
        this.setState({activeTabSet:'1'});
      }
    });
  }
  
	toObjUrl(urlVideo){		
		const me = this;
		let xhr = new XMLHttpRequest();
		xhr.responseType = 'blob';

		xhr.onload = function(){
			let reader = new FileReader();
			
			reader.onloadend = function(){
				let byteCharacters = atob(reader.result.slice(reader.result.indexOf(',') + 1));
				let byteNumbers = new Array(byteCharacters.length);

				for(let i = 0; i < byteCharacters.length; i++){
					byteNumbers[i] = byteCharacters.charCodeAt(i);
				}

				let byteArray = new Uint8Array(byteNumbers);
				let blob = new Blob([byteArray], {type: me.props.type});// 'video/mp4'
				let objUrl = window.URL.createObjectURL(blob);
				
				//document.getElementById('_video').src = url;
				// console.log(url);
				me.setState(
          {videoSrc: objUrl},
          () => {
            if(me.state.videoSrc){
              console.log(me.state.videoSrc);
              // me.video.play();
              // window.URL.revokeObjectURL(objUrl);
            }
          }
        );
        
        // me.videoSrc = objUrl;
        // me.video.src = objUrl;
        // me.video.play();
        // window.URL.revokeObjectURL(objUrl);
			}
			reader.readAsDataURL(xhr.response);
		};

		xhr.open('GET',urlVideo);// 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Roaring_Burps.ogg'
		xhr.send();
  }
  
  onErrorMedia(e){
    console.log('onErrorMedia');
    console.log(e.target);
  }

  // onVolume(e){
  //   // console.log('onVolume');
  //   // console.log(e.nativeEvent);// 
    
  //   if(window.localStorage){
  //     let volNow = e.target.volume;
  //     // console.log(volNow);
  //     localStorage.setItem("mediaVolume",volNow);
  //   }
  // }

  onProgress(e){
    // console.log('onProgress');
    let et = e.target;
    let bf = et.buffered;
    let duration = et.duration;
    // let time = et.currentTime;

    if(duration > 0){
      let bufferedEnd = bf.end(bf.length - 1);
      let prog = (bufferedEnd / duration) * 100;
      // console.log(prog);
      this.setState({progress: prog});
    }
  }

  onTimeUpdate(e){
    // console.log(e.nativeEvent);
    let et = e.target;
    let curTime = et.currentTime;

    let minutes = Math.floor(curTime / 60);
    let seconds = Math.floor(curTime - minutes * 60);
    let minuteValue;
    let secondValue;

    if(minutes < 10){
      minuteValue = '0' + minutes;
    }else{
      minuteValue = minutes;
    }
  
    if(seconds < 10){
      secondValue = '0' + seconds;
    }else{
      secondValue = seconds;
    }

    let mediaTime = minuteValue + ':' + secondValue;

    this.setState({
      currentTime: curTime,
      curTimeDisplay: mediaTime
    });

    // OPTION
    if(et.controls){
      et.controls = false;
    }
  }

  onLoadedDataVideo(e){
    let et = e.target;
    let vDuration = et.duration;
    // console.log('onLoadedDataVideo');

    let minutes = Math.floor(vDuration / 60);
    let seconds = Math.floor(vDuration - minutes * 60);
    let minuteValue;
    let secondValue;

    if(minutes < 10){
      minuteValue = '0' + minutes;
    }else{
      minuteValue = minutes;
    }
  
    if(seconds < 10){
      secondValue = '0' + seconds;
    }else{
      secondValue = seconds;
    }

    let mediaTime = minuteValue + ':' + secondValue;

    this.setState({
      mediaDuration: vDuration,
      durationDisplay: mediaTime
    });

    //
    if(window.localStorage){
      let getVol = localStorage.getItem("mediaVolume");
      if(getVol){
        let volumeFloat = parseFloat(getVol);
        
        this.video.volume = volumeFloat;
        // console.log(this.video.volume);
        this.setState({
          volume: volumeFloat,
          autoPlay: localStorage.getItem("autoPlay") === "true" ? true : false
        },() => {
          if(this.state.autoPlay) et.play();
        });
      }
    }
  }

  setAutoPlay(e){
    // console.log(e.target.checked);
    let checked = e.target.checked;
    this.setState({autoPlay: checked});
    localStorage.setItem("autoPlay",checked);
  }

  playMedia(e){
    e.stopPropagation();
    let media = this.video;
    // let qmedia = this.qmedia;
    // let idleTool = this.onShowHideTool(qmedia);

    if(media.paused){
      media.play();
      // qmedia.classList.remove("hideTool");
      
      // clearTimeout(this.onShowHideTool(qmedia));
      // this.onShowHideTool();
    }else{
      media.pause();
      // this.setState({hideTool:false});
      // clearTimeout(this.timerId);
    }
    this.setState({paused: !media.paused});
  }

// DEV FOR idle tool
  // hidingTimer = () => {
  //   this.timerId = setTimeout(() => {
  //     this.setState({hideTool:true});
  //   },2000);
  // }

  handleMouseDown = () => {
    this.onShowHideTool();
  }

  handleMouseMove = () => {
    this.onShowHideTool();
  }

  handleKeyDown = () => {
    this.onShowHideTool();
  }

  onShowHideTool = () => {
    if(this.state.paused){
      clearTimeout(this.timerId);
      this.setState({hideTool: false});
      // this.hidingTimer();

      this.timerId = setTimeout(() => {
        this.setState({hideTool:true});
      },2000);
    }
  }

  toogleTool = (state) => {
    this.setState({hideTool: state});
  }

  onChangeCurrentTime(e){
    let et = parseFloat(e.target.value);
    // console.log(et);
    this.video.currentTime = et;
    this.setState({currentTime: et});
  }

  onChangeVolume(e){
    let volNow = parseFloat(e.target.value);
    // console.log(volNow);
    this.video.volume = volNow;
    this.setState({volume: volNow});
    
    if(window.localStorage){
      // console.log(volNow);
      localStorage.setItem("mediaVolume",volNow);
    }
  }

  setVideoLoop(e){
    this.setState({loop: e.target.checked});
  }

  onTabSet(tab){
    if(this.state.activeTabSet !== tab){
      this.setState({
        activeTabSet: tab
      });
    }
  }

// FOR Pip
  onPip = () => {
    if(this.video !== document.pictureInPictureElement){
      this.video.requestPictureInPicture();// await this.video.requestPictureInPicture();
    }else{
      document.exitPictureInPicture();// await document.exitPictureInPicture();
    }
  }

// FOR toogle 
  onToogle = (state) => {
    this.setState({[state]: !this.state[state]});
  }
  
  renderBottomRight(){
    // A dom="link" href="/" aClass="d-block" tip="Username"
    return (
      <div className="py-1 logoBottomRight">
        <a href="/" className="d-block" title="Username">
          <Img w="20" circle noDrag imgClass="d-block" alt="brand" src="icons/logo_30.png" />{/* android-icon-48x48 */}
        </a>
      </div>
    )
  }

  render(){
    const {videoSrc, mediaDuration, durationDisplay, autoPlay, 
           volume, paused, currentTime, curTimeDisplay, progress, loop,
           activeTabSet, pip, isFullScreen, ddSettings, hideTool, topRight} = this.state;

    const {mediaSize, elClass, poster, src, type, videoClass,
           logoTopLeft, rightCol, logoBottomRight} = this.props;

// video_360.mp4
    return (
      <div 
        ref={c => {this.qmedia = c}}

        // onTouchStart={this.handleMouseDown}
        // onMouseDown={this.handleMouseDown}
        // onMouseMove={this.handleMouseMove}
        // onKeyDown={this.handleKeyDown}
        
        // onFocus={() => this.toogleTool(false)} // 
        // onBlur={() => this.toogleTool(false)} // 

        className={
          Classes("embed-responsive",{
            // 21:9 = 21by9 | 16:9 = 16by9 | 4:3 = 4by3 | 1:1 = 1by1
            [`embed-responsive-${mediaSize} Qmedia`]: mediaSize,
            "mediaPlay" : paused,
            "mediaPause" : !paused,
            "hideTool" : hideTool,
            // "showTool" : !hideTool
          },elClass)
        }

        role="region"
        tabIndex="-1"
      >
        {videoSrc &&
          <video 
            ref={c => {this.video = c}}
            onError={this.onErrorMedia}
            onProgress={this.onProgress}
            onTimeUpdate={this.onTimeUpdate}
            // onVolumeChange={this.onVolume}
            onLoadedData={this.onLoadedDataVideo} // this.toObjUrl 
            className={
              Classes("embed-responsive-item",videoClass)
            } 
            type={type}
            poster={poster}
            src={videoSrc ? videoSrc : src} // {videoSrc} // this.videoUrl ? this.videoUrl : 
            // controls
            controlsList="nodownload nofullscreen"
            autoPlay={autoPlay}
            loop={loop}
            playsInline // OPTION
            tabIndex="-1"
          >
            {/* <track kind="captions" label="English" srcLang="en" src="vtt/introduction-subtitle-en.vtt" default />
            <track kind="captions" label="Indonesia" srcLang="id" src="vtt/introduction-subtitle-id.vtt" /> */}
          </video>
        }

        <Flex dir="column" justify="between" elClass="mediaBox">
          <Flex justify="between" elClass="mediaInfos">
            {logoTopLeft &&
              <div className="topLeft p-2 text-white">
                Logo Top Left
              </div>
            }

            {rightCol &&
              <div 
                className={
                  Classes("card p-2 ml-auto topRight",{
                    "open" : topRight
                  })
                }
              >
                <Btn 
                  onClick={() => this.onToogle("topRight")} 
                  size="sm" 
                  color="light" 
                  className={
                    Classes("i btnTopRight",{
                      "q-chevron-left": !topRight,
                      "q-chevron-right": topRight
                    })
                  }
                  tip={topRight ? "Close" : "Open"}
                />
                
                {rightCol.content}
              </div>
            }
          </Flex>

          <button onClick={this.playMedia} className="bigPlayPause" type="button" />

          <div className="tools">
            {logoBottomRight && this.renderBottomRight()}

            <div className="videoRange">
              {/* <label htmlFor="videoRange">Example range</label> */}
              <input 
                onChange={this.onChangeCurrentTime}
                className="custom-range" 
                type="range"
                min={0}
                max={mediaDuration} // 100
                step={0.01}
                autoComplete="off"
                // defaultValue={currentTime}
                value={currentTime}
                // id="vRange"
              />

              <Progress className="vProgressPlay" value={(currentTime / mediaDuration) * 100} />

              <Progress color="info" className="vProgress" value={progress} />
            </div>

            <Flex justify="between" elClass="mediaCtrl px-3">
              <Flex>
                <Btn 
                  onClick={this.playMedia} 
                  size="sm" 
                  className={
                    Classes("i scale12 tip tipT",{
                      "q-play" : !paused,
                      "q-pause" : paused
                    })
                  } 
                  aria-label={paused ? "Pause" : "Play"} 
                />
                
                <Flex align="center" elClass="volumeCtrl">
                  <Btn 
                    size="sm" 
                    className={
                      Classes("i scale12 tip tipT",{
                        "q-volume-high" : volume > 0.5,
                        "q-volume-medium" : volume <= 0.5,
                        // "q-volume-low" : volume <= 0.25,
                        "q-volume-off" : volume === 0
                      })
                    }
                    aria-label="Volume" 
                  />
                  <input 
                    onChange={this.onChangeVolume}
                    className="custom-range" 
                    type="range" 
                    min={0}
                    max={1}
                    step={0.05}
                    autoComplete="off"
                    // defaultValue={volume} // 100
                    value={volume}
                  />
                </Flex>

                <Flex align="center" elClass="text-white small px-1">
                  <time>{curTimeDisplay}</time>
                  <span>&nbsp;/&nbsp;</span>
                  <time>{durationDisplay}</time>
                </Flex>
              </Flex>

              <Flex elClass="vRightCtrl">
                <Dropdown size="sm" direction="up" inNavbar isOpen={ddSettings} toggle={this.onMenuSetting}>
                  <DropdownToggle className="i q-settings-outline tip tipT" aria-label="Settings" />
                  <DropdownMenu right className="mw200">
                    <TabContent activeTab={activeTabSet} className="setVideo">
                      <TabPane tabId="1">
                        <CustomInput 
                          onChange={this.setAutoPlay} 
                          type="switch" 
                          id="setVideoAutoplay" 
                          label="Autoplay" 
                          checked={autoPlay}
                        />
                        
                        <CustomInput type="switch" id="setVideoAnnotation" label="Annotations" />

                        <CustomInput 
                          onChange={this.setVideoLoop} 
                          type="switch" 
                          id="setVideoLoop" 
                          label="Loop" 
                          checked={loop}
                        />
                        
                        <Flex onClick={() => {this.onTabSet('2')}} justify="between" elClass="dropdown-item">
                          Speed
                          <div>Normal <Ico i="chevron-right" /></div>
                        </Flex>
                        
                        <Flex onClick={() => {this.onTabSet('3')}} justify="between" elClass="dropdown-item">
                          Quality
                          <div>Auto 720p<sup className="text-danger">HD</sup> <Ico i="chevron-right" /></div>
                        </Flex>
                      </TabPane>

                      <TabPane tabId="2">
                        <div onClick={() => {this.onTabSet('1')}} className="dropdown-item dropdown-header i q-chevron-left">
                          Speed
                        </div>
                        <div className="dropdown-item">0.25</div>
                        <div className="dropdown-item">0.5</div>
                        <div className="dropdown-item">0.75</div>
                        <div className="dropdown-item i q-check"> Normal</div>
                        <div className="dropdown-item">1.25</div>
                        <div className="dropdown-item">1.5</div>
                      </TabPane>

                      <TabPane tabId="3">
                        <div onClick={() => {this.onTabSet('1')}} className="dropdown-item dropdown-header i q-chevron-left">
                          Quality
                        </div>
                        <div className="dropdown-item">
                          1080p<sup className="text-danger">HD</sup>
                        </div>
                        <div className="dropdown-item">
                          720p<sup className="text-danger">HD</sup>
                        </div>
                        <div className="dropdown-item">480p</div>
                        <div className="dropdown-item">360p</div>
                        <div className="dropdown-item">240p</div>
                        <div className="dropdown-item">144p</div>
                        <div className="dropdown-item i q-check"> Auto</div>
                      </TabPane>
                    </TabContent>
                  </DropdownMenu>
                </Dropdown>

                {pip && 
                  <Btn 
                    onClick={this.onPip} 
                    size="sm" 
                    className="i q-window-maximize tip tipT" 
                    aria-label="Picture in picture"
                  />
                }
                
                <Btn size="sm" className="i q-theater tip tipT" aria-label="Theater mode" />
                
                <Btn 
                  onClick={this.onFullscreen} 
                  size="sm" 
                  className={
                    Classes("i tip tipT tl scale12",{
                      "q-fullscreen" : !isFullScreen,
                      "q-fullscreen-exit" : isFullScreen,
                    })
                  }
                  aria-label={isFullScreen ? "Exit Fullscreen" : "Fullscreen"} 
                />
              </Flex>
            </Flex>
          </div>
        </Flex>
      </div>
    );
  }
}