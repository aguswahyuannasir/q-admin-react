import React,{Component} from 'react';
import Ptype from 'prop-types';// PropTypes
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';// 
// import Btn from '../Btn';

export default class Box extends Component{
	//componentDidMount(){
		//if(!this.props.saved) this.titleBox.addEventListener('auxclick',(e) => this.noop(e));
		
	//}
	
	// componentDidUpdate(){
	// 	console.log('componentDidUpdate in Box');
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

	render(){
		const {wrapClass, boxItems, boxMinMax, minMaxBox, boxExpand, expandBox, closeBox, children,  
					 boxMax, boxItemsMax, maxToView, closeBoxMax, foot, scrollBox, boxHeight} = this.props;// boxFoot,

		return (
			<div className={`qbox-wrap${wrapClass ? ` ${wrapClass}` : ''}`} tabIndex="-1">
				<div className="boxes">
				{boxItems.map((v, i) => (
					<div
						key={i}
						id={v.id}
						className={`card qbox${v.boxMin ? ' boxMin' : ''}${v.boxExp ? ' box-expand' : ''}`}
						tabIndex="0"
						role="application"
					>
						<div className="box-el">
							<div className="card-header">
								<small><b data-boxid={v.id} title={v.boxTitle}>{v.boxTitle}</b></small>
								<div className="btn-group btn-group-sm">
									{boxMinMax ? (
										<div
											onClick={minMaxBox} 
											className="btn btn-light i ion-md-remove btnMinMaxBox" 
											role="button" 
											title={v.boxMin ? 'Maximize' : 'Minimize'} 
											data-minmax={i}
										/>
									) : null}

									{boxExpand ? (
										<div
											onClick={expandBox} 
											className="btn btn-light i i ion-md-expand btnExpandBox" 
											role="button" 
											title={v.boxExp ? 'Exit Fullscreen' : 'Fullscreen'} 
											data-exp={i}
										/>
									) : null}

									<div onClick={closeBox} className="btn btn-light i ion-md-close" role="button" title="Close" data-x={i} />
								</div>
							</div>

							<div className="box-body">
								<div 
									className={`box-content${scrollBox ? ' q-scroll' : ''}`}  
									style={{height: boxHeight}} 
									// onScroll={(e) => this.onScrollBox(e)}
								>
									{children}
								</div>
								
								{scrollBox && 
									<div
										className="btn btn-sm btn-primary i ion-ios-arrow-down btnGoToDownBox"
										role="button"
										title="Go to bottom"
										onClick={(e) => this.onScrollY(e)}
									/>
								}
								
								{foot}
							</div>
							
							
						</div>
					</div>
				))}

				{boxMax ? (
					<UncontrolledDropdown inNavbar direction="up" className="btnMaxBox">
						<DropdownToggle color="primary" className="i ion-ios-chatboxes scale12" title="More" />
						<DropdownMenu right className="q-scroll">							
							{boxItemsMax.map((v, i) => (
								<div key={i} id={v.id} className="d-flex">
									<DropdownItem
										// href={v.id}
										title="Click to open"
										data-id={i}
										onClick={maxToView}
									>
										{v.boxTitle}
									</DropdownItem>
									<button onClick={closeBoxMax} className="btn btn-sm i ion-md-close xico" type="button" title="Close" data-x={i} />
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
	boxItems:Ptype.array,
	boxItemsMax:Ptype.array,
	boxMax:Ptype.bool,
	closeBox:Ptype.func,
	closeBoxMax:Ptype.func,
	boxMinMax:Ptype.bool,
	minMaxBox:Ptype.func,

	boxExpand:Ptype.bool,
	expandBox:Ptype.func,

	// boxFoot:Ptype.element,
}
