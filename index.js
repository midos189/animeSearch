import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
const app=express();
const port=3000;
const apiUrl="https://api.jikan.moe/v4";
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("index.ejs");
});
app.post("/search",async(req,res)=>{ 
    try{
    const response = await axios.get(`${apiUrl}/anime?q=${req.body.animeName}&page=${req.body.currentPage}&limit=18`);
    const result = response.data;
    res.render("index.ejs", { data: result,aName:req.body.animeName });
}catch(error){
    res.render("index.ejs", { error: error.message });
}
});
app.get("/info",async(req,res)=>{
    try{
        const response = await axios.get(`${apiUrl}/anime/${req.query.id}`);
        const result = response.data;
        res.render("anime.ejs",{data:result});
    }catch(error){
        res.render("index.ejs", { error: error.message });
    }
});
app.listen(port,()=>{
    console.log(`app listening on port : ${port}`);
});