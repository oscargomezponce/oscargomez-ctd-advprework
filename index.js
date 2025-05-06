const contentDiv = document.getElementById('content');
const charactersBtn = document.getElementById('characters-btn');
const filmsBtn = document.getElementById('films-btn');

async function loadCharacters() {
  contentDiv.innerHTML = '<p>Loading characters...</p>';
  const response = await fetch('https://swapi.tech/api/people');
  const data = await response.json();

  contentDiv.innerHTML = '';

  for (const char of data.results) {
    const detailsRes = await fetch(char.url);
    const detailsData = await detailsRes.json();
    const character = detailsData.result.properties;

    contentDiv.innerHTML += `
      <div class="card">
        <h3>${character.name}</h3>
        <p><strong>Height:</strong> ${character.height} cm</p>
        <p><strong>Gender:</strong> ${character.gender}</p>
        <p><strong>Birth Year:</strong> ${character.birth_year}</p>
      </div>
    `;
  }
}

async function loadFilms() {
  contentDiv.innerHTML = '<p>Loading films...</p>';
  const response = await fetch('https://swapi.tech/api/films');
  const data = await response.json();

  contentDiv.innerHTML = ''; // Clear after loading

  for (const film of data.result) {
    const filmData = film.properties;
    contentDiv.innerHTML += `
      <div class="card">
        <h3>${filmData.title}</h3>
        <p><strong>Director:</strong> ${filmData.director}</p>
        <p><strong>Release Date:</strong> ${filmData.release_date}</p>
        <p><strong>Opening Crawl:</strong><br /> ${filmData.opening_crawl.substring(0, 150)}...</p>
      </div>
    `;
  }
}

charactersBtn.addEventListener('click', loadCharacters);
filmsBtn.addEventListener('click', loadFilms);

