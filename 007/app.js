var main = function () {
    "use strict";

    /* function call */
    $("main").append(nthPrime(10001).toString())

};

$(document).ready(main);

/* functions */
var nthPrime = function (n) {
	var p,q=0;
	for (p=2;q<n;p++) {
		if (isPrime(p)) q++;
	}
    return p-1;
};

var isPrime = function (num) {
	var d;
	for (d=2;(d*d)<=num;d++) {
		if (num%d==0) return false;
	}
	return true;
};
