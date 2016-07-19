var funcoes = require('./funcoes.js');

module.exports = {

	//Retorna mensagem dependendo do type
	msg: function msg(type, campo){
		switch(type) {
			case 'isNotNull':
			return 'O campo '+campo+' não pode ser vazio.';
			break;
			case 'isEmpty':
			return 'O campo '+campo+' precisa ser preenchido.';
			break;
			case 'isInt':
			return 'O campo '+campo+' precisa conter um numero inteiro, ex. 12345';
			break;
			case 'isEmail':
			return 'Precisa conter um endereço de e-mail válido, ex. exemple@exemple.com.br';
			break;
			case 'isData':
			return 'Precisa de uma data válida, ex. 00/00/0000';
			break;
			case 'isPhone':
			return 'Precisa de um telefone válido, ex. (00) 0000-0000';
			break;
			case 'isHex':
			return 'Cor hexdecimal inválida, ex. #000000';
			break;
			case 'isDataBR':
			return 'Data ou formato inválido, ex. 00/00/0000';
			break;
			case 'isDataHoraBR':
			return 'Data ou formato inválido, ex. 00/00/0000 00:00:00';
			break;
			case 'moedaBR':
			return 'Precisa ser um valor válido, ex. 1.000,00';
			break;
			default:
			return 'error inesperado.';
		}
	},
	// Valida email
	isEmail: function isEmail(email){
		 var ex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		 return ex.test(email);
	},
	// Valida email
	isData: function isData(data){
		var ex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/[12][0-9]{3}$/;
		return ex.test(data);
	},
	// Valida email
	isPhone: function isPhone(fone){
		var ex = /^(\(11\) (9\d{4})-\d{4})|((\(1[2-9]{1}\)|\([2-9]{1}\d{1}\)) [5-9]\d{3}-\d{4})$/;
		return ex.test(fone);
	},
	// Verifica se o campo esta vazio.
	isNotNull: function isNotNull(str){  
		if(str == undefined || str.length == 0){
			return false;
		} else {
			return true;				
		}
	},
	// Verifica se o campo esta vazio.
	isEmpty: function isEmpty(str){  
		if(str == ''){
			return false;
		}
		return true;
	},
	// Verifica se o valor é inteiro.
	isInt: function isInt(int){     
		if(int){
			return /^\d+$/.test(int);
		} else {
			return true;
		}
	}, 

	//Função de validação de campos
	validation: function validation(body, validar, op){

		var i = 0; //identificar quantidade de campos para validação
		var c = 0; //marcador do inicio da validação.

		for(a in validar){
			i++;
		}

		for(v in validar){

			if(validar[v]['validar'] != undefined){
				
				var aValidar = validar[v]['validar'];
				var aFuncao = aValidar.split(',');

				for(a in aFuncao){
					var _func = aFuncao[a];
					var rs = module.exports[ _func ](body[v]);

					if(op == false && body[v] == undefined){
						return {status: 'sucesso'};
					}

					if(rs == false){
						var msg = module.exports['msg'](_func, v);						
						return {status: 'error', msg:msg};
					}

					if(c == i){
						return {status: 'sucesso'};
					}
					c++;
				}

			} else {
				return {status: 'sucesso'};
			}		
		}	
	}

};