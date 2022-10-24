window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var recognition = new webkitSpeechRecognition();
recognition.lang = 'ja';
recognition.interimResults = true; //認識途中の結果を残すか
recognition.continuous = false; //ある程度，認識し続けるように設定．
let finalResults = [];

//
recognition.onaudiostart = function() {
  console.log('On Audio Start');
};

//
recognition.onsoundstart = function(){
  console.log('On Sound Start');
  document.getElementById('status').innerHTML = "認識中";
};

//
recognition.onspeechstart = function() {
  console.log('On Speech Start');
};

//
recognition.onspeechend = function() {
  console.log('On Speech End');
};

//
recognition.onsoundend = function() {
  console.log('On Sound End');
  document.getElementById('status').innerHTML = "停止中";
};

//
recognition.onaudioend = function() {
  console.log('On Audio End');
};

//
recognition.onnomatch = function(){
  console.log('On No Match');
  document.getElementById('status').innerHTML = "もう一度試してください";
};

//
recognition.onerror= function(){
  console.log('On Error');
  document.getElementById('status').innerHTML = "エラー";
};

//
recognition.onresult = function(event){
    //eventの中身を覗いてみましょう.
    //console.log(event);

    var results = event.results;
    for (var i = event.resultIndex; i<results.length; i++){
      if(results[i].isFinal){
        let finalResult = results[i][0].transcript;
        finalResults.push(finalResult);
        console.log(finalResults);
        document.getElementById('result_text').innerHTML = finalResult;
        //createTbody(finalResult);
      }
      else
        document.getElementById('result_text').innerHTML = "[途中経過] "+ results[i][0].transcript;
    }
}

//
recognition.onstart = function() {
  console.log('On Start');
}

//
recognition.onend = function() {
  console.log('On End');
}


function createTbody(sentence) {
  let tbody = document.getElementById('final_results');
  let tr = document.createElement('tr');
  let td = document.createElement('td');
  td.innerHTML = sentence;
  tr.appendChild(td);
  tbody.appendChild(tr);
}

