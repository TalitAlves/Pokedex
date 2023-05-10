const ol = document.querySelectorAll("#pokedex");
const input = document.querySelector("input")

const pokemoms = [];

const getApi = async () => {
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const response = await fetch(url);
    const respJson = await response.json();
    pokemoms.push(respJson);
  }
  console.log(pokemoms);
};

const getResponse = async () => {
  await getApi();
};

getResponse();

/* formulario para filtrar los pokemon, nombre 
  printar los favoritos con todo lo printado antes
  anadir boton de favoritos
  
*/
