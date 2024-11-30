let audioElement = new Audio();
let currentSongIndex = 0;
let isPlaying = false;
let musicData = []; // Przechowuje dane utworów

// Funkcja ładująca dane z pliku JSON
async function loadMusic() {
    const response = await fetch('music.json');
    musicData = await response.json();
    displayMusicList(musicData);
}

// Funkcja wyświetlająca listę muzyki
function displayMusicList(musicData) {
    const musicListElement = document.getElementById('music-list');
    musicListElement.innerHTML = ""; // Wyczyść listę przed załadowaniem
    musicData.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.classList.add('song');
        songElement.innerHTML = `
            <div class="song-info" onclick="playMusic(${index})">
                <strong>${song.title}</strong> - ${song.artist}
            </div>
        `;
        musicListElement.appendChild(songElement);
    });
}

// Funkcja odtwarzająca muzykę
function playMusic(index) {
    const song = musicData[index];
    currentSongIndex = index;
    audioElement.src = song.file;
    audioElement.play();
    isPlaying = true;
    document.getElementById('play-btn').textContent = '⏸️';
    updateNowPlaying(song);
}

// Funkcja pauzująca muzykę
function togglePlayPause() {
    const playBtn = document.getElementById('play-btn');
    if (isPlaying) {
        audioElement.pause();
        isPlaying = false;
        playBtn.textContent = '▶️';
    } else {
        audioElement.play();
        isPlaying = true;
        playBtn.textContent = '⏸️';
    }
}

// Funkcja zmieniająca piosenkę
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % musicData.length;
    playMusic(currentSongIndex);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + musicData.length) % musicData.length;
    playMusic(currentSongIndex);
}

// Funkcja zmieniająca pasek postępu
audioElement.ontimeupdate = function() {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
};

// Funkcja zmieniająca czas odtwarzania po kliknięciu paska
function seek(event) {
    const barWidth = event.currentTarget.offsetWidth;
    const clickPosition = event.offsetX;
    const duration = audioElement.duration;
    audioElement.currentTime = (clickPosition / barWidth) * duration;
}

// Funkcja aktualizująca sekcję "Teraz odtwarzane"
function updateNowPlaying(song) {
    document.getElementById('now-playing').textContent = `${song.title} - ${song.artist}`;
}

// Ładowanie muzyki przy starcie
loadMusic();
