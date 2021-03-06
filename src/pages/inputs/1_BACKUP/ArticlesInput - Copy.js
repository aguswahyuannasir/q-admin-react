import React,{Component,Fragment} from 'react';
import Head from "../../app-part/Head";
import {EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import uploadImageCallBack from '../../components/wysiwyg/uploadImageCallBack';
import Flex from '../../components/q-ui-react/Flex';
import A from '../../components/q-ui-react/A';

export default class ArticlesInput extends Component{
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
					title="Articles Input"
				/>			
			
				<div className="pt-3 px-3">
					<Flex dir="row" justify="between" elClass="mb-2">
						<h6>Articles Input</h6>
						<A dom="link" href="/articles" size="sm" btn="primary" aClass="i ion-md-list scale12">Show Articles</A>
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