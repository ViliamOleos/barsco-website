////////////////////////////////////////// FUNC //////////////////////////////////////////

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

function appendText(el, text) { el.appendChild(document.createTextNode(text)); }

////////////////////////////////////////// MAIN //////////////////////////////////////////

window.onload = main;

	var DEBUG404 = false;
	var DEBUGDEFAULTLNK = "https://barsco.neocities.org/constitution/art1/sec1/";
	var TABUS = " \\: ";

function main() {
	var filename; 
	var address = DEBUG404 ? prompt("address", DEBUGDEFAULTLNK) : window.location.href;

	// vvv Gets the navigation part of the URL vvv
	address = address.slice(address.indexOf('/', address.indexOf('/', address.indexOf('/')+1)+1)+1);
	// vvv Gets the file part of the URL vvv
	filename = fileAddress(address, "");
	filename = filename.slice(filename.lastIndexOf("/")+1);
	
	// text or code page?
	var text = null;
	if(address.indexOf(source("/books.md"))<address.indexOf('/', address.indexOf('/')+1)) { 
		text = source(fileAddress(address, ".md"));
	}
	var code = source(fileAddress(address, ".txt"));

 	var el;
	if(text) {

		// header
		// Consume the $ name; TODO
		el = document.createElement("h1");
		appendText(el, filename.concat(": ".concat(text.slice(2, text.indexOf("\n")))) );
		insert.appendChild(el);

		text=text.slice(text.indexOf(TABUS)+TABUS.length);

		// TAB parse loop
		var el_parag; var el_tab;
		while(text.indexOf(TABUS)!=-1) {
			el_parag = document.createElement("p"); 
				el_tab = document.createElement("span"); el_tab.className = "tab";
			
			tabIDX = text.indexOf(TABUS);

			el_parag.appendChild(el_tab); 
				appendText(el_parag, text.slice(0,tabIDX));

			insert.appendChild(el_parag);

			text=text.slice(tabIDX+TABUS.length);
		}

	} else if(code) {

		var linkStart;
			var linkTextEnd; var linkText; var linkEnd; var linkScript;
			var linkel;

		while(code.indexOf("\n")!=-1) {
			// nonexistent switch statement
			if(code.indexOf(">") == 0) {
				el = document.createElement("h1");
				appendText(el, code.slice(1, code.indexOf("\n")));
			} else {
				el = document.createElement("p");

				// linkScript
				linkStart = code.indexOf("<[");
				if(linkStart<code.indexOf("\n") && linkStart!=-1) {
					linkTextEnd = code.indexOf("]", linkStart);
					linkText = code.slice(linkStart+2, linkTextEnd);
					linkEnd = code.indexOf(">", linkTextEnd);
					linkScript = code.slice(linkTextEnd+1, linkEnd);

					appendText(el, code.slice(0, linkStart));
					code = code.slice(linkEnd+1);
					
					linkel = document.createElement("a"); linkel.href = linkScript;
					appendText(linkel, linkText);
					el.appendChild(linkel);
				}

				appendText(el, code.slice(0, code.indexOf("\n")));
			}

			code = code.slice(code.indexOf("\n")+1);

			insert.appendChild(el);
		}

	} else {
		alert("Not Found.");
	}
}

//////////////////////////////////////////////////////////////////////////////////////////
