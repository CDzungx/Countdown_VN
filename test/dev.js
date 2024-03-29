/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////MUSIC PLAYER//////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

const openPlayerBtn = document.getElementById("openPlayer");
const playerModal = document.getElementById("playerModal");
const closeButton = document.getElementById("closeButton");
const songTitle = document.getElementById("songTitle");
const songComposer = document.getElementById("songComposer");
const songPerformer = document.getElementById("songPerformer");
const prevButton = document.getElementById("prevButton");
const playButton = document.getElementById("playButton");
const nextButton = document.getElementById("nextButton");
const volumeSlider = document.getElementById("volumeSlider");

let currentSongIndex = 0;
let songs = [
  {
    title: "Song 1",
    composer: "Composer 1",
    performer: "Performer 1",
    src: "/soundtrack/datnuoctronniemvui.mp3",
  },
  {
    title: "Song 2",
    composer: "Composer 2",
    performer: "Performer 2",
    src: "/soundtrack/tienquanca.mp3",
  },
  // ...
];

let player = new Howl({
  src: [songs[currentSongIndex].src],
  html5: true,
  onend: function () {
    nextSong();
  },
});

openPlayerBtn.addEventListener("click", openPlayer);
closeButton.addEventListener("click", closePlayer);
prevButton.addEventListener("click", prevSong);
playButton.addEventListener("click", togglePlay);
nextButton.addEventListener("click", nextSong);
volumeSlider.addEventListener("input", setVolume);

function openPlayer() {
  playerModal.classList.add("is-active");
  updateSongInfo();
}

function closePlayer() {
  playerModal.classList.remove("is-active");
}

function prevSong() {
  if (currentSongIndex === 0) {
    currentSongIndex = songs.length - 1;
  } else {
    currentSongIndex--;
  }
  player.stop();
  player = new Howl({
    src: [songs[currentSongIndex].src],
    html5: true,
    onend: function () {
      nextSong();
    },
  });
  updateSongInfo();
  player.play();
  document.getElementById("playIcon").className = "fas fa-pause";
}

function togglePlay() {
  if (player.playing()) {
    player.pause();
    document.getElementById("playIcon").className = "fas fa-play";
  } else {
    player.play();
    document.getElementById("playIcon").className = "fas fa-pause";
  }
}

function nextSong() {
  if (currentSongIndex === songs.length - 1) {
    currentSongIndex = 0;
  } else {
    currentSongIndex++;
  }
  player.stop();
  player = new Howl({
    src: [songs[currentSongIndex].src],
    html5: true,
    onend: function () {
      nextSong();
    },
  });
  updateSongInfo();
  player.play();
  document.getElementById("playIcon").className = "fas fa-pause";
}

function setVolume() {
  player.volume(this.value / 100);
}

function updateSongInfo() {
  songTitle.innerHTML = songs[currentSongIndex].title;
  songComposer.innerHTML = songs[currentSongIndex].composer;
  songPerformer.innerHTML = songs[currentSongIndex].performer;
}

//Animation
document.getElementById("playerModal").addEventListener("click", function(){
    document.getElementById("playerModal").classList.add("animated", "fadeIn");
});
document.getElementById("closeButton").addEventListener("click", function(){
    document.getElementById("playerModal").classList.add("animated", "fadeOut");
});

/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////COUNTDOWN/////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
// Set the initial countdown date
var countDownDate = new Date("Apr 30, 2023 00:00:00").getTime();
var nextCountDownDate = new Date("Sep 2, 2023 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update countdown display
  document.getElementById("day").innerHTML = days;
  document.getElementById("hour").innerHTML = hours;
  document.getElementById("minute").innerHTML = minutes;
  document.getElementById("second").innerHTML = seconds;
  
// Check if current countdown is for Apr 30 or Sept 02
if (countDownDate === new Date("Apr 30, 2023 00:00:00").getTime()) {
  let elements = document.getElementsByClassName("30041975");
  for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "block";
  }
  elements = document.getElementsByClassName("02091945");
  for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
  }
  elements = document.getElementsByClassName("mainbox");
  if (elements.length > 0) {
      elements[0].style.background = "linear-gradient(to bottom, #ee1010ee 0%, #ee1010e8 50%, #0083fdec 50%, #0083fde8 100%);";
  }
} else if (countDownDate === new Date("Sep 2, 2023 00:00:00").getTime()) {
  let elements = document.getElementsByClassName("30041975");
  for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
  }
  elements = document.getElementsByClassName("02091945");
  for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "block";
  }
  elements = document.getElementsByClassName("mainbox");
  if (elements.length > 0) {
      elements[0].style.backgroundImage = "linear-gradient(175deg,#ee1010d5 0%, #cc0606 100%);";
  }
}

  // If the count down is finished
  if (distance < 0) {
    // Update countdown date to nextCountDownDate
    countDownDate = nextCountDownDate;

    // Calculate nextCountDownDate based on current countDownDate
    var currentDate = new Date(countDownDate);
    if (currentDate.getMonth() === 3 && currentDate.getDate() === 30) {
      // If current countdown date is April 30th, set next countdown to September 2nd of same year
      nextCountDownDate = new Date(currentDate.getFullYear(), 8, 2).getTime();
    } else {
      // Otherwise set next countdown to April 30th of next year
      nextCountDownDate = new Date(
        currentDate.getFullYear() + 1,
        3,
        30
      ).getTime();
    }
  }
}, 1000);
