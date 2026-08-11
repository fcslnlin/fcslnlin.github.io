
// ============ DEFIANT ONE VIDEO PLAYER ============
function initDefiantPlayer() {
  const video = document.getElementById('defiantVideo');
  const tracks = document.querySelectorAll('.defiant-track');
  const prev = document.getElementById('defiantPrev');
  const next = document.getElementById('defiantNext');
  if (!video || !tracks.length) return;

  let current = 0;

  const loadTrack = (index) => {
    tracks[current].classList.remove('active');
    current = (index + tracks.length) % tracks.length;
    tracks[current].classList.add('active');
    video.src = tracks[current].dataset.src;
    video.load();
    video.play().catch(() => {}); // autoplay may be blocked, that's fine
  };

  tracks.forEach((track, i) => {
    track.addEventListener('click', () => loadTrack(i));
  });

  prev?.addEventListener('click', () => loadTrack(current - 1));
  next?.addEventListener('click', () => loadTrack(current + 1));
}

document.addEventListener('DOMContentLoaded', () => {
  initDefiantPlayer();
});
