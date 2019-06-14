import React,{Component} from 'react';

// import classNames from 'classnames';
import { Formik } from "formik";
import yup from "yup";
import Dropzone from '../../react-dropzone';
import Thumb from './Thumb';
// import Recaptcha from "../Recaptcha";
import Recaptcha from "react-recaptcha";

const dropzoneStyle = {
  width: "100%",
  height: "auto",
  borderWidth: 2,
  borderColor: "rgb(102, 102, 102)",
  borderStyle: "dashed",
  borderRadius: 5,
}

export default class Qfile extends Component{
  
  componentDidMount(){
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    console.log(yup);
  }

  render() {
    return (
      <div className="container">
        <Formik
          initialValues={{
            names: "",
            emailAddress: "",
            photo: null,
            attachments: [],
            recaptcha: "",
          }}
          onSubmit={async (values) => {
            let formData = new FormData();

            formData.append("names", values.name);
            formData.append("emailAddress", values.email);
            formData.append("photo", values.photo);
            
            for (let i = 0; i <= values.attachments.length; i++) {
              formData.append(`attachments[${i}]`, values.attachments[i]);
            }

            formData.append("recaptcha", values.recaptcha);

            // you would submit with fetch for example
            // const res = await fetch("posturl", { method: "POST", body: formData });
            // Do whatever on the sever
            alert("Form submitted!");
            console.log(formData.get("names"));
            console.log(formData.get("emailAddress"));
            console.log(formData.get("photo"));
            console.log(formData.get("recaptcha"));
          }}
          // validationSchema={yup.object().shape({
          //   names: yup.string().required(),
          //   emailAddress: yup.string().email().required(),
          //   recaptcha: yup.string().required(),
          // })}
          render={({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="names">Name</label>
                <input id="names" name="name" type="text" className="form-control"
                  value={values.name} onChange={handleChange} />
                {errors.name && touched.name && (
                  <p>{errors.name}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="emailAddress">E-mail</label>
                <input id="emailAddress" name="email" type="email" className="form-control"
                  value={values.email} onChange={handleChange} />
                {errors.email && touched.email && (
                  <p>{errors.email}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="photo">Photo</label>
                <input id="photo" name="photo" type="file" className="form-control"
                  onChange={(e) => {
                    setFieldValue("photo",e.currentTarget.files[0]);
                  }} />
              </div>

              <div className="form-group">
                <label>Multiple files</label>
                <Dropzone style={dropzoneStyle} accept="image/*" onDrop={(acceptedFiles) => {
                  // do nothing if no files
                  if (acceptedFiles.length === 0) { return; }

                  // on drop we add to the existing files
                  setFieldValue("attachments", values.attachments.concat(acceptedFiles));
                }}>
                  {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                    if (isDragActive) {
                      return "This file is authorized";
                    }

                    if (isDragReject) {
                      return "This file is not authorized";
                    }

                    if (values.attachments.length === 0) {
                      return <p>Try dragging a file here!</p>
                    }

                    return values.attachments.map((file, i) => (<Thumb key={i} file={file} />));
                  }}
                </Dropzone>
              </div>

              <div className="form-group">
                <label>Recaptcha Validation</label>
                <Recaptcha
                  sitekey="6Le2nREUAAAAALYuOv7X9Fe3ysDmOmghtj0dbCKW"
                  render="explicit"
                  theme="dark"
                  verifyCallback={(response) => { setFieldValue("recaptcha", response); }}
                  onloadCallback={() => { console.log("done loading!"); }}
                />
                {errors.recaptcha
                  && touched.recaptcha && (
                    <p>{errors.recaptcha}</p>
                  )}
              </div>

              <button type="submit" className="btn btn-primary">submit</button>
            </form>
          )} />
      </div>
    );
  }

}