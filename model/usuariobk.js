'use strict';

var dao = require('../private/dao.js');
var util = require('../private/util.js');

//Informações do banco
var info = {table:'tbusuario', pk: 'cdUsuario'};
//Dados para validaçao.
var validar = {
	'cdUsuario': {campo: 'key', validar: 'isInt,isEmpty'},
	'stEmail': {campo: 'email', validar: 'isEmpty'}
};

exports.list = function(req, res, callback){
	dao.fetchAll(info, res, req, function(res){
		callback(res);
	});
};

exports.get = function(req, res, callback){
	dao.get(info, req, res, function(res){
		callback(res);
	});
};

exports.save = function(req, res, callback){

	var campos = req['body'];
	var validation = util.validation(campos, validar);

	if(validation['status'] == 'sucesso'){
		dao.save(info, campos, function(res){
			callback(res);		
		});		
	} else {
		callback(validation);
	}
};

exports.update = function(req, res, callback){

	var campos = req['body'];
	var validation = util.validation(campos, validar);

	if(validation['status'] == 'sucesso'){
		dao.update(info, campos, function(res){
			callback(res)			
		});		
	} else {
		callback(validation);
	}
}


exports.delete = function(req, res, callback){

	var campos = req['body'];

	dao.delete(info, campos, false, function(res){
		callback(res)			
	});		
}