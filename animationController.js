const animationContainer = document.getElementById("animationContainer");

const difference = 5;
const speed = 1;
const base = 30;
const variation = 10;

let a = document.getElementById("a");
let b = document.getElementById("b");
let c = document.getElementById("c");

let contA = 0;
let contB = difference;
let contC = 2 * difference;

function step() {
  a.style.top = variation * Math.sin((contA * Math.PI) / base) + "px";
  b.style.top = variation * Math.sin((contB * Math.PI) / base) + "px";
  c.style.top = variation * Math.sin((contC * Math.PI) / base) + "px";

  contA += speed;
  contB += speed;
  contC += speed;

  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
