// import './style.scss';
import React from 'react';
import PlayerModal from '../../../components/business/PlayerModal';// 'components/business/PlayerModal'
import {ContentUtils} from 'braft-utils';

export default class Embed extends React.Component{
  removeEmbed = () => {
    this.props.editor.setValue(ContentUtils.removeBlock(this.props.editorState, this.props.block))
  }
	
  render(){
    const {mediaData, language} = this.props
    const {name, url, meta} = mediaData

    return (
      <div className="bf-embed-wrap">
        <PlayerModal type="embed" onRemove={this.removeEmbed} poster={meta ? meta.poster || '' : ''} language={language} url={url} name={name} title={language.videoPlayer.embedTitle}>
          <div className="embed-responsive embed-responsive-16by9 bf-embed-player" dangerouslySetInnerHTML={{__html: url}} />
        </PlayerModal>
      </div>
    )
  }
}

/*
      <div className='bf-embed-wrap'>
        <PlayerModal type="embed" onRemove={this.removeEmbed} poster={meta ? meta.poster || '' : ''} language={language} url={url} name={name} title={language.videoPlayer.embedTitle}>
          <div className='bf-embed-player' dangerouslySetInnerHTML={{__html: url}}></div>
        </PlayerModal>
      </div>
*/