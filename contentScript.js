function sendData(url, data) {
  options = {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  window.fetch(url, options).then(res => {
    if (res.ok) {
      return res;
    } else {
      throw new Error('Network response was not ok')
    }
  })
  .catch(error => console.error('Error:', error))
}

function prepareToSend(data) {
  chrome.runtime.sendMessage('log', function(response){
    console.log(response);
    if (response.toggle) {
      var url = "https://us-central1-online-backend-1530412342666.cloudfunctions.net/online/visits";
      sendData(url, data);
    }
  });
}

(function collectWindowData() {
  //  var params = 'url=' + encodeURIComponent(document.location.href) + 
  //                '&title=' + encodeURIComponent(document.title) +
  //                '&referrer=' + encodeURIComponent(document.referrer) +
  //                '&visitedTime=' + (new Date()).getTime();
  var documentClone = document.cloneNode(true);
  var article = new Readability(documentClone).parse();
  var data = {
    url: document.location.href,
    title: article.title,
    referrer: document.referrer,
    visitedTime: (new Date()).getTime(),
    textContent: article.textContent,
    textLength: article.length,
    excerpt: article.excerpt
  }
  prepareToSend(data);
})();
