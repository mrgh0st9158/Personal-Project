
//alert("Benvindo a BOW")

function esconderTodo(){
  const tela = document.querySelectorAll(".tela");
  tela.forEach(function(tela){
    tela.classList.remove("ativa")});
 
}

function abrirInicio(){
esconderTodo();
document.getElementById("inicios").classList.add("ativa")

}

function abrirBandas(){
    esconderTodo();
    document.getElementById("bandas").classList.add("ativa")
    
}

function abrirColaboradores(){
    esconderTodo();
    document.getElementById("colaboradores").classList.add("ativa")
    
}
function abrirContatos(){
    esconderTodo();
    document.getElementById("contatos").classList.add("ativa")
    
}
function abrirShop(){
    esconderTodo();
    document.getElementById("bowshop").classList.add("ativa")
    
}