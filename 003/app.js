var main = function () {
    "use strict";

    /* function call */
    $("main").append(maxPrimeFactor(600851475143).toString())
};

$(document).ready(main);

/* functions */
var maxPrimeFactor = function (num) {
    var d=2;
    while ((d*d)<=num) {
        if (num%d==0) {
            num/=d;
        }
        else d++;
    }
    return num;
};

/* honestly, made these just for fun */

var primeFactors = function (num) {
    var d=2,factors=[];
    while ((d*d)<=num) {
        if (num%d==0) {
            num/=d;
            factors.push(d);
        }
        else d++;
    }
    factors.push(num);
    return factors;
};

var isPrime = function (num) {
    var i;
    for (i=2;(i*i)<=num;i++) {
        if (num%i==0) return false;
    }
    return true;
}

var ordArrayContains = function (array, val) {
    var med,min=0,max=array.length;
    while ((min+1)<(max-1)) {
        med=Math.floor((max+min)/2);
        console.log("med=",med);
        if (val==array[med]) return true;
        if (val<array[med]) max=med;
        if (val>array[med]) min=med;
    }
    if (val==array[min] || val==array[max]) return true;
    return false;
}
