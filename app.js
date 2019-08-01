//Declarations
let output = document.querySelector('.output');
let outputText = document.querySelector('.outputText');
let directions = document.querySelector('.directions');
let field = document.querySelector('.field');
let moveArray = [];
let spanID = 0;
let toBeha, toReno, toLandcruiser, toRandomGF, toMalyi;
let difficulty = 140;
let moveSpeed = 20;
let reset = document.querySelector('#reset');
let reload = document.querySelector('#reload');

//Creating images
let darko = document.createElement('span');
field.appendChild(darko);
let darkoSpan = document.createElement('span');
darko.appendChild(darkoSpan);
darkoSpan.textContent = 'Дарко';
let darkoImg = document.createElement('img');
darkoImg.src = './images/darko.png'
darko.appendChild(darkoImg);

let beha = document.createElement('span');
field.appendChild(beha);
let behaImg = document.createElement('img');
behaImg.src = './images/beha.png';
beha.appendChild(behaImg);
let behaSpan = document.createElement('span');
beha.appendChild(behaSpan);
behaSpan.textContent = 'Беха';

let reno = document.createElement('span');
field.appendChild(reno);
let renoImg = document.createElement('img');
renoImg.src = './images/reno.png';
reno.appendChild(renoImg);
let renoSpan = document.createElement('span');
reno.appendChild(renoSpan);
renoSpan.textContent = 'Меган';

let landcruiser = document.createElement('span');
field.appendChild(landcruiser);
let landcruiserImg = document.createElement('img');
landcruiserImg.src = './images/landc.png';
landcruiser.appendChild(landcruiserImg);
let landcruiserSpan = document.createElement('span');
landcruiser.appendChild(landcruiserSpan);
landcruiserSpan.textContent = 'Крузер';

let malyi= document.createElement('span');
field.appendChild(malyi);
let malyiSpan = document.createElement('span');
malyi.appendChild(malyiSpan);
malyiSpan.textContent = 'Мàлий';
let malyiImg = document.createElement('img');
malyiImg.src = './images/malyi.png';
malyi.appendChild(malyiImg);

let randomGF= document.createElement('span');
field.appendChild(randomGF);
let randomGFSpan = document.createElement('span');
randomGF.appendChild(randomGFSpan);
randomGFSpan.textContent = 'Рандом ГФ';
let randomGFImg = document.createElement('img');
randomGFImg.src = './images/model.png';
randomGF.appendChild(randomGFImg);

let imagesArray = [beha, reno, landcruiser, randomGF, malyi];

//Seting positions
let setRandomDarko = () => {
  darko.topRandom = Math.floor(Math.random() * 550);
  darko.leftRandom = Math.floor(Math.random()* 700);
  darko.style.top = `${darko.topRandom}px`;
  darko.style.left = `${darko.leftRandom}px`;
  darko.style.zIndex = 2;
}

let setRandomPosition = (element) => {
  element.topRandom = Math.floor(Math.random() * 550);
  element.leftRandom = Math.floor(Math.random()* 700);
  element.style.top = `${element.topRandom}px`;
  element.style.left = `${element.leftRandom}px`;
  element.style.zIndex = 1;
  
  if (((Math.abs(element.topRandom - darko.topRandom)) + (Math.abs(element.leftRandom- darko.leftRandom))) < 300) {
      setRandomPosition(element);
  }
  imagesArray.forEach(function(arrElement) {
    if (element === arrElement) {
    } else if ((Math.abs(element.topRandom - arrElement.topRandom) + Math.abs(element.leftRandom - arrElement.leftRandom)) < 100) {
        setRandomPosition(element);
      }
    });
}

setRandomDarko();
setRandomPosition(beha);
setRandomPosition(reno);
setRandomPosition(landcruiser);
setRandomPosition(randomGF);
setRandomPosition(malyi);

//Key => directions
let keyMove = (keyCode) => {
  let arrowDisplay;
  let createSpan = () => {
    arrowDisplay = document.createElement('span');
    arrowDisplay.id = `span${spanID}`;
    directions.appendChild(arrowDisplay);
    spanID++;
  }
  switch (keyCode) {
    case 38 :
      createSpan();
      arrowDisplay.innerHTML = '&#8593;';
      moveArray.push(keyCode);
      break;
    case 40 : 
      createSpan();
      arrowDisplay.innerHTML = '&#8595;';
      moveArray.push(keyCode);
      break;
    case 37 :
      createSpan();
      arrowDisplay.innerHTML = '&#8592;';
      moveArray.push(keyCode);
      break;
    case 39 :
      createSpan();
      arrowDisplay.innerHTML = '&#8594;';
      moveArray.push(keyCode);
      break;
    default:
      break;
  }
}

//Final movement
let movement = (ArrayToMove) => {
  let i = 0;
  let moveTick = (ArrayToMove) => {
    if (i > 0) {
      document.querySelector(`#span${i-1}`).classList.toggle('red');
      document.querySelector(`#span${i}`).classList.toggle('red');
    } else {
      document.querySelector(`#span${i}`).classList.toggle('red');
    };
    switch (ArrayToMove[i]) {
      case 38 :
        darko.topRandom -= moveSpeed;
        darko.style.top = `${darko.topRandom}px`;
        break;
      case 40 : 
        darko.topRandom += moveSpeed;
        darko.style.top = `${darko.topRandom}px`;
        break;
      case 37 :
        darko.leftRandom -= moveSpeed;
        darko.style.left = `${darko.leftRandom}px`;
        break;
      case 39 :
        darko.leftRandom += moveSpeed;
        darko.style.left = `${darko.leftRandom}px`;
        break;
      default:
        break;
      }
    i++;
    if (i == ArrayToMove.length) {
      console.log('finish')
      moveArray = [];
      clearInterval(moveInerval);
      calculateFinish();
    }
    if (darko.leftRandom < -35|| darko.leftRandom > 710 || darko.topRandom < -80 || darko.topRandom > 530) {
      console.log('drowned');
      drowned();
      moveArray = [];
      clearInterval(moveInerval);
    }
  }
  let moveInerval = setInterval(moveTick, 200, ArrayToMove);
}

//Defining finish
function calculateFinish() {
  function toCenter(darko, element) {
    return Math.abs(darko.topRandom + darko.offsetHeight / 2 - element.topRandom - element.offsetHeight / 2) + Math.abs(darko.leftRandom + darko.offsetWidth / 2 - element.leftRandom - element.offsetWidth / 2);
  }
  toBeha = toCenter(darko, beha);
  toReno = toCenter(darko, reno);
  toLandcruiser = toCenter(darko, landcruiser);
  toRandomGF = toCenter(darko, randomGF);
  toMalyi = toCenter(darko, malyi);
  console.log(toBeha, toReno, toLandcruiser, toRandomGF, toMalyi)
  if (toBeha > difficulty && toReno > difficulty && toLandcruiser > difficulty && toRandomGF > difficulty && toMalyi > difficulty) {
    console.log('Complete loose');
    completeLose();
  } else if (toBeha <= toReno && toBeha <= toLandcruiser && toBeha <= toRandomGF && toBeha <= toMalyi) {
    console.log('Beha win');
    behaWin();
  } else if (toReno <= toLandcruiser && toReno <= toRandomGF && toReno <= toMalyi) {
    console.log('Reni win');
    renoWin();
  } else if (toLandcruiser <= toRandomGF && toLandcruiser <= toMalyi) {
    console.log('Landcru win');
    landcruiserWin();
  } else if (toRandomGF <= toMalyi) {
    console.log('Dariy moze vze dosyt');
    randomGFWin();
  } else {
    console.log('Malyi forever');
    completeLose();
  }
}

//Wins
function behaWin() {
  let i=0;
  let shazkOpacity = 0.1;
  shazkCreate(randomGF);
  let malyiTodarko = tickCount(malyi, darko);
  let behaTorandomGF = tickCount(beha, randomGF) + malyiTodarko;
  let shazkToCreate = behaTorandomGF + 4 + 10;
  let shazkToMove = tickCount(shazk, randomGF) + shazkToCreate - 10;
  dialogue(darko, 'Мàлий, го поганяєм', -40, -20);
  let fader = 1;
  let behaWinTick = () => {
    if (i < malyiTodarko) {
      elementToElement(malyi, darko, 60, 0);
    } else if (i === malyiTodarko) {
      document.querySelector('.dialogue').remove();
    } else if (i < behaTorandomGF) {
      elementToElement(beha, randomGF, 70, -50);
      sitInCar(darko, malyi, beha);
    } else if (i === behaTorandomGF) {
      dialogue(beha, 'Мàлий, на виход!', 0, -60);
    } else if (i === (behaTorandomGF + 1)) {
      passangerOut(malyi, beha);
    } else if (i === (behaTorandomGF + 3)) {
      sitInCar(darko, randomGF, beha);
    } else if (i < shazkToCreate && i > (behaTorandomGF + 3) ) {
      document.querySelector("#shazk").style.opacity = `${shazkOpacity}`;
      shazkOpacity += 0.1;
    } else if ( i === shazkToCreate) {
      document.querySelector('.dialogue').remove();
    } else if (i < shazkToMove) {
      moveToShazk(beha)
      sitInCar(darko, randomGF, beha);
    } else if (i < shazkToMove + 15){
      carFade(darko, randomGF, beha, fader);
      sitInCar(darko, randomGF, beha);
      fader -= 0.1;
    } else if (i == (shazkToMove + 15)){
      outputText.innerHTML = '<strong>You won: Good job! Darko has found his BMW and his true love!</strong>'
      outputText.style.color = "green";
      console.log('finished');
      clearInterval(behaWinInerval);
    }
    i++
  }
  let behaWinInerval = setInterval(behaWinTick, 200);
}

function renoWin() {
  let i=0;
  let shazkOpacity = 0.1;
  shazkCreate(reno);
  let malyiTodarko = tickCount(malyi, darko);
  let shazkToCreate = malyiTodarko + 12;
  let shazkToMove = tickCount(shazk, reno) + shazkToCreate - 10;
  dialogue(darko, 'Мàлий, го в Шацьк!', -40, -20);
  let fader = 1;
  let renoWinTick = () => {
    if (i < malyiTodarko) {
      elementToElement(malyi, darko, 60, 0);
    } else if (i === malyiTodarko) {
      document.querySelector('.dialogue').remove();
    } else if (i < shazkToCreate) {
      sitInCar(malyi, darko, reno);
      document.querySelector("#shazk").style.opacity = `${shazkOpacity}`;
      shazkOpacity += 0.1;
    } else if (i < shazkToMove) {
      moveToShazk(reno)
      sitInCar(malyi, darko, reno);
    } else if (i < shazkToMove + 15){
      carFade(darko, malyi, reno, fader);
      sitInCar(malyi, darko, reno);
      fader -= 0.1;
    } else if (i == (shazkToMove + 15)){
      outputText.innerHTML = '<strong>You lost: Darko never found his true love and lived with Malyi till the end of his days...</strong>'
      outputText.style.color = "red";
      reload.style.backgroundColor = "orange";
      console.log('finished');
      clearInterval(renoWinInerval);
    }
    i++
  }
  let renoWinInerval = setInterval(renoWinTick, 200);
}

function landcruiserWin() {
  let i=0;
  let malyiTodarko = tickCount(malyi, darko);
  let landcruiserWinTick = () => {
    if (i < malyiTodarko) {
      elementToElement(malyi, darko, 60, 0);
    } else if (i == malyiTodarko){
      dialogue(darko, 'Мàлий, за які Ши-Ши?', -40, -20);
    }
    else if (i == (malyiTodarko + 3)){
      outputText.innerHTML = '<strong>You lost: Darko does not have enough money for Land Cruiser. At least for now...</strong>'
      outputText.style.color = "red";
      reload.style.backgroundColor = "orange";
      console.log('finished');
      clearInterval(landcruiserWinInerval);
    }
    i++
}
  let landcruiserWinInerval = setInterval(landcruiserWinTick, 200);
}

function randomGFWin() {
  let i=0;
  let randomGFWinTick = () => {
    if (i < 10) {
      dialogue(randomGF, 'Дарій, може вже досить?', -40, -20);
    }
    else if (i == 10){
      outputText.innerHTML = '<strong>You lost: No BMW == no true love...</strong>'
      outputText.style.color = "red";
      reload.style.backgroundColor = "orange";
      console.log('finished');
      clearInterval(randomGFWinInerval);
    }
    i++
}
  let randomGFWinInerval = setInterval(randomGFWinTick, 200);
}

function completeLose() {
  let i=0;
  let malyiTodarko = tickCount(malyi, darko);
  let completeLoseTick = () => {
    if (i < malyiTodarko) {
      elementToElement(malyi, darko, 60, 0);
    } else if (i == malyiTodarko){
      dialogue(darko, 'Мàлий, визивай убер.', -40, -20);
    }
    else if (i == (malyiTodarko + 3)){
      outputText.innerHTML = '<strong>You lost: Darko never found a car and travelled by Uber till the end of his days...</strong>'
      outputText.style.color = "red";
      reload.style.backgroundColor = "orange";
      console.log('finished');
      clearInterval(completeLoseInerval);
    }
    i++
}
  let completeLoseInerval = setInterval(completeLoseTick, 200);
}

function drowned() {
  dialogue(darko, 'Буль-буль', -40, -20);
  outputText.innerHTML = '<strong>You lost: Oh, no! Darko is drowning and Malyi is nowhere near to help!</strong>'
  outputText.style.color = "red";
  reload.style.backgroundColor = "orange";
}


//Tick count
function tickCount(element, destination) {
  return Math.floor((Math.abs(element.topRandom - destination.topRandom) + Math.abs(element.leftRandom - destination.leftRandom + 60))/moveSpeed) + 3;
}

//Element move to element
function elementToElement (element, destination, leftCorrection, topCorrection) {
  if (element.topRandom < (destination.topRandom - topCorrection) && Math.abs(element.topRandom - destination.topRandom + topCorrection) > moveSpeed ) {
    element.topRandom += moveSpeed;
    element.style.top = `${element.topRandom}px`
  } else if (element.topRandom > (destination.topRandom - topCorrection) && Math.abs(element.topRandom - darko.topRandom - topCorrection) > moveSpeed ) {
    element.topRandom -= moveSpeed;
    element.style.top = `${element.topRandom}px`
  } else if (element.leftRandom < (destination.leftRandom - leftCorrection) &&  Math.abs(element.leftRandom - destination.leftRandom + leftCorrection) > moveSpeed ) {
    element.leftRandom += moveSpeed;
    element.style.left = `${element.leftRandom}px`
  } else if (element.leftRandom > (destination.leftRandom - leftCorrection) && Math.abs(element.leftRandom - destination.leftRandom - leftCorrection) > moveSpeed ) {
    element.leftRandom -= moveSpeed;
    element.style.left = `${element.leftRandom}px`
  }
}

//Dialogue
function dialogue(element, message, leftCorrection, topCorrection) {
  let dial = document.createElement('span');
  dial.classList.add('dialogue');
  dial.textContent = message;
  field.appendChild(dial);
  dial.style.top = `${element.topRandom + topCorrection}px`;
  dial.style.left = `${element.leftRandom + leftCorrection}px`;
  dial.style.zIndex = 1;
}

//Sit in car
function sitInCar (driver, passanger, car) {
  driver.style.zIndex = 3;
  passanger.style.zIndex = 2;
  car.style.zIndex = 4;
  driver.style.top = `${car.topRandom - 70}px`;
  driver.style.left = `${car.leftRandom + 35}px`;
  passanger.style.top = `${car.topRandom - 70}px`;
  passanger.style.left = `${car.leftRandom}px`;
  driver.querySelector('span').style.visibility = "hidden";
  passanger.querySelector('span').style.visibility = "hidden";
  car.querySelector('span').style.visibility = "hidden";
}

//Passenger out
function passangerOut(element, car) {
  element.topRandom = car.topRandom + 20;
  element.style.top = `${element.topRandom}px`;
  element.leftRandom = car.leftRandom - 20;
  element.style.left = `${element.leftRandom}px`;
}

//Shazk create
function shazkCreate(car) {
  let shazk = document.createElement('span');
  shazk.id = 'shazk';
  shazk.style.width = '300px';
  shazk.style.height = '200px';
  shazk.style.backgroundImage = "url('./images/shazk.png')";
  shazk.style.backgroundSize = 'contain';
  shazk.style.opacity = '0';
  shazk.style.zIndex = '1';
  field.appendChild(shazk);
  shazk.topRandom = 0;
  shazk.leftRandom = 0;
  if (car.leftRandom < 450) {
    shazk.leftRandom = 450; 
    shazk.style.left = `${shazk.leftRandom}px`};
}

//Move to Shazk
function moveToShazk(car) {
  if ((shazk.topRandom + 180) < car.topRandom && Math.abs(shazk.topRandom + 180 - car.topRandom) > moveSpeed) {
    car.topRandom -= moveSpeed;
    car.style.top = `${car.topRandom}px`;
  } else if (car.topRandom < (shazk.topRandom + 180) && Math.abs(shazk.topRandom + 180 - car.topRandom) > moveSpeed) {
    car.topRandom += moveSpeed;
    car.style.top = `${car.topRandom}px`;
  }
  if (shazk.leftRandom < car.leftRandom && Math.abs(shazk.leftRandom - car.leftRandom) > moveSpeed) {
    car.leftRandom -= moveSpeed;
    car.style.left = `${car.leftRandom}px`;
  } else if (car.leftRandom < shazk.leftRandom && Math.abs(shazk.leftRandom - car.leftRandom) > moveSpeed) {
    car.leftRandom += moveSpeed;
    car.style.left = `${car.leftRandom}px`;
  }
}

//Car fade
function carFade(driver, passanger, car, fader) {
  driver.style.opacity =`${fader}`;
  passanger.style.opacity =`${fader}`;
  car.style.opacity =`${fader}`;
  car.topRandom -= (moveSpeed/2);
  car.style.top = `${car.topRandom}px`;
  car.leftRandom += (moveSpeed/2);
  car.style.left = `${car.leftRandom}px`;
}

//Random movement
let randomMovement = (element) => {
  let coin = Math.floor(Math.random()*2);
  if (coin == 1) {
    randTickTop = Math.floor(Math.random()*30) - 15;
    randTickLeft = Math.floor(Math.random()*30) - 15;
    element.topRandom += randTickTop;
    element.style.top = `${element.topRandom}px`;
    element.leftRandom += randTickLeft;
    element.style.left = `${element.leftRandom}px`;
    if (element.leftRandom < -15 || element.leftRandom > 730 || element.topRandom < -15 || element.topRandom > 590) {
      randomMovement(element);
    }
  }
}


//Key event listeners
document.addEventListener('keydown', function keyPress(key) {
  if (key.keyCode !== 32) {
    keyMove(key.keyCode);
    randomMovement(beha);
    randomMovement(landcruiser);
    randomMovement(reno);
    randomMovement(randomGF);
    randomMovement(malyi);
  } else if (key.keyCode == 32) {
    movement(moveArray);
    reset.disabled = true;
    document.removeEventListener('keydown', keyPress)
  }

});

//Btns event listeners
reset.addEventListener('click', () => {
  let myNode = document.querySelector('.directions');
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  };
  moveArray = [];
});

reload.addEventListener('click', () => {
  location.reload();
})