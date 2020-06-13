var main = function () {
    "use strict";

    $("main").append(sumMult3and5(1000).toString());
};

$(document).ready(main);

var sumMult3and5 = function (max) {
    var n,sum=0;
    for (n=1;n<max;n++) {
        if (n%3==0 || n%5==0) sum+=n;
    }
    return sum;
}

