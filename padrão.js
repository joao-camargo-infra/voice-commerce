const startBtn = document.getElementById("btnSpeech");
const result = document.createElement("div");
const processing = document.createElement("p");
document.write(
  "<body><h1>Meu assistente pessoal</h1><p> Olá, espero poder te ajudar, faça uma pergunta! </p></body>"
);
document.body.append(startBtn);
document.body.append(result);
document.body.append(processing);

// speech to text
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let toggleBtn = null;
if (typeof SpeechRecognition === "undefined") {
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
      processing.innerHTML = "processing ....";

      const response = process(text);
      const p = document.createElement("p");
      p.innerHTML = `Você disse: ${text} </br>Assistente Pessoal disse: ${response}`;
      processing.innerHTML = "";
      result.appendChild(p);

      // text to speech
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
    }
    listening = !listening;
  };
  startBtn.addEventListener("click", toggleBtn);
}

// processor
function process(rawText) {
  let text = rawText.replace(/\s/g, "");
  text = text.toLowerCase();
  let response = null;
  switch (text) {
    case "oi":
    case "olá":
      response = "Olá, como posso te ajudar";
      break;
    case "qualéoseunome":
      response = "Meu nome é Assis";
      break;
    case "comovocêestá":
      response = "Estou bem, obrigado!";
      break;
    case "quehorassão":
      response = new Date().toLocaleTimeString();
      break;
    case "pare":
      response = "Tchau!!";
      toggleBtn();
  }
  if (!response) {
    window.open(`http://google.com/search?q=${rawText}`, "_blank");
    return `I found some information for ${rawText}`;
  }
  return response;
}
