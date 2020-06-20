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
	if (num%2==0 || num<2) return false;
	for (d=3;d*d<=num;d+=2) {
		if (num%d==0) return false;
	}
	return true;
};

var minMaxWidth = function (width) {
	var min=1,max=9,k=1;
	for (k=10;(width>1);width--) {
		max+=9*k;
		k*=10;
	}
	min+=k/10;
	return { "min":min, "max":max };
}

var binLike = function (num) {
	var r,m,binlike=0;
	for (m=1;num>0;m*=10) {
		binlike+=m*(num%2);
		num=Math.floor(num/2);
	}
	return binlike;
}

var substitutionPatterns = function (width) {
	var k,max,patlist=[];
	max=Math.pow(2,width+1)-1;
	for (k=1;k<max;k+=2) { // all odd binaries up to 2^(w+1)-1
/*		b=binLike(k);
		if (b%10!=0) patlist.push(b); // this check may be useless, hehe...
		*/
		patlist.push(binLike(k));
	}
	return patlist;
};

var substitutionPossible = function (num, width) {
	return true;
};

var checkClass = function (num, width) {
	var i,j,x,max=Math.pow(10,width)-1,subs=substitutionPatterns(width);	
	for (x=1;x<max;x++) {
		for (i=0;i<subs.length;i++) {
			if (isPrime(x)) {
				for (j=;j<10;j++) {
				}
				if ( isPrime(x+subs[i]) )
	}
};

