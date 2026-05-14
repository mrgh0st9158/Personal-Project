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

  criarNovoUsuario = document.getElementById("usuarioNovo").innerHTML = criarNovoUsuario
  novaSenha = document.getElementById("senhaNova").innerHTML = novaSenha

esconderTodo();
document.getElementById("inicioSeccion").classList.add("ativa")
}

function iniciaSeccion(){

  usuario = document.getElementById("usuarios").innerHTML = usuario
  senha = document.getElementById("senhas").innerHTML = senha

  if(usuario != criarNovoUsuario || senha != novaSenha){

    document.getElementById("errado").innerHTML = "Nome ou Senha errado!"
  }
  else{
    window.location = "Index.html"
  }

}