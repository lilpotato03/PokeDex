import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";
import { execPath } from "process";
import axios from "axios";
import { createBrotliDecompress } from "zlib";
const __dirName=dirname(fileURLToPath(import.meta.url));
const app=express();
const port=3000;
const API_URL='https://pokeapi.co/api/v2'
let c_index=0;
app.use(bodyParser.urlencoded({extended:"true"}));
app.use(express.static("public"));
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server started at port:${port}`);
})
app.get("/",(req,res)=>{
    res.render('index.ejs',{content:"Welcome to pokedex,Please enter the name of a pokemon."});
});
app.post('/submit',async (req,res)=>{
    const url=API_URL+"/pokemon/"+req.body.name+"/";
    try{
        const result=await axios.get(url,{});
        const data=result.data;
        //console.log(data);
        console.log(data.id);
        c_index=data.id;
        await res.render('index.ejs',{content:data.name,
                                    img:data.sprites["front_default"]});
    }
    catch(error){
        console.log(error);
        res.render('index.ejs',{content:"Cannot fetch that at this momment :("});
    }
});
app.post('/next',async (req,res)=>{
    c_index=c_index+1;
    const url=API_URL+"/pokemon/"+c_index+"/";
    try{
        const result=await axios.get(url,{});
        const data=result.data;
        //console.log(data);
        console.log(data.id);
        await res.render('index.ejs',{content:data.name,
                                    img:data.sprites["front_default"]});
    }
    catch(error){
        console.log(error);
        res.render('index.ejs',{content:"Cannot fetch that at this momment :("});
    }

})
app.post('/prev',async (req,res)=>{
    if(c_index!=0){
        c_index=c_index-1;
    }
    const url=API_URL+"/pokemon/"+c_index+"/";
    try{
        const result=await axios.get(url,{});
        const data=result.data;
        //console.log(data);
        console.log(data.id);
        await res.render('index.ejs',{content:data.name,
                                    img:data.sprites["front_default"]});
    }
    catch(error){
        console.log(error);
        res.render('index.ejs',{content:"Cannot fetch that at this momment :("});
    }

})