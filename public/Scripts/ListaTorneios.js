var torneios = []
function openDialog() {
  
  var dialog = document.getElementById("meuDialogo");
  dialog.showModal();
}

function fecharDialog() {
  var dialog = document.getElementById("meuDialogo");
  dialog.close();
}


function popup(id){
  var dialog = document.getElementById("entrarTorneio");
  var a = document.getElementById("inputtexto")

  dialog.showModal();
  a.value = id

}
