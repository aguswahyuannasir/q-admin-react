/**
	Bind multiple component methods:
	* @param {this} context
	* @param {Array} functions
	constructor(){
		...
		bindMethods.call(this,['handleClick','handleOther']);
}*/
// FOR bind method
function bindMethods(funcs){
	funcs.forEach(f => (this[f] = this[f].bind(this)));
}

function addEvent(target, e, func, call, useCapture){
	target.addEventListener(e, func, call, useCapture);
}

function removeEvent(target,e,func,useCapture){
	target.removeEventListener(e,func,useCapture);
}

function getStorage(key){
	return localStorage.getItem(key);
}

function setStorage(key,val){
	return localStorage.setItem(key,val);
}

function removeStorage(key){
	return localStorage.removeItem(key);
}

 // FOR Set one / multi attribute element
function setAttr(el, attr){
	if(isObj(attr)){ // attr && typeof attr === "object" && attr.constructor === Object
		let arr = Object.keys(attr);

		arr.forEach(i => {
			el.setAttribute(i, attr[i]);
		});
	}else{
		console.warn('setAttr() : params 2 must object');
	}
}

function isStr(v){
	return typeof v === 'string' || v instanceof String;
}

function isArray(v){
	return v && typeof v === 'object' && v instanceof Array;// v.constructor === Array
}

function isObj(v){
	return v && typeof v === 'object' && v.constructor === Object;
}

// FOR check mobile device
function isMobile(){
  return !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function dateToStr(dt){
	let date = new Date(dt);
	return date.toDateString();
}

function dateLocale(dt,lang){
	let d = new Date(dt),
			y = d.getFullYear(),
			date = d.getDate(),
			m = d.getMonth();//  + 1
			
	let dateUTC = new Date(Date.UTC(y, m, date));
	let ops = {weekday:'long', year:'numeric', month:'long', day:'numeric'};

	//let res = dateUTC.toLocaleDateString('id-ID', ops);
	//console.log(res);
	return dateUTC.toLocaleDateString(lang, ops);// res
}

function winOpen(e, url, name){
	if(e) e.preventDefault();
	let left = (window.screen.width - 550) / 2;// (screen.width - myWidth) / 2;
	let top = (window.screen.height - 350) / 2;
	return window.open(url, name,'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=550,height=350,top='+top+',left='+left);
	//console.log(e.target);
}

// DEV get OS version
// https://gist.github.com/panslaw/4663783
function getOsVersion(os){
	//let os;
	
	/*switch(navigator.userAgent){
		case "NT 5.1":
			os = "XP";
			break;
		case "NT 6.0":
			os = "VISTA";
			break;
		case "NT 6.1":
			os = "7";
			break;
		case "NT 6.2":
			os = "8";
			break;
		case "NT 10":
		case "NT 10.0":
			os = "10";
			break;
		default:
			break;
	}*/
	
	//let getNT = navigator.userAgent.includes()
	
	return navigator.userAgent.includes(os);// os;
}

/*export function storageAvailable(type){
	try{
		var storage = window[type],
				x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e){
		return e instanceof DOMException && (
			// everything except Firefox
			e.code === 22 ||
			// Firefox
			e.code === 1014 ||
			// test name field too, because code might not be present
			// everything except Firefox
			e.name === 'QuotaExceededError' ||
			// Firefox
			e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
			// acknowledge QuotaExceededError only if there's something already stored
			storage.length !== 0;
	}
}*/

// FOR add previous URL
/*export function addPrevURL(){
	let urlNow = window.location.href,
			ori = window.location.origin;
	if((!localStorage.prevURL || localStorage.prevURL !== urlNow) && document.title !== "PAGE NOT FOUND 404"){
		let url = urlNow.replace(ori,"");
		localStorage.setItem("prevURL",url);
	}
}*/

// Properties
/*export let SHARES = [
	{color:"primary",icon:"facebook-box",txt:"Facebook",link:"http://localhost/ci_qr/",titleShareWindow:"Facebook"},
	{color:"danger",icon:"instagram",txt:"Instagram",link:"https://programmeria.com",titleShareWindow:"Instagram"},
	{color:"success",icon:"whatsapp",txt:"WhatsApp",link:"http://localhost/q_ui/",titleShareWindow:"WhatsApp"}
];*/

// DATA:
const winLoc = window.location;

const SOS_AUTH = [
	{c:"danger", sos:"google"}, // , url:"google"
	{c:"primary", sos:"facebook"}, // , url:"facebook"
	{c:"danger", sos:"instagram"}, // , url:"instagram"
	{c:"info", sos:"twitter"} // , url:"twitter"
];

export {
	bindMethods, addEvent, removeEvent, getStorage, setStorage, removeStorage, 
	dateToStr, dateLocale, winOpen, setAttr, isStr, isArray, isObj, isMobile, getOsVersion,
	
	// DATA:
	winLoc, SOS_AUTH
};