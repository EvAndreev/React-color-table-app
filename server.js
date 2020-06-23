const express = require('express');
let proxy = require('express-http-proxy');
const path = require('path');
const app = express();
const port = 80;

app.use('/out', express.static(path.resolve('./out')));
app.use('/assets', express.static(path.resolve('./assets')));
app.use('/api', proxy('https://dev.ramcorp.ru', {
    proxyReqPathResolver: (req) => {
        return `/api${req.url}`
    }
}));

app.get('/rest/get', (request, response) => {
    response.json({name: 'michael'});
});

app.get('/rest/get-error', (request, response) => {
    response.end({name: false});
});

app.post('/rest/post', (request, response) => {
    response.json({name: 'bohdan'});
});

app.post('/rest/post-error', (request, response) => {
    response.end({name: false});
});
app.get('/auth', (request, response) => {
    response.sendFile(path.resolve('./auth.html'));
});
app.get('/auth/*', (request, response) => {
    response.sendFile(path.resolve('./auth.html'));
});

app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://ramcorp.ru");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    res.sendStatus(204);
    res.end();
});

app.get('/test', (req, res) => {
    res.header("WWW-Authenticate", 'error="invalid_token"');
    res.header("Access-Control-Allow-Origin", "http://ramcorp.ru");
    res.sendStatus(401);
    // res.send({status: 'ok'})
});

app.get('*', (request, response) => {
    response.sendFile(path.resolve('./index.html'));
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});
