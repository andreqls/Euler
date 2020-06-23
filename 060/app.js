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

var minPrimePairSet = function (setofsets) {
	var i,sum,pset=[],lset=[],min=2000000;
	for (i=0;i<setofsets.length;i++) {
		pset=setofsets[i];
		sum=pset[0]+pset[1]+pset[2]+pset[3]+pset[4];
		if (sum<min) {
			min=sum;
			lset=pset;
		}
	}
	return {"primes":pset, "sum":min};
};

var isPrime = function (num) {
	var d;
	if (num==2) return true;
	if (num<2 || num%2==0) return false;
	for (d=3;(d*d)<=num;d+=2) {
		if (num%d==0) return 0;
	}
	return true;
};

var listPrimes = function (quantity) {
	var n,plist=[],count=1;
	if (quantity>0) plist=[2];
	for (n=3;count<quantity;n+=2) {
		if (isPrime(n)) {
			plist.push(n);
			count++;
		}
	}
	return plist;
};

var sumArray = function (array) {
	var sum=0;
	array.forEach(function (item) { sum+=item; });
	return sum;
}

var addElement = function (array, newelement) {
	var newarray=JSON.parse(JSON.stringify(array));
	newarray[array.length]=newelement;
	return newarray;
}

var listPrimePairs = function (size,primes) { /* primes = listPrimes(limit) */
	var a,b,i,j,candidate,pairlist,primepairs=[];
//	if (size==1) {primes;
	if (size==2) {
		var a,b;
		for (a=0;a<primes.length;a++) {
			for (b=0;b<primes.length;b++) {
				if ( a!=b && isPrimePairSet([primes[a],primes[b]]) )
					primepairs=addElement(primepairs,[primes[a],primes[b]]);
			}
		}
		return primepairs;
	}
/*	if (size==3) {
		pairlist=listPrimePairs(size-1,primes);
		console.log(pairlist);
		return pairlist;
	}
*/	pairlist=listPrimePairs(size-1,primes);
//	console.log(pairlist);
	for (i=0;i<primes.length;i++) {
		for (j=0;j<pairlist.length;j++) {
//			console.log(j,pairlist[j]);
			if ( !(primes[i] in pairlist[j]) ) {
				candidate=addElement(pairlist[j],primes[i]);
//				console.log(candidate);
				if (isPrimePairSet(candidate)) 
					primepairs=addElement(primepairs,candidate);
			}
		}
	}
	return primepairs;
};

var firstPrimeSet = function (size,primes) {
	var i,j,candidate,pairlist=listPrimePairs(size-1,listPrimes(500));
	for (j=0;j<pairlist.length;j++) {
		for (i=0;i<primes.length;i++) {
			if ( !(primes[i] in pairlist[j]) ) {
				candidate=addElement(pairlist[j],primes[i]);
				if (isPrimePairSet(candidate)) return candidate;
			}
		}
	}
	return 0;
}

var isPrimePairSet = function (pset) {
	var i,j;
	for (i=0;i<pset.length;i++) {
		for (j=0;j<pset.length;j++) {
			if (i!=j) {
				if (!isPrime(Number(pset[i].toString()+pset[j].toString())))
					return false;
			}
		}
	}
	return true;
};

