// document load 후 동작
window.addEventListener("DOMContentLoaded", function () {
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
      const movies = data["results"];

      console.log(data);
      const movieContainer = document.getElementById("movie-container");

      movies.forEach((movie) => {
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
    })
    .catch((err) => console.error(err));

  const container = document.querySelector("#movie-container");
  console.log(container);
  container.addEventListener("click", (e) => {
    let movieCard;
    // console.log(movieCard);
    if (e.target.className === "movie-card") {
      movieCard = e.target;
    } else {
      movieCard = e.target.parentNode;
    }
    // console.log(e);
    // console.log(e.currentTarget);
    // console.log(e.target);
    let _id = movieCard.getAttribute("id");
    alert(`movie_id: ${_id}`);
  });

  inputText.focus();
  inputText.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      // 왜 enter임
      filter();
    }
  });
  document.getElementById("search-btn").addEventListener("click", filter);
  function filter() {
    let inputText, item, title;

    inputText = document.getElementById("search-input").value.toUpperCase();
    item = document.getElementById("movie-card");
    // movie-card는 카드 전체인데 전체 선택하는게 맞니?
    // 제목만 선택하는건가

    for (i = 0; i < item.length; i++) {
      title = item[i].getElementsByClassName("title");
      // 제목은 클래스명 title로 만들어놨는디요
      if (title[0].innerHTML.toUpperCase().indexOf(inputText) > -1) {
        // 배열로 바꾸기? indexOf 스프레드연산자..
        item[i].style.display = "flex";
      } else {
        item[i].style.display = "none";
      }
    }
  }
});
