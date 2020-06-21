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


var listFivePrimeSets = function (limit) {
	var a,b,c,d,e,candidate=[],pentasets=[];
	var primes=listPrimes(limit);
	for (a=0;a<limit;a++) {
	  for (b=0;b<limit;b++) {
		if (b!=a) for (c=0;c<limit;c++) {
		  if (c!=b
			&& c!=a) for (d=0;d<limit;d++) {
			  if (d!=c
				&& d!=b
				&& d!=a) for (e=0;e<limit;e++) {
				  if (e!=d
					&& e!=c
					&& e!=b
					&& e!=a) {
					  candidate=[
						  primes[a],
						  primes[b],
						  primes[c],
						  primes[d],
						  primes[e]
					  ];
					  if (isPrimePairSet(candidate))
					  	pentasets.push(candidate);
				  }
				}
			}
		}
	  }
	}
	return pentasets;
};

var minPrimePairSet = function (setofsets) {
	var i,sum,pset=[],lset=[],min=2000000;
	for (i=0;i<setofsets.length;i++) {
		pset=setofsets[i];
		sum=pset[0]+pset[1]+pset[2]+pset[3]+pset[4]
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

