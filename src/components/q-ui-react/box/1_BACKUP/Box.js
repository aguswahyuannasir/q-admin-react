import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';// 
// import QdropDown from './QdropDown';
import Btn from '../Btn';

export default class Box extends Component{
	// componentDidUpdate(){
	// 	console.log('componentDidUpdate in Qbox');
	// }

// FOR Scroll to bottom box
	onScrollY(e){
		let et = e.target,
				p = et.parentNode.firstElementChild, // children[0]
				ph = p.scrollHeight;
		p.scrollTo(0,ph);
		// if(p.scrollTop >= ps){
			// console.log('p.scrollTop: '+p.scrollTop);
			// console.log('p.scrollHeight: '+ph);
		// }
		// setTimeout(() => et.classList.add('d-none'),150);
		// window.requestAnimationFrame(function(){
		// 	console.log('p.scrollTop: '+p.scrollTop);
		// });
	}

	onScrollBox(e){
		let {scrollTop, scrollHeight, clientHeight} = e.target,
					sh = scrollHeight - clientHeight,
					btn = e.target.parentNode.childNodes[1];

		if(scrollTop >= sh){
			btn.classList.add('scale-opacity-0');
		}else{
			btn.classList.remove('scale-opacity-0');
		}
	}
	
	footBox = () => {
		return (
			<form className="qbox-form">
			  <div className="form-control form-control-sm q-scroll" contentEditable={true} title="Type Here" />
			  <div className="d-flex justify-content-between">
				  <div className="btn-group btn-group-sm">						
						<UncontrolledDropdown>
							<DropdownToggle outline size="sm" className="i ion-md-happy" />
							<DropdownMenu>
								<DropdownItem header>Header</DropdownItem>
								<DropdownItem>Action</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>Another</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
						
				  	<Btn as="label" outline className="i ion-md-images scale12 kidHide" tip="Attach image">
				  		<input type="file" className="d-none" />
				  	</Btn>
				  	<Btn as="label" outline className="i ion-md-attach scale12 kidHide" tip="Attach File">
				  		<input type="file" className="d-none" />
				  	</Btn>
				  </div>
				  <Btn outline size="sm" className="i ion-md-paper-plane scale12" tip="Send" />
			  </div>
			</form>
		);
	}

	render(){
		const {boxItems, boxMinMax, minMaxBox, boxExpand, expandBox, closeBox, children,  
					 boxMax, boxItemsMax, maxToView, closeBoxMax} = this.props;// boxFoot,

		return (
			<div className="qbox-wrap" tabIndex="-1">
				<div className="boxes">
				{boxItems.map((box, i) => (
					<div
						key={i}
						id={box.id}
						className={`card qbox${box.boxMin ? ' boxMin' : ''}${box.boxExp ? ' box-expand' : ''}`}
						tabIndex="0"
						role="application"
					>
						<div className="box-el">
							<div className="card-header">
								<small><a href={box.id}>{box.boxTitle}</a></small>
								<div className="btn-group btn-group-sm">
									{boxMinMax ? (
										<div
											onClick={minMaxBox} 
											className="btn btn-light i ion-md-remove btnMinMaxBox" 
											role="button" 
											title={box.boxMin ? 'Maximize' : 'Minimize'} 
											data-minmax={i}
										/>
									) : null}

									{boxExpand ? (
										<div
											onClick={expandBox} 
											className="btn btn-light i i ion-md-expand btnExpandBox" 
											role="button" 
											title={box.boxExp ? 'Exit Fullscreen' : 'Fullscreen'} 
											data-exp={i}
										/>
									) : null}

									<div onClick={closeBox} className="btn btn-light i ion-md-close" role="button" title="Close" data-x={i} />
								</div>
							</div>

							<div className="box-body">
								<div className="box-content q-scroll" onScroll={(e) => this.onScrollBox(e)}>
									{children}
								</div>
								<div
									className="btn btn-sm btn-primary i ion-ios-arrow-down btnGoToDownBox"
									role="button"
									title="Go to bottom"
									onClick={(e) => this.onScrollY(e)}
								/>
							</div>
							
							{this.footBox()}
						</div>
					</div>
				))}

				{boxMax ? (
					<UncontrolledDropdown inNavbar direction="up" className="btnMaxBox">
						<DropdownToggle color="primary" className="i ion-ios-chatboxes scale12" title="More" />
						<DropdownMenu right className="q-scroll">							
							{boxItemsMax.map((box,i) => (
								<div key={i} id={box.id} className="d-flex" tabIndex="0">
									<a
										className="dropdown-item"
										href={box.id}
										title="Click to open"
										data-id={i}
										onClick={maxToView}
									>
										{box.boxTitle}
									</a>
									<button onClick={closeBoxMax} className="btn btn-sm i ion-md-close xico" type="button" title="Close" data-x={i}></button>
								</div>
							))}
						</DropdownMenu>
					</UncontrolledDropdown>
				) : null}

				</div>
			</div>
		);
	}
}

Box.propTypes = {
	boxItems:PropTypes.array,
	boxItemsMax:PropTypes.array,
	boxMax:PropTypes.bool,
	closeBox:PropTypes.func,
	closeBoxMax:PropTypes.func,
	boxMinMax:PropTypes.bool,
	minMaxBox:PropTypes.func,

	boxExpand:PropTypes.bool,
	expandBox:PropTypes.func,

	// boxFoot:PropTypes.element,
}
