import React,{Component} from "react";
import {Helmet} from "react-helmet";
//import {setStorage, getStorage} from "../components/utils/Qutils";

export default class Head extends Component{
	/*constructor(props){
		super(props);
		this.state = {
			langHtml: ""
		};
	}*/
	
	//componentDidMount(){
		//console.log('componentDidMount in Head');
		
		/*const getLang = getStorage('lang');
		if(getLang){
			console.log('OK');
			this.setState({langHtml: getLang});
		}*/
		
    // SET language to localStorage
		//if(navigator && navigator.cookieEnabled && window.localStorage){
		//	setStorage('lang',document.documentElement.lang);
		//}
	//}

// DEV remove meta description
  onChange = (newState, addedTags, removedTags) => {
    const desc = document.head.querySelector('#metaDesc');// meta[name="description"]
    if(desc && (this.props.metaDesc === desc.content)){
      //console.log('remove desc http render');
      //if(desc){
        //console.log(desc);//
        desc.remove();
      //}
    }

    // console.log('newState',newState);
    // console.log('addedTags',addedTags);
    // console.log('removedTags',removedTags);
    if((addedTags && addedTags.scriptTags) && this.props.callbackAddedTags){
      // console.table(addedTags.scriptTags);
      this.props.callbackAddedTags();
    }
  }

  render(){
		//const {langHtml} = this.state;
    const {title, base, lang, htmlClass, bodyClass, metaDesc, hrefAlt, alternates, children} = this.props;
    const name = "Q-Admin-React";

    return (
      <Helmet
        defaultTitle={name}
        titleTemplate={`%s - ${name}`}

        // DEV remove meta description
        // (newState, addedTags, removedTags) => console.table(newState, addedTags, removedTags)
        onChangeClientState={(newState, addedTags, removedTags) => this.onChange(newState, addedTags, removedTags)}
      >
        {/* document.documentElement.lang */}
        {(lang || htmlClass) && <html lang={lang ? lang : "id"} className={htmlClass} />}
        {base && <base href={base} />}
        {metaDesc && <meta name="description" content={metaDesc} />}
        {title && <title>{title}</title>}

        {bodyClass && <body className={bodyClass} />}

        {/* Twitter */}
        {/*<meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@getbootstrap" />
        <meta name="twitter:creator" content="@getbootstrap" />
        <meta name="twitter:title" content="Modal" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" content="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-social-logo.png" />*/}

        {/* Facebook */}
        {/*<meta property="og:url" content="https://getbootstrap.com/docs/4.3/components/modal/" />
        <meta property="og:title" content="Modal" />
        <meta property="og:description" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="http://getbootstrap.com/docs/4.3/assets/brand/bootstrap-social.png" />
        <meta property="og:image:secure_url" content="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-social.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />*/}

        {(hrefAlt && alternates) && 
          alternates.map(v =>
            <link
              key={v}
              rel="alternate"
              href={`${hrefAlt}${v.lang !== "x-default" ? `?hl=${v.lang}` : ""}`}
              hrefLang={v.lang}
            />
          )
        }

        {/*<link rel="alternate" href="https://www.instagram.com/" hreflang="x-default" />
          <link rel="alternate" href="https://www.instagram.com/?hl=en" hreflang="en" />*/}

        {children}
      </Helmet>
    );
  }
}
