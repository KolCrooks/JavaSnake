//Lib Stuff
let express = require('express');
let fs = require('fs');
let Sequelize = require('sequelize')
let app = express();

//Create the model for the database
const Model = Sequelize.Model;
class HS extends Model {}

//Setup database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

//Define the model
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
});

//Set route for getting highscore
app.get('/get',(req,res)=>{

  //get highscore
    HS.findOrCreate(
        {where:{id:0}}
    ).then((val,created)=>{
        console.log(val[0].dataValues)
        //Send response
        res.send(val[0].dataValues.score + "")
    })

});

//Set route for setting new highscore
app.get('/post',(req,res)=>{

  //Sets highscore
    HS.update({score:req.headers.score}, {where:{id:0}}).then(()=>{
        res.send("success");
    })
});

//Sync Database
sequelize.sync();

//Setup server
app.listen(process.env.PORT || 3000, console.log("Server running on port 3000!"));