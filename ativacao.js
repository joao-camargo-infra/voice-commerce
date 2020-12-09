const result = document.createElement("div");
const processing = document.createElement("p");
document.body.append(result);
document.body.append(processing);

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
if (typeof SpeechRecognition === undefined) {
  result.innerHTML =
    "<b>Seu navegador não suporta essa função, por favor baixe a última versão do Google Chrome<b>";
} else {
  const startRecognition = new SpeechRecognition();
  startRecognition.continuous = true;
  startRecognition.interimResults = true;
  startRecognition.start();
  startRecognition.onresult = (event) => {
    const stLast = event.results.length - 1;
    const stRes = event.results[stLast];
    const stText = stRes[0].transcript;
    let rawText = stText;
    rawText = rawText.replace(/\s/g, "");
    rawText = rawText.toLowerCase();
    if (rawText.includes("okgoogle")) {
      speechSynthesis.speak(
        new SpeechSynthesisUtterance("Sistema de voz iniciado")
      );

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
        }
      } else {
        processing.innerHTML = `Escutando: ${text}`;
      }
    }
  };
}

function process(rawText) {
  window.open(`http://google.com/search?q=${rawText}`, "_blank");
  return `Aqui está o resultado para ${rawText}`;
}
