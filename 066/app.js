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

var genXYDsets = function (limit) {
	var max=0,Dmax=0,x2,y2,D,i,j,Dlist=[],pairs={},ps=genPerfectSquares(limit);
	for (i=0;i<=1000;i++) Dlist[i]=0;
	for (j=0;j<limit;j++) {
		y2=ps[j];
		for (i=j+1;i<limit;i++) {
			x2=ps[i]; // x2 > y2
			if ((x2-1)%y2==0) {
				D=(x2-1)/y2;
				if (D<=1000) {
					x2=Math.sqrt(x2);
					y2=Math.sqrt(y2);
//					console.log(D.toString()+": "+x2.toString()+"² - "+D.toString()+"*"+y2.toString()+"² = 1");
					if (pairs[D]==undefined || x2<pairs[D][0]) {
						pairs[D]=[x2,y2];
						Dlist[D]=1;
						if (x2>max) {
							Dmax=D;
							max=x2;
						}
					}
				}
			}
		}
	}
	console.log(Dlist);
	console.log(Dmax,max);
	return pairs;
};

