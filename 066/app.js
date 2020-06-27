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

var calcX = function (D, y) {
	var x=Math.sqrt(1+D*y*y);
	if (Math.floor(x)==x) return x;
	else return -1;
};

var genPerfectSquares = function (limit) {
	var n,ps = [];
	for (n=1;n<=limit;n++) {
		ps.push(n*n);
	}
	return ps;
};

var getXfromD = function (D) {
	if (Math.sqrt(D)==Math.floor(Math.sqrt(D))) return 0;
	var x,y,x2,y2,maxy=Math.sqrt(Math.pow(2,64)-1);
	for (y=1;y<maxy;y++) {
		y2=y*y;
		x2=1+D*y2;
		x=Math.sqrt(x2);
		if (x==Math.floor(x)) return x;
	}
};

var digDeepX = function (D) {
	var y,x;
	for (y=1;true;y++) {
		x=Math.sqrt(1+D*y*y);
		if (x==Math.floor(x)) return x
	}
};

var getSolutions = function (limit) {
	var D,maxD=0,maxX=0,solutions=[0];
	for (D=1;D<=limit;D++) {
		solutions[D]=getXfromD(D);
		if (maxX<solutions[D]) { maxD=D; maxX=solutions[D]; }
	}
	console.log(maxD,maxX);
	return solutions;
};

var checkSolutions = function(list) {
	var D,x,y,mistakes=[];
	for (D=1;D<list.length;D++) {
		x=list[D];
		if (x!=0) {
			y=Math.sqrt((x*x-1)/D);
			if (y!=Math.floor(y)) mistakes.push(D);
		}
	}
	return mistakes;
};

var findAllSolutions = function (D) {
}

/*
var getSolutions = function (limit) {
	var i,next,D,solutions=[];
	for (i=1;(i*i)<=limit;i=i++) {
		solutions[i*i]=0;
		next=(i+1)*(i+1);
		for (D=(i*i)+1;D<((i+1)*(i+1));D++) {
			solutions[D]=getXfromD(D);
			console.log(D,solutions[D]);
		}
	}
	return solutions;
};*/

var genXYDsets = function (limit) {
	var max=0,Dmax=0,maxD=((limit+1)*limit/2),x,y,x2,y2,D,i,j,Dsum=0,pairs={}; // Dsum = Sum(1..1000) - Sum(1,4,9,16,...,961) = 
	for (i=0;i<=Math.floor(Math.sqrt(limit));i++) maxD-=i*i; // set maxD to the Dsum target
	console.log("maxD = ",maxD);
	for (j=1;Dsum<maxD;j++) {
		y2=j*j;
		for (i=j+1;(i*i)<=(limit*y2+1);i++) {
			x2=i*i; // x2 > y2
			if ((x2-1)%y2==0) {
				D=(x2-1)/y2;
				if (D<=limit) {
					x=Math.sqrt(x2);
					y=Math.sqrt(y2);
					if (pairs[D]==undefined) {
						pairs[D]=[x,y];
						Dsum+=D;
						if (x>max) { Dmax=D; max=x; }
					}
/*					else if (x<pairs[D][0]) {
						console.log("WOW!");
						pairs[D]=[x,y];
						if (x>max) { Dmax=D; max=x; } 
					}*/
				}
			}
		}
	}
//	console.log(Dsum);
	console.log(Dmax,max);
	return pairs;
};

