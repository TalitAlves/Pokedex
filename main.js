const ol = document.querySelector("#pokedex");
const li = document.querySelector("li");
const searchInput = document.querySelector("input")
const searchButton = document.querySelector("#searchBtn")
const favoriteBtn = document.querySelectorAll(".favorite")

let pokemoms = [];

const renderPokemons = (array) => {
  ol.innerHTML = "";

  array.forEach((element) => {
    ol.innerHTML += `
    <li class= "card">
    <div class="card-title">${element.name} </div>
    <div><span class="material-symbols-outlined favorite">
    star
    </span></div>
    <img class="card-image" src="${element.image}">
    <div class="card-subtitle">
        <div class="subtitle"><span class="bold-subtitle">Tipo</span>: ${element.type}</div>
        <div class="subtitle"><span class="bold-subtitle">Points</span>: ${element.puntos}</div>
    </div>
    <div class="card-subtitle">
        <div class="subtitle"><span class="bold-subtitle">Move</span>: ${element.move} </div>
     </div>
    
    </li>
    
    `;
  });
};


const handleSearch =(event)=>{
  event.preventDefault();
  let value = (searchInput.value).toUpperCase()
  let searchPokemon = []

  const findPokemon = pokemoms.find((element) => (element.name).toUpperCase() == value)
  searchPokemon.push(findPokemon)

  renderPokemons(searchPokemon) 

}

searchButton.addEventListener("click", handleSearch)

const getApi = async () => {
  for (let i = 1; i <= 50; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const response = await fetch(url);
    const respJson = await response.json();
    pokemoms.push(respJson);
  }
  
  pokemoms = mapArray(pokemoms);
  console.log(pokemoms);
  renderPokemons(pokemoms);
};

const mapArray = (array) => {
  return array.map((element) => {
    return {
      name: element.name,
      image: element.sprites["front_default"],
      type: element.types.map((type) => type.type.name).join(", "),
      id: element.id,
      puntos: element.base_experience,
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
