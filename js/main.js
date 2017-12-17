var MIN = 6;
var MAX = 9;
var SVGNs = 'http://www.w3.org/2000/svg';
var linesBox = document.querySelector('.app-svg');
var virtualScale = document.querySelector('.app-ruler');
var virtualSantim = (virtualScale.clientWidth - 100) / 20;
var firstTermElem = document.querySelector('.app-equation__first');
var secondTermElem = document.querySelector('.app-equation__second');
var resultElem = document.querySelector('.app-equation__result');
var firstTerm = parseInt(firstTermElem.innerText, 10);
var secondTerm = parseInt(secondTermElem.innerText, 10);
var terms = [firstTerm, secondTerm];

function addBlock(termElem, term) {
  var div = document.createElement('div');
  div.style.width = virtualSantim*term + 'px';
  div.style.height = virtualSantim*term/2 + 'px';
  div.style.position = 'relative';

  linesBox.appendChild(div);

  var coords = div.getBoundingClientRect();

  addSVG(div, coords);
  addInput(div, termElem);
}

function addSVG(block, coords) {
  var svg = document.createElementNS(SVGNs, 'svg');
  var group = document.createElementNS(SVGNs, 'g');
  var path = document.createElementNS(SVGNs, 'path');

  var yCoord = block.getBoundingClientRect().height;
  var xCoord = block.getBoundingClientRect().width;
  path.setAttribute('d', `M 0 ${yCoord}  C ${xCoord/6} ${yCoord-(yCoord-20)} ${xCoord-(xCoord/6)} ${yCoord-(yCoord-20)} ${xCoord} ${yCoord} L ${xCoord-10} ${yCoord-10} M ${xCoord} ${yCoord} L ${xCoord-1} ${yCoord-12}`);
  path.setAttribute('stroke', '#d1418e');
  path.setAttribute('stroke-width', '2px');
  path.setAttribute('fill', 'transparent');
  group.appendChild(path);
  svg.appendChild(group);
  svg.style.height = block.getBoundingClientRect().height;
  svg.style.width = '100%';

  block.appendChild(svg);
}

function addInput(block, elem) {
  var input = document.createElement('input');
  input.setAttribute('maxlength', 1);
  input.classList.add('input-style');

  input.addEventListener('input', window.handlers.onInputHandler(elem))
  block.appendChild(input);
  input.focus();
}

function correctInput(input, valueElem) {
  input.classList.remove('error-input');
  input.classList.add('correct-input');
  input.setAttribute('readonly', true);
  valueElem.style.backgroundColor = 'transparent';
}

function errorInput(input, valueElem) {
  input.classList.add('error-input');
  valueElem.style.backgroundColor = '#edaf4b';
}

function createNewEquation() {
  var condition = confirm('Ответ верный! Готовы решить следующий пример? \nНажмите Enter для продолжения')

  if (condition) {
    terms[0] = window.utils(MIN, MAX);
    terms[1] = window.utils(MIN, MAX);

    firstTermElem.innerText = terms[0];
    secondTermElem.innerText = terms[1];

    clearBlock(resultElem);
    clearBlock(linesBox);
    addBlock(firstTermElem, terms.splice(0,1));
  } else {
    alert('И все же Вы отлично справились!');
  }
}

function clearBlock(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }

  if (elem.classList.contains('app-equation__result')) {
    elem.innerText = '?';
  }
}

function firstStart() {
  addBlock(firstTermElem, terms.splice(0,1));
};

firstStart();
