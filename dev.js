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
const sourceButton = document.querySelector("#sourceButton");
const wikiBtn = document.querySelectorAll(".wikiBtn");
const mainBox = document.querySelector(".mainBox");
const countdownTitle = document.querySelector(".countdownTitle");
const countdownDateTitle = document.querySelector(".countdownDateTitle");

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
  if (isFirstOpen) {
    isFirstOpen = false;
    slowVolumeUp();
  }
  if (player.pause()) {
    player.play();
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
    player.play();
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
  player.play();
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
  player.play();
  document.getElementById("playIcon").className = "fas fa-pause";
}

function updateSongInfo() {
  const currentSong = songs[currentSongIndex];
  songTitle.innerHTML = `${currentSong.title}`;
  songComposer.innerHTML = `${currentSong.composer}`;
  songPerformer.innerHTML = `${currentSong.performer}`;
  sourceButton.href = `${currentSong.nguon}`;
}

///// Volume Control /////
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

//Animation
document.getElementById("playerModal").addEventListener("click", function () {
  document.getElementById("playerModal").classList.add("animated", "fadeIn");
});
document.getElementById("closeButton").addEventListener("click", function () {
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

  // Check if current countdown is for Apr 30 or Sept 02 then display correct element

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
  mainBox.style.display = "block";

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

//CONSOLE THINGS
// console.clear(); // clear group
console.log(
  "%cTrang web được viết với mục đích học tập của cá nhân trong sự biết ơn tới những người chiến sĩ, những người mẹ Việt Nam anh hùng, những người đã góp sức thống nhất toàn vẹn lãnh thổ Việt Nam!",
  'color: yellow; font-size:20px; background-color:red; font-family: "Roboto Slab", serif; font-weight:600;'
);
// console.log = function() {}
