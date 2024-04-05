const express = require("express");
const app = express();
const port = 8800;
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));

let myKey = "975a07d0fdf4f9abd01458d8f1f9f9c5";

let videosUrl = `https://api.themoviedb.org/3/movie/157739?/videos?api_key=${myKey}`;
let languageUrl = "https://api.themoviedb.org/3/tv/1399?language=zh-TW";
const releasedMovieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${myKey}&language=zh-TW&page=1`;

// 預告片API
async function videos() {
  try {
    let result = await fetch(videosUrl);
    let data = await result.json();
    // console.log(data);
  } catch (e) {
    console.log(e);
  }
}
videos();

// 電影簡介API
async function movieIntro(url) {
  try {
    let result = await fetch(url);
    let data = await result.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

app.get("/", async (req, res) => {
  try {
    let releasedMovie = await movieIntro(releasedMovieUrl);
    res.render("index", { releasedMovieData: releasedMovie.results });
  } catch (e) {
    return res.status(500).send(e);
  }
});

app.get("/moiveIntro/:movie_id", async (req, res) => {
  let { movie_id } = req.params;
  let introUrl = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${myKey}&language=zh-TW`;
  try {
    let movieIntroData = await movieIntro(introUrl);
    res.render("index", { movieIntroData });
  } catch (e) {
    return res.status(500).send(e);
  }
});
app.listen(port, () => {
  console.log("server is listening on port 8800");
});
