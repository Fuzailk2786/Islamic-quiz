function findMosques() {
  if (!navigator.geolocation) {
    alert("Location not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(showMosques, () =>
    alert("Location permission denied")
  );
}

function showMosques(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=mosque&lat=${lat}&lon=${lon}&radius=5000`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("mosques");
      list.innerHTML = "";

      data.slice(0, 5).forEach(m => {
        list.innerHTML += `<li>${m.display_name}</li>`;
      });
    });
}