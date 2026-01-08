function source(path) {
	var xmlhttp = new XMLHttpRequest(); var text = null;

	xmlhttp.open("GET", path, false); xmlhttp.send();
	if(xmlhttp.status == 200) { text = xmlhttp.responseText; }

	return text;
}

window.onload = main;
var DEBUG404 = true;
var TABUS = " \\: ";

// gives You a server-side address for the requested file
function fileAddress(address, type) {
	return(
		"/".concat(
			address.slice(0,
				// decides whether to slice the possible / at the ending
				address.length - (address.indexOf('/', address.length-1)==-1 ? 0 : 1)
			)
		.concat(type))
	);
}

function main() {
	var address = DEBUG404?
		prompt("address", "https://barsco.neocities.org/constitution/art1/sec1/") : window.location.href;

	// vvv Gets the navigation part of the URL vvv
	address = address.slice(address.indexOf('/', address.indexOf('/', address.indexOf('/')+1)+1)+1);
	if(address == "") { address = "index"; }
	
	var code = source(fileAddress(address, ".txt"));
	var text = source(fileAddress(address, ".md"));

	if(!code) {
		while(true) {
			var paragraph = document.createElement("p");
			var tab = document.createElement("span"); tab.className = "tab";
			paragraph.appendChild(tab);

			var tabIDX = text.indexOf(TABUS);
			if(tabIDX!=-1) { text=text.slice(tabIDX+TABUS.length); }
			tabIDX = text.indexOf(TABUS);
			if(tabIDX!=-1) { 
				paragraph.appendChild(document.createTextNode(text.slice(0, tabIDX)));
				insert.appendChild(paragraph);
				text.slice(tabIDX+TABUS.length);
			} else { 
				paragraph.appendChild(document.createTextNode(text)); 
				insert.appendChild(paragraph); break; 
			}
		}
	} else {
		alert("This is a code page (to be implemented).");
	}

	insert.appendChild(paragraph);
}