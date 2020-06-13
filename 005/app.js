var main = function () {
    "use strict";

    /* function call */
    $("main").append(minMult(1,20).toString())

};

$(document).ready(main);

/* functions */

var minMult = function (min,max) {
    var mult;
    for (mult=max;max>=min;max--) {
       mult=lcm(mult,max); 
    }
    return mult;
};
/*
var factors = function (num) {
    var d,factors=[];
    for (d=2;(d*d)<num;d++) {
        if (num%d==0) {
            factors.push(d);
            num/=d;
    }
    return factors
};*/

var max = function (a,b) {
    if (a>b) return a;
    return b;
};

var gcd = function (a,b) {
    var t;
    while (b>0) {
        t=b;
        b=a%b;
        a=t;
    }
    return a;
};

var lcm = function (a,b) {
    return (a*b/gcd(a,b));
};
