let primeForm = document.getElementById('primeForm');
let primeInput = document.getElementById('primeInput');
let errorDiv = document.getElementById('error');
let myUl = document.getElementById('attempts');
let frmLabel = document.getElementById('formLabel');

if (primeForm) {
  primeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    var number = primeInput.value;
    if (number) {
      errorDiv.hidden = true;
      let li = document.createElement('li');
      if (number==1){
        li.className = 'not-prime';
        li.innerHTML = "1 is NOT a prime number";
      }
      else{
        var isPrime = true;
        for (var i=2; i<number/2; i++){
          if (number%i==0){
            isPrime = false;
            break;
          }
        }
        if (isPrime){
          li.className = 'is-prime';
          li.innerHTML = number + " is a prime number"
        }
        else {
          li.className = 'not-prime';
          li.innerHTML = number + " is NOT a prime number";
        }
      }
      myUl.appendChild(li);
      primeForm.reset();
      primeInput.focus();
    } else {
      primeInput.value = '';
      errorDiv.hidden = false;
      errorDiv.innerHTML = 'You must enter a value';
      primeInput.focus();
    }
  });
}