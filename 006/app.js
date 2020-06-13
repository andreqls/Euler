var main = function () {
    "use strict";

    /* function call */
    $("main").append(sumSqDif(1,100).toString())

};

$(document).ready(main);

/* functions */
var sumSqDif = function (min,max) {
	var a,b,sum=0;
	for (a=min;a<=max;a++) {
		for (b=min;b<=max;b++) {
			if (a!=b) sum+=a*b;
		}
	}
    return sum;
};


