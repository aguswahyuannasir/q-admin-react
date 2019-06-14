import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import QdownShift from './QdownShift';
import Btn from '../components/q-ui-react/Btn';

export default function Find({autoFocus, elClass, size, kind, outline, inputClass, round, noShadow, id, api, append}){
	const onBack = () => {
		window.history.back();
	}
	
	return (
		<div 
			className={`form-inline${elClass ? ` ${elClass}` : ""}`} 
			//className="form-inline findMain"
			role="form"
		>
			<InputGroup size={size} className="w-100">
				{append && 
					<InputGroup.Prepend>
						<Btn 
							onClick={onBack} 
							outline={outline}
							kind={kind} 
							className={`i ion-md-arrow-back${round ? " rounded-0" : ""}${noShadow ? " shadow-none" : ""}`} 
							tip="Back"
						/>
					</InputGroup.Prepend>
				}
				
				<QdownShift 
					autoFocus={autoFocus}
					api={api}
					inputClass={`border-white ellipsis${inputClass ? ` ${inputClass}` : ""}${round ? " rounded-0" : ""}${noShadow ? " shadow-none" : ""}`}
					id={id}
					//onInput={this.onQdownShift}
					//inputRef={c => {this.inputDownshift = c}}
				/>
			
				<InputGroup.Append>
					<Btn 
						as="label" 
						outline={outline}
						kind={kind} 
						className={`i ion-ios-search${round ? " rounded-0" : ""}${noShadow ? " shadow-none" : ""}`} 
						htmlFor={id} 
						tip="Go to Search"
					/>
				</InputGroup.Append>
			</InputGroup>
		</div>
	)
}

/* 
					<label 
						//as="label" 
						//outline={outline}
						//kind={kind} 
						className={`btn${outline ? ` btn-outline-${kind} ` : ` btn-${kind} `}i ion-ios-search${round ? " rounded-0" : ""}${noShadow ? " shadow-none" : ""}`} 
						htmlFor={id} 
						title="Go to Search"
						aria-label="Go to Search"
					/>
*/
