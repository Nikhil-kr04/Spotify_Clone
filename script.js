document.addEventListener("DOMContentLoaded", function () {
  // Sample music data
  const songs = [
    {
      title: "Zamaana Lage",
      artist: "Arijit Singh",
      cover: "assets/images/album1.jpg",
      audio: "assets/music/song1.mp3",
      duration: "3:20",
    },
    {
      title: "Laal Pari",
      artist: "Yo Yo Honey Singh",
      cover: "assets/images/album2.jpg",
      audio: "assets/music/song2.mp3",
      duration: "3:35",
    },
    {
      title: "Ilzaam",
      artist: "Vishal Mishra",
      cover: "assets/images/album3.jpg",
      audio: "assets/music/song3.mp3",
      duration: "2:21",
    },
    {
      title: "  Chor Bazari Phir Se",
      artist: "Neeraj Shridhar",
      cover: "assets/images/album4.jpg",
      audio: "assets/music/song4.mp3",
      duration: "2:58",
    },
  ];

  // DOM Elements
  const playPauseBtn = document.querySelector(".play-pause");
  const prevBtn = document.querySelector(".fa-step-backward");
  const nextBtn = document.querySelector(".fa-step-forward");
  const progressBar = document.querySelector(".progress");
  const progressFill = document.querySelector(".progress-fill");
  const currentTimeEl = document.querySelector(
    ".progress-bar span:first-child"
  );
  const durationEl = document.querySelector(".progress-bar span:last-child");
  const songTitleEl = document.querySelector(".song-details h4");
  const artistEl = document.querySelector(".song-details p");
  const coverEl = document.querySelector(".song-info img");
  const volumeBar = document.querySelector(".volume-bar");
  const volumeFill = document.querySelector(".volume-fill");
  const songCards = document.querySelectorAll(".song-card");
  const playButtons = document.querySelectorAll(".play-btn");

  // Audio element
  const audio = new Audio();
  let currentSongIndex = 0;
  let isPlaying = false;

  // Initialize player with first song
  function loadSong(index) {
    const song = songs[index];
    songTitleEl.textContent = song.title;
    artistEl.textContent = song.artist;
    coverEl.src = song.cover;
    audio.src = song.audio;
    durationEl.textContent = song.duration;

    // Update play buttons on song cards
    updateActiveSongCard(index);
  }

  // Play song
  function playSong() {
    isPlaying = true;
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    document.querySelector(".play-pause i").style.color = "#000";
  }

  // Pause song
  function pauseSong() {
    isPlaying = false;
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }

  // Next song
  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) playSong();
  }

  // Previous song
  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) playSong();
  }

  // Update progress bar
  function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Update current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }

  // Set progress when clicked on progress bar
  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  }

  // Set volume
  function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const volume = clickX / width;
    audio.volume = volume;
    volumeFill.style.width = `${volume * 100}%`;
  }

  // Update active song card
  function updateActiveSongCard(index) {
    songCards.forEach((card, i) => {
      if (i === index) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });
  }

  // Event listeners
  playPauseBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
  });

  nextBtn.addEventListener("click", nextSong);
  prevBtn.addEventListener("click", prevSong);

  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("ended", nextSong);

  progressBar.addEventListener("click", setProgress);
  volumeBar.addEventListener("click", setVolume);

  // Play song when clicking on song card
  songCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      currentSongIndex = index;
      loadSong(currentSongIndex);
      playSong();
    });
  });

  // Play song when clicking play button on card
  playButtons.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering the card click event
      currentSongIndex = index;
      loadSong(currentSongIndex);
      playSong();
    });
  });

  // Initialize
  loadSong(0);
  audio.volume = 0.7;
  volumeFill.style.width = "70%";
});
