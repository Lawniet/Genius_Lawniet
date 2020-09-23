let order = [];
let clickedOrder = [];
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    });
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        //alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        swal({ title: 'Pontuação: ' + score, text: 'Você acertou! Iniciando próximo nível!', timer: 700,button: false});
        
        nextLevel();
    }
}

//funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },350);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//funcao para game over
let gameOver = () => {
  
  alert(`Este é seu limite?\nSua pontuação foi de ${score}.\n Tente novamente :D`);
  //TODO: pesquisar o bug relacionado a esse swal()
  /*swal({title: "Este é seu limite?", text: "Sua pontuação foi de ", button: "Vamos jogar novamente!"});*/
  order = [];
  clickedOrder = [];
  playGame();
}

//funcao de inicio do jogo
let playGame = () => {

    swal({  title: "Bem vindo ao Geniets!",  text: "Estamos iniciando novo jogo. Espero que se divirta :D",  icon: "info",  buttons: ["Como jogar", "Vamos jogar!"],  dangerMode: false, }).then((willDelete) => {
      if (willDelete) { swal("Boa sorte!", { icon: "success",timer: 700, button: false });
      } 
      else {
          const urlImage = "https://piskel-imgstore-b.appspot.com/img/da22d597-fdaf-11ea-aa59-6b4e8d0b6e8e.gif";
          const textRegra = "Jogo Genius Estrela: O clássico está de volta! Aceite o desafio: Pense rápido e tente repetir as sequências de luzes. Clique na cor mais clara na ordem correta e aumente sua pontução a cada rodada!";
          swal({ title: "Sobre o jogo:", text: textRegra, icon: urlImage });
      }
    });

    score = 0;
    nextLevel();
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


//inicio do jogo
playGame();