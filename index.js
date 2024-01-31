const fs = require('fs');
const path = require('path');
const express = require('express');
const serveIndex = require('serve-index');
const app = express();
const port = process.env.PORT || 8080;
const backup = 'http://banner.rc24.xyz';
const bannerdir = path.join(__dirname, 'banners');

let index = serveIndex(bannerdir, {
    'view': 'details'
});

function error404(req, res) {
    console.log('sent 404: %s', req.originalUrl);
    res.status(404).send('404');
}

app.get('/', index);

app.get('/healthcheck', (req, res) => {
    res.send('healthy');
});

app.get('/:file([A-Za-z0-9]*\.bnr)', (req, res) =>{
    let filename = path.join(bannerdir, req.params['file']);
    fs.stat(filename, (err, _) => {
        if(err){
            console.log(req.params['file'], `redirecting request to ${backup}`);
            res.redirect(`${backup}${req.originalUrl}`);
        }
        else{
            console.log(req.params['file']);
            res.sendFile(filename);
        }
    });
});

app.use(error404);

process.on('SIGTERM', app.listen(port, () => console.log(`Banner app listening at http://localhost:${port}`)).close);