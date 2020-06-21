var main = function () {
    "use strict";

    /* function call */
    $("main").append(dummyFunc(0).toString());

};

$(document).ready(main);

/* functions */
var dummyFunc = function (input) {
    return 0;
};

var isPrime = function (num) {
	var d;
	if (num==2) return true;
	if (num<2 || num%2==0) return false;
	for (d=3;(d*d)<=num;d+=2) {
		if (num%d==0) return 0;
	}
	return true;
}

var isPrimePairSet = function (pset) {
	var i,j;
	for (i=0;i<pset.length;i++) {
		for (j=0;j<pset.length;j++) {
			if (i!=j) {

			}
		}
	}
};
