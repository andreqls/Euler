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
	if (num<2 || num%2==0) return false;
	for (d=3;(d*d)<=num;d+=2)
		if (num%d==0) return false;
	return true;
};

isPrimeFast = function (num,primes) { // speedboosted by having a list of ordered primes
	var d,i,max=primes[primes.length-1];
	if (num<max) return (num in primes);
	if (num<(max*max)) {
		for (i=0;(d*d)<=num;i++)
			d=primes[i];
			if (num%d==0) return false;
		return true;
	}
	for (i=0;i<primes.length;i++) {
		d=primes[i];
		if (num%d==0) return false;
	}
	for (d=max+1;(d*d)<=num;d+=2)
		if (num%d==0) return false;
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

/*
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
};*/

var isPrimePairSet = function (pairlist,nprime,primes) {
	var i;
	for (i=0;i<pairlist.length;i++) {
		if ( !isPrimeFast(Number(nprime.toString()+pairlist[i].toString()),primes)
			|| !isPrimeFast(Number(pairlist[i].toString()+nprime.toString()),primes) )
			return false;
	}
	return true;
};

var listPrimePairs = function (size,primes) { /* primes = listPrimes(limit) */
	var a,b,i,j,candidate,pairlist,primepairs=[];
	if (size<2) return [];
	if (size==2) {
		var a,b;
		for (a=0;a<primes.length;a++) {
			for (b=0;b<primes.length;b++) {
				if ( a!=b && isPrimePairSet([primes[a]],primes[b],primes) )
					primepairs=addElement(primepairs,[primes[a],primes[b]]);
			}
		}
		return primepairs;
	}
	pairlist=listPrimePairs(size-1,primes);
//	console.log(pairlist);
	for (i=0;i<primes.length;i++) {
		for (j=0;j<pairlist.length;j++) {
//			console.log(j,pairlist[j]);
			if ( !(primes[i] in pairlist[j]) ) {
/*				candidate=addElement(pairlist[j],primes[i]);
//				console.log(candidate);
				if (isPrimePairSet(candidate))
				if ( primes[i]==109 && pairlist[j][0]==3 && pairlist[j][1]==7 ) {
					console.log(primes[i],pairlist[j]);
					console.log(isPrimePairSet(pairlist[i],primes[i]
				}*/
				if (isPrimePairSet(pairlist[j],primes[i]),primes) {
					candidate=addElement(pairlist[j],primes[i]);
					primepairs=addElement(primepairs,candidate);
				/*	if (primes[i]==109) console.log(candidate,primepairs);*/
				}
			}
		}
	}
	return primepairs;
};

/* AUXILIARY */

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



/* OLD */

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


