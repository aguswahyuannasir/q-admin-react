import React,{Component,Fragment} from 'react';
import Head from "../../app-part/Head";
import {EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import uploadImageCallBack from '../../components/wysiwyg/uploadImageCallBack';
import Flex from '../../components/q-ui-react/Flex';
import A from '../../components/q-ui-react/A';

export default class EmailInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  }
	
	render(){
		const {editorState} = this.state;
		
		return (
			<Fragment>
				<Head
					title="Compose Email"
				/>			
			
				<div className="pt-3 px-3">
					<Flex dir="row" justify="between" elClass="mb-2">
						<h6>Compose Email</h6>
						<A dom="link" href="/emails" size="sm" btn="primary" aClass="i ion-md-mail scale12">Show Email</A>
					</Flex>
					
					<Editor
						editorState={editorState} 
						wrapperClassName="q-wysiwyg" 
						editorClassName="border p-2" 
						placeholder="Type here..." 
            toolbar={{
              //options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'link', 'embedded', 'image', 'history'],
              //inline: { inDropdown: true },
              //link: { inDropdown: true },
              //history: { inDropdown: true },
              image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true }, previewImage: true },
            }} 
						
						onEditorStateChange={this.onEditorStateChange}
					/>
				</div>
			</Fragment>
		)
	}
}