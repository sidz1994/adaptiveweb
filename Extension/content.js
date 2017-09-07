if (document.addEventListener){
    document.addEventListener("click", function(e){
        var targetElement = e.target || e.srcElement;
    var obj_click = findParent('a',targetElement); 
      if (obj_click){
        var field=obj_click.innerHTML.trim();
      if(field=="up vote" || field=="down vote"|| field=="share"||field=="Ask Question" ||field=="ask your own question" || field=="add a comment")
        var text=field+" |"+document.title;

        else var text="Question clicked|"+field;
      }
      else {
      	var text=targetElement.textContent || text.innerText;
      	console.dir(text);
      	text=text.substring(0,40)+'...';
      }
        chrome.runtime.sendMessage({greeting:text}, function(response) {
          console.log("in"+response);
        });
    });
    function findParent(tagname,element){
      if ((element.nodeName || element.tagName).toLowerCase()===tagname.toLowerCase()){
        return element;
      }
      while (element = element.parentNode){
        if ((element.nodeName || element.tagName).toLowerCase()===tagname.toLowerCase()){
          return element;
        }
      }
      return null;
  }

} 



/*if(document.URL.match("http://localhost:3000/*")){
    console.dir('in login website');
    var x = document.getElementById('get_username').innerHTML;
    var res=x.split(":");
    console.dir(res[1]);
    chrome.storage.sync.set({ "userloginname":res[1]  }, function(){
    });
    chrome.windows.getAll({populate:true}, getAllOpenWindows);

}

function getAllOpenWindows(winData) {

  var tabs = [];
  for (var i in winData) {
    if (winData[i].focused === true) {
        var winTabs = winData[i].tabs;
        var totTabs = winTabs.length;
        for (var j=0; j<totTabs;j++) {
          tabs.push(winTabs[j].url);
        }
    }
  }
  console.log(tabs);
}*/

/*
if (document.addEventListener){
    document.addEventListener("click", function(event){
        var targetElement = event.target || event.srcElement;
        var text=targetElement.textContent || text.innerText;
        console.dir('text clicked ->'+text);
        chrome.runtime.sendMessage({greeting: text}, function(response) {
          console.log(response);
        });

    });
} else if (document.attachEvent) {    
    document.attachEvent("onclick", function(){
        var targetElement = event.target || event.srcElement;
        var text=targetElement.textContent || text.innerText;
        //console.dir('in target--'+targetElement);
        console.dir('in text2--'+text); 
    });
}
*/
/*
var elements = document.getElementsByTagName('a');
for(var i = 0, len = elements.length; i < len; i++) {
    elements[i].onclick = function () {
        // stuff
    }
}
*/
//new code here
    /*
document.body.onclick = function(e){
  e = e || event;
  var from = findParent('a',e.target || e.srcElement);
  if (from){
    var tobesent='link'+from.innerHTML;
    console.dir(tobesent);
    // check if from has link in it. If it has a link then it comes inder link click. else in text click   
  }

  else{
     document.addEventListener("click", function(event){
        var targetElement = event.target || event.srcElement;
        var text=targetElement.textContent || text.innerText;
        console.dir('text clicked ->'+text);
        });
  }
}
//find first parent with tagName [tagname]
function findParent(tagname,el){
  if ((el.nodeName || el.tagName).toLowerCase()===tagname.toLowerCase()){
    return el;
  }
  while (el = el.parentNode){
    if ((el.nodeName || el.tagName).toLowerCase()===tagname.toLowerCase()){
      return el;
    }
  }
  return null;
}*/