// import './style.scss';
import React from 'react';
import PlayerModal from '../../../components/business/PlayerModal';// 'components/business/PlayerModal'
import {ContentUtils} from 'braft-utils';

export default class Video extends React.Component{
  removeVideo = () => {
    this.props.editor.setValue(ContentUtils.removeBlock(this.props.editorState, this.props.block));
  }	
	
  render(){
    const {mediaData, language} = this.props;
    const {url, name, meta} = mediaData;

    return (
      <figure className="bf-video-wrap">
        <PlayerModal 
					type="video" 
					onRemove={this.removeVideo} 
					poster={meta ? meta.poster || '' : ''} 
					language={language} 
					url={url} 
					name={name} 
					title={language.videoPlayer.title}
				>
          <div className="embed-responsive embed-responsive-16by9 bf-video-player">
						<video 
							className="embed-responsive-item" 
							controls 
							controlsList="nodownload noremoteplayback" 
							disablepictureinpicture="true" 
							src={url} 
							poster={meta ? meta.poster || '' : ''} 
						/>
					</div>
        </PlayerModal>
      </figure>
    )
  }
}

/*
      <div className='bf-video-wrap'>
        <PlayerModal 
					type="video" 
					onRemove={this.removeVideo} 
					poster={meta ? meta.poster || '' : ''} 
					language={language} 
					url={url} 
					name={name} 
					title={language.videoPlayer.title}
				>
          <div className="bf-video-player">
						<video controls src={url} poster={meta ? meta.poster || '' : ''} />
					</div>
        </PlayerModal>
      </div>
*/
