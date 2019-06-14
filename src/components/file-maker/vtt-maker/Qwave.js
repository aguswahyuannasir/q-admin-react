import React,{Component} from 'react';
// import axios from 'axios';

export default class Qwave extends Component{
  constructor(props){
    super(props);
    this.state = {
      wave:false,
    };

    this.wavesurfer = null;

    this.onPlayWave = this.onPlayWave.bind(this);
    this.onInputRange = this.onInputRange.bind(this);
  }

  componentDidMount(){
    console.log('componentDidMount in Qwave');
    this.wavesurfer = window.WaveSurfer.create({
      container:'#waveform',
      scrollParent:true,
      waveColor:'red',
      progressColor:'purple',
      cursorColor:'navy',
      backend:'MediaElement',
      plugins:[
        window.WaveSurfer.timeline.create({
          container:'#waveTimeline'
        }),
        window.WaveSurfer.cursor.create(),

        window.WaveSurfer.regions.create({
          regions: [{
            start: 1,
            end: 3,
            color: 'hsla(400, 100%, 30%, 0.5)'
          }, {
            start: 5,
            end: 7,
            color: 'hsla(200, 50%, 70%, 0.4)'
          }],
          dragSelection: {
            slop: 5
          }
        })
      ]
    });
    // http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3
    // http://localhost:3000/song_cjrg_teasdale_64kb.mp3
    // media/Super_Jingle.MP4
    this.wavesurfer.load('media/Super_Jingle.MP4');
  }

  onPlayWave(e){
    console.log('onPlayWave');
    this.wavesurfer.playPause();
    this.props.playVideo();
  }

  onInputRange(e){
    console.log('onInputRange');
    let zoomLevel = Number(e.target.value);
    this.wavesurfer.zoom(zoomLevel);
  }

  render(){


    // <audio id="audioWave"></audio>
    return (
      <div>
        <div className="position-relative" id="waveform"/>
        <div id="waveTimeline"/>
        <div className="d-flex justify-content-between align-items-center py-3">
          <div className="custom-control custom-checkbox">
            <input className="custom-control-input" type="checkbox" id="cboxWhileType"/>
            <label className="custom-control-label" htmlFor="cboxWhileType">Pause video while typing</label>
          </div>
          <button onClick={this.onPlayWave} className="btn btn-info" type="button">PLAY</button>
          <div className="d-flex align-items-center">
            <i className="mi mi-magnify scale15 mr-2"/>
            <input 
              onInput={this.onInputRange} 
              className="custom-range" 
              type="range" 
              min="1" 
              max="200"// 5 
              // step="0.5" 
              id="rangeWave"
              defaultValue="1"
            />
          </div>
        </div>
      </div>
    );
  }
}