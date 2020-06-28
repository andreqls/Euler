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

var sigma = function (k,n) {
	var d,s=0;
	for (d=1;d<=n;d++) {
		if (n%d==0) s+=Math.pow(d,k);
	}
	return s;
};

var convergent = function (k,q,limit) {
	var s,n,sum=0;
	for (n=1;n<limit;n++) {
		sum+=sigma(k,n)*Math.pow(q,n);
	}
	return sum;
};
