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

var PIND=1,PRIMES=[2,3];

var inOrdered = function (value, ordlist) {
	if (ordlist[findClosest(value, ordlist)]==value) return true;
	return false;
}


/*
var inOrdered = function (value, ordlist) { // binary search on ordered list
	var i,min=0,max=ordlist.length-1;
	i=Math.floor(ordlist.length/2);
	while (min<max-1) {
		if (value==ordlist[i]) return true;
		if (value<ordlist[i]) {
			max=i; 
		}
		else min=i;
		i=Math.floor((min+max)/2);
	}
	if (value==ordlist[min]) return true;
	if (value==ordlist[max-1]) return true;
	if (value==ordlist[max]) return true;
	return false;
};
*/

var isPrime = function (num) {
	var d;
	if (num==2) return true;
	if (num%2==0 || num<2) return false;
	for (d=3;d*d<=num;d+=2) {
		if (num%d==0) return false;
	}
	return true;
};

var checkIfPrime = function (num) {
	var d,result;
	d=PRIMES[PIND]; // largest known prime
	if (num<=d) {
		if (inOrdered(num,PRIMES)) return true;
		return false;
	}
	if (num%d==0) result=false;
	for (d+=2;d<num;d+=2) {
		if (isPrime(d)) {
			PRIMES[++PIND]=d; // push d to the list of primes
			if (num%d==0) result=false; // test if num is composite
		}
	}
	if (result!=false) 
	{
		PRIMES[++PIND]=num;
		return true;
	}
	return false;
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
/*
var findClosest = function (value, ordlist) { // binary search on ordered list
	var old=-1,i=Math.floor(ordlist.length/2);
	while (i!=old) {
		if (value==ordlist[i]) return i;
		old=i;
		if (value>ordlist[i]) i=Math.floor((i+ordlist.length)/2);
		else i=Math.floor(i/2);
	}
	return i;
};
*/

/*
var findClosest = function (value, ordlist) {
	var i;
	if (ordlist.length<3) 
	for (i=ordlist.length;i<ordlist.length;i++) {
		if (value==ordlist[i]) return i;
	}
	return i;
};
*/

var findClosest = function (value, ordlist) { // binary search on ordered list
	var i,min=0,max=ordlist.length-1;
	i=Math.floor(ordlist.length/2);
	while (min<max-1) {
		if (value==ordlist[i]) return i;
		if (value<ordlist[i]) {
			max=i; 
		}
		else min=i;
		i=Math.floor((min+max)/2);
	}
	if (value==ordlist[min]) return min;
	if (value==ordlist[max-1]) return (max-1);
	if (value==ordlist[max]) return max;
	return i;
};


var primeSpace = function (width) {
	var range=minMaxWidth(width),minpind,maxpind;
	checkIfPrime(range.max+10);
	minpind=findClosest(range.min,PRIMES);
	if (PRIMES[minpind]<range.min) minpind++;
	maxpind=findClosest(range.max,PRIMES);
	return PRIMES.slice(minpind,maxpind+1);
};

var getEqualDigits = function (a,b) { // b>=a
	var code=0,multiplier=1;
	while (b>0) {
		if ((b-a)%10==0) code=(a%10)*multiplier+code;
		multiplier*=10;
		a=Math.floor(a/10);
		b=Math.floor(b/10);
	}
	return code;
}



/* String version
var getEqualDigits = function (a, b) { // b>=a
	var code='';
	while (b>0) {
		if ((b-a)%10==0) code=(a%10).toString()+code;
		else code='X'+code;
		a=Math.floor(a/10);
		b=Math.floor(b/10);
	}
	return code;
};
*/

/*
var generateCandidates = function (digits, zeros) {
	var n,space=[];
	for (n=1;n<(Math.pow(10,digits)-1);n+=2)
		if (countZeros(n)==zeros) space.push(n);
	return space;
};

var countZeros = function (num, width) {
	var count;
	for (count=0;num>0;num=Math.floor(num/10)) {
		if (num%10==0) count++;
		width--;
	}
	if (width>0) count+=width;
	return count;
};*/

/*
var getDigits = function (num) {
	var diglist = [];
	num.toString().forEach(function (dig) {
		digitlist.push(Number(dig));
	});
	return diglist;
};*/
