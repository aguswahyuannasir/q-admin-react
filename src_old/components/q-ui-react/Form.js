import React,{Component} from 'react';// ,Fragment

export default class Form extends Component{
  /*constructor(props){
    super(props);
		this.form = null;
	}*/
	
	/*componentDidMount(){
		//console.log('componentDidMount in Form - src\\components\\q-ui-react\\Form');
		// Bind reset form
		let {reset, id, elRef} = this.props;
		if(reset){
			this.form = document.getElementById(id) || this.refs[elRef];
			this.form.addEventListener('reset',this.onReset,false);
		}	
	}*/
	
	//componentWillUnmount(){
		//console.log('componentWillUnmount in Form - src\\components\\q-ui-react\\Form');
		// OPTION = unBind reset form
		//if(this.form) this.form.removeEventListener('reset',this.onReset,false);
	//}
	
	/*onReset = (e) => {
		let form = e.target;
		let sel = form.querySelectorAll('select');			
		
		// OPTION reset validation style
		if(form.classList.contains('was-validated')) form.classList.remove('was-validated');
		
		if(sel){
			for(let el of sel){
				if(el.classList.contains('isFill')) el.classList.remove('isFill');//  && el.value.length <= 0
			}
		}
		
		this.props.reset();
	}*/
	
	render(){
		const {elRef, elClass, id, upload, ...attr} = this.props;// reset, method, 
		
		// 
		return (
			<form 
				ref={elRef} 
				className={elClass ? elClass : undefined} 
				id={id} 
				encType={upload ? 'multipart/form-data' : undefined} 
				//data-reset={reset} 
				{...attr}
			/>
		)
	}
}


