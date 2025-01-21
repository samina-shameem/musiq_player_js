//script.js

const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progress = document.getElementById('progress');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

let audio = new Audio();
let currentIndex = 0;

//example playlist fetched from an API
let playlist = [];

//fetch songs from a free public API

async function fetchPlaylist() {
    try {
        const response = await fetch('https://api.example.com/music');//Replace with your chosen API
        const data = await response.json();
        playlist = data.songs;
        loadSong(currentIndex);
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}

//load the selected song

function loadSong(index){
    if(playlist.length > 0){
        const song=playlist[index];
        audio.src=song.url;
        cover.src=song.cover||'default-cover.jpg';
        title.textContent=song.title;
        artist.textContent=song.artist;
    }
}

//play the song
function playSong(){
    audio.play();
    playButton.style.display='inline-block';
    pauseButton.style.display='none';
}

//go to the next song

function nextSong(){
    currentIndex=(currentIndex+1)% playlist.length;
    loadSong(currentIndex);
    playSong();
}

//go to the previous song

function prevSong(){
    currentIndex=(currentIndex-1+playlist.length)%playlist.length;
    loadSong(currentIndex);
    playSong();
}

//update the progress bar
audio.addEventListener('timeupdate',() => {
    const progressPercent=(audio.currentTime / audio.duration)*100;
    progress.value=progressPercent;
});

//seek song on progress bar change
progress.addEventListener('input', () =>{
    audio.currentTime=(progress.value/100)*audio.duration;
});

//event listners
playButton.addEventListener('click',playSong);
pauseButton.addEventListener('click',pauseSong);
nextButton.addEventListener('click',prevSong);

//initialize playlist
fetchPlaylist();