function sendData(url) {
  options = {
    mode: 'cors',
    method: 'GET',
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

(function collectWindowData() {
  var params = 'url=' + encodeURIComponent(document.location.href) + 
                '&title=' + encodeURIComponent(document.title) +
                '&referrer=' + encodeURIComponent(document.referrer) +
                '&visitedTime=' + (new Date()).getTime();
  chrome.runtime.sendMessage('log', function(response){
    console.log(response);
    if (response.toggle) {
      var url = "https://us-central1-online-backend-1530412342666.cloudfunctions.net/online/views";
      url += '?' + params;
      sendData(url);
    }
  });
})();
