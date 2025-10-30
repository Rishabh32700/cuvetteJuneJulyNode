// const math = require("./maths.js")
// console.log(math.sub(2, 5));

// const fs = require("fs")

// blocking code
// console.log("1");
// const result = fs.writeFileSync("./test.txt", "hello guys !!!")
// console.log("result = ", result);
// console.log("bye");

// console.log("1");
// const result = fs.readFileSync("test.txt", "utf-8")
// console.log("result = ",result);
// console.log("bye");
// console.log("bye");
// console.log("bye");
// console.log("bye");
// console.log("bye");

// non blocking code

// console.log("1");
// fs.writeFile("./test2.txt", "hello guys !!!", (err, result)=>{
//     console.log("result = ", result);
// })
// console.log("bye");
// console.log("bye");
// console.log("bye");
// console.log("bye");
// console.log("bye");
// console.log("bye");
// console.log("bye");
// console.log("bye");
// console.log("bye");

// console.log("1");
// fs.readFile("test.txt", "utf-8", (err, result)=>{
//     console.log("result = ",result);
// })
// console.log("bye");
// console.log("bye");
// console.log("bye");
// console.log("bye");
// console.log("bye");
// console.log("bye");
// console.log("bye");

// creating a webserver in node

const http = require("http");
const cors = require("cors");
const express = require("express")

const app = express()
app.use(cors())

app.get("/", (req, res)=>{
  res.send("hello from home page !!!");
})
app.get("/about", (req, res)=>{
  res.send("hello from about page !!!");
})
app.get("/contact-us", (req, res)=>{
  res.end("hello from contact-us page !!!");
})
app.get("/search", (req, res)=>{
  res.end(`search for ${req.query.search_query}`);
})

app.get("/signup", (req, res)=>{
res.send(JSON.stringify(`<input type="email" />`));
})

const myServer = http.createServer(app);

myServer.listen(8000, () => {
  console.log("server started !!!");
});

// myServer.use("cors")
