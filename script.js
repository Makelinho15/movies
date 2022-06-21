let data = [];
let search = "";
async function getAllMovies() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US&page=1"
  );
  data = await response.json();
  chnageMovieList(data);
}
async function getSearchMovies(search) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US&page=1${search}`
  );
  data = await response.json();
  console.log(data);
  chnageMovieList(data);
}
getAllMovies();
function searhMovies() {
  search = document.getElementById("search").value;
  console.log(search);
  getSearchMovies(search);
}
function chnageMovieList(data) {
  document.getElementById("movies").innerHTML = "";
  data.results.forEach((movie) => {
    let div_elem = document.getElementById("movies");
    let img = document.getElementById(movie.id);
    let movie_list = document.createElement("div");
    div_elem.appendChild(movie_list);
    div_elem.appendChild(img);
    movie_list.setAttribute("id", movie.id);
    document.getElementById(movie.id).innerHTML = movie.title;
    movie_list.classList.add("grid-item");
    div_elem.appendChild(movie_list);
  });
}
const apiKey = "ac611aa60fbb0355792b075ff8337fbe";
const baseURL =
  "https://api.themoviedb.org/3/movie/popular?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US&page=1";
const searchUrl =
  "https://api.themoviedb.org/3/search/movie?api_key=ac611aa60fbb0355792b075ff8337fbe&query=";
const imgBaseURL = "http://image.tmdb.org/t/p/w500";
let grid_item;
axios.get(`${baseURL}${apiKey}`).then((res) => {
  data = res.data.results;
  data.map((item) => {
    Movie(item.poster_path, item.id);
  });
});
function Movie(poster_path, id) {
  const div = document.createElement("div");
  div.classList.add("grid-item");
  const img = document.createElement("img");
  img.src = `${imgBaseURL}${poster_path}`;

  const grid = document.querySelector(".grid");
  div.appendChild(img);
  grid.appendChild(div);

  div.setAttribute("id", id);
  let idle = document.getElementById(id);
}
function getMovie(id) {
  axios.get(`${baseURL}${apiKey}`).then((res) => {
    data = res.data.results;
    data.map((item) => {
      if (item.id == id) {
        console.log(item);
      }
    });
  });
}
function searhMovies() {
  document.getElementById("movies").innerHTML = "";
  let search = document.querySelector("#search").value;
  axios.get(`${searchUrl}${search}`).then((res) => {
    data = res.data.results;
    data.map((item) => {
      Movie(item.poster_path, item.id);
    });
  });
}
