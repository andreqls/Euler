var main = function () {
    "use strict";

    $("main").append(evenFibonacciSum(4000000).toString());

};

$(document).ready(main);

/* functions */

var evenFibonacciSum = function (max) {
    var a=1,b=2,c,sum=2;

    for (c=a+b;c<max;c=a+b){
        if (c%2==0) sum+=c;
        a=b;
        b=c;
    }

    return sum;
};
