import React,{Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import Editor,{createEditorStateWithText} from 'draft-js-plugins-editor';
// import createEmojiPlugin from 'draft-js-emoji-plugin';
// // import editorStyles from './editorStyles.css';
// import 'draft-js-emoji-plugin/lib/plugin.css';

// import 'emoji-mart/css/emoji-mart.css';
// import {Picker} from 'emoji-mart';

// import emojione from 'emojione';

// const emojiPlugin = createEmojiPlugin();
// // const emojiPlugin = createEmojiPlugin({
// //   useNativeArt:true
// // });

// const {EmojiSuggestions, EmojiSelect} = emojiPlugin;
// const plugins = [emojiPlugin];
// // const text = `Cool, we can have all sorts of Emojis here. 🙌
// // 🌿☃️🎉🙈 aaaand maybe a few more here 🐲☀️🗻 Quite fun!`;

// const text = "";

import {Editor, EditorState} from 'draft-js';

import 'emoji-mart/css/emoji-mart.css';
import {Picker} from 'emoji-mart';

import emojione from 'emojione';

export default class Qeditor extends Component{
  constructor(props){
    super(props);
    this.state = {
			editorState:EditorState.createEmpty()
			// editorState: createEditorStateWithText(text)
		};
		
		this.onChange = this.onChange.bind(this);
		this.focus = this.focus.bind(this);
		this.emojiParse = this.emojiParse.bind(this);
	}

	componentDidMount(){
		console.log('componentDidMount in Qeditor');

	}

	onChange(editorState){
		// let parseEmot = this.emojiParse(editorState);
		this.setState({editorState});// parseEmot

		let data = editorState.getCurrentContent();
		let toEmot = this.emojiParse(data.getPlainText());
		console.log(toEmot);// 

		// this.setState({editorState:toEmot});
	}

  focus(){
    this.editor.focus();
  };
	
// onSelect emoji mart item
	selectEmot(emoji){
		console.log('selectEmot');
		console.log(emoji);

	}

// Parse text to emot
	emojiParse(input){
		console.log('emojiParse');
		return emojione.shortnameToImage(input);// toImage
	}

	render(){
		const {className,lg,sm,spell,readOnly,placeholder} = this.props;

		// let defaultFormClass = "form-control";
		const formCtrlClass = classNames("form-control draftInput",className,{
			"form-control-lg": lg,
			"form-control-sm": sm
		});

		return (
			<div className="Qeditor">
				<div className={formCtrlClass}>{/* onClick={this.focus}*/}
					<Editor 
						spellCheck={spell}
						placeholder={placeholder}
						readOnly={readOnly}
						editorState={this.state.editorState} 
						onChange={this.onChange} 

						// plugins={plugins}
						ref={(element) => { this.editor = element; }}
					/>
				</div>

				<Picker 
					emojiTooltip 
					title='Pick your emoji' 
					emoji='point_up' 
					onSelect={this.selectEmot}
				/>
			</div>
		);
	}
}

Qeditor.propTypes = {
	spell: PropTypes.bool,
	readOnly: PropTypes.bool,
	placeholder: PropTypes.string
};

Qeditor.defaultProps = {
	spell: true
};

