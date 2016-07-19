var model = require('../model/generico.js');

//Informações do banco
var info = {table:'tbusuario', pk: 'cdUsuario'};
//Dados para validaçao.
var validar = {
	'cdUsuario': {validar: 'isInt,isEmpty'},
	'stNome': {validar: 'isNotNull', function: 'isStrToUpper'},
	'stEmail': {validar: 'isNotNull,isEmail', function: 'isLowerCase'},	
	'stTelefone': {validar: 'isPhone'},
	'stSenha': {validar: 'isNotNull', function: 'isMd5'},
	'stStatus' : {value : 0}
};

module.exports = function(app) {

  var Ctrl = {
    list: function(req, res){
		model.list(info, req, res, function(resp){
			res.json(resp)
		})
	}
	,
	get: function(req, res){	
		model.get(info, req, res, function(resp){
			res.json(resp)
		});
	},
	save: function(req, res){                            
		model.save(info, validar, req, res, function(resp){
			res.json(resp);
		});
	},
	update: function(req, res){	
		model.update(info, validar, req, res, function(resp){
			res.json(resp)
		});
	},
	delete: function(req, res){
		model.delete(info, req, res, false, function(resp){
			res.json(resp)
		});
	}
  };

  return Ctrl;
};
