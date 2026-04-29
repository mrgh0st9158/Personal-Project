let newsenha, newusuario, usuario, senha

function ciarconta(){
    newusuario = prompt("Crie seu usuario")
newsenha = prompt("Crie sua senha")

}
function acessarconta(){
    usuario = prompt("Usuario")
    senha = prompt("Senha")

if(usuario != newusuario || senha != newsenha){

    document.getElementById("Conta").innerHTML = "Senha ou Usuario Errado, Tenta de novo"

    //alert("Errada a senha ou usuario")
}
else{
window.location.href = "index.html"
}
}




