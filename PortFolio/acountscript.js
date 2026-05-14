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

  criarNovoUsuario = document.getElementById("usuarioNovo").value;
  novaSenha = document.getElementById("senhaNova").value;

  esconderTodo();
  document.getElementById("inicioSeccion").classList.add("ativa")
  }

 function iniciaSeccion(){

  usuario = document.getElementById("usuarios").value;
  senha = document.getElementById("senhas").value;

  if(usuario == criarNovoUsuario && senha == novaSenha){
    
    window.location = "Index.html"
  }
  else{
    document.getElementById("errado").innerHTML = "Nome ou Senha errado!"
  }

}