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

var minOfRepClass = function (degree) {
	var w;
	for (w=1;true;w++) { // test width by width
	}
};

var getRepClass = function (binlike) { // most primes for a certain template
	var i,k,m,fixed,unfixed,rank,maxrank=0,
		vspace=variationSpace(binlike.toString().length,binlike);
	for (i=0;i<vspace.length;i++) {
		for (k=0;k<=9;k++) { // these two loops iterate "fixed" digits
			fixed=vspace[i]*k;
			rank=0;
			for (m=0;m<=9;m++) { // iteration over "unfixed" digits
				unfixed=binlike*m;
				console.log(unfixed+fixed);
				if (isPrime(unfixed+fixed)) rank++;
			}
			console.log("rank=",rank);
			if (rank>maxrank) maxrank=rank;
		}
	}
	return maxrank;
};

var variationSpace = function (width,binlike) {
	var i,multiplier=1,space=[];
	for (i=0;i<width;i++) {
		if ((Math.floor(binlike/multiplier))%2==0) space.push(multiplier);
		multiplier*=10;
	}
	return space;
}

var getNthDigit = function (num,n) {
	var i;
};

var generateTestSpace = function (width) {
	var i,max=Math.pow(2,width-1),space=[];
	for (i=1;i<max;i++) space.push(binLike(i*2));
	return space;
	console.log(space);
};

/*
var negBin = function (binlike, width) {
	var i,negbin=1;
	for (i=1;negbin<binlike;i++) negbin=10*negbin+1;
	for (i;i<width;i++) negbin=10*negbin+1;
	return negbin-binlike;
};*/

var binLike = function (num) { // turn 2 into 10, 5 into 101 and so on
	var binlike=0,multiplier=1;
	while (num>0) {
		binlike+=(num%2)*multiplier;
		multiplier*=10;
		num=Math.floor(num/2);
	}
	return binlike;
};

var isPrime = function (num) {
	var d;
	if (num<2) return false;
	for (d=2;(d*d)<=num;d++) {
		if (num%d==0) return false;
	}
	return true;
}

/*
var replaceDigit = function (onum,position,ndig) {
	var strnum;
	strnum=onum.toString();
	strnum[position]=ndig.toString();
	return Number(strnum);
}*/
