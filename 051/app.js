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

var getDigits = function (num) {
	return ;
}



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
