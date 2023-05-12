const ol = document.querySelector("#pokedex");
const searchInput = document.querySelector("input");
const searchButton = document.querySelector("#searchBtn");
const section = document.querySelector(".favorites-section");
const sectionTitle = document.querySelector(".section-title");

// render pokemons
let pokemoms = [];
const favorites = [];
let totalPoints = 0;
let icon;


const makeCard = (array, html) => {


  array.forEach((element) => {
    html.innerHTML += `
    <li class= "card">
    <div class="${element.type} borderStyle">
    <div class="card-title favoriteIcon" id="${element.id}">
    <div class="cp"># ${element.points}</div>
     ${icon} 
    </div>
  
    <img class="card-image" src="${element.image}">
    <div class="card-title">${element.name} </div>
    
    <div class="card-subtitle">
        <div class="subtitle"><span class="bold-subtitle">Tipo</span>: ${element.type}</div>
     </div>
    <div class="card-subtitle">
        <div class="subtitle"><span class="bold-subtitle">Move</span>: ${element.move} </div>
     </div>
     </div>
    </li>
    
    `;

    
  });

  const favoritesBtn = document.querySelectorAll(".favoriteIcon");
  for (const button of favoritesBtn) {
    button.addEventListener("click", handleFavorites);
  }

};

const renderPokemons = () => {
    ol.innerHTML = "";
    icon = `<span class="material-symbols-outlined favorite">favorite</span>`;
  
    for (const pokemom of pokemoms) {
    pokemom.checked= false
    
  }

  makeCard(pokemoms, ol);
};

//Search pokemons
const handleSearch = (event) => {
  event.preventDefault();
  let value = searchInput.value.toUpperCase();
  let searchPokemon = [];

  const findPokemon = pokemoms.find(
    (element) => element.name.toUpperCase() == value
  );
  searchPokemon.push(findPokemon);
  ol.innerHTML = "";
  makeCard(searchPokemon, ol);
};

searchButton.addEventListener("click", handleSearch);

//Favoritar pokemons
const handleFavorites = (event) => {
  let id = event.target.parentNode.id;

  const pokemonIndex = favorites.findIndex((element) => element.id == id);
  const findFivorites = pokemoms.find((element) => element.id == id);

  if (!favorites.includes(findFivorites)) {
    favorites.push(findFivorites);
    icon = `<span class="material-symbols-outlined favorited">delete</span>`;
    const calcTotalPoints = favorites.reduce(
      (sum, element) => (sum += element.points),
      0
    );
    findFivorites.checked = true
    
    totalPoints = calcTotalPoints;
    renderFavorites();
  } else if (favorites.includes(findFivorites)) {
    favorites.splice(pokemonIndex, 1);
    const calcTotalPoints = favorites.reduce(
      (sum, element) => (sum += element.points),
      0
    );
    totalPoints = calcTotalPoints;
    renderFavorites();
  }

  console.log(favorites)
};

const renderFavorites = () => {
  sectionTitle.innerHTML = `
  <h1>Favorites</h1>
  <a href="#top-page" class="anchorLink"><h3>Go to <span class="tached">Search</span></h3></a>
  <h2>Total Combat Power of your favorite pokemons: ${totalPoints} </h2>
  `;

  section.innerHTML = "";
  makeCard(favorites, section);
};

//Get Api
const getApi = async () => {
  for (let i = 1; i <= 50; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const response = await fetch(url);
    const respJson = await response.json();
    pokemoms.push(respJson);
  }

  pokemoms = mapArray(pokemoms);
  console.log(pokemoms)
  renderPokemons(pokemoms);
};

const mapArray = (array) => {
  return array.map((element) => {
    return {
      name: element.name,
      image: element.sprites["front_default"],
      type: element.types.map((type) => type.type.name).join(", "),
      id: element.id,
      points: element.base_experience,
      type: element.types[0].type.name,
      move: element.moves[0].move.name,
    };
  });
};

const getResponse = async () => {
  await getApi();
};

getResponse();

/* printar los 150 primeiros porkemons
2. criar el formulario para hacer la busqueda
3. selecionar los inputs
4. crear un evento para quando se ponga el nombre
5. verificar se el nombre esta en el array de pokemons
  usando un find dentro del array de pokemons, buscar por el name
6. se es verdadeiro = renderizar la pagina solo con el pokemon buscado
  
*/
