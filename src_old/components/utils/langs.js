import langs from './langs.json';

/*function getCountry(){
	return country;
}*/

// Parse document.documentElement.lang to full country name
function docLangFull(){
	//let arrCountry = [];
	let docLang = document.documentElement.lang; // .toUpperCase();
	let result;
	
	langs.forEach(el => {
		// arrCountry.push(Object.values(el));
		if(el.alpha2 === docLang){
			result = el.English;
		}
		/*else{
			result = "NOT AVAILABLE";
		}*/
		//result = el.alpha2;
	});
	return result;
	//return [result,docLang];// arrCountry
}

export {
	langs, docLangFull
}