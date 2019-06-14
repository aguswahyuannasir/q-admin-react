import React,{Component} from 'react';
import {number} from 'prop-types';// PropTypes
import Box from './Box';
//import QdropDown from './QdropDown';
//import {DropdownItem} from 'reactstrap';// UncontrolledDropdown, 
import BraftEditor from '../../braft-editor';

export default class Portal extends Component{
	constructor(){
		super();
		this.state = {
			boxWidth: null,// 250
			boxItems: [],
			boxItemsMax: [],
			boxMax: false,
			boxExpState: false,
			
			boxLengthIndex: 0,
			
			count: 0,
      readOnly: false,
			editorState: BraftEditor.createEditorState()
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
		const {boxItems, boxWidth, boxItemsMax, boxLengthIndex} = this.state,
					docWidth = document.documentElement.offsetWidth,
					totalBoxWidth = (boxItems.length * 15) + (boxItems.length * boxWidth);

					//targetTxt = e.target.innerText,
					//toHref = targetTxt.replace(/ /g,'-').toLowerCase();
					
					//id = parseInt(e.target.dataset.id);

		let boxID = [];
    if(boxItems.length){
			boxItems.map((box) => boxID.push(box.id));
    }

		if(boxID.indexOf(boxLengthIndex) !== -1){ // boxID.indexOf(toHref) !== -1
			document.getElementById(boxLengthIndex).focus();// document.getElementById(toHref).focus();
			return;
		}else{
			const newBox = {
				boxExp: false,
				boxMin: false,
				boxTitle: "New Message", // targetTxt,
				id: boxLengthIndex // toHref // Date.now()
			};

			// IF BOX MAX parse component to dropdown menu // 265 + 48 + 10 + 15 = 338
			if((totalBoxWidth + (boxWidth + 278)) >= docWidth){
				let getLastBoxItem = boxItems.length - 1,
						changeBoxView = boxItems.splice(getLastBoxItem, 1, newBox);
						// boxMaxID = [];

				// CHECK IF box is open in box max dropdown
		    if(boxItemsMax.length){
					boxItemsMax.map((box) => boxID.push(box.id));
		    }
				if(boxID.indexOf(boxLengthIndex) !== -1){ // boxID.indexOf(toHref) !== -1
					// Trigger Focus box max item
					document.getElementById(boxLengthIndex).focus();// document.getElementById(toHref).focus();
					
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
						
						boxLengthIndex: boxLengthIndex + (getLastBoxItem + boxItemsMax.length)
					}), () => {
						document.getElementById(boxItems[getLastBoxItem].id).focus();
						// console.log(this.state.boxItemsMax);
					});
				}
			}else{
				// SET box view
				this.setState(state => ({
					boxItems: state.boxItems.concat(newBox),
					boxLengthIndex: boxLengthIndex + 1
				}), () => {
					if(this.props.scrollBox){
						let p = document.getElementById(boxLengthIndex),// document.getElementById(toHref) | e.target.parentNode.children[0],
								pc = p.childNodes[0].childNodes[1].children[0],
								ps = pc.scrollHeight;

						p.focus();
						pc.scrollTo(0, ps);
					}
				});
			}
		}
	}

// FOR Close box view
	onCloseBox(e){
		const id = parseInt(e.target.dataset.x);
		const	{boxItems, boxItemsMax, boxMax} = this.state;

		boxItems.splice(id, 1);
		
		console.log(boxItems.length + boxItemsMax.length);
		
    this.setState({
			boxItems,
			boxLengthIndex: boxItems.length + boxItemsMax.length
		});

    if(boxMax && boxItemsMax.length){
	    let popBoxMax = boxItemsMax.pop();
	    //console.log(boxItemsMax[boxItemsMax.length - 1]);// boxs[boxs.length - 1] | boxs.slice(-1)[0]

			this.setState(state => ({
				boxItems:state.boxItems.concat(popBoxMax),
				boxLengthIndex: boxItems.length + boxItemsMax.length
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

// Editor
	submitContent = async () => {
		// Menekan ctrl + s saat editor mendapatkan fokus akan menjalankan metode ini
		// Sebelum konten editor dikirimkan ke server, Anda dapat langsung memanggil editorState.toHTML () untuk mendapatkan konten HTML.
		
		//const htmlContent = this.state.editorState.toHTML();
		//const result = await saveEditorContent(htmlContent);
	}
	
// Editor
	handleEditorChange = (editorState) => {
		this.setState({editorState});
	}

// FOR scroll box chat
/*onScrollBox(e){
		let {scrollTop, scrollHeight, clientHeight} = e.target,
					sh = scrollHeight - clientHeight,
					btn = e.target.parentNode.childNodes[1];

		if(scrollTop >= sh){
			btn.classList.add('scale-opacity-0');
		}else{
			btn.classList.remove('scale-opacity-0');
		}
	}*/
	
	render(){
		const {boxItems, boxItemsMax, boxMax, boxExpState, editorState, boxLengthIndex} = this.state;

    return (
      <div 
				// className="container"
			>
				<div className="row">
					<div className="col-md-8">
						<button onClick={e => this.onOpenBox(e)} className="btn btn-primary" type="button">Compose Email {boxLengthIndex}</button>
					</div>

					<div className="col-md-4">
						<div className="card">
							<div className="list-group box-list">
								<div className="list-group-item list-group-item-action cpoin" onClick={(e)=>this.onOpenBox(e)}>Angelina Jolie</div>
								<div className="list-group-item list-group-item-action cpoin" onClick={(e)=>this.onOpenBox(e)}>Johny Depp</div>
								<div className="list-group-item list-group-item-action cpoin" onClick={(e)=>this.onOpenBox(e)}>Marion Cotilard</div>
								<div className="list-group-item list-group-item-action cpoin" onClick={(e)=>this.onOpenBox(e)}>Liv Tyler</div>
								<div className="list-group-item list-group-item-action cpoin" onClick={(e)=>this.onOpenBox(e)}>Brad Pitt</div>
								<div className="list-group-item list-group-item-action cpoin" onClick={(e)=>this.onOpenBox(e)}>Scarlett Johanson</div>
								<div className="list-group-item list-group-item-action cpoin" onClick={(e)=>this.onOpenBox(e)}>Elizabeth Olsen</div>
								<div className="list-group-item list-group-item-action cpoin" onClick={(e)=>this.onOpenBox(e)}>Paul Gilbert</div>
								<div className="list-group-item list-group-item-action cpoin" onClick={(e)=>this.onOpenBox(e)}>Billy Sheehan</div>
								<div className="list-group-item list-group-item-action cpoin" onClick={(e)=>this.onOpenBox(e)}>John Petrucci</div>
								<div className="list-group-item list-group-item-action cpoin" onClick={(e)=>this.onOpenBox(e)}>Diana Doe From New York America People</div>
								<div className="list-group-item list-group-item-action cpoin" onClick={(e)=>this.onOpenBox(e)}>Joe Satriani</div>
								<div className="list-group-item list-group-item-action cpoin" onClick={(e)=>this.onOpenBox(e)}>Mike Portnoy</div>
							</div>
						</div>
					</div>
				</div>

				<Box
					wrapClass="emailBox" 
					boxHeight="65vh"  
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
					<BraftEditor
						className="bg-white border" 
						controlBarClassName="bg-light" 
						// contentClassName="cus" 
						controls={[
							'undo', 'redo', 'separator', 'font-family', 'headings', 
							'bold', 'italic', 'underline', 'text-color', 'strike-through', 'separator',
							'superscript', 'subscript', 'remove-styles', 'separator', 'text-indent', 'text-align', 'separator',
							'list-ul', 'list-ol', 'blockquote', 'separator',
							'link', 'media', 'separator', 'hr', 'emoji'
						]}
						// , 'separator', 'clear'
						
						// language="id" 
						value={editorState} 
						onChange={this.handleEditorChange} 
						onSave={this.submitContent} 
					/>
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

/*
					<h3>DUMMY</h3>
					{[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(i =>
						<p key={i}><small>This is children box, just try or DUMMY content</small></p>
					)}
*/
