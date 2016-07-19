var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'sistema'
});

connection.connect(function(error){
	if(error) {
	    console.log("Erro ao conectar no banco");  
	} else {
		console.log("banco de dados conectado.");
	}
});

module.exports = connection;