

let numeroAleatorio, dificultad, resposta, totalTentativas=-1

function criarNumeroAleatorio() {
    dificultad = Number(prompt("Nivel de Dificuldade(coloca qualquer numero)"))
    numeroAleatorio = Number(Math.ceil(Math.random() * dificultad))
    totalTentativas = 5
    let dificuldade = document.getElementById('dificuldade')
    if (dificultad <= 50) {
        dificuldade.innerHTML = "Dificuldade Facil !ENCONTA O NUMERO ENTRE 0 e  " + dificultad

    } else if (dificultad <= 100) {
        dificuldade.innerHTML = "Dificuldade mais ou menos !ENCONTA O NUMERO ENTRE 0 e " + dificultad
    } else if (dificultad <= 200) {
        dificuldade.innerHTML = "Dificuldade media !ENCONTA O NUMERO ENTRE 0 e " + dificultad

    } else if (dificultad <= 500) {
        dificuldade.innerHTML = "Dificuldade dificil !ENCONTA O NUMERO ENTRE 0 e " + dificultad

    } else if (dificultad > 500) {
        dificuldade.innerHTML = "Dificuldade imposivel !BOA SORTE" + dificultad

    }
}



function adivinharNumero() {
    if(totalTentativas == -1){
alert("Não começou o jogo, vou iniciar eu")
criarNumeroAleatorio()
return
    }
        if(totalTentativas>0){
            
        palpite = Number(prompt("ADIVINHA O NUMERO!"))
        let respostaDoNumero = document.getElementById('respostaDoNumero')
        console.log(palpite)
        console.log("Num certo: " + numeroAleatorio)
        
    if (palpite != numeroAleatorio && totalTentativas > 0) {
        console.log("tentatias anterior: " + totalTentativas)
        totalTentativas = totalTentativas - 1
        respostaDoNumero.innerHTML =  "Palpites restantes: " + totalTentativas
        console.log("tentatias posterior: " + totalTentativas)
        if(palpite < numeroAleatorio){
            dicaPalpite = document.getElementById('dicaPalpite').innerHTML = "É maior"
        }else{
            dicaPalpite.innerHTML = "É menor"
        }
        
    } else {
        respostaDoNumero.innerHTML = ('Parabens')
    }
    
    }else {
alert("Perdeu")
buttonAdivinhar().disable=false
    }

}