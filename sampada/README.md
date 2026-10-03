# Sampada ko Aadara (skeleton)
No backend, no build step. Data = data.js, submissions = browser localStorage.

## Run
- VS Code: install "Live Server", right click index.html, Open with Live Server
- or: `python3 -m http.server 8000` in this folder, open localhost:8000
(mic recording only works on localhost or https)

## Deploy (free, 2 min)
- GitHub: push folder, repo Settings > Pages > deploy from main branch
- or drag the folder onto app.netlify.com/drop

## TODO for the hackathon guy
1. Replace dummy words in data.js with real ones + audio files in /audio
2. Offline: add sw.js (service worker) to cache these files
3. Move submissions to a real backend (Supabase) instead of localStorage
4. Real verification (region-confirmed), dialect variant UI
5. Impact dashboard, pitch, backup demo video
