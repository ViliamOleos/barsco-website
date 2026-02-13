function source(path) {
	var xmlhttp = new XMLHttpRequest(); var text = null;

	xmlhttp.open("GET", path, false); xmlhttp.send();
	if(xmlhttp.status == 200) { text = xmlhttp.responseText; }

	return text;
}

// gives You a server-side address for the described file
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

window.onload = main;
var DEBUG404 = false;
var DEBUGDEFAULTLNK = "https://barsco.neocities.org/constitution/art1/sec1/";
var TABUS = " \\: ";

function textElement(tag, text) {
	var el = document.createElement(tag);
	el.appendChild(document.createTextNode(text));
	return el;
}

function main() {
	var address = DEBUG404 ? prompt("address", DEBUGDEFAULTLNK) : window.location.href;
	var filename; 

	// vvv Gets the navigation part of the URL vvv
	address = address.slice(address.indexOf('/', address.indexOf('/', address.indexOf('/')+1)+1)+1);
	// vvv Gets the file part of the URL vvv
	filename = fileAddress(address, "");
	filename = filename.slice(filename.lastIndexOf("/")+1);
	
	
	// text or code
	var text = null;
	if(address.indexOf(source("/books.md"))<address.indexOf('/', address.indexOf('/')+1)) { 
		text = source(fileAddress(address, ".md"));
	}
	var code = source(fileAddress(address, ".txt"));

	if(text) {
		// Consume the $ name; TODO
		var el;
		el = document.createElement("h1");
		el.appendChild(document.createTextNode(filename.concat(": ".concat(text.slice(2, text.indexOf("\n"))))));
		insert.appendChild(el);

		text=text.slice(text.indexOf(TABUS)+TABUS.length);

		while(text.indexOf(TABUS)!=-1) {
			var el_parag = document.createElement("p"); 
				var el_tab = document.createElement("span"); el_tab.className = "tab";
			
			tabIDX = text.indexOf(TABUS);

			el_parag.appendChild(el_tab); 
				el_parag.appendChild(document.createTextNode(text.slice(0,tabIDX)));

			insert.appendChild(el_parag);

			text=text.slice(tabIDX+TABUS.length);
		}
	} else if(code) {
		while(code.indexOf("\n")!=-1) {
 			var el;

			if(code.indexOf(">") == 0) {
				el = document.createElement("h1");
				el.appendChild(document.createTextNode(code.slice(1, code.indexOf("\n"))));
			} else {
				el = document.createElement("p");
				el.appendChild(document.createTextNode(code.slice(0, code.indexOf("\n"))));
			}

			code = code.slice(code.indexOf("\n")+1);

			insert.appendChild(el);
		}

	} else {
		alert("Not Found.");
	}
}
