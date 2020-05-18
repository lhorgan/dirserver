const { readdirSync } = require('fs')
const root_dir = "/home/luke/Documents/h6/";
const lineByLine = require('n-readlines');

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const getFiles = source =>
    readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isFile())
      .map(dirent => dirent.name)

const express = require('express')
const app = express()
const port = 3000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// respond with "hello world" when a GET request is made to the homepage
app.get('/domains', function (req, res) {
    let folders = getDirectories(root_dir);
    let resStr = "";
    for(let i = 0; i < folders.length; i++) {
        resStr += `<a href="/domain/${folders[i]}">${folders[i]}</a><br />`;
    }
    res.send(resStr);
})

app.get('/domain/:domain', function(req, res) {
    let files = getFiles(root_dir + req.params["domain"]);
    let resStr = "";
    for(let i = 0; i < files.length; i++) {
        resStr += `<a href="/domain/${req.params["domain"]}/url/${files[i]}">${files[i]}</a><br />`;
    }
    res.send(resStr);
});

app.get('/domain/:domain/url/:url', function(req, res) {
    let fullName = root_dir + req.params["domain"] + "/" + req.params["url"];

    let readstream = new lineByLine(fullName);
    resp = "";
    let ctr = 0;
    while(true) {
        let line = readstream.next();
        if(!line) {
            break;
        }
        if(ctr > 0) {
            resp += line;
        }
        ctr++;
    }
    res.send(resp);
});