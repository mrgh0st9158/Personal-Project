

let numeroAleatorio, dificultad, resposta, tentativas

function criarNumeroAleatorio(){
dificultad=Number(prompt("Nivel de Dificuldade(coloca qualquer numero)"))
numeroAleatorio =Number(Math.ceil(Math.random() * dificultad))
let dificuldade=document.getElementById('dificuldade')
if(numeroAleatorio <= 50){
    dificuldade.innerHTML ="Dificuldade Facil !ENCONTA O NUMERO ENTRE 0 e  " + dificultad

}else if(numeroAleatorio<=100){
    dificuldade.innerHTML ="Dificuldade mais ou menos !ENCONTA O NUMERO ENTRE 0 e " + dificultad
}else if(numeroAleatorio<=200){
    dificuldade.innerHTML ="Dificuldade media !ENCONTA O NUMERO ENTRE 0 e " + dificultad
    
}else if(numeroAleatorio<=500){
    dificuldade.innerHTML ="Dificuldade dificil !ENCONTA O NUMERO ENTRE 0 e " + dificultad
    
}else if(numeroAleatorio>500){
    dificuldade.innerHTML ="Dificuldade imposivel !BOA SORTE" + dificultad
    
}
   
}
function adivinharNumero(){
    resposta= Number(prompt("ADIVINHA O NUMERO!"))
    let respostaDoNumero =  document.getElementById('respostaDoNumero')
    if(resposta==numeroAleatorio){
       respostaDoNumero.innerHTML = "PARABENS"
    }else{
        respostaDoNumero.innerHTML= "errado, resposta: "  + numeroAleatorio
    }
}

