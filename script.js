const songs = [
    { id: 1, name: "gimme gimme", artist: "Britney", img: "src/img/90.jpg", genre: "Rock", source: "src/audio/gimme.mp3" },
    { id: 2, name: "cupid", artist: "FIFTY FIFTY", img: "src/img/cupid.png", genre: "Pop", source: "src/audio/cupid.mp3" },
    { id: 3, name: "Gangsta's Paradise", artist: "Coolio", img: "src/img/comics.jpeg", genre: "Hip Hop", source: "src/audio/gangsta paradise.mp3" }
  ];
  
  let currentSongIndex = 0;
  const playlists = {};
  let currentPlaylist = null;
  
  // Show Songs
  const showSongs = (genre = "") => {
    const songsList = document.getElementById("songsList");
    songsList.innerHTML = ""; // Clear the list
    const filteredSongs = genre ? songs.filter(song => song.genre === genre) : songs;
    filteredSongs.forEach(song => {
      const button = document.createElement("button");
      button.textContent = `${song.name} - ${song.artist}`;
      button.onclick = () => renderCurrentSong(song.id);
      songsList.appendChild(button);
    });
  };
  
  // Render Current Song
  const renderCurrentSong = (id) => {
    const song = songs.find(s => s.id === id);
    if (!song) return; // Safety check
    currentSongIndex = songs.indexOf(song);
    document.getElementById("currentSongImg").src = song.img;
    document.getElementById("currentSongName").textContent = song.name;
    document.getElementById("currentSongArtist").textContent = song.artist;
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = song.source;
    audioPlayer.play();
  };
  
  // Add to Playlist
  document.getElementById("addToPlaylist").addEventListener("click", () => {
    if (!currentPlaylist) return alert("Please select a playlist first!");
    const currentSong = songs[currentSongIndex];
    if (!playlists[currentPlaylist].includes(currentSong)) {
      playlists[currentPlaylist].push(currentSong);
      renderPlaylistSongs(currentPlaylist);
    }
  });
  
  // Next and Previous Buttons
  document.getElementById("nextButton").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    renderCurrentSong(songs[currentSongIndex].id);
  });
  
  document.getElementById("prevButton").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    renderCurrentSong(songs[currentSongIndex].id);
  });
  
  // Create Playlist
  document.getElementById("createPlaylist").addEventListener("click", () => {
    const playlistName = document.getElementById("playlistName").value.trim();
    if (!playlistName) return alert("Playlist name cannot be empty!");
    if (playlists[playlistName]) return alert("Playlist already exists!");
    playlists[playlistName] = [];
    const playlistsList = document.getElementById("playlistsList");
    const li = document.createElement("li");
    li.textContent = playlistName;
    li.onclick = () => renderPlaylistSongs(playlistName);
    playlistsList.appendChild(li);
    currentPlaylist = playlistName;
  });
  
  // Render Playlist Songs
  const renderPlaylistSongs = (playlistName) => {
    currentPlaylist = playlistName;
    const songsList = document.getElementById("songsList");
    songsList.innerHTML = ""; // Clear the list
    playlists[playlistName].forEach(song => {
      const li = document.createElement("li");
      li.textContent = `${song.name} - ${song.artist}`;
      songsList.appendChild(li);
    });
  };
  
  // Genre Filter
  document.getElementById("genreFilter").addEventListener("change", (e) => {
    showSongs(e.target.value);
  });
  
  // Initial Render
  showSongs();