window.onload = initAll;
var xhr = false;

function initAll() {
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	else {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e) { }
		}
	}

	if (xhr) {
		getPix();
	}
	else {
		alert("Sorry, but I couldn't create an XMLHttpRequest");
	}
}

function getPix() {
	xhr.open("GET", "flickrfeed.xml", true);
	xhr.onreadystatechange = showPictures;
	xhr.send(null);

	setTimeout("getPix()",5 * 1000);
}

function showPictures() {
	var tempDiv = document.createElement("div");
	var tempDiv2 = document.createElement("div");
			
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			tempDiv.innerHTML = xhr.responseText;
			var allLinks = tempDiv.getElementsByTagName("a");
			
			for (var i=1; i<allLinks.length; i+=2) {
				tempDiv2.appendChild(allLinks[i].cloneNode(true));
			}

			allLinks = tempDiv2.getElementsByTagName("a");
			var randomImg = Math.floor(Math.random() * allLinks.length);
			document.getElementById("pictureBar").innerHTML = allLinks[randomImg].innerHTML;
		}
		else {
			alert("There was a problem with the request " + xhr.status);
		}
	}
}
