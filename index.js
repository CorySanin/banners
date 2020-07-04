const fs = require('fs');
const path = require('path');
const express = require('express');
const serveIndex = require('serve-index');
const app = express();
const port = 8080;
const backup = 'http://banner.rc24.xyz';
const bannerdir = path.join(__dirname, 'banners');

let index = serveIndex(bannerdir, {
    'view': 'details'
});

function error404(req, res) {
    console.log('sent 404: %s', req.originalUrl);
    res.status(404);
    res.send('404');
}

app.get('/', index);

app.get('/:file', (req, res) =>{
    let filename = path.join(bannerdir, req.params['file']);
    console.log(filename);
    fs.stat(filename, (err, stats) => {
        if(err){
            res.redirect(`${backup}${req.originalUrl}`);
        }
        else{
            res.sendFile(filename);
        }
    });
});

app.use(error404);

app.listen(port, () => console.log(`Banner app listening at http://localhost:${port}`));