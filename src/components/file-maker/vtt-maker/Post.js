import React from 'react';

export default function Post(props){

  return (
    <div className="card Qpost">
      <a href={props.url}>
        <img className="card-img-top" src={props.tmb} alt={props.title}/>
        
        <div className="card-body">
          <h6 className="mb-0">{props.title}</h6>
          
        </div>
      </a>
    </div>
  );
}

// <p className="small text-muted">{props.userId}</p>
// <p className="card-text">{props.text}</p>