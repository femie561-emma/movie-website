


// console.log("script loaded");


const apiKey = "63d298e3";



const modal =        document.getElementById("movieModal");
const closeModal =  document.getElementById("closeModal");
const modalPoster = document.getElementById("modalPoster");
const modalTitle =  document.getElementById("modalTitle");
const modalYear =   document.getElementById("modalYear");
const modalGenre =  document.getElementById("modalGenre");
const modalDirector = document.getElementById("modalDirector");
const modalActors =   document.getElementById("modalActors");
const modalPlot =     document.getElementById("modalPlot");


const clickSound = document.getElementById("clickSound");
const testSoundBtn = document.getElementById("testSoundBtn");


const modeToggle = document.getElementById("modeToggle");


if(localStorage.getItem("darkMode") === "enabled"){
   document.body.classList.add("dark-mode");
   modeToggle.textContent = "☀️ Light Mode";
};


const nav = document.getElementById("mainNav");

modeToggle.addEventListener("click", () =>{
  document.body.classList.toggle("dark-mode");
  
  if(document.body.classList.contains("dark-mode")){
    localStorage.setItem("darkMode", "enabled");
    modeToggle.textContent = "☀️ Light Mode";
  } else {
    localStorage.setItem("darkMode", "disabled");
    modeToggle.textContent = "🌙 Dark Mode";
  }

  if(body.classList.contains("dark")){
    nav.classList.add('dark');
  nav.classList.remove('light');

  } else{
    nav.classList.add('light');
    nav.classList.remove('dark');
  }
});






let audioUnlocked = false;
document.body.addEventListener("click", () =>{
   if(!audioUnlocked){
     clickSound.play().then(() =>{

       clickSound.pause();
       clickSound.currentTime = 0;
       audioUnlocked = true;
     }).catch(() =>{});

   }


}, { once: true});



function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 1;
  speech.pitch = 1;
  speech.volume = 1;
  window.speechSynthesis.speak(speech);

}






const searchBtn = document.getElementById("searchBtn");
//  console.log("Button element:", searchBtn);

searchBtn.addEventListener("click", () => {
  
  const query = document.getElementById("searchInput").value.trim();
  
  if(query === " ") {
    document.getElementById("movies").innerHTML =
  `<p style="text-align: center;">Please enter a movie Name</p>`;

   return;
}
fetchMovies(query);

});

const movies = document.getElementById("movies"); 

searchInput.addEventListener("input", () => {

const query = document.getElementById("searchInput").value.trim();
 if(query.length === 0){
   movies.innerHTML = "";
 }

 if(query.length > 2){
fetchMovies(query);
 }


})





function fetchMovies(query) {
const loading =  document.getElementById("loading");
const movieContainer = document.getElementById("movies");

loading.style.display = "block";
movieContainer.innerHTML = " ";


  fetch(`https://www.omdbapi.com/?s=${query}&apiKey=${apiKey}`)
  .then(res => res.json())
   .then(data => {
      
     if(data.Response === "True"){
       displayMovies(data.Search);

     } else {
      document.getElementById("movies").innerHTML = `<p style="text-align:center;">No movies found.</p>`;
     }

   })
   .catch(err => console.error("Error fetching data:",  err));
}



function displayMovies(movies) {
  const movieContainer = document.getElementById("movies");
   movieContainer.innerHTML = " ";
  
   movies.forEach(movie => {
     const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image";

   const movieCard = document.createElement("div");
   movieCard.classList.add("movie-card");

     movieCard.innerHTML = `
       <img src="${poster}" alt="${movie.Title}">
       <h3>${movie.Title}</h3>
       <p>${movie.Year}</p>


       <a href="${poster}" download>
        <button class="download-btn">Download Poster</button>
        </a>
     `;

  movieCard.addEventListener("click", () => {
     clickSound.play();
     speak(movie.Title);
     showModal(movie.imdbID);

   });
   movieContainer.appendChild(movieCard);
  
});

}

const reels = ["clip1.mp4", "clip2.mp4", "clip3.mp4"];

function showModal(imdbID) {
  fetch(`https://www.omdbapi.com/?i=${imdbID}&apiKey=${apiKey}`)

  .then(res => res.json())
  .then(movie => {

//  RANDOM REEL PLAYS HERE
  
  //  ===== Pick a random clip from local reels ======
  const randomClip = reels[Math.floor(Math.random() *reels.length)];

  modalVideo.src = randomClip;
  modalVideo.load();
  modalVideo.play().catch(err => console.log("Autoplay blocked:", err));


    //  Movie details
   modalPoster.src = movie.Poster != "N/A" ? movie.Poster : "https://via.placholder.com/200x300?text=No+Image";
   modalTitle.textContent = movie.Title;
   modalYear.textContent = movie.Year;
   modalGenre.textContent = movie.Genre;
   modalDirector.textContent = movie.Director;
   modalActors.textContent = movie.Actors;
   modalPlot.textContent = movie.Plot;

   modal.style.display = "flex";
  })
  
  .catch(err => console.error(err));
}

// =========== Close modal ===========
 closeModal.addEventListener("click", ()  =>{
    modal.style.display = "none";
    modalVideo.pause();
   modalVideo.currentTime = 0;
 });
  
window.addEventListener("click", e => {
  if (e.target === modal) 
    modal.style.display = "none";
   modalVideo.pause();
   modalVideo.currentTime = 0;

});

document.getElementById("testSoundBtn").addEventListener("click", () =>{

  clickSound.play();
});



















// document.getElementById('unlock-btn').addEventListener('click', () => {
//    document.getElementById('quiz-content').style.display = 'block';
//    document.getElementById('unlock-btn').style.display = 'none';



// })


