function popularpokemons(){
  const parametro = param()
  // if (localStorage.getItem('pokemons'+parametro) != null){

  //   const get = localStorage.getItem('pokemons'+parametro)
  //   nomes = JSON.parse(get)
  //   nomes.forEach(container =>{
  //       request(container)
  //   })
  // }
}



function param(){
  var sPageURL = window.location.search.substring(1);
  var sParameterName = sPageURL.split('=');
  return sParameterName[1];
}

function popular(){
  const paramTextElement = document.getElementById('texto');
  const parametro = param()

  paramTextElement.textContent += parametro;

}

// var spanElement = document.getElementById("equipenome");
// spanElement.addEventListener("click", openDialog);

function openDialog() {
  var dialog = document.getElementById("meuDialogo");
  dialog.showModal();
}

function fecharDialog() {
  var dialog = document.getElementById("meuDialogo")
  dialog.close();
}




function confirmarDialog(event){
  event.preventDefault()
  var dialog = document.getElementById("meuDialogo");
  const nome = document.getElementById("nome").value;
  const parametro = param()
  localStorage.setItem('Nome'+parametro,nome)
  document.getElementById('equipenome').innerText ='Equipe:' + nome
  
  displaygrid()
  dialog.close();
}

function displaygrid(){
  document.getElementById('pokemons').style.display = 'grid';
}


