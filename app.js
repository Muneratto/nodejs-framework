var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('path');
var md5 = require('md5');
 
var app = express();
var port = process.env.PORT || 5000;
var uri = '/';

//Responsavel permitir resposta
var enableCORS = function(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token');
    
    if ('OPTIONS' == req.method){
        res.sendStatus(200);
    } else {
        //res.sendStatus(404);
        next();
    }
};

app.use(enableCORS);

//create application/json parser 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//view js to html
app.engine('html', require('ejs').renderFile);
app.set('views', ejs.join(__dirname, 'views'));
app.set('view engine', 'html');

//Rotas
var router = function(req, res, next){
    //Módulos do sistema
    //var modulo = ["", "usuario", "pessoa"];
    var url = req['url']; //url
    var aUrl = url.split('/'); //explode a url em array
    

    //if(modulo.indexOf(uri) != -1){
    if(aUrl[1]){

        var uri = aUrl[1];
        var controller = require('./controller/'+uri);
        controller = new controller();

        app.get('/'+uri, controller.list);
        app.get('/'+uri+'/'+aUrl[2], controller.get);
        app.post('/'+uri, controller.save);
        app.put('/'+uri, controller.update);
        app.delete('/'+uri, controller.delete);
        
    } else {
        res.sendStatus(404);
    }
    
    next();
}

app.use(router);


module.exports = app;
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);