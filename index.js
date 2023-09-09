
const express = require('express')
const bodyParser = require("body-parser");
const axios=require('axios')
// const nodemailer=require('nodemailer')
const app = express()
app.use(bodyParser.json());
app.use(express.static('public'))
const port = process.env.PORT ||8770
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const File=require('./files')
const User =require('./user')
const fs = require('fs');
const path = require('path'); 
const uri = 'mongodb+srv://web1234:web1234@clusternewz.o2wezdx.mongodb.net/?retryWrites=true&w=majority';
const mongoose = require('mongoose');
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
    
    const db = mongoose.connection;
    // const collection = db.collection('drydatas');
    db.on('error', function(err){
        console.log(err);
      });

  })
  .catch((err) => {
    console.log(err);
  });



  app.post('/signup', async(req, res) => {
    const newItem = new User({
      user_id: req.body.usid,
      name: req.body.Usr,
    password: req.body.passwd,
   email: req.body.Mail,
    });
    try {
        const item = await newItem.save();
        res.send({"data":1});
      } catch (err) {
        console.log(err);
        res.send({"data":0});
      }
  });





  app.post('/login', async (req, res) => {
    console.log(req.body.Center)
    console.log(req.body.Pass)
    try {
      const item = await User.find({name:`${req.body.Center}`,password:`${req.body.Pass}`});
      if (item.length==0) {
        res.send({"data":0,"itm":item});
      } else {
        res.send({"data":1,"itm":item});
      }
    } catch (err) {
      console.log(err);
      res.send({"data":99,"itm":err});
    }
  });


  app.post('/langsel', async (req, res) => {
  
    try {
        const options = {
            method: 'GET',
            url: 'https://online-code-compiler.p.rapidapi.com/v1/languages/',
            headers: {
              'X-RapidAPI-Key': 'b38251f12dmsh1e354647d127793p1fe19ejsnd617ffc74cff',
              'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              res.send({"itm":response.data,"data":1});
          } catch (error) {
              console.error(error);
          }
    } catch (err) {
      console.log(err);
      res.send({"data":99,"itm":err});
    }
  });


  app.post('/output', async (req, res) => {
  // console.log(req.body.lang,req.body.code)
    const options = {
        method: 'POST',
        url: 'https://online-code-compiler.p.rapidapi.com/v1/',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'b38251f12dmsh1e354647d127793p1fe19ejsnd617ffc74cff',
          'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
        },
        data: {
          language: req.body.lang,
          version: 'latest',
          code: req.body.code,
          input:req.body.input
        }
      };
      
      try {
          const response = await axios.request(options);
          res.send({"data":1,"itm":response.data});
      } catch (error) {
        res.send({"data":0,"itm":error});
      }
  });


  app.post('/save', async (req, res) => {
    var uid=''
          var digits='1234567890'
          
          for (let j = 0; j < 7; j++) {
              uid += digits[Math.floor(Math.random() * 10)];
            }


    const newItem = new File({
      user_id: req.body.usid,
      file_id: uid,
    file_name: req.body.fname,
   language: req.body.langua,
   input:{"input":req.body.input}
    });
    try {
        const item = await newItem.save();
        let folderPath='C:/webcompile/public/codes'
        // let ext=req.body.langua.split("-");
        const filePath = path.join(folderPath, `${uid}.txt`);
          fs.writeFile(filePath, req.body.cont, (error) => {
            if (error) {
              console.error("Error creating file:", error);
            } else {
              res.send({"data":1});
              console.log("File created successfully!");
            }
          });
        
        
      } catch (err) {
        console.log(err);
        res.send({"data":0});
      }
  });



  app.post('/fork', async (req, res) => {
  console.log(req.body.fid)
  console.log(req.body.userd)
  console.log(req.body.language)
    const newItem = new File({
      user_id: req.body.userd,
      file_id: req.body.fid,
    file_name: req.body.file_name,
   language: req.body.language,
   input:{"input":req.body.input}
    })
    try {
        const item = await newItem.save();
        let folderPath='C:/webcompile/public/codes'
        // let ext=req.body.langua.split("-");
        const filePath = path.join(folderPath, `${req.body.fid}.txt`);
          fs.writeFile(filePath, req.body.cont, (error) => {
            if (error) {
              console.error("Error creating file:", error);
            } else {
              res.send({"data":1});
              console.log("File created successfully!");
            }
          });
        
        
      } catch (err) {
        console.log(err);
        res.send({"data":0});
      }
  });


  app.post('/saveup', async (req, res) => {
 


   
    try {
      const filter = { file_id: req.body.fileid };
      const update = {language: req.body.langua,input:{"input":req.body.input} };
      const options = { new: true }; // Return the updated document
      const updatedItem = await File.findOneAndUpdate(filter, update, options);
      if (!updatedItem) {
        console.log(req.body.fileid)
        res.send({"data":99});
      }
      else{
        let folderPath='C:/webcompile/public/codes'
        // let ext=req.body.langua.split("-");
        const filePath = path.join(folderPath, `${req.body.fileid}.txt`);
          fs.writeFile(filePath, req.body.cont, (error) => {
            if (error) {
              console.error("Error creating file:", error);
              res.send({"data":0});
            } else {
              res.send({"data":1});
              console.log("File updated successfully!");
            }
          });
      }
        
      } catch (err) {
        console.log(err);
        res.send({"data":0});
      }
  });








  app.post('/saved', async (req, res) => {
    let id=req.body.usid;
    try {
      const item = await File.find({user_id:id});
      if (item.length==0) {
        res.send({"data":0,"itm":item});
      } else {
        res.send({"data":1,"itm":item});
      }
    } catch (err) {
      console.log(err);
      res.send({"data":99,"itm":err});
    }



  })

  app.post('/presaved', async (req, res) => {
    let id=req.body.uid;
    try {
      const item = await File.find({file_id:id});
      if (item.length==0) {
        res.send({"data":0,"itm":item});
      } else {
        let folderPath='C:/webcompile/public/codes'
       console.log(item);
        const filePath = path.join(folderPath, `${item[0].file_id}.txt`);
        fs.readFile(filePath, 'utf8', (error, data) => {
          if (error) {
            console.error("Error reading file:", error);
          } else {
            
            res.send({"data":1,"itm":item,"cont":data});
          }
        });
      }
    } catch (err) {
      console.log(err);
      res.send({"data":99,"itm":err});
    }



  })




  app.post("/userprofile", async (req, res) => {
    try {
      const item = await User.find({user_id:req.body.Sender});
      if (!item) {
        res.send({"data":0});
      } else {
        res.send({"itm":item});
      }
    } catch (err) {
      console.log(err);
      res.send({"data":99});
    }


  })


  app.post("/userupdate", async (req, res) => {
console.log(req.body.username)
console.log(req.body.pass)
console.log(req.body.Sender)
    const filter = { user_id: req.body.Sender };
      const update = {name: req.body.username,password:req.body.pass };
      const options = { new: true }; // Return the updated document
      const updatedItem = await User.findOneAndUpdate(filter, update, options);
      if (!updatedItem) {
        res.send({"data":0})
      }
      else{
        res.send({"data":1})
      }
  })





app.listen(port, () => {
    console.log('Server started on post ' + port)
})

