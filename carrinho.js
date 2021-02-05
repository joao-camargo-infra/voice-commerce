const startBtn = document.getElementById("btn-speech");
const carrinho = document.getElementById("carrinho");
const animation1 = document.getElementById("animate");
const favoritos = document.getElementById("favoritos");
const result = document.createElement("div");
const processing = document.getElementById("voice-textbox");
// const processing = document.getElementById("pesquisa");
document.body.append(result);

function voiceSearch() {
  document.querySelector(".div-voice").classList.add("is-active");
  document.body.style.cssText =
    "background-color: #8a8a8a; transition: background-color 100ms linear";
  document.getElementById("pesquisa").style.cssText =
    "background-color: #8a8a8a; transition: background-color 100ms linear";
}

function stopSearch() {
  document.querySelector(".div-voice").classList.remove("is-active");
  document.body.style.cssText =
    "background-color: #fff; transition: background-color 100ms linear";
  document.getElementById("pesquisa").style.cssText =
    "background-color: #fff; transition: background-color 100ms linear";
}

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
  recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const res = event.results[last];
    const text = res[0].transcript;
    if (res.isFinal) {
      const response = process(text);
      processing.value = `${text}`;
      console.log(text);
      // processing.innerHTML = "";
      speechSynthesis.speak(new SpeechSynthesisUtterance(response));
    } else {
      processing.value = `${text}`;
    }
  };
  let listening = false;
  toggleBtn = () => {
    if (listening) {
      recognition.stop();
      animation.style.visibility = "hidden";
      stopSearch();
    } else {
      recognition.start();
      animation.style.visibility = "visible";
      voiceSearch();
      speechSynthesis.speak(new SpeechSynthesisUtterance("O que deseja?"));
    }
    listening = !listening;
  };
  startBtn.addEventListener("click", toggleBtn);
}

function process(rawText) {
  rawText = rawText.replace(/\s/g, "");
  let filter = filterAction(rawText);
  let action = filter[0];
  let text = filter[1];
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

    case "salvar":
      if (!carrinho.children) {
        response = "Carrinho vazio";
      } else {
        let ultPedido = 1;
        if (favoritos.children.length !== 0) {
          ultPedido = String(favoritos.lastChild);
          ultPedido.replace("pedido ", "");
          ultPedido = parseInt(ultPedido) + 1;
        }
        let pedFav = document.createElement("li");
        pedFav.innerHTML = `Pedido ${ultPedido}`;
        pedFav.setAttribute("class", `pedido${ultPedido}`);
        favoritos.append(pedFav);
        let pedido = document.createElement("ol");
        pedido.setAttribute("class", `itensPedido${ultPedido}`);
        pedFav.append(pedido);
        for (let p of carrinho.children) {
          let itemPed = p.cloneNode(true);
          pedido.appendChild(itemPed);
        }
        response = "Pedido salvo";
      }
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
      break;

    case "pedido":
      if (action === "remover") {
        const pedido = document.getElementsByClassName(text);
        favoritos.removeChild(pedido);
      }
  }

  if (!response) {
    response = "Não encontrei o produto, pode repetir?";
  }
  return response;
}

function filterAction(action) {
  let text = action;
  if (action.includes("remover")) {
    text = action.replace("remover", "");
    action = action.replace(text, "");
  } else if (action.includes("carregar")) {
    text = action.replace("carregar", "");
    action = action.replace(text, "");
    text = action;
  }
  return [action, text];
}

function loadPedido(ped) {}

function addCarrinho(prod, classname) {
  const produto = document.getElementsByClassName(classname)[0].cloneNode(true);
  carrinho.appendChild(produto);
  return `${prod} Adicionado ao carrinho`;
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
