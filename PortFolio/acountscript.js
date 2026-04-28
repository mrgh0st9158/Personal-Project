let newsenha, newusuario, usuario, senha

function ciarconta(){
    newusuario = prompt("Crie seu usuario")
newsenha = prompt("Crie sua senha")

}
function acessarconta(){
    usuario = prompt("Usuario")
    senha = prompt("Senha")

if(usuario != newusuario || senha != newsenha){
    alert("Errada a senha ou usuario")
}
else{
window.location.href = "/Repos%20T3eK/Personal-Project/PortFolio/Index.html"
}
}




