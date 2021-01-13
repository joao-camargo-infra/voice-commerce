const startBtn = document.getElementById("btnSpeech");
const result = document.createElement("div");
const processing = document.createElement("p");
//document.body.append(startBtn);
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
  recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const res = event.results[last];
    const text = res[0].transcript;
    let rawText = text.replace(/\s/g, "");
    rawText = rawText.toLowerCase();
    if (rawText.includes("porfavor")) {
      let searchQuery = text.replace("por favor", "");
      if (searchQuery != " ") {
        const response = process(searchQuery);
        const p = document.createElement("p");
        p.innerHTML = `Você disse: ${searchQuery} </br>Assistente Pessoal disse: ${response}`;
        processing.innerHTML = "";
        result.appendChild(p);
        speechSynthesis.speak(new SpeechSynthesisUtterance(response));
        recognition.stop();
        startBtn.style.backgroundColor =
          "rgb(" + 195 + "," + 195 + "," + 195 + ")";
      }
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
  window.open(`https://busca.mizuno.com.br/search/?query=${rawText}`, "_blank");
  return `Aqui está o resultado para ${rawText}`;
}
