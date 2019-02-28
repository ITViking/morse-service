const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 5000;
let messageCounter = 0;

app.use(bodyParser.urlencoded({
    extended: true
  }))
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



app.get('/', function(req,res) {
    let dataToSend = [];
    let files = [];

    files = fs.readdirSync('./data');

    files.forEach(file => {
        let content = fs.readFileSync(__dirname + '/data/' + file, 'utf8');
        let obj = JSON.parse(content);
        console.log(obj);
        dataToSend.push({ip: obj["ip"], message: obj["message"]});
    });

    res.contentType('application/json; charset=utf-8');
    res.json(dataToSend);
    res.end();
});

app.post('/', function(req, res) {
    let ip = req.connection.remoteAddress;
    var dataToSave = {
        ip
    }

    dataToSave.message = req.body.message;

    let dataString = JSON.stringify(dataToSave);

    fs.writeFile(`./data/${messageCounter}.json`,dataString, function(err) {
        if(err) {
            console.log(err);
        }
        console.log(`add'ed ${dataString} to file`);
        messageCounter++;
    });

    res.status(200).send('ok');
    res.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`));

