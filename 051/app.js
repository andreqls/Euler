var main = function () {
    "use strict";

    /* function call */
    $("main").append(firstOfClass(8).toString());

};

$(document).ready(main);

/* functions */
var dummyFunc = function (input) {
    return 0;
};

var firstOfClass = function (rank) {
	var w,i,ans;
	for (w=1;w<10;w++) {
		ans=getClass(w);
		if (ans.c==rank) {
			if (isPrime(ans.v)) return ans.v;
			for (i=1;i<10;i++) {
				if (isPrime(varyZeros(ans.v,w,i))) return varyZeros(ans.v,w,i);
			}
		}
	}
	return 0;
}

var isPrime = function (num) {
	var d;
	if (num==2) return true;
	if (num%2==0 || num<2) return false;
	for (d=3;d*d<=num;d+=2) {
		if (num%d==0) return false;
	}
	return true;
};

var getClass = function (width) {
	var i,num,count,max={"v":1,"c":1};
	for (num=1;num<=(Math.pow(10,width)-1);num+=2) {
		if ( (num.toString()).includes('0') || (num<Math.pow(10,width-1)) ) {
			count=0;
			if ( (num>Math.pow(10,width-1)) && isPrime(num) ) count++;
			for (i=1;i<10;i++) {
				if ( isPrime(varyZeros(num,width,i)) ) count++;
			}
			if (count>max.c) {
				max.v=num;
				max.c=count;
			}
		}
	}
	return max;
};

var varyZeros = function (num,width,k) {
	var i,strnum;
	k=k.toString();
	strnum=(num.toString()).replace(/0/g,k);
	//console.log(strnum);
	for (i=strnum.length;i<width;i++) {
		strnum=k+strnum;
	}
	return Number(strnum);
};

