var toggle = true;

function toggleHandler(event){
  toggle = !toggle
  console.log(toggle);
  chrome.runtime.sendMessage({'toggle': toggle});
}

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  var toggleCheckBox = document.getElementById("toggle");
  toggleCheckBox.addEventListener("click", toggleHandler);
});

