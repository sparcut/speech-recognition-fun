/* SpeechRecognition polyfil for Chorme & Firefox support */
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const startButton = document.getElementById('startRecog');
const stopButton = document.getElementById('stopRecog');
let SpeechRecog = null;

startButton.addEventListener('click', startRecog);
stopButton.addEventListener('click', stopRecog);

function startRecog() {
  SpeechRecog = initSpeechRecognition();
  
  startButton.disabled = true;
  stopButton.disabled = false;
}

function stopRecog() {
  SpeechRecog.stop();
  SpeechRecog = null;
  
  stopButton.disabled = true;
  startButton.disabled = false;
}

function initSpeechRecognition() {
  const recog = new SpeechRecognition();
  recog.interimResults = true;
  
  const paper = document.querySelector('.paper');
  paper.textContent = '';
  let p = document.createElement('p');
  paper.appendChild(p);
  
  recog.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    
    p.textContent = transcript;
    
    if(e.results[0].isFinal) {
      p = document.createElement('p');
      paper.appendChild(p);
    }
    
    /* Scroll to bottom (prevents overflowing, thus not being able to see text) */
    document.body.scrollTop = document.body.scrollHeight;
  });
  
  recog.addEventListener('end', recog.start);
  
  recog.start();
  
  return recog;
}