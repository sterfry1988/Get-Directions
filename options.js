// Saves options to localStorage.
window.onload=restore_options();
var save = document.querySelector('#save button');
save.textContent = chrome.i18n.getMessage('save');
save.onclick = function() {
	console.log("save clicked");
	var select = document.getElementById("addressbox");
	var startaddr = select.value;
	chrome.extension.sendRequest({
			method: "setLocalStorage", 
			saddr: startaddr
	});
}
// Restores select box state to saved value from localStorage.
function restore_options() {
  chrome.extension.sendRequest({
    method: "getLocalStorage",
    key: "saddr"
  },function(response) {
  	  console.log("options restored");
    var address = response.data;
    var txtAddress = document.getElementById("addressbox");
    txtAddress.value = address;
  });
}

