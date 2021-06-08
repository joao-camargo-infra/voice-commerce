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
      console.log(text);
      const response = process(text);
      transcriptField.value = `${text}`;
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

function process(rawtext){
  while(produtos.firstChild) produtos.removeChild(produtos.firstChild);
  let response = null;
  let searchResults = busca(rawtext);
  if(searchResults.length != 0){
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

function busca(palavraChave){
  var resp;
  jQuery.ajax({
    async: false,
    type: 'POST',
    url: 'http://localhost:3000/produtos/',
    data: {
        busca : palavraChave
    },
    dataType: 'json',
    success: function(items){
      console.log(items);
      resp = items;
    }
  });
  return resp;
}