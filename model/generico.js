'use strict';

var dao = require('../private/dao.js');
var funcoes = require('../private/funcoes.js');
var validator = require('../private/validator.js');

exports.list = function(info, req, res, callback){
	dao.fetchAll(info, res, req, function(res){
		callback(res);
	});
};

exports.get = function(info, req, res, callback){
	dao.get(info, req, res, function(res){
		callback(res);
	});
};

exports.save = function(info, validar, req, res, callback){

	var campos = req['body'];
	var validation = validator.validation(campos, validar, true);

	if(validation['status'] == 'sucesso'){
		for(var f in validar){
			//Setar function
			if(validar[f].function != undefined){
				campos[f] = funcoes.isConverte(campos[f], validar[f].function);
			}
			//Setar valor no campo
			if(validar[f].value != undefined){
				campos[f] = validar[f].value;
			}
		}
		dao.save(info, campos, function(res){
			callback(res);		
		});		
	} else {
		callback(validation);
	}
};

exports.update = function(info, validar, req, res, callback){

	var campos = req['body'];
	var validation = validator.validation(campos, validar, false);

	if(validation['status'] == 'sucesso'){
		for(var f in validar){
			if(validar[f].function != undefined && campos[f] != undefined){
				campos[f] = funcoes.isConverte(campos[f], validar[f].function);
			}
		}
		dao.update(info, campos, function(res){
			callback(res)			
		});		
	} else {
		callback(validation);
	}
}

exports.delete = function(info, req, res, del, callback){

	var campos = req['body'];

	dao.delete(info, campos, del, function(res){
		callback(res)			
	});		
}