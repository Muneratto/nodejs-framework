var connection = require('./database.js');
var funcoes = require('../private/funcoes.js');

exports.fetchAll = function(json, req, res, callback){
	if(json['table']){
		connection.query('SELECT * FROM '+json['table'], function(error, rows, fields){
			callback(rows);
		})
	} else {
		callback({error:'A tabela não foi encontrada no json.'});
	}
}

exports.get = function(json, req, res, callback){
    var uri = funcoes.getUrl(req['url']);
    console.log(uri)
	if(json['table'] && json['pk'] && uri[2]){
		connection.query('SELECT * FROM '+json['table']+' WHERE stStatus != 3 &&'+json['pk']+' = ?', uri[2], function(error, rows, fields){
			if(rows.length == 0){
				callback({status: false, msg: 'Registro não encontrado.'});
			} else{
				callback(rows);
			}			
		})
	} else {
		callback({status: false, error:'A tabela não foi encontrada no json.'});
	}
}

exports.save = function(json, campo, callback){
	if(json['table']){
		connection.query('INSERT INTO '+json['table'] +' SET ?', campo, function(error, result, fields) {	
			if(!error){			 
				callback({status: true, msg: 'Cadastro realizado com sucesso.', id: result.insertId});
			} else {
				callback({status: false, msg: error.toString()});
			}
		});
	}
}

exports.update = function(json, campo, callback){
	if(!campo[json['pk']]){
		callback({status: false, msg: 'Chave primária inexistente.'})
	} else {
		var id = campo[json['pk']];
		if(json['table']){
			connection.query('UPDATE '+json['table']+' SET ? WHERE '+json['pk']+' = ?', [campo, id], function(error, result, fields) {	
				if(!error){			 
					callback({status: true, msg: 'Cadastro atualizado com sucesso.'});
				} else {
					callback({status: false, msg: error.toString()});
				}
			});
		}
	}	
}

exports.delete = function(json, campo, del, callback){
	if(!campo[json['pk']]){
		callback({status: false, msg: 'Chave primária inexistente.'})
	} else {
		var id = campo[json['pk']];
		if(json['table']){
			if(del == true){
				connection.query('DELETE FROM '+json['table']+' WHERE '+json['pk']+' = ?', id, function(error, result, fields) {	
					if(!error){			 
						callback({status: true, msg: 'Cadastro excluído com sucesso.'});
					} else {
						callback({status: false, msg: error.toString()});
					}
				});
			} else {
				connection.query('UPDATE '+json['table']+' SET stStatus = 3 WHERE '+json['pk']+' = ?', [id], function(error, result, fields) {	
					if(!error){			 
						callback({status: true, msg: 'Cadastro excluído com sucesso.'});
					} else {
						callback({status: false, msg: error.toString()});
					}
				});
			}			
		}
	}	
}