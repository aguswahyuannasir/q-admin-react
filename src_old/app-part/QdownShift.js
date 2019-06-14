import React,{Component} from "react";
//import {bindMethods} from './utils/Qutils';// ,isMobile,dateToStr
import Downshift from "downshift";
import {Get} from '../components/axios/Api';// import axios from 'axios';
//import Btn from '../components/q-ui/Btn';// 
import {Link} from "react-router-dom";
// import SearchResult from './pages/SearchResult';

export default class QdownShift extends Component{
  constructor(props){
    super(props);
    this.state = {
      err: null,
      gets: []
    };
  }

  /*onChangeInput = e => {
		let val = e.target.value;
		//const {onChange} = this.props;
    if(!val){
      return;
    }
    this.xhrFind(val);
  }*/

// DEV
  //downshiftOnChange(selectedMovie){
    //console.log(`your select is ${selectedMovie.title}`);
    // this.props.showResults();
  //}

  xhrFind = val => {
		// NOTE: val must be props API endpoint
    const url = `${this.props.api}${val}`;
    Get(url).then(res => {
      this.setState({gets: res.data.results});
    })
    .catch(err => {// handle error
      console.warn(err);
      this.setState({err: err});
    });
  }

  render(){
    const {gets} = this.state;
    const {inputRef, inputClass, id, autoFocus} = this.props;// urlSearch

    // let params = new URLSearchParams(window.location.search);
    // let cekParam = params.get("find") ? params.get("find") : "";
    // console.log(params.get("find") ? "TRUE":"FALSE");

    return (
      <Downshift
        id={id} // "downshiftNavMain"
        //onChange={this.downshiftOnChange} // DEV
        itemToString={item => (item ? item.title : "")}
      >
        {({
          selectedItem,
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          isOpen,
          inputValue,
					clearSelection
        }) => (
          <div className="QdownShift">
            <input 
							{...getInputProps({
								//ref: c => {this.input = c},
								ref: inputRef, // Q-CUSTOM
								autoFocus: autoFocus,
                type: "search",
                className: `form-control${inputClass ? ` ${inputClass}` : ""}`,
								id: id,
                placeholder: "Search",
								"aria-label": "Search through site content",
                //onChange: this.onChangeInput,
								onChange: e => {
									if(!e.target.value || e.target.value === ''){
										clearSelection();
										return;
									}
									this.xhrFind(e.target.value);
								}
                // value: urlSearch// cekParam
								//onInput: this.props.onInput
              })}
            />
            <div {...getMenuProps()}>
              {isOpen ? (
                <div className="dropdown-menu show w-100">
									{gets.length ?
										gets.filter(item => !inputValue || item.title.toLowerCase().includes(inputValue.toLowerCase()))
										.slice(0,10).map((item,idx) => (
											<Link
												className={`dropdown-item${highlightedIndex === idx ? " active" : ""}`}
												{...getItemProps({key:idx, idx, item})}

												//to={{
												//	pathname: `/search`,// ${media.id - 1}
												//	search: `?id=${item.id}&find=${item.title.replace(/ /g, "+").toLowerCase()}`,
												//	state: {findMain: true}// this is the trick!
												//}}
												to={{
													pathname: `/artikel/${item.id}/${item.title.replace(/ /g, "-").toLowerCase()}/` // ${media.id - 1}
												}}
												// replace
											>
												{item.title}
											</Link>
										)) 
										: 
										<div className="dropdown-header i-load">Loading...</div>
									}
								</div>) 
								: null
							}
						</div>
						
						{/*isOpen && <Btn onClick={this.onCancel} tag="div" color="fff" className="btn-sm t0-r0 hov-ired" ico="close" tip="Cancel" />*/}
					</div>
        )}
      </Downshift>
    );
  }
}
