let movieList = [];

// 1. api 를 통해 영화 목록을 가져온다 -> 카드 만드는 함수 실행
// 2. 변수에 해당 영화 목록을 저장한다
function getMovieListAndRender() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTQ5OTQ3MGIyMGRiZjYwZDdjNTlhMzdlNGY3YmI2MSIsInN1YiI6IjY0NzRiNTFmYmUyZDQ5MDBmOTk0ZWJiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UniGryC17KAhX0Mue8o2_8XTWOOf7kGZzXACfiCz6u8",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      movieList = data["results"];
      renderCard(movieList);
    })
    .catch((err) => console.error(err));
}

// 3. 변수를 받아서 카드 만드는 함수를 작성한다
function renderCard(movieList) {
  // #movie-container 내부의 요소 삭제
  document.getElementById("movie-container").replaceChildren();

  // 배열대로 카드 생성
  const movieContainer = document.getElementById("movie-container");

  movieList.forEach((movie) => {
    console.log(movie);
    // 카드 요소 생성
    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.addEventListener("click", () => {
      this.alert(movie.id);
    });

    // 영화 제목
    const title = document.createElement("h3");
    title.className = "title";
    title.textContent = movie.title;
    card.appendChild(title);
    title.style.marginBottom = "10px";

    // 영화 포스터 이미지
    const poster = document.createElement("img");
    // 포스터 이미지 URL
    poster.src = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
    card.appendChild(poster);
    poster.style.borderRadius = "10px";
    // 영화 개요
    const overview = document.createElement("p");
    overview.textContent = movie.overview;
    card.appendChild(overview);
    overview.style.marginTop = "10px";
    // 평점
    const rateWrapper = document.createElement("p");
    const rateLabel = document.createElement("span");
    const rate = document.createElement("span");
    rateLabel.textContent = "Rating : ";
    rate.style.color = "red";
    rateWrapper.style.marginTop = "10px";
    rate.textContent = movie.vote_average;

    card.appendChild(rateWrapper);
    rateWrapper.appendChild(rateLabel);
    rateWrapper.appendChild(rate);

    // id값
    const unique = movie.id;
    card.setAttribute("id", unique);
    // 생성한 카드를 컨테이너에 추가
    movieContainer.appendChild(card);
    // 카드 클릭 시 alert안에 id값 뜨게
  });
}

// 4. 검색어를 받아서 변수에 담긴 배열을 조건에 맞게 리턴하는 함수를 작성한다.
function searchAndRender(query, movieList) {
  console.log(movieList);
  // query 를 토대로 movieList 에서 해당하는 배열만 추출
  let arr = [];
  for (let i = 0; i < movieList.length; i++) {
    if (movieList[i].title.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
      console.log(movieList[i]);
      arr.push(movieList[i]);
    }
  }
  renderCard(arr);
}

// document load 후 동작
window.addEventListener("DOMContentLoaded", function () {
  getMovieListAndRender();
  this.document.getElementById("search-btn").addEventListener("click", () => {
    searchAndRender(
      this.document.getElementById("search-input").value,
      movieList
    );
  });

  this.document
    .getElementById("search-input")
    .addEventListener("keyup", (event) => {
      console.log(event);
      if (event.key === "Enter") {
        searchAndRender(
          this.document.getElementById("search-input").value,
          movieList
        );
      }
    });
});
