let audioElement = new Audio();
let currentSongIndex = 0;
let isPlaying = false;
let musicData = [];

// Funkcja ładująca dane z pliku JSON
async function loadMusic() {
    try {
        const response = await fetch('music.json'); // Plik JSON z danymi utworów
        if (!response.ok) throw new Error('Nie udało się załadować listy muzyki.');
        musicData = await response.json();
        displayMusicList(musicData);
    } catch (error) {
        console.error(error.message);
    }
}

// Wyświetla listę muzyki
function displayMusicList(musicData) {
    const musicListElement = document.getElementById('music-list');
    musicListElement.innerHTML = ''; // Czyści listę przed załadowaniem
    musicData.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.classList.add('song');
        songElement.innerHTML = `
            <div><strong>${song.title}</strong> - ${song.artist}</div>
            <button onclick="playMusic(${index})"><i class="fas fa-play"></i></button>
        `;
        musicListElement.appendChild(songElement);
    });
}

// Odtwarzanie muzyki
function playMusic(index) {
    const song = musicData[index];
    currentSongIndex = index;
    audioElement.src = song.file;
    audioElement.play();
    isPlaying = true;
    updatePlayerUI(song);
    document.getElementById('play-btn').innerHTML = '<i class="fas fa-pause"></i>';
}

// Pauza/odtwarzanie
function togglePlayPause() {
    if (isPlaying) {
        audioElement.pause();
        isPlaying = false;
        document.getElementById('play-btn').innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audioElement.play();
        isPlaying = true;
        document.getElementById('play-btn').innerHTML = '<i class="fas fa-pause"></i>';
    }
}

// Następny utwór
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % musicData.length;
    playMusic(currentSongIndex);
}

// Poprzedni utwór
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + musicData.length) % musicData.length;
    playMusic(currentSongIndex);
}

// Aktualizacja paska odtwarzacza
function updatePlayerUI(song) {
    document.getElementById('current-title').textContent = song.title;
    document.getElementById('current-artist').textContent = ` - ${song.artist}`;
}

// Aktualizacja paska postępu
audioElement.ontimeupdate = function () {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    const currentMinutes = Math.floor(audioElement.currentTime / 60);
    const currentSeconds = Math.floor(audioElement.currentTime % 60);
    const durationMinutes = Math.floor(audioElement.duration / 60);
    const durationSeconds = Math.floor(audioElement.duration % 60);
    document.getElementById('audio-time').textContent =
        `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
};

// Przewijanie utworu
function seek(event) {
    const barWidth = event.currentTarget.offsetWidth;
    const clickPosition = event.offsetX;
    const duration = audioElement.duration;
    audioElement.currentTime = (clickPosition / barWidth) * duration;
}

// Ładowanie listy muzyki
window.onload = function () {
    loadMusic();
};
