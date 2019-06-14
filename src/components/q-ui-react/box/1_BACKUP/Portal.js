import React,{Component} from 'react';
import {number} from 'prop-types';// PropTypes
import Box from './Box';
//import QdropDown from './QdropDown';
//import {DropdownItem} from 'reactstrap';// UncontrolledDropdown, 

export default class Portal extends Component{
	constructor(){
		super();
		this.state = {
			boxWidth: null,// 250
			boxItems: [],
			boxItemsMax: [],
			boxMax: false,
			boxExpState: false,
		};

		// Q Properties
		this.boxExpNow = null;// FOR CEK EXPAND BOX

		//this.box = React.createRef();
		this.onCloseBox = this.onCloseBox.bind(this);
		this.onCloseBoxMax = this.onCloseBoxMax.bind(this);
		this.onMinMaxBox = this.onMinMaxBox.bind(this);
		this.onExpandBox = this.onExpandBox.bind(this);
		this.onMaxToView = this.onMaxToView.bind(this);
	}
	
	componentDidMount(){
		//console.log('componentDidMount in Portal - src\\components\\q-ui-react\\box\\Portal');
		this.setState({boxWidth: this.props.boxWidth});
	}

	// getSnapshotBeforeUpdate(prevProps,prevState){
	// 	console.log(prevProps);
	// 	if(!prevState.boxExpState){
	// 		console.log(prevState);
	// 	}
	// 	return null;
	// }

	componentDidUpdate(prevProps, prevState, snapshot){
		//console.log('componentDidUpdate in Portal - src\\components\\q-ui-react\\box\\Portal');
		// console.log(snapshot);
		// FOR Close Expand with ESC Key
		// if(snapshot !== null){
			if(this.state.boxExpState && this.state.boxItems){
				// console.log('if(this.state.boxExpState && this.state.boxItems)');
				window.addEventListener('keydown', this.onEscExpandBox);
			}else{
				// console.log('else - this.state.boxExpState && this.state.boxItems');
				window.removeEventListener('keydown', this.onEscExpandBox);
			}
		// }
	}

// FOR add new & open box
	onOpenBox(e){
		e.preventDefault();
		const {boxItems, boxWidth, boxItemsMax} = this.state,
					docWidth = document.documentElement.offsetWidth,
					totalBoxWidth = (boxItems.length * 15) + (boxItems.length * boxWidth),

					targetTxt = e.target.innerText,
					toHref = targetTxt.replace(/ /g,'-').toLowerCase();
					//id = parseInt(e.target.dataset.id);

		let boxID = [];
    if(boxItems.length){
			boxItems.map((box) => boxID.push(box.id));
    }

		if(boxID.indexOf(toHref) !== -1){
			document.getElementById(toHref).focus();
			return;
		}else{
			const newBox = {
				boxExp: false,
				boxMin: false,
				boxTitle: targetTxt,
				id:toHref // Date.now()
			};

			// IF BOX MAX parse component to dropdown menu // 265 + 48 + 10 + 15 = 338
			if((totalBoxWidth + (boxWidth + 278)) >= docWidth){
				let getLastBoxItem = boxItems.length - 1,
						changeBoxView = boxItems.splice(getLastBoxItem,1,newBox);
						// boxMaxID = [];

				// CHECK IF box is open in box max dropdown
		    if(boxItemsMax.length){
					boxItemsMax.map((box) => boxID.push(box.id));
		    }
				if(boxID.indexOf(toHref) !== -1){
					document.getElementById(toHref).focus();// Trigger Focus box max item
					// let getBoxActive = document.getElementById(toHref),
					// 		getID = parseInt(getBoxActive.dataset.id);

					// if(isNaN(getID)){
					// 	console.log(getID);
					// 	let getBoxMaxActive = parseInt(getBoxActive.children[0].dataset.id);
					// 	console.log(getBoxMaxActive);

					// 	let popBoxItems = boxItems.pop();
					// 	console.log('popBoxItems: ');
					// 	console.log(popBoxItems);
					// 	console.log('boxItems AFTER POP isNAN: ');
					// 	console.log(boxItems);

					// 	console.log('GET box macx dropdown item: ');
					// 	console.log(boxItemsMax[getBoxMaxActive]);

					// 	this.setState(state => ({
					// 			boxItemsMax:state.boxItemsMax.concat(boxItemsMax[getBoxMaxActive]),
					// 			boxItems:boxItems,
					// 			// boxMax:true,
					// 		}),
					// 		() => {
					// 			document.getElementById(toHref).focus();
					// 			// document.getElementById(boxItems[getLastBoxItem].id).focus();
					// 		}
					// 	);
					// }
					// else{
					// 	document.getElementById(toHref).focus();
					// }

					return;
				}else{
					this.setState(state => ({
						boxItemsMax: state.boxItemsMax.concat(changeBoxView[0]),
						boxItems: boxItems,
						boxMax: true,
					}), () => {
						document.getElementById(boxItems[getLastBoxItem].id).focus();
						// console.log(this.state.boxItemsMax);
					});
				}
			}else{
				// SET box view
				this.setState(state => ({
					boxItems: state.boxItems.concat(newBox)
				}), () => {
					let p = document.getElementById(toHref),// e.target.parentNode.children[0],
							pc = p.childNodes[0].childNodes[1].children[0],
							ps = pc.scrollHeight;

					p.focus();
					pc.scrollTo(0, ps);
				});
			}
		}
	}

// FOR Close box view
	onCloseBox(e){
		const id = parseInt(e.target.dataset.x);
		const	{boxItems, boxItemsMax, boxMax} = this.state;

		boxItems.splice(id, 1);
    this.setState({boxItems});

    if(boxMax && boxItemsMax.length){
	    let popBoxMax = boxItemsMax.pop();
	    //console.log(boxItemsMax[boxItemsMax.length - 1]);// boxs[boxs.length - 1] | boxs.slice(-1)[0]

			this.setState(state => ({
				boxItems:state.boxItems.concat(popBoxMax)
			}), () => {
				if(boxItemsMax.length < 1){
					this.setState({boxMax: false});
				}
			});
    }
	}

// FOR Close box in dropdown
	onCloseBoxMax(e){
		const id = parseInt(e.target.dataset.x);
		const {boxItemsMax} = this.state;

		boxItemsMax.splice(id, 1);
    this.setState({boxItemsMax});
		// console.log(boxItemsMax.length);
		if(boxItemsMax.length < 1){
			this.setState({boxMax: false});
		}
	}

	onMinMaxBox(e){
		const t = this,
					id = parseInt(e.target.dataset.minmax),
					thisBox = t.state.boxItems[id];
		//console.log(thisBox);
		if(thisBox.boxMin){
			thisBox.boxMin = false;
			t.forceUpdate();
		}else{
			thisBox.boxMin = true;
			t.forceUpdate();
		}
	}

	onExpandBox(e){
		const t = this,
					id = parseInt(e.target.dataset.exp),
					thisBox = t.state.boxItems[id];
		if(thisBox.boxExp){
			t.boxExpNow = null;
			thisBox.boxExp = false;
			t.setState({boxExpState: false});
			t.forceUpdate();
		}else{
			t.boxExpNow = thisBox;
			thisBox.boxExp = true;
			t.setState({boxExpState: true});
			t.forceUpdate();
		}
	}

	onEscExpandBox = e => {
    const key = e.which || e.keyCode,
    			t = this;

    if(key === 27){
      e.stopPropagation();
			t.boxExpNow.boxExp = false;
			t.setState({boxExpState: false});
			t.forceUpdate();
			t.boxExpNow = null;
    }
	}

	onMaxToView(e){
		e.preventDefault();
		const id = parseInt(e.target.dataset.id);
		const	{boxItems, boxItemsMax} = this.state;

		let popBoxMax = boxItems.pop();
		let thisBoxMax = boxItemsMax.splice(id,1);

    boxItems.push(thisBoxMax[0]);
    boxItemsMax.push(popBoxMax);

    let getLastBoxItem = boxItems[boxItems.length - 1];

    //console.log('getLastBoxItem: ');
    //console.log(getLastBoxItem);

    //console.log(boxItemsMax[boxItemsMax.length - 1]);// boxs[boxs.length - 1] | boxs.slice(-1)[0]
		this.setState(() => ({
			boxItems: boxItems,
			boxItemsMax: boxItemsMax
		}), () => {
			document.getElementById(getLastBoxItem.id).focus();
		});
	}


	render(){
		const {boxItems, boxItemsMax, boxMax, boxExpState} = this.state;

    return (
      <div 
				// className="container"
			>
				<div className="row">
					<div className="col-md-8">
						col-md-8
					</div>

					<div className="col-md-4">
						<div className="card">
							<div className="list-group box-list">
								<a href="/" className="list-group-item list-group-item-action" onClick={(e)=>this.onOpenBox(e)}>Angelina Jolie</a>
								<a href="/" className="list-group-item list-group-item-action" onClick={(e)=>this.onOpenBox(e)}>Johny Depp</a>
								<a href="/" className="list-group-item list-group-item-action" onClick={(e)=>this.onOpenBox(e)}>Marion Cotilard</a>
								<a href="/" className="list-group-item list-group-item-action" onClick={(e)=>this.onOpenBox(e)}>Liv Tyler</a>
								<a href="/" className="list-group-item list-group-item-action" onClick={(e)=>this.onOpenBox(e)}>Brad Pitt</a>
								<a href="/" className="list-group-item list-group-item-action" onClick={(e)=>this.onOpenBox(e)}>Scarlett Johanson</a>
								<a href="/" className="list-group-item list-group-item-action" onClick={(e)=>this.onOpenBox(e)}>Elizabeth Olsen</a>
								<a href="/" className="list-group-item list-group-item-action" onClick={(e)=>this.onOpenBox(e)}>Paul Gilbert</a>
								<a href="/" className="list-group-item list-group-item-action" onClick={(e)=>this.onOpenBox(e)}>Billy Sheehan</a>
								<a href="/" className="list-group-item list-group-item-action" onClick={(e)=>this.onOpenBox(e)}>John Petrucci</a>
								<a href="/" className="list-group-item list-group-item-action" onClick={(e)=>this.onOpenBox(e)}>Diana Doe From New York America People</a>
								<a href="/" className="list-group-item list-group-item-action" onClick={(e)=>this.onOpenBox(e)}>Joe Satriani</a>
								<a href="/" className="list-group-item list-group-item-action" onClick={(e)=>this.onOpenBox(e)}>Mike Portnoy</a>
							</div>
						</div>
					</div>
				</div>

				<Box
					boxItems={boxItems}
					boxItemsMax={boxItemsMax}
					boxMax={boxMax}
					closeBox={this.onCloseBox}

					closeBoxMax={this.onCloseBoxMax}

					boxExpState={boxExpState}
					onEscExpandBox={this.onEscExpandBox}

					boxExpand // ={true} // true | false, FOR set box can expand / not
					expandBox={this.onExpandBox}

					boxMinMax // ={true}
					minMaxBox={e => this.onMinMaxBox(e)}

					//boxFoot={FootBox}// FOR box footer

					maxToView={e => this.onMaxToView(e)}
				>
					<h3>DUMMY</h3>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(i =>
						<p key={i}><small>This is children box, just try or DUMMY content</small></p>
					)}
				</Box>
      </div>
    );
  }
}

Portal.defaultProps = {
  boxWidth: 250
};

Portal.propTypes = {
	boxWidth: number,
	
};

// export default App;
