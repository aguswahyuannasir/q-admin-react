import React,{Component,Fragment} from 'react';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import {Col} from 'reactstrap';// Row, 
import Dropdown from 'react-bootstrap/Dropdown';
import {winOpen} from '../../components/utils/Qutils';
import Head from "../../app-part/Head";
//import {EditorState} from 'draft-js';
//import {Editor} from 'react-draft-wysiwyg';
//import uploadImageCallBack from '../../components/wysiwyg/uploadImageCallBack';

import BraftEditor from '../../components/braft-editor';// 'braft-editor'
import ColorPicker from '../../components/braft-extensions/color-picker';
import Table from '../../components/braft-extensions/table';

// Perkenalkan komponen emotikon dan daftar emotikon default
// import Emoticon,{defaultEmoticons} from '../../components/braft-extensions/emoticon';
// import Emoticon,{defaultEmoticons} from 'braft-extensions/dist/emoticon';

// Anda juga dapat menggunakan sumber emotikon Anda sendiri.
// const emoticons = ['http://path/to/emoticon-1.png', 'http://path/to/emoticon-2.png', 'http://path/to/emoticon-3.png', 'http://path/to/emoticon-4.png', ...];

import Flex from '../../components/q-ui-react/Flex';
import A from '../../components/q-ui-react/A';
import Form from '../../components/q-ui-react/Form';
import Input from '../../components/q-ui-react/Input';
import Btn from '../../components/q-ui-react/Btn';

// Konversikan daftar paket emotikon default agar webpack dapat dimuat dengan benar ke dalam emotikon default. 
// Pastikan loader telah dikonfigurasi untuk file format png.
// const emoticons = defaultEmoticons.map(item => require(`../../components/braft-extensions/emoticon/images/${item}`));
// const emoticons = defaultEmoticons.map(item => require(`braft-extensions/dist/assets/${item}`));

const options = {
  defaultColumns: 3, // Jumlah kolom standar
  defaultRows: 3, // Jumlah baris standar
  // withDropdown: true, // false - Apakah akan memunculkan menu tarik-turun sebelum memasukkan formulir
  exportAttrString: '', // Menentukan string atribut yang dilampirkan pada tag tabel saat mengeluarkan HTML
  includeEditors: ['Qeditor'], // Tentukan BraftEditor mana yang valid untuk modul ini. Jika properti ini tidak lulus, itu akan berlaku untuk semua BraftEditor.
  // excludeEditors: ['editor-id-2']  // Tentukan BraftEditor mana modul tidak valid untuk
};

BraftEditor.use(ColorPicker({
  includeEditors: ['Qeditor'],
  theme: 'dark' // Mendukung tema dark dan light, standarnya gelap
}));

BraftEditor.use(Table(options));

/*BraftEditor.use(Table({
  includeEditors: ['Qeditor']
}));*/

/*BraftEditor.use(Emoticon({
  includeEditors: ['Qeditor'],
  emoticons: emoticons
}));*/

export default class ArticlesInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      //editorState: EditorState.createEmpty(), // FOR react-draft-wysiwyg

			// count: 0, // ???
      // readOnly: false, // ???
			editorState: BraftEditor.createEditorState(),
      // editorState: BraftEditor.createEditorState('{"blocks":[{"key":"avlot","text":"1123123123123123123123123123qweqweeqwe","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":11,"length":6,"style":"BGCOLOR-AC0303"},{"offset":11,"length":6,"style":"COLOR-E215D0"},{"offset":23,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}')
			mediaItems: [
				{
					id: 1,
					type: 'AUDIO',
					url: '/sound/bip.mp3'
				},{
					id: 2,
					type: "VIDEO",
					url: "/media/video_360.mp4"
				}
			],    
		
		
			title: '',
			// category: 'Health',
			errCategory: false,
			errTitle: false,
			errDescription: false,
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
		
		//this.form.addEventListener('reset',this.onReset,false);
	}
	
	submitContent = async () => {
		// Menekan ctrl + s saat editor mendapatkan fokus akan menjalankan metode ini
		// Sebelum konten editor dikirimkan ke server, Anda dapat langsung memanggil editorState.toHTML () untuk mendapatkan konten HTML.
		
		//const htmlContent = this.state.editorState.toHTML();
		//const result = await saveEditorContent(htmlContent);
	}

	onEditorChange = (editorState) => {
		this.setState({editorState});
	}
	
	onChangeInput = (e, state) => {
		this.setState({[state]: e.target.value});
	}
	
  onPreview = (tab) => {
		const {title} = this.state;
		
    if(window.previewWindow){
      window.previewWindow.close();
    }

		if(tab){
			window.previewWindow = window.open();
		}else{
			window.previewWindow = winOpen(null, "", title);// "Preview"
		}
    window.previewWindow.document.write(this.buildPrevHtml(title));
    window.previewWindow.document.close();
  }
	
  buildPrevHtml(title){
    return `<!doctype html>
      <html>
        <head>
					<link rel="icon" type="image/png" href="data:image/png;base64,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" />
          <title>${title}</title>
          <style>
            html,body{
							font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
              height:100%;
              margin:0;
              padding:0;
              overflow:auto;
              background-color:#f1f2f3;
            }
            .container{
              box-sizing:border-box;
              width:1200px;
              max-width:100%;
              min-height:100%;
              margin:0 auto;
              padding:20px 15px;
              overflow-x:hidden;
              background-color:#fff;
            }
            .container img,
            .container audio,
            .container video{
              max-width:100%;
              height:auto;
            }
            .container p{
              white-space:pre-wrap;
              min-height:1em;
            }
            .container pre{
              padding:15px;
              background-color:#f1f1f1;
              border-radius:5px;
            }
            .container blockquote{
              margin:0;
              padding:15px;
              background-color:#f1f1f1;
              border-left:3px solid #d1d1d1;
            }
						table{
							border-collapse:collapse;
							width:100%;
							margin-bottom:1rem;
							color:#212529
						}
						table td, table th{
							padding:.75rem;
							vertical-align:top;
							border-top:1px solid #dee2e6
						}
						table thead th{
							vertical-align:bottom;
							border-bottom:2px solid #dee2e6
						}
						table tbody + tbody{
							border-top:2px solid #dee2e6
						}
						table td, table th{
							padding:.3rem
						}
						table,
						table td, table th {
							border: 1px solid #dee2e6
						}
						table thead td, table thead th{
							border-bottom-width:2px;
						}
          </style>
        </head>
        <body>
          <div class="container">${this.state.editorState.toHTML()}</div>
        </body></html>`
  }
	
	onBool = (to) => {
		this.setState(state => ({
			[to]: !state[to]
		}));
	}
	
	submitForm = (e) => {
		e.preventDefault();
		e.stopPropagation();
		
		let form = e.target;
		
		if(form.checkValidity()){
			form.classList.remove('was-validated');
			this.setState({
				errCategory: false, 
				errTitle: false, 
				errDescription: false
			});
		}else{
			form.classList.add('was-validated');
			this.setState({
				errCategory: "Please select category", 
				errTitle: "Please insert title", 
				errDescription: "Please insert description"
			});
		}
	}
	
// DEV TRY reset form
	onResetForm = () => {
		this.setState({
			title: '',
			category: 'Health'
		});
	}
	
	render(){
		const {editorState, mediaItems, errCategory, errTitle, errDescription} = this.state;// title, category

    const extendControls = [{
			key: 'prev-menu',
			type: 'component',
			component: <Dropdown>
									<Dropdown.Toggle size="sm" variant="light" id="prevMenu" title="Show Preview">Preview</Dropdown.Toggle>
									<Dropdown.Menu alignRight>
										<Dropdown.Item as="button" type="button" onClick={() => this.onPreview(true)}>Open new tab</Dropdown.Item>
										<Dropdown.Item as="button" type="button" onClick={() => this.onPreview(false)}>Open new window</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
			//text: 'Show Preview',
			//onClick: () => this.onPreview(true)
		}];		
		
		return (
			<Fragment>
				<Head
					title="Articles Input"
					htmlClass="page-article-input" 
				/>			
			
				<div className="px-3">
					<Flex dir="row" justify="between" elClass="bg-body py-2 position-sticky zi-2" style={{top:48}}>
						<h6>Articles Input</h6>
						<A dom="link" href="/articles" size="sm" btn="primary" aClass="i ion-md-list scale12">Show Articles</A>
					</Flex>
					
					<Form 
						//reset={this.onResetForm}
						// upload 
						// encType="text/plain" 
						// elRef="formArticle" 
						// id="formArticle" 
						onSubmit={this.submitForm} 
						elClass="form-row" 
						noValidate
					>
						<Col md="3">
							<div className="card">
								<div className="p-3">									
									<Input
										as="select" 
										inputRef="selectCategory" 
										//id="selectCategory" 
										label="Category" 
										//isize="sm" 
										error={errCategory} 
										required 
										//value={category} 
										// defaultValue="Health"
										//onChange={(e) => this.onChangeInput(e, 'category')}
									>
										<option></option>
										<option value="Health">Health</option>
										<option value="Music">Music</option>
										<option value="Sport">Sport</option>
									</Input>
									
									<Input
										label="Title" 
										//isize="sm" 
										error={errTitle} 
										// value={title} 
										required 
										onChange={(e) => this.onChangeInput(e, 'title')}
									/>
									
									<Input
										as="textarea" 
										grow 
										error={errDescription} 
										inputClass="resize-no" 
										label="Descriptions" 
										required 
									/>
									
									<div className="text-center mt-3">
										{/*<Btn type="reset">Reset</Btn>{' '} */}
										<Btn kind="primary" type="submit">Save</Btn>
									</div>
								</div>
							</div>
						</Col>
						
						<Col md="9">
							<BraftEditor
								id="Qeditor" 
								className="bg-white border" 
								controlBarClassName="bg-light position-sticky zi-2" 
								controlBarStyle={{top:94}} 
								contentStyle={{height:'auto',minHeight:'70vh'}}
								extendControls={extendControls} 
								media={{items: mediaItems}} 
								// language="id" 
								value={editorState} 
								onChange={this.onEditorChange} 
								onSave={this.submitContent} 
							/>
						</Col>
					</Form>
				</div>
			</Fragment>
		)
	}
}

/*
									<select className="custom-select mb-2">
										<option>Category</option>
										<option value="1">One</option>
										<option value="2">Two</option>
										<option value="3">Three</option>
									</select>

									<div className="q-input">
										<label className="d-block">
											<input placeholder=" " />
											<span>Title</span>
										</label>
									</div>
									
									<div className="q-input">
										<label className="d-block">
											<textarea placeholder=" " />
											<span>Descriptions</span>
										</label>
									</div>

									<label className="d-block">
										<small>Title</small>
										<input className="form-control" type="text" />
									</label>

			<DropdownButton size="sm" id="prevMenu" title="Show Preview">
				<Dropdown.Item as="button" onClick={() => this.onPreview(true)}>Open new tab</Dropdown.Item>
				<Dropdown.Item as="button" onClick={() => this.onPreview(false)}>Open new window</Dropdown.Item>
			</DropdownButton>

    const extendControls = [{
			key: 'preview-button',
			type: 'button',
			text: 'Show Preview',
			onClick: () => this.onPreview(true)
		}];	

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