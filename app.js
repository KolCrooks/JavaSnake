let express = require('express');
let fs = require('fs');
let Sequelize = require('sequelize')
let app = express();
const Model = Sequelize.Model;
class HS extends Model {}
HS.init({
  // attributes
  id: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.NUMBER
  },
  score: {
    defaultValue: 0,
    allowNull: false,
    type: Sequelize.NUMBER
  }
}, {
  sequelize,
  modelName: 'hs'
  // options
});
app.get('/get',(req,res)=>{
    HS.findOrCreate(
        {where:{id:0}}
    ).then((val,created)=>{
        res.send(val.score + "")
    })

});

app.get('/post',(req,res)=>{
    HS.update({score:req.headers.score}, {where:{id:0}}).then(()=>{
        res.send("success");
    })
});

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
  });

app.listen(process.env.PORT || 3000, console.log("Server running on port 3000!"));