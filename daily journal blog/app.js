const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const  _=require("lodash")
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
//

let posts = [];
//chalenge 1

//Chanleng 2
const homeStartingContent =
  "WebWelcome to hundreds of the best articles on self-improvement, productivity, relationships and living a better life. You can browse the articles by topic, by date, or search by keyword";
const aboutContent =
  "Content can be delivered via many different media including the Internet, cinema, television, radio, smartphones, audio CDs, books, e-books, magazines, and live events, such as speeches, conferences, and stage performances.";
const contactContent =
  "As food contact articles are used in cooking, eating and drinking, it is essential that they are safe to use and will not transfer any hazardous chemicals into the food during use. These ";

app.get("/", function (req, res) {
  // res.send("<h1>This is my project </h1>")
  res.render("home", { homeStartingContent: homeStartingContent, Posts:posts });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});
app.get("/contact", (req, res) => {
  res.render("contact", { contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});
app.get("/post/:topic", (req,res)=>{
    const requestTitle=_.lowerCase(req.params.topic);
    posts.forEach(function(post){
   const storTitle=_.lowerCase(post.title);
   if(storTitle===requestTitle){
    res.render("blog", {title:post.title, content:post.content})
console.log("Match found")
   }else{
    console.log("Not found")
   }
    })
})
// chalenge 11 post request for copose
app.post("/compose", (req, res) => {
  const post = {
    title: req.body.posttitle,
    content: req.body.postcontent,
  };

  posts.push(post);
  res.redirect("/");
   
});

app.get('/images', (req, res) => {
  Image.find({}, (err, images) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(images);
  });
});


app.listen(3000, function () {
  console.log("Server is running port 3000");
});
