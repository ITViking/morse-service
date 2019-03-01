const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const SSE = require('sse');
const port = 5000;
let messageCounter = 0;
let newMessages = [];

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
    // let dataToSend = [];
    // let files = [];

    // files = fs.readdirSync('./data');

    // files.forEach(file => {
    //     let content = fs.readFileSync(__dirname + '/data/' + file, 'utf8');
    //     let obj = JSON.parse(content);
    //     console.log(obj);
    //     dataToSend.push({ip: obj["ip"], message: obj["message"]});
    // });

    // res.contentType('application/json; charset=utf-8');
    // res.json(dataToSend);

    res.send(200).end();
});

app.get('/messages', function(req,res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    setInterval(() => {
            let messageToSend = newMessages.pop();
            console.log(messageToSend);
            constructSSE(res, messageToSend);
    },200);

    constructSSE(res, {ip: "192.1312312", message: "what ever for ever"});

    function constructSSE(res, data) {
        if(data == null || data == undefined){
            return;
        }
        res.write(`data: {"ip": "${ data.ip }", "message": "${ data.message }" }` + '\n\n');
    };

})

app.post('/', function(req, res) {
    let ip = req.connection.remoteAddress;
    var dataToSave = {
        ip
    }

    dataToSave.message = req.query.message;

    let dataString = JSON.stringify(dataToSave);

    // fs.writeFile(`./data/${messageCounter}.json`,dataString, function(err) {
    //     if(err) {
    //         console.log(err);
    //     }
    //     console.log(`add'ed ${dataString} to file`);
    //     messageCounter++;
    // });

    res.status(200).send('ok');
    res.end();

    newMessages.push(dataToSave);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});


