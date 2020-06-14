var main = function () {
    "use strict";

    /* function call */
    $("main").append(primeSum(1,2000000).toString());

};

$(document).ready(main);

/* functions */
var primeSum = function (min,max) {
	var x,sum=0;
	for (x=min;x<=max;x++) {
		if (isPrime(x)) sum+=x;
	}
    return sum;
};

var isPrime = function (num) {
	var d;
	if (num==1) return false;
	for (d=2;(d*d)<=num;d++) {
		if (num%d==0) return false;
	}
	return true;
}

