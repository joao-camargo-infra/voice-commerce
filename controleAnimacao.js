const animationContainer = document.getElementById("animationContainer");
animationContainer.style.visibility = "hidden";

const diferenca = 5;
const speed = 1;
const base = 30;
const variacao = 10;

let a = document.getElementById("a");
let b = document.getElementById("b");
let c = document.getElementById("c");

let contA = 0;
let contB = diferenca;
let contC = 2 * diferenca;

function step() {
  a.style.top = variacao * Math.sin((contA * Math.PI) / base) + "px";
  b.style.top = variacao * Math.sin((contB * Math.PI) / base) + "px";
  c.style.top = variacao * Math.sin((contC * Math.PI) / base) + "px";

  contA += speed;
  contB += speed;
  contC += speed;

  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
