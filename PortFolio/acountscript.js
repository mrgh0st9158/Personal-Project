let criarNovoUsuario, novaSenha, usuario, senha 


function esconderTodo(){
  const tela = document.querySelectorAll(".tela");
  tela.forEach(function(tela){
    tela.classList.remove("ativa")});
 
}
function novoUsuario(){
    esconderTodo();
    document.getElementById("cadastrarConta").classList.add("ativa")
}

function criarConta(){
esconderTodo();
document.getElementById("inicioSeccion").classList.add("ativa")
}

