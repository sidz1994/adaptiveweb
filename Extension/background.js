chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var hr = new XMLHttpRequest();
	var url="http:localhost:3000/users/datarx";
	var vars="text="+request.greeting+"&stamp="+new Date().toString().substring(0,24);
	
hr.open("POST", url, true);
hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
hr.send(vars);
});