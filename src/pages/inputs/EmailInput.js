import React,{Component,Fragment} from 'react';
import Head from "../../app-part/Head";
//import {EditorState} from 'draft-js';
//import {Editor} from 'react-draft-wysiwyg';
//import uploadImageCallBack from '../../components/wysiwyg/uploadImageCallBack';

import BraftEditor from '../../components/braft-editor';// 'braft-editor'

import Flex from '../../components/q-ui-react/Flex';
import A from '../../components/q-ui-react/A';
				
export default class EmailInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      //editorState: EditorState.createEmpty(), // FOR react-draft-wysiwyg

			count: 0,
      readOnly: false,
			editorState: BraftEditor.createEditorState()
      // editorState: BraftEditor.createEditorState('{"blocks":[{"key":"avlot","text":"1123123123123123123123123123qweqweeqwe","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":11,"length":6,"style":"BGCOLOR-AC0303"},{"offset":11,"length":6,"style":"COLOR-E215D0"},{"offset":23,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}')
    };
  }

// FOR react-draft-wysiwyg
  /*onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  }*/
	
	async componentDidMount(){
		// Misalkan Anda mendapatkan konten editor dalam format html dari server di sini.
		//const htmlContent = await fetchEditorContent();
		
		// Ubah string html menjadi data editorState yang diperlukan oleh editor menggunakan BraftEditor.createEditorState
		//this.setState({
		//	editorState: BraftEditor.createEditorState(htmlContent)
		//});
	}

	submitContent = async () => {
		// Menekan ctrl + s saat editor mendapatkan fokus akan menjalankan metode ini
		// Sebelum konten editor dikirimkan ke server, Anda dapat langsung memanggil editorState.toHTML () untuk mendapatkan konten HTML.
		
		//const htmlContent = this.state.editorState.toHTML();
		//const result = await saveEditorContent(htmlContent);
	}

	handleEditorChange = (editorState) => {
		this.setState({editorState});
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
					
					<BraftEditor
						className="bg-white border" 
						controlBarClassName="bg-light" 
						// language="id" 
						value={editorState} 
						onChange={this.handleEditorChange} 
						onSave={this.submitContent} 
					/>
				</div>
			</Fragment>
		)
	}
}

/*
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
*/