var main = function () {
    "use strict";

    /* function call */
    $("main").append(maxPalProd(3).toString())

};

$(document).ready(main);

/* functions */
var maxPalProd = function (digits) {
    var a,b,min,max,maxprod=0,count=0;
    for (min=1;digits>1;digits--) min*=10;
    a=b=max=min*10-1;
    for (a=max;a>=min;a--){
        for (b=max;b>=min;b--) {
            count++;
            if (isPalindrome(a*b)) {
                if (maxprod<a*b) maxprod=a*b;
                console.log(a,b,a*b);
                min=b;
            }
        }
    }
    console.log(count);
    return maxprod;
};

var reverseString = function (string) {
    var i,revstr = "";
    for (i=string.length-1;i>=0;i--) revstr+=string[i];
    return revstr;
}

var isPalindrome = function (num) {
    var numstr,revstr;
    numstr=num.toString();
    revstr=reverseString(numstr);
    if (revstr.localeCompare(numstr)==0) return true;
    return false;
};
