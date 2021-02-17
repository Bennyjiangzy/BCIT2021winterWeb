/*
 Authors:
 Your name and student #: Benny Jiang A01158605
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs=require('fs');

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
// global variable 
let allMovies=[]

app.get("/", (req, res) => res.render("pages/index",{allMovies:allMovies}));

app.get("/myForm", (req, res) => res.render("pages/myForm"));


app.post("/myForm", (req, res) => {
  // Add your implementation here 
  // extract the value from text area
  const movieslist =req.body;
  //test the value 
  console.log(req.body);
  // split the value by , and put them in the list allMovies
  allMovies = movieslist.movies.split(',');
  // send the allMovies list to the index.ejs and send the index.ejs to the browser
  res.render('pages/index',{allMovies:allMovies})
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  // extract the two names from URL
  let Fmovie=req.query.movie1
  let Smovie=req.query.movie2
  // re-write the list otherwiss otherwise will overlap the html
  let allMovies=[]
  // put the two names in the list
  allMovies.push(Fmovie,Smovie)
  //test the values
  console.log(allMovies)
  // send the allMovies list to the index.ejs and send the index.ejs to the browser
  res.render('pages/index',{allMovies:allMovies})
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here

  // extract the name from URL
  let themovieName=req.params.movieName
  // read the file
  fs.readFile('movieDescriptions.txt', (err,data)=>{
    // error messages
    if(err){
      return console.log(err)
    } 
    // split the context by \n and textfile will be a list ['name:description','etc..']
    let textfile=data.toString().split('\n')
    //create an object to put the name and description 
    let movieDesobj={}
    
    // loop the elements in the textfile 
    for(let i = 0; i < textfile.length;  i++ ){
      // put the {name:'desciption',ect...} in the movieDesobj
      let SpliteMoveName = textfile[i].split(':')[0]
      let SplitMovede=textfile[i].split(':')[1]
      movieDesobj[SpliteMoveName.toLowerCase()]=SplitMovede

    };
    // test the value is correct
    console.log(movieDesobj);
    // send the movieDesobj and themovieName to the searchResult.ejs and send the searchResult.ejs to the browser
    res.render('pages/searchResult',{
      movieDesobj:movieDesobj,
      themovieName:themovieName.toLowerCase()
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});