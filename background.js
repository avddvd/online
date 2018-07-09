var toggle = true;
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (sender.tab) {
      sendResponse({'toggle': toggle});
    } else {
      console.log(request);
      if (typeof(request.toggle) !== 'undefined') {
        toggle = request.toggle
      }
    }
 });
