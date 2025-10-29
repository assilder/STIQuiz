const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// جلب Leaderboard
app.get('/leaderboard', (req,res)=>{
  fs.readFile('leaderboard.json','utf8',(err,data)=>{
    if(err) return res.json([]);
    res.json(JSON.parse(data));
  });
});

// إضافة score جديد
app.post('/leaderboard', (req,res)=>{
  const {name, score} = req.body;
  if(!name || score == null) return res.status(400).json({error:"Missing data"});
  
  fs.readFile('leaderboard.json','utf8',(err,data)=>{
    let scores = [];
    if(!err) scores = JSON.parse(data);
    
    scores.push({name, score});
    scores.sort((a,b)=>b.score-a.score);
    scores = scores.slice(0,10); // أعلى 10 فقط
    
    fs.writeFile('leaderboard.json', JSON.stringify(scores,null,2), ()=>{
      res.json(scores);
    });
  });
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
