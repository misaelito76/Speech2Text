import {moodResponses,moodStates} from './assets/interactions.js'
let mood =document.querySelector('.mood')

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
//this below give the results as we are speaking instead of waiting until we are done.
recognition.interimResults = true;
  recognition.lang = "en-EN";
  var recognizing = false;


let transcript
let confidence
let uniqueTranscript
function tapOnMyHelmet(){ 
  recognition.onspeechend = () => {
    recognition.stop()
     setTimeout(() => {
      tapOnMyHelmet()
     }, 1000);
  };
  recognition.onresult=function (e){
   transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
     confidence=e.results[0][0].confidence


     uniqueTranscript = [...new Set(transcript)] 

  if(confidence>=0.96){
    console.log(uniqueTranscript)
    
    document.getElementById('text').innerText=uniqueTranscript
    uniqueTranscript.forEach(c=>{
c=c.toLowerCase()
for (let i=0;i<moodStates.length;i++){
      if(c.includes(moodStates[i])){
         mood.classList.add(moodStates[i]);
         mood.innerText=moodResponses[i]

        setTimeout(() => {
          mood.classList.remove(moodStates[i]);
          mood.innerText='Maya-S-2-T'

        }, 2000);


      }
    } 
   
    })

    ;}
  };
  recognition.start()

;}
  recognition.onerror = () => {
location.reload()
    console.log("Speech Recognition Error");
  
  };
  window.tapOnMyHelmet=tapOnMyHelmet