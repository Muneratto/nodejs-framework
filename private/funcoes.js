'use strict';
var md5 = require('md5');
/*exports.getUrl = function(url){

	var aUrl = url.split('/'); //explode a url em array
	return aUrl;
}*/

module.exports = {

	  getUrl: function getUrl(url){  
  		var aUrl = url.split('/'); //explode a url em array
		  return aUrl;
  	},
  	isStrToUpper: function isStrToUpper(str){
  		return str.toUpperCase();
  	},
  	isLowerCase: function isLowerCase(str){
  		return str.toLowerCase();
  	},
  	isConverte: function isConverte(str, funcao){
		  return module.exports[ funcao ]( str );
  	},
    isMd5: function isMd5(str){
      return md5(str);
    }
}