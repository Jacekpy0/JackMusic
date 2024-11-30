let audioElement = new Audio();
let currentSongIndex = 0;
let isPlaying = false;
let musicData = []; // Przechowuje dane utworów

// Funkcja ładująca dane z pliku JSON na GitHubie lub lokalnie
async function loadMusic() {
    const response = await fetch('music.json'); // Możesz dostosować ścieżkę pliku JSON
    musicData = await response.json();
    displayMusicList(musicData);
}

// Funkcja wyświetlająca listę muzyki
function displayMusicList(musicData) {
    const musicListElement = document.getElementById('music-list');
    musicData.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.classList.add('song');
        songElement.innerHTML = `
            <div><strong>${song.title}</strong> - ${song.artist}</div>
            <button onclick="playMusic(${index})">Odtwórz</button>
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
    document.getElementById('play-btn').innerHTML = '⏸️';
}

// Funkcja pauzująca muzykę
function togglePlayPause() {
    if (isPlaying) {
        audioElement.pause();
        isPlaying = false;
        document.getElementById('play-btn').innerHTML = '▶️';
    } else {
        audioElement.play();
        isPlaying = true;
        document.getElementById('play-btn').innerHTML = '⏸️';
    }
}

// Funkcja zmiany piosenki
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % musicData.length;
    playMusic(currentSongIndex);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + musicData.length) % musicData.length;
    playMusic(currentSongIndex);
}

// Funkcja zmieniająca czas odtwarzania na pasku
audioElement.ontimeupdate = function() {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
    const currentMinutes = Math.floor(audioElement.currentTime / 60);
    const currentSeconds = Math.floor(audioElement.currentTime % 60);
    const durationMinutes = Math.floor(audioElement.duration / 60);
    const durationSeconds = Math.floor(audioElement.duration % 60);
    document.getElementById('audio-time').textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
};

// Funkcja zmieniająca czas paska postępu
function seek(event) {
    const barWidth = event.currentTarget.offsetWidth;
    const clickPosition = event.offsetX;
    const duration = audioElement.duration;
    audioElement.currentTime = (clickPosition / barWidth) * duration;
}

// Ładowanie muzyki po załadowaniu strony
window.onload = function() {
    loadMusic();
};
let audioElement = new Audio();
let currentSongIndex = 0;
let isPlaying = false;
let musicData = []; // Przechowuje dane utworów

// Funkcja ładująca dane z pliku JSON na GitHubie lub lokalnie
async function loadMusic() {
    const response = await fetch('music.json'); // Możesz dostosować ścieżkę pliku JSON
    musicData = await response.json();
    displayMusicList(musicData);
}

// Funkcja wyświetlająca listę muzyki
function displayMusicList(musicData) {
    const musicListElement = document.getElementById('music-list');
    musicData.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.classList.add('song');
        songElement.innerHTML = `
            <div><strong>${song.title}</strong> - ${song.artist}</div>
            <button onclick="playMusic(${index})">Odtwórz</button>
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
    document.getElementById('play-btn').innerHTML = '⏸️';
}

// Funkcja pauzująca muzykę
function togglePlayPause() {
    if (isPlaying) {
        audioElement.pause();
        isPlaying = false;
        document.getElementById('play-btn').innerHTML = '▶️';
    } else {
        audioElement.play();
        isPlaying = true;
        document.getElementById('play-btn').innerHTML = '⏸️';
    }
}

// Funkcja zmiany piosenki
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % musicData.length;
    playMusic(currentSongIndex);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + musicData.length) % musicData.length;
    playMusic(currentSongIndex);
}

// Funkcja zmieniająca czas odtwarzania na pasku
audioElement.ontimeupdate = function() {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
    const currentMinutes = Math.floor(audioElement.currentTime / 60);
    const currentSeconds = Math.floor(audioElement.currentTime % 60);
    const durationMinutes = Math.floor(audioElement.duration / 60);
    const durationSeconds = Math.floor(audioElement.duration % 60);
    document.getElementById('audio-time').textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
};

// Funkcja zmieniająca czas paska postępu
function seek(event) {
    const barWidth = event.currentTarget.offsetWidth;
    const clickPosition = event.offsetX;
    const duration = audioElement.duration;
    audioElement.currentTime = (clickPosition / barWidth) * duration;
}

// Ładowanie muzyki po załadowaniu strony
window.onload = function() {
    loadMusic();
};
