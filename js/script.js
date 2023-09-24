// console.log("Welcome to Spotify");

//Initialize the variable
let songIndex = 0;
let audioElement = new Audio('../songs/1.mpeg');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterName = document.getElementById('masterName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songname: "Hai Tammana Hummay - Kaifa Khalil", filePath: "../songs/1.mpeg", coverPath: "../image/C1.jpg" },
    { songname: "Heeriya Heeriya - Jubin Notial", filePath: "../songs/2.mpeg", coverPath: "../image/C2.jpg" },
    { songname: "Hai Jhumka - Salman Khan", filePath: "../songs/3.mpeg", coverPath: "../image/C3.jpg" },
    { songname: "Touch Me Like You Do - English", filePath: "../songs/4.mpeg", coverPath: "../image/C4.jpg" },
    { songname: "Tu Aakay Dekhlay - Soul Brothers", filePath: "../songs/5.mpeg", coverPath: "../image/C5.png" },
    { songname: "Tu Hosh Tu Nasha - My Songs", filePath: "../songs/6.mpeg", coverPath: "../image/C6.jpg" },
]
FileSystemWritableFileStream
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songname;
});

// audioElement.play();

//handle Play/Pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', () => {
    //Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration) / 100);
})

const makeAllPlays = () => {

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        masterName.innerText = songs[songIndex].songname;
        audioElement.src = `../songs/${songIndex + 1}.mpeg`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 5) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `../songs/${songIndex + 1}.mpeg`;
    audioElement.currentTime = 0;
    masterName.innerText = songs[songIndex].songname;
    audioElement.play();

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.remove('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `../songs/${songIndex + 1}.mpeg`;
    audioElement.currentTime = 0;
    masterName.innerText = songs[songIndex].songname;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.remove('fa-pause-circle');
})