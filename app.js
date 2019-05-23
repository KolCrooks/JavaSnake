let express = require('express');
let fs = require('fs');
let app = express();

app.get('/get',(req,res)=>{
    fs.readFile("scores.json",(err, buff)=>{
        if(err) return console.error(err);
        let content = JSON.parse(buff);
        res.send(""+content.score);
    })
});

app.get('/post',(req,res)=>{
    fs.readFile("scores.json",(err, buff)=>{
        if(err) return console.error(err);
        let content = JSON.parse(buff);
        if(content.score < req.headers.score)
        searchReplaceFile(/ (.*)/gm, " "+req.headers.score, "scores.json")
        else
            res.send("Already higher score");

    });

});

function searchReplaceFile(regexpFind, replace, cssFileName) {
    var file = fs.createReadStream(cssFileName, 'utf8');
    var newCss = '';

    file.on('data', function (chunk) {
        newCss += chunk.toString().replace(regexpFind, replace);
    });

    file.on('end', function () {
        fs.writeFile(cssFileName, newCss, function(err) {
            if (err) {
                return console.log(err);
            } else {
                console.log('Updated!');
            }
    });
});

app.listen(process.env.PORT || 3000, console.log("Server running on port 3000!"));