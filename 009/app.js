var main = function () {
    "use strict";

	/*
	var a,b,c,prod;
	for (b=2;b<1000;b++) {
		for (a=1;a<b;a++) {
			c=Math.sqrt(a*a+b*b);
			if (a+b+c==1000) prod=a*b*c;
		}
	}*/

    /* function call */
    $("main").append(multiplyList(pythagoreanTripleSum(1000)).toString());

};

$(document).ready(main);

/* functions */
var pythagoreanTripleSum = function (sum) {
	var a,b,c;
	for (b=2;b<sum;b++) {
		for (a=1;a<b;a++) {
			c=Math.sqrt(a*a+b*b);
			if (a+b+c==sum) return [a,b,c];
		}
	}
    return [];
};

var multiplyList = function (list) {
	var prod=1;
	list.forEach(function (val) { prod*=val; });
	return prod;
}

