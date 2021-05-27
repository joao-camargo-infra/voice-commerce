const startBtn = document.getElementById("btn-speech");
const result = document.createElement("div");
const transcriptField = document.getElementById("voice-textbox");
const maxWords = 5;

var produtos = document.getElementById("produtos");
var carrinho = document.getElementById("carrinho");
var favoritos = document.getElementById("favoritos");

document.body.append(result);

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
      toggleBtn();
      //const response = process2(text);
      const response = process(text);
      transcriptField.value = `${text}`;
      busca(text);
      console.log(text);
      speechSynthesis.speak(new SpeechSynthesisUtterance(response));
    } else {
      transcriptField.value = `${text}`;
      wordCount(text);
    }
  };

  let listening = false;
  toggleBtn = () => {
    if (listening) {
      recognition.stop();
      stopSearch();
    } else {
      recognition.start();
      voiceSearch();
      speechSynthesis.speak(new SpeechSynthesisUtterance("O que deseja?"));
    }
    listening = !listening;
  };
  startBtn.addEventListener("click", toggleBtn);
}

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

function wordCount(words) {
  let count = (words.match(/ /g) || []).length;
  if (count >= (maxWords - 1))
    toggleBtn();
}

function process2(rawtext){
  let response = null;
  let searchResults = busca(rawtext);
  console.log(searchResults);
  if(searchResults){
    jQuery.each(searchResults, function(i,item){
      produtos.appendChild(document.createTextNode(item.NOME))
      jQuery.parseHTML
    });
    response = "Encontrei essas opções";
  } else{
    response = "Não encontrei o produto";
  }
  return response;
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

function loadPedido(ped) { }

function addCarrinho(prod, classname) {
  const produto = document.getElementsByClassName(classname)[0].cloneNode(true);
  carrinho.appendChild(produto);
  return `${prod} Adicionado ao carrinho`;
}

function busca(palavraChave){
  jQuery.ajax({
    type: 'POST',
    url: 'http://localhost:3000/produtos/',
    data: {
        busca : palavraChave
    },
    success: function(items){
      //console.log(items);
      //return items;
      jQuery.each(items, function(i,item){
        produtos.appendChild(document.createTextNode(item.NOME))
        jQuery.parseHTML
      });
    }
  });
}