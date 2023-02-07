MILE_TO_METER = 1609.344
businessTable = undefined;
detailTable = undefined;
//Category identifiers https://www.yelp.com/developers/documentation/v3/all_category_list
categoryIdx = {'0':"all", '1':"arts", '2':"health", '3':"hotelstravel", '4':"food", '5':"professional"}

function uploadClient() {
	if (!document.getElementById("keyword").checkValidity()) {
		document.getElementById("keyword").reportValidity();
		return
	} else if (!document.getElementById("location").checkValidity()) {
		document.getElementById("location").reportValidity();
		return
	} else if (!document.getElementById("distance").checkValidity()) {
		document.getElementById("distance").reportValidity();
		return
	}
	businessTable = undefined;
	detailTable = undefined;
	keyword = document.getElementById("keyword").value;
	category = categoryIdx[document.getElementById("category").value];
	distance = parseFloat(document.getElementById("distance").value);
	
	if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
    } else {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) { }
        }
    }

    if (xhr) {
    	if (document.getElementById("autoGetLocation").checked) {
			var url = "https://ipinfo.io/?token=5f6e164d2cbdaf";
        	xhr.open("GET", url, true);
	        xhr.send();
	        xhr.onreadystatechange = function (){
	      		if (xhr.readyState == 4) {
	        		var myobj = JSON.parse(xhr.responseText);
					if (myobj['loc']) {
						pos = myobj['loc'];
						pos = pos.split(",");
						lat = pos[0];
						lng = pos[1];
						sendRequest(lat, lng, keyword, distance, category);
					} else {
						showEmpty('Failed to obtain latitude and longitude with current IP address');
					}
	      		}
	    	}

		} else {
			var address = document.getElementById('location').value;
	        address = address.replaceAll(" ", "%20");
	        address = address.replaceAll(",", "%2C");
	        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyDjjmD5t97md0aDqMnoPhWxUodlxzapjUc";
	        xhr.open("GET", url, true);
	        xhr.send();
	        xhr.onreadystatechange = function (){
			    //console.log(xhr.readyState)
			    if (xhr.readyState == 4) {
			    	console.log(xhr.responseText);
			    	var myobj = JSON.parse(xhr.responseText);
					if (myobj['results'][0]) {
						lat = myobj['results'][0]['geometry']['location']['lat'];
	        			lng = myobj['results'][0]['geometry']['location']['lng'];
	        			sendRequest(lat, lng, keyword, distance, category);
					} else {
						showEmpty('Failed to obtain latitude and longitude of the address');
					}
		      	}
			}
        }
	} else {
        showEmpty('Failed to create an XMLHttpRequest');
    }

}

function sendRequest(lat, lng, keyword, distance, category) {
	var xhr = new XMLHttpRequest();
	var url = "/getData?lat="+lat+"&lng="+lng+"&keyword="+keyword+"&distance="+distance+"&category="+category;
	console.log(url);
	xhr.open('GET', url, true);
	xhr.send();
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4) {
			console.log(xhr.responseText);
			businessTable = JSON.parse(xhr.responseText);
			showTable();
			document.getElementById("table").scrollIntoView(true);
		}
	}
}

function showTable() {
	if (document.getElementById("table")) {
		document.getElementById("table").remove();
	}
	if (document.getElementById("empty")) {
		document.getElementById("empty").remove();
	}
	if (document.getElementById("output_card")) {
		document.getElementById("output_card").remove();
	}
	if (businessTable != undefined && businessTable.length > 0) {
		var divTable = document.createElement("div");
		divTable.id = "table";
		divTable.setAttribute("class", "table");
		var out = "<table><tr><th style=\"width:50px;\">No.</th><th style=\"width:120px;\">Image</th>"
		out += "<th id=\"sort_by_name\" style=\"width:830px; cursor: pointer;\" onclick=\"sortTable(this.id)\">Business Name</th>"
		out += "<th id=\"sort_by_rating\" style=\"width:200px; cursor: pointer;\" onclick=\"sortTable(this.id)\">Rating</th>"
		out += "<th id=\"sort_by_distance\" style=\"width:200px; cursor: pointer;\" onclick=\"sortTable(this.id)\">Distance (miles)</th></tr>";
		for (var i = 0; i < businessTable.length; i++) {
			store = businessTable[i];
			out += "<tr><td>"+String(i+1)+"</td>";
			if (store['image_url']) {
				out += "<td><img class=\"table\" src=\""+store['image_url']+"\"></td>";
			} else {
				out += "<td><img class=\"table\" src=\"../static/unavailable.png\"></td>";
			}
			if (store['name']) {
				if (store['id']) {
					out += "<td><a href=\"javascript:void(0)\" id = \""+store['id']+"\" class = \"table\" onclick=\"getDetail(this.id)\">"+ store['name']+"</a></td>";
				} else {
					out += "<td>"+store['name']+"</td>";
				}
			} else {
				out += "<td>NA</td>";
			}
			if (store['rating']) {
				out += "<td>"+store['rating']+"</td>";
			} else {
				out += "<td>NA</td>";
			}
			if (store['distance']) {
				var distanceInMiles = store['distance']/MILE_TO_METER;
				distanceInMiles = String(distanceInMiles.toFixed(2));
				out += "<td>"+distanceInMiles+"</td>";
			} else {
				out += "<td>NA</td>";
			}
			out += "</tr>"
		}
		out += "</tr></table>";
		divTable.innerHTML = out;
		document.body.appendChild(divTable); 
	} else {
		showEmpty('No record has been found');
	}
	
}

function getDetail(id) {
	detailTable = undefined;
	var xhr = new XMLHttpRequest();
	var url = "/getDetail?id="+id;
	//document.getElementById("myDiv").innerHTML = url;
	xhr.open('GET', url, true);
	xhr.send();
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4) {
			//document.getElementById("myDiv").innerHTML=xhr.responseText;
			detailTable = JSON.parse(xhr.responseText);
			console.log(xhr.responseText);
			showDetail();
			document.getElementById("output_card").scrollIntoView(true);
		}
	}
}

function showDetail() {
	if (document.getElementById("empty")) {
		document.getElementById("empty").remove();
	}
	if (document.getElementById("output_card")) {
		document.getElementById("output_card").remove();
	}

	if (detailTable) {
		var divDetail = document.createElement("div");
		divDetail.id = "output_card";
		divDetail.setAttribute("class", "output_card");

		var out = "";
		if (detailTable['name']) {
			out += "<p class = \"output_card\" style=\"margin-top: 0px;\">"+detailTable['name']+"</p>";
		} else {
			out += "<p class = \"output_card\" style=\"margin-top: 0px;\">NA</p>";
		}
		out += "<hr style=\"width: 960px; margin: auto; margin-top: 20px; margin-bottom: 10px; border: 1px solid #e2e2e2; fill: #e2e2e2;\"/>";
		out += "<div style=\"position:relative; text-align: left;\">";
		
		out += "<div name=\"left_panel\" style=\"width: 450px; position:absolute; left:0px; top:0px;\">";
		out += "<div id = \"output_info_1\"></div>";
		out += "<div id = \"output_info_3\"></div>";
		out += "<div id = \"output_info_5\"></div>";
		out += "<div id = \"output_info_7\"></div></div>";

		out += "<div name=\"right_panel\" style=\"width: 450px; position:absolute; left:500px; top:0px;\">"
		out += "<div id = \"output_info_2\"></div>";
		out += "<div id = \"output_info_4\"></div>";
		out += "<div id = \"output_info_6\"></div></div>";

		out += "<div name=\"img1\" class=\"image_frame\" style=\"position:absolute; left:0px; top:450px;\">";
		if (detailTable['photos'][0]) {
			out += "<img class=\"output_card\" src=\"" + detailTable['photos'][0] + "\">";
		} else {
			out += "<img class=\"output_card\" src=\"../static/unavailable.png\">";
		}
		out += "<label>Photo 1</label></div>";

		out += "<div name=\"img2\" class=\"image_frame\" style=\"position:absolute; left:325px; top:450px;\">";
		if (detailTable['photos'][1]) {
			out += "<img class=\"output_card\" src=\"" + detailTable['photos'][1] + "\">";
		} else {
			out += "<img class=\"output_card\" src=\"../static/unavailable.png\">";
		}
		out += "<label>Photo 2</label></div>";

		out += "<div name=\"img3\" class=\"image_frame\" style=\"position:absolute; left:650px; top:450px;\">";
		if (detailTable['photos'][2]) {
			out += "<img class=\"output_card\" src=\"" + detailTable['photos'][2] + "\">";
		} else {
			out += "<img class=\"output_card\" src=\"../static/unavailable.png\">";
		}
		out += "<label>Photo 3</label></div></div></div>";

		divDetail.innerHTML = out;
		document.body.appendChild(divDetail); 
		
		var detailIdx = 1;
		if (detailTable['hours'] && detailTable['hours'][0]) {
			var tmpOut = "<p class = \"output_card\">Status</p><p class = \"output_info\" style=\"margin-bottom: 22px; margin-top: 15px\">"
			if (detailTable['hours'][0]['is_open_now']) {
				tmpOut += "<label class=\"open\">open now</label></p>";
			} else {
				tmpOut += "<label class=\"closed\">closed</label></p>";
			}
			document.getElementById("output_info_"+detailIdx++).innerHTML = tmpOut;
		}

		if (detailTable['categories'] && detailTable['categories'][0]) {
			var businessCategory = "";
			if (detailTable['categories'][0]['title']) {
				businessCategory = detailTable['categories'][0]['title'];
			}
			for (var i = 1; i < detailTable['categories'].length; i++) {
				if (businessCategory) {
					businessCategory += " | "
				}
				businessCategory += detailTable['categories'][i]['title'];
			}
			document.getElementById("output_info_"+detailIdx++).innerHTML = "<p class = \"output_card\">Category</p><p class=\"output_info\">" + businessCategory + "</p>";
		}
		
		if (detailTable['location']['display_address']){
			document.getElementById("output_info_"+detailIdx++).innerHTML = "</p><p class = \"output_card\">Address</p><p class=\"output_info\">" + detailTable['location']['display_address'].join(" ") + "</p>";
		}

		if (detailTable['display_phone']) {
			document.getElementById("output_info_"+detailIdx++).innerHTML = "<p class = \"output_card\">Phone Number</p><p class=\"output_info\">" + detailTable['display_phone'] + "</p>";
		} 

		if (detailTable['transactions']) {
			var transactions =  idxToLabel(detailTable['transactions']);
			if (transactions) {
				document.getElementById("output_info_"+detailIdx++).innerHTML = "<p class = \"output_card\">Transactions Supported</p><p class=\"output_info\">" + transactions + "</p>";
			}
		}

		if (detailTable['price']) {
			document.getElementById("output_info_"+detailIdx++).innerHTML = "<p class = \"output_card\">Price</p><p class=\"output_info\">" + detailTable['price'] +"</p></div>";
		}

		if (detailTable['url']) {
			document.getElementById("output_info_"+detailIdx++).innerHTML = "<p class = \"output_card\">More info</p><p class=\"output_info\"><a href=\"" + detailTable['url'] + "\" target=\"_blank\">Yelp</a></p>";
		}

	} else {
		showEmpty('No detail has been found');
	}
	
}

function showEmpty(str) {
	if (document.getElementById("table")) {
		document.getElementById("table").remove();
	}
	if (document.getElementById("empty")) {
		document.getElementById("empty").remove();
	}
	if (document.getElementById("output_card")) {
		document.getElementById("output_card").remove();
	}
	var divEmpty = document.createElement("div");
	divEmpty.id = "empty";
	divEmpty.setAttribute("class", "empty");
	divEmpty.innerHTML = str;
	document.body.appendChild(divEmpty); 
}

function changeRequireState(){
    var checkStatus = document.getElementById("autoGetLocation").checked;
    document.getElementById("location").required = !checkStatus;
	document.getElementById("location").disabled = checkStatus;
	document.getElementById("location").value = "";
}

function clearForm() {
	businessTable = undefined;
	detailTable = undefined;
	document.getElementById("keyword").value = "";
	document.getElementById("distance").value = 10;
	document.getElementById("category").value = 0;
	document.getElementById("location").value = "";
	document.getElementById("autoGetLocation").checked = false;
	document.getElementById("location").required = true;
	document.getElementById("location").disabled = false;
	if (document.getElementById("empty")) {
		document.getElementById("empty").remove();
	}
	if (document.getElementById("table")) {
		document.getElementById("table").remove();
	}
	if (document.getElementById("output_card")) {
		document.getElementById("output_card").remove();
	}
}

seq = {"sort_by_name":true, "sort_by_rating":false, "sort_by_distance":true}
function sortTable(id) {
	idDict = {"sort_by_name":"name", "sort_by_rating":"rating", "sort_by_distance":"distance"};
	console.log(seq[id]);
	seq[id] = !seq[id];
	businessTable.sort(sortBy(idDict[id]), seq);
	if (seq[id]) {
		businessTable = businessTable.reverse();
	}
	showTable();

}

function sortBy(key, seq){
	if (key != 'name') {
		return function(x, y){
			return x[key] - y[key];
		}
	} else {
		return function(x, y){
			return x[key].localeCompare(y[key]);
		}
	}
}

function idxToLabel(idxArr) {
	var label = "";
	if (idxArr[0]) {
		var idx = idxArr[0].replaceAll("_", " ");
		label += idx.charAt(0).toUpperCase() + idx.substring(1);
	}
	for (var i = 1; i < idxArr.length; i++) {
		if (idxArr[i]) {
			var idx = idxArr[i].replaceAll("_", " ");
			if (label) {
				label += " | ";
			}
			label += idx.charAt(0).toUpperCase() + idx.substring(1);
		}
	}
	
	return label;
}
