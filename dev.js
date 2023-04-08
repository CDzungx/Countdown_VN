const openPlayerBtn = document.querySelector("#openPlayer");
const playerModal = document.querySelector("#playerModal");
const closeButton = document.querySelector("#closeButton");
const songTitle = document.querySelector("#songTitle");
const songComposer = document.querySelector("#songComposer");
const songPerformer = document.querySelector("#songPerformer");
const prevButton = document.querySelector("#prevButton");
const playButton = document.querySelector("#playButton");
const nextButton = document.querySelector("#nextButton");
const volumeSlider = document.querySelector("#volumeSlider");
const sourceButton = document.querySelector("#sourceButton");
const wikiBtn = document.querySelectorAll(".wikiBtn");
const mainBox = document.querySelector(".mainBox");
const countdownTitle = document.querySelector(".countdownTitle");
const countdownDateTitle = document.querySelector(".countdownDateTitle");
const progressBar = document.querySelector("#song-progress-bar");
const progress = document.querySelector("#song-progress");
const progressController = document.querySelector("#song-progress-controller");
const timer = document.querySelector("#song-timer");
const section = document.querySelector(".section");
/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////COUNTDOWN/////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
// Set the initial countdown date
var countDownDate = new Date("Apr 30, 2023 00:00:00").getTime();
var nextCountDownDate = new Date("Sep 2, 2023 00:00:00").getTime();

var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("day").innerHTML = days;
  document.getElementById("hour").innerHTML = hours;
  document.getElementById("minute").innerHTML = minutes;
  document.getElementById("second").innerHTML = seconds;
  if (countDownDate === new Date("Apr 30, 2023 00:00:00").getTime()) {
    wikiBtn.forEach(
      (btn) =>
        (btn.href = "https://vi.wikipedia.org/wiki/Sự_kiện_30_tháng_4_năm_1975")
    );
    countdownTitle.innerHTML = "THỐNG NHẤT ĐẤT NƯỚC";
    countdownDateTitle.innerHTML = "30/4";
    mainBox.style.background =
      "linear-gradient(to bottom, #ee1010ee 0%, #ee1010e8 50%, #0083fdec 50%, #0083fde8 100%)";
  } else if (countDownDate === new Date("Sep 2, 2023 00:00:00").getTime()) {
    wikiBtn.forEach(
      (btn) =>
        (btn.href = "https://vi.wikipedia.org/wiki/Ngày_Quốc_khánh_(Việt_Nam)")
    );
    countdownTitle.innerHTML = "QUỐC KHÁNH VIỆT NAM";
    countdownDateTitle.innerHTML = "2/9";
    mainBox.style.backgroundImage =
      "linear-gradient(175deg,#ee1010d5 0%, #cc0606 100%)";
  }
  
  section.style.display = "block";

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

/////////////////////////////////////////////
/////////////////////////////////////////////
///////////////MUSIC PLAYER//////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

let currentSongIndex = 0;
let songs = [
  {
    title: "Vui Mở Đường",
    composer: "Đỗ Nhuận",
    performer: "NSƯT Hữu Nội - Hợp ca nam nữ Đài TNVN",
    src: "/soundtrack/vuimoduong.mp3",
    nguon: "https://bcdcnt.net/bai-hat/vui-mo-duong-731.html",
    thongtinthem: "",
  },
  {
    title: "Đất Nước Trọn Niềm Vui",
    composer: "Hoàng Hà",
    performer: "NSƯT Hữu Nội",
    src: "/soundtrack/datnuoctronniemvui.mp3",
    nguon: "https://bcdcnt.net/bai-hat/dat-nuoc-tron-niem-vui-512.html",
    thongtinthem: "",
  },

  // ...
];

let player = new Howl({
  src: [songs[currentSongIndex].src],
  html5: true,
  onend: function () {
    nextSong();
    updateSongInfo();
  },
});

openPlayerBtn.addEventListener("click", openPlayer);
closeButton.addEventListener("click", closePlayer);
prevButton.addEventListener("click", prevSong);
playButton.addEventListener("click", togglePlay);
nextButton.addEventListener("click", nextSong);

let isFirstOpen = true;

function openPlayer() {
  playerModal.classList.add("is-active");
  updateSongInfo();
  playerModal.classList.add("fadeInSlow");
  if (isFirstOpen) {
    isFirstOpen = false;
    slowVolumeUp();
  }
  if (player.pause()) {
    playSong();
    document.getElementById("playIcon").className = "fas fa-pause";
  }
}

function closePlayer() {
  playerModal.classList.remove("is-active");
}

function togglePlay() {
  if (player.playing()) {
    player.pause();
    document.getElementById("playIcon").className = "fas fa-play";
  } else {
    playSong();
    document.getElementById("playIcon").className = "fas fa-pause";
  }
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  player.stop();
  player = new Howl({
    src: [songs[currentSongIndex].src],
    html5: true,
    volume: currentVolume,
    onend: function () {
      nextSong();
    },
  });
  updateSongInfo();
  playSong();
  document.getElementById("playIcon").className = "fas fa-pause";
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  player.stop();
  player = new Howl({
    src: [songs[currentSongIndex].src],
    html5: true,
    volume: currentVolume,
    onend: function () {
      nextSong();
    },
  });
  updateSongInfo();
  playSong();
  document.getElementById("playIcon").className = "fas fa-pause";
}

function updateSongInfo() {
  const currentSong = songs[currentSongIndex];
  songTitle.innerHTML = `${currentSong.title}`;
  songComposer.innerHTML = `${currentSong.composer}`;
  songPerformer.innerHTML = `${currentSong.performer}`;
  sourceButton.href = `${currentSong.nguon}`;
}


//////  Volume Control  //////
let currentVolume = 0.3; // Initialize current volume to 0.3

volumeSlider.addEventListener("input", handleVolumeInput);
volumeSlider.addEventListener("wheel", handleVolumeWheel);

function setVolume(volume) {
  player.volume(volume);
  volumeSlider.value = volume * 100;
  currentVolume = volume; // Update current volume
}

function handleVolumeInput() {
  const volume = parseFloat(volumeSlider.value) / 100;
  setVolume(volume);
}

// Mouse wheel control
function handleVolumeWheel(event) {
  event.preventDefault();
  const delta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
  volumeSlider.value = parseInt(volumeSlider.value) - 5 * delta;
  handleVolumeInput();
}

function slowVolumeUp() {
  const startVolume = currentVolume; // Use current volume as start volume
  const targetVolume = 0.7;
  const duration = 1000;
  const increment = (targetVolume - startVolume) / (duration / 10);

  const intervalId = setInterval(() => {
    currentVolume += increment;
    setVolume(currentVolume);

    if (currentVolume >= targetVolume) {
      clearInterval(intervalId);
    }
  }, 10);
}

////// Progress Bar ///////
// Update the song progress bar based on the current song position
function updateSongProgressBar() {
  const progress = player.seek() / player.duration; // Calculate progress fraction
  progressBar.style.width = `${progress * 100}%`; // Update progress bar width
}

// Function to play the song and update progress bar
function playSong() {
  player.play();
  updateSongProgressBar();

  // Update timer with initial time
  const timer = document.getElementById("song-timer");
  timer.textContent = formatTime(player.seek()); // Update timer with initial time

  // Update progress bar and timer every second
  const intervalId = setInterval(() => {
    const progress = player.seek() / player.duration();
    progressBar.style.width = `${progress * 100}%`;
    timer.textContent = `${formatTime(player.seek())} / ${formatTime(
      player.duration()
    )}`; // Update timer with current time and total duration

    if (!player.playing()) {
      clearInterval(intervalId);
    }
  }, 1000);
}

document.getElementById("skipBackwardButton").addEventListener("click", skipBackwardButton);
document.getElementById("skipForwardButton").addEventListener("click", skipForwardButton);

// Skip 15 seconds forward
function skip15SecondsForward() {
  const currentPosition = player.seek();
  const targetPosition = currentPosition + 10;
  player.seek(targetPosition);
  updateSongProgressBar();
}

// Skip 15 seconds backward
function skip15SecondsBackward() {
  const currentPosition = player.seek();
  const targetPosition = currentPosition - 10;
  player.seek(targetPosition);
  updateSongProgressBar();
}

// Add event listener to skip forward button
skipForwardButton.addEventListener("click", skip15SecondsForward);

// Add event listener to skip backward button
skipBackwardButton.addEventListener("click", skip15SecondsBackward);

// Update progress bar as song plays
player.on("play", () => {
  requestAnimationFrame(updateSongProgressBar);
});

// Function to format time in MM:SS format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

//CONSOLE THINGS
// console.clear(); // clear group
console.log(
  "%cTrang web được thực hiện với mục đích học tập của cá nhân trong sự biết ơn tới những người chiến sĩ, những người mẹ Việt Nam anh hùng, những người đã góp sức thống nhất toàn vẹn lãnh thổ đất nước Việt Nam!",
  'color: yellow; font-size:20px; background-color:red; font-family: "Roboto Slab", serif; font-weight:600;'
);
// console.log = function() {}
