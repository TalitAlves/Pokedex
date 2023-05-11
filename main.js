const ol = document.querySelector("#pokedex");
const li = document.querySelector("li")
let pokemoms = [];

const renderPokemons = () => {
  pokemoms.forEach((element) => {
    ol.innerHTML += `
    <li class= "card">
    <div class="card-title">Nome:${element.name} </div>
    <div class="card-subtitle">
        <div >Tipo: ${element.type}</div>
        <div >Move: ${element.move} </div>
        <div>Points: ${element.puntos}</div>
    </div>
    <img class="card-image" src="${element.image}">
    </li>
    
    `
    
  });
};


const getApi = async () => {
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const response = await fetch(url);
    const respJson = await response.json();
    pokemoms.push(respJson);
   
  }
  console.log(pokemoms);
  pokemoms = mapArray(pokemoms)
  console.log(pokemoms);

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
      move: element.moves[0].move.name
      
    };
  });
};

const getResponse = async () => {
  await getApi();
  renderPokemons()

};

getResponse();

/* formulario para filtrar los pokemon, nombre 
  printar los favoritos con todo lo printado antes
  anadir boton de favoritos
  
*/
