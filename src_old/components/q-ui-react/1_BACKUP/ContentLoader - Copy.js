import React from 'react';
// import {string, bool, object, func, node, oneOfType} from 'prop-types';// PropTypes

function AvaLoader({avaClass, w, h}){
  return (
    <div
      className={`ava-loader${avaClass ? ` ${avaClass}` : ""}`}
      role="img"
      aria-label="Avatar loader"
      style={{
        width: w,
        height: h
      }}
    />
  )
}

function MediaLoader({mediaClass, label}){
  return (
    <div className={`media-post${mediaClass ? ` ${mediaClass}` : ""}`}>
      <div className="thumb holder" aria-label={label} />
    </div>
  )
}

function ContentLoader({elClass, col, mediaClass, tip, imgPos, label, textLength, ava, avaClass, w, h}){
  // let tlength = Array.from({length: textLength});
  // style={{width: `${Math.floor(Math.random() * 90 + 10)}%`}}
  let ifAva = ava ? 1 : textLength;

  return (
    <div
      className={`col-md-${col} post${elClass ? ` ${elClass}` : ''}`}
      title={tip}
    >
      <div className={`card h-100${imgPos === "down" ? " flex-column-reverse" : ""}`}>
        <MediaLoader mediaClass={mediaClass} label={label} />

        <div className={`card-body ${ava ? "d-flex align-items-center p-2" : "p-3"}`}>
          {ava && <AvaLoader avaClass={avaClass} w={w} h={h} />}

          {textLength > 0 &&
            Array.from({length: parseInt(ifAva)}).map((v, i) => <div key={i} className="holder h6" />)
          }
        </div>
      </div>
    </div>
  )
}

ContentLoader.defaultProps = {
  col: '12',
  imgPos: 'up', // up | down
	tip: 'Loading',
  textLength: 1
};

export {AvaLoader, MediaLoader, ContentLoader};// {ContentLoader}
