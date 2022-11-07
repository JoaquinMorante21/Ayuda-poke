const url = "https://pokeapi.co/api/v2/pokemon/";
const div = document.getElementById("div");
const btn = document.getElementById("btn");
const btnDelete = document.getElementById("btn-delete");
const input = document.getElementById("input");

const traerPokemon = async () => {
  const id = input.value();
  const response = await fetch(url + id);
  const data = await response.json();
  console.log(data);
  const html = `
    <img class="pokemones" src="${data.sprites.other.home.front_default}">
    `;

  div.innerHTML = html;
  return data;
};

/* traerPokemones() */

const traerPokemones = async () => {
  const response = await fetch(url);

  const data = await response.json();

  const arrPromesas = data.results.map((poke) =>
    fetch(poke.url).then((res) => res.json())
  );

  const results = await Promise.all(arrPromesas);
  console.log(results);
  mapearPokemones(results);
  return results;
};

/* traerPokemones() */

const mapearPokemones = (resultados) => {
  const html = resultados
    .map(
      (pokemon) =>
        `
          <p styles="display: flex; justify-content: center; align-items: center;">
            <img width="100px" src="${pokemon.sprites.other.home.front_default}">
            <img width="100px" src="${pokemon.sprites.other.dream_world.front_default}">
            ${pokemon.name}
          </p>
        `
    )
    .join("");
  div.innerHTML = html;
};

const deleteAll = () => {
  div.innerHTML = "";
};

btn.addEventListener("click", traerPokemon);
btnDelete.addEventListener("click", deleteAll);

traerPokemones();

const genericFetch = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    return data  
  } catch (error) {
    console.log(error)
  }
}