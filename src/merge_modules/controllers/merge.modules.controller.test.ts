//import file we are testing

const express = require("express"); // import express
const serverRoutes = require("./server-routes");
const app = express(); //an instance of an express app, a 'fake' express app
app.use("/states", serverRoutes); //routes


describe('merge controller', () => {

})