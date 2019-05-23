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
        fs.writeFile("scores.json",JSON.stringify({score: req.headers.score}), (err, buff)=>{
            if(err) return console.error(err);
            res.send("Saved Score");
        })
        else
            res.send("Already higher score");

    })

})

app.listen(3000, console.log("Server running on port 3000!"));