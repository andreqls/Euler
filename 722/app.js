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

var sciNot = function (num) {
	var exp;
	for (exp=0;num>=10;exp++) num/=10;
	return [num,exp];
};

var sigDif = function (a,b) {
	return absVal(sciNot(a)[0]-sciNot(b)[0]);
};

var absVal = function (num) {
	if (num<0) num*=-1;
	return num;
}

var convergent = function (k,q) {
	var s,n,prev,sum=0;
	for (n=1;true;n++) {
		prev=sum;
		sum+=sigma(k,n)*Math.pow(q,n);
		if (sigDif(sum,prev)<0.00000000000000001) { // converged to necessary precision
			return sciNot(sum);
		}
	}
//	return sum;
};

