window.handlers = (function (){
  return {
    onInputHandler: function(valueElem) {
      return function (evt) {
        var input = evt.target;
        var inputValue = input.value;
        var value = parseInt(valueElem.innerText, 10);

        if (inputValue != value) {
          errorInput(input, valueElem);
        } else if (terms.length > 0 ){
          correctInput(input, valueElem);
          addBlock(secondTermElem, terms.splice(0,1));
        } else {
          correctInput(input, valueElem);
          window.handlers.resultHandler();
        }
      }
    },

    onResultInputHandler: function(evt) {
      var input = evt.target;
      var value = input.value;
      var firstTerm = parseInt(firstTermElem.innerText, 10);
      var secondTerm = parseInt(secondTermElem.innerText, 10);

      if (value != firstTerm + secondTerm) {
        input.style.color = 'red';
      } else {
        input.style.color = 'black';
        input.setAttribute('readonly', true);
        input.style.border = 'none';
        setTimeout(createNewEquation, 500);
      }
    },

    resultHandler: function() {
      var input = document.createElement('input');
      input.setAttribute('maxlength', 2);
      input.classList.add('result-input-style');

      input.addEventListener('input', window.handlers.onResultInputHandler);
      resultElem.innerText = '';
      resultElem.appendChild(input);
      input.focus();
    }
  };
})();
