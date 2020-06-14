var main = function () {
    "use strict";
	var infile;
	const reader = new FileReader();
	$("#inputfile").on("change", function (event) {
		infile=event.target.files[0]; // This is a file object, which is a type of blob
		infile.text().then( function (text) { // text() returns a promise which, when resolved, executes the "then" handler
			$("main").append(dummyFunc(text));
		});
	});
};

$(document).ready(main);

/* functions */
var dummyFunc = function (inputtxt) {
	console.log(inputtxt);
	return inputtxt;
};


