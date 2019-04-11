var db = require('../control/db.js');

var path = require('path');

module.exports = function(app){
    
    app.get('/', (req,res)=>{
        
    });
    
    app.get('/register', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'..') + '/public/register.html');
    });

    app.post('/', (req,res)=>{
        let account = {};
        account = { 
            "username":req.body.name,
            "password":req.body.password,
            "email":req.body.email 
        };
        
        db.addUser(account);
        
        res.sendFile(path.resolve(__dirname,'..') + '/public/index.html');
    });

    app.post('/dashboard', (req,res)=>{
        let account = {};
        account = {
            "username":req.body.name,
            "password":req.body.password
        };
        db.validUser(account,function(m){
            if (m == "success"){
                res.sendFile(path.resolve(__dirname,'..') + '/public/dashboard.html');
            }
            else{
                res.send(m);
            }
        });
    });
}
