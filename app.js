//MODULES//
const express= require("express");
const bodyparser= require("body-parser");
const ejs =require("ejs");
const _=require("lodash")
const app= express()
//APPS//
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}))
//CONTENT//
const homestconst="Looking started he up perhaps against. How remainder all additions get elsewhere resources. One missed shy wishes supply design answer formed. Prevent on present hastily passage an subject in be. Be happiness arranging so newspaper defective affection ye. Families blessing he in to no daughter."
const contactconst="In entirely be to at settling felicity. Fruit two match men you seven share. Needed as or is enough points. Miles at smart no marry whole linen mr. Income joy nor can wisdom summer. Extremely depending he gentleman improving intention rapturous as."
const aboutconst="Be me shall purse my ought times. Joy years doors all would again rooms these. Solicitude announcing as to sufficient my. No my reached suppose proceed pressed perhaps he. Eagerness it delighted pronounce repulsive furniture no. Excuse few the remain highly feebly add people manner say. It high at my mind by roof. No wonder worthy in dinner."
posts=[]
let path=''
//logic//
app.get("/",function(req,res){
    res.render('index',{hsc:homestconst,listpost:posts,path:path})
})
app.get("/about",function(req,res){
    res.render('about',{ac:aboutconst})

})
app.get("/contact",function(req,res){
    res.render('contact',{cc:contactconst})

})

app.get("/compose",function(req,res){
    res.render('compose')
    
})


app.post("/",function(req,res){
    const title=req.body.title
    const cnt=req.body.content
    var post={title:title,post:cnt,url:_.kebabCase(title)}
    posts.push(post)
    res.redirect("/")
})
app.get('/posts/:topic',function(req,res){
    path= _.kebabCase(req.params.topic)
    console.log(path)
    posts.forEach(function(element){
        if(_.kebabCase(element.title)==path){
            res.render("post",{elet:element.title,elep:element.post})
    }else{console.log("Match not found")}
})
res.redirect("/")
})
app.listen(3000,function(){
    console.log("server started on port 3000")
})