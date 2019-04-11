const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

// database init, "my project" is the name of the database
const dbName = 'myproject';   
const url = 'mongodb+srv://abdullah_138:mongoDbMA@ssms-01-11gdw.mongodb.net/test?retryWrites=true'

module.exports.addUser = function (account){

    MongoClient.connect(url, { useNewUrlParser: true }, (err,client)=>{
        if(err){
            console.log("Unable to connect to the server",err);
        }
        console.log("Connect to server successfully.");

        const db = client.db(dbName); 

        insertDocuments(db,account, function() {
            client.close();
        });
    });     
    const insertDocuments = function(db, account, callback) {
        // Get the documents collection
        const collection = db.collection('Admins');
        
        const saltRounds = 10;
        //hash the password through bcyrpt 
        bcrypt.hash(account.password,saltRounds).then(function (hash) {
            
            account.password = hash;

            collection.insertOne(account, function(err, result) {
                if(err) throw err;
                console.log("Inserted 1 documents into the collection");
                callback();
            });
        });
    }
}

module.exports.validUser = function(account,call){
    
    var status = "undefined";

    MongoClient.connect(url, { useNewUrlParser: true }, (err,client)=>{
        if(err){
            console.log("Unable to connect to the server",err);
        }
        console.log("Connect to server successfully.");

        const db = client.db(dbName); 

        authUser(db,account);

        client.close();
        
    }); 
    
    var authUser = function(db, account){
       
        // Get the documents collection
        const collection = db.collection('documents');
        
        collection.findOne({"username":account.username},(err,items)=>{
            
            if(items == null){
                status = "user does not exists!";
            }
            else if(!bcrypt.compareSync(account["password"], items["password"])){
                status = "invalid password!";
            }
            else{
                status = "login successfully";
            }

            call(status);
        });
    }
}