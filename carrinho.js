const startBtn = document.getElementById("btnSpeech");
const carrinho = document.getElementById("carrinho");
const result = document.createElement("div");
const processing = document.createElement("p");
document.body.append(result);
document.body.append(processing);

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let toggleBtn = null;
if (typeof SpeechRecognition === undefined) {
  startBtn.remove();
  result.innerHTML =
    "<b>Seu navegador não suporta essa função, por favor baixe a última versão do Google Chrome<b>";
} else {
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  var response = null;
  recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const res = event.results[last];
    const text = res[0].transcript;
    let rawText = text.replace(/\s/g, "");
    rawText = rawText.toLowerCase();
    if (rawText.includes("porfavor") && res[0].confidence > 0.9) {
      let searchQuery = text.replace("por favor", "");
      response = process(searchQuery);
      const p = document.createElement("p");
      p.innerHTML = `Você disse: ${searchQuery} </br>Assistente Pessoal disse: ${response}`;
      processing.innerHTML = "";
      result.appendChild(p);
      speechSynthesis.speak(new SpeechSynthesisUtterance(response));
    } else {
      processing.innerHTML = `Escutando: ${text}`;
    }
  };
  let listening = false;
  toggleBtn = () => {
    if (listening) {
      recognition.stop();
      startBtn.style.backgroundColor =
        "rgb(" + 195 + "," + 195 + "," + 195 + ")";
    } else {
      recognition.start();
      startBtn.style.backgroundColor =
        "rgb(" + 118 + "," + 118 + "," + 118 + ")";
      speechSynthesis.speak(new SpeechSynthesisUtterance("O que deseja?"));
    }
    listening = !listening;
  };
  startBtn.addEventListener("click", toggleBtn);
}

function process(rawText) {
  let action = rawText.replace(/\s/g, "");
  let text = action.replace("remover", "");
  action = action.replace(text, "");
  let response = null;
  switch (text) {
    case "sapatoverde":
      if (action === "remover") {
        response = delCarrinho("Sapato Verde", "pSVerde");
        break;
      }
      response = addCarrinho("Sapato Verde", "pSVerde");
      break;
    case "sapatovermelho":
      if (action === "remover") {
        response = delCarrinho("Sapato Vermelho", "pSVermelho");
        break;
      }
      response = addCarrinho("Sapato Vermelho", "pSVermelho");
      break;
    case "sapatoazul":
      if (action === "remover") {
        response = delCarrinho("Sapato Azul", "pSAzul");
        break;
      }
      response = addCarrinho("Sapato azul", "pSAzul");
      break;

    case "carrinho":
      for (p in carrinho.children) {
        speechSynthesis.speak(
          new SpeechSynthesisUtterance(carrinho.children[p].innerHTML)
        );
      }
      response = "Algo mais?";
      break;
    case "pare":
      response = "Tchau";
      toggleBtn();
  }
  if (!response) {
    response = "Não encontrei o produto, pode repetir?";
  }
  return response;
}

function addCarrinho(prod, classname) {
  const produto = document.getElementsByClassName(classname)[0].cloneNode(true);
  carrinho.appendChild(produto);
  return `${prod} adicionado ao carrinho`;
}

function delCarrinho(prod, classname) {
  if (!carrinho.getElementsByClassName(classname)) {
    response = "Produto não encontrado";
  } else {
    produto = carrinho.getElementsByClassName(classname)[0];
    carrinho.removeChild(produto);
    response = `${prod} removido do carrinho`;
  }
  return response;
}
