var main = function () {
    "use strict";
	var infile,games;
	const reader = new FileReader();
	$("#inputfile").on("change", function (event) {
		infile=event.target.files[0]; // This is a file object, which is a type of blob
		infile.text().then( function (text) { // text() returns a promise which, when resolved, executes the "then" handler
			games=text.split("\n");
			games.pop();
			$("main").append(countFPWins(games));
		});
	});
};

$(document).ready(main);

/* functions */
var countFPWins = function (gamelist) {
	var hands,wins=0;
	gamelist.forEach(function (game) {
		hands=extractHands(game);
		console.log(hands[0],hands[1]);
		if (pokerWinner(hands[0],hands[1])==1) wins++;
		//console.log(wins);
	});
	return wins;
};

var extractHands = function (game) { /* FORMAT: "RS RS RS RS RS RS RS RS RS RS" */
	var i,cards,hand1=[],hand2=[];
	cards=game.split(' ');
	for (i=0;i<5;i++) hand1.push(cards[i]);
	for (i=5;i<10;i++) hand2.push(cards[i]);
	return ([hand1,hand2]);
};


var pokerWinner = function(hand1,hand2) { // return 1 if player 1 wins, 2 if player 2 wins

	var f,tests=[checkStraightFlush,checkFOAK,checkFullHouse,checkFlush,checkStraight,
		checkTOAK,checkTwoPairs,checkPair]; // functions 0 thru 7

	if (checkRoyalFlush(hand1))	return 1;
	if (checkRoyalFlush(hand2)) return 2;

	//console.log(hand1,hand2);

	for (f=0;f<8;f++) {
		//console.log(f);
		if (tests[f](hand1)) {
			if (tests[f](hand2)) {
				console.log("f=",f);
				return bestTie(hand1,hand2,f);
			}
			return 1;
		}
		if (tests[f](hand2)) return 2;
	}
	return bestHighCard(hand1,hand2);
};

var bestTie = function (hand1, hand2, code) {
	var i,c1,c2,k1,k2,m1,m2;
	console.log("code=",code);
	switch (code) {
/*		case 0: { // StraightFlush: the highest single card is the highest straight, which wins
			continue;
		}
*/		case 1: { // FOAK, highest repeat wins; if equal, bestHighCard
			c1=mostRecurrent(hand1);
			c2=mostRecurrent(hand2);
			if (getValue(c1)>getValue(c2)) return 1;
			if (getValue(c2)>getValue(c2)) return 2;
			break;
		}
		case 2: { // FullHouse: highest TOAK, then highest pair (which cannot fail) wins
			// Check for highest TOAK
			c1=mostRecurrent(hand1);
			c2=mostRecurrent(hand2);
			if (getValue(c1)>getValue(c2)) return 1;
			if (getValue(c2)>getValue(c1)) return 2;
			/* Equal TOAKs, check highest pair - this cannot fail, lest it be a hard tie */
			for (i=0;i<5;i++) {
				if ( getValue(hand1[i])!=getValue(c1) ) { k1=hand1[i]; break;}
				if ( getValue(hand2[i])!=getValue(c2) ) { k2=hand2[i]; break;}
			}
			if (getValue(k1)>getValue(k2)) return 1;
			return 2; // can't be equal, otherwise it would be impossible to untie
		}
		case 3: { // Flush, make it impossible and repeat (IF NOT, JUST CONTINUE)
			hand1[0][1]='X';
			hand2[0][1]='X';
			return pokerWinner(hand1,hand2);
		}
/*		case 4: { // Straight: highest card wins
			continue;
		}
*/		case 5: { // TOAK: same as FOAK
			c1=mostRecurrent(hand1);
			c2=mostRecurrent(hand2);
			if (getValue(c1)>getValue(c2)) return 1;
			if (getValue(c2)>getValue(c1)) return 2;
			break;
		}
		case 6: { // Two Pairs: the most difficult by far...
			c1=mostRecurrent(hand1); // first repeater in hand1, not necessarily highest
			c2=mostRecurrent(hand2); // first repeater in hand2, not necessarily highest
			for (i=0;i<5;i++) {		// determine k1 and k2, which are the other pairs
				if ( countCard(hand1,hand1[i])==2 && !isEqual(hand1[i],c1) ) k1=hand1[i];
				if ( countCard(hand2,hand2[i])==2 && !isEqual(hand2[i],c2) ) k2=hand2[i];
			}
			// get maximums into "m"s and set "k"s to minimums
			if ( getValue(c1) > getValue(k1) ) m1=c1;
			else {
				m1=k1;
				k1=c1;
			}
			if ( getValue(c2) > getValue(k2) ) m2=c2;
			else {
				m2=k2;
				k2=c2;
			}
			if ( getValue(m1) > getValue(m2) ) return 1;
			if ( getValue(m2) > getValue(m1) ) return 2;
			if ( getValue(k1) > getValue(k2) ) return 1;
			if ( getValue(k2) > getValue(k1) ) return 2;
			break;
		}
		case 7: { // Pair: same as FOAK & TOAK
			c1=mostRecurrent(hand1);
			c2=mostRecurrent(hand2);
			if (getValue(c1)>getValue(c2)) return 1;
			if (getValue(c2)>getValue(c1)) return 2;
			break;
		}
	}
	return bestHighCard(hand1,hand2);
};

var bestHighCard = function (hand1,hand2) {
	var i,n1=[],n2=[],m1=maxValue(hand1),m2=maxValue(hand2);
	console.log(m1,m2);
	if (m1>m2) return 1;
	if (m2>m1) return 2;
	if (m1==2) return 0;
	for (i=0;i<5;i++) {
		if (getValue(hand1[i]) == m1) n1.push('2H');
		else n1.push(hand1[i]);
		if (getValue(hand2[i]) == m2) n2.push('2H');
		else n2.push(hand2[i]);
	}
	return bestHighCard(n1,n2);
};

var mostRecurrent = function (pokerhand) {
	var i,count,maxcount=0,position=0;
	for (i=0;i<5;i++) {
		count=countCard(pokerhand,pokerhand[i]);
		//console.log("count=",count);
		if (count>maxcount) {
			maxcount=count;
			position=i;
		}
	}
	//console.log(maxcount, position);
	return pokerhand[position];
};

var checkRoyalFlush = function (pokerhand) {
	if (hasRank(pokerhand,'A') && checkStraightFlush(pokerhand)) return true;
	return false;
};

var checkStraightFlush = function (pokerhand) {
	if (checkStraight(pokerhand) && checkFlush(pokerhand)) return true;
	return false;
};

var checkStraight = function (pokerhand) {
	if (!checkPair(pokerhand)
		&& (( maxValue(pokerhand) - minValue(pokerhand)) <= 4)) return true;
	return false;
};

var maxValue = function (pokerhand) {
	var val,max=0;
	pokerhand.forEach(function (card) {
		val=getValue(card);
		if (val>max) max=val;
	});
	return max;
};

var minValue = function (pokerhand) {
	var val,min=14;
	pokerhand.forEach(function (card) {
		val=getValue(card);
		if (val<min) min=val;
	});
	return min;
};

var getValue = function (card) {
	switch (card[0]) {
		case '2': return 2;
		case '3': return 3;
		case '4': return 4;
		case '5': return 5;
		case '6': return 6;
		case '7': return 7;
		case '8': return 8;
		case '9': return 9;
		case 'T': return 10;
		case 'J': return 11;
		case 'Q': return 12;
		case 'K': return 13;
		case 'A': return 14;
	}
	return 0;
};

var checkFlush = function (pokerhand) {
	var i,suit=pokerhand[0][1];
	for (i=1;i<5;i++) {
		if (!isofSuit(pokerhand[i],suit)) return false;
	}
	return true;
};

var checkFOAK = function (pokerhand) {
	var i;
	for (i=0;i<2;i++) {
		if (countCard(pokerhand,pokerhand[i])>=4)
			return true;
	}
	return false;
};

var checkFullHouse = function (pokerhand) {
	if (checkTOAK(pokerhand) && checkTwoPairs(pokerhand)) return true;
	return false;
};

var checkTOAK = function (pokerhand) {
	var i;
	for (i=0;i<3;i++) {
		if (countCard(pokerhand,pokerhand[i])>=3)
			return true;
	}
	return false;
};
/*
var checkTwoPairsALT = function (pokerhand) {
	var i,j,candidate,clone=[];
	for (i=0;i<4;i++) {
		candidate=pokerhand[i];
		for (j=i+1;j<5;j++) {
			if ( isEqual(candidate,pokerhand[j]) ) {
				clone=cloneHand(pokerhand);
				clone[i]="XX";
				clone[j]="ZZ";
				if (checkPair(clone)) return true;
			}
		}
	}
	return false;
};*/

var checkTwoPairs = function (pokerhand) {
	var paircount=0;
	pokerhand.forEach(function (card) {
		if ( countCard(pokerhand,card) == 2) paircount++;
	});
	if (paircount==4) return true;
	return false;
}

var countCard = function (pokerhand, card) {
	var count=0;
	pokerhand.forEach(function (item) {
		if ( getValue(item) == getValue(card) ) count++;
	});
	return count;
}

var cloneHand = function (pokerhand) {
	var clone=[];
	pokerhand.forEach( function (card) { clone.push(card); });
	return clone;
}

var checkPair = function (pokerhand) {
	var i,j;
	for (i=0;i<4;i++) {
		candidate=pokerhand[i];
		for (j=i+1;j<5;j++) {
			if ( getValue(candidate)==getValue(pokerhand[j]) ) return true;
		}
	}
	return false;
};

var hasCard = function (pokerhand, card) { // pokerhand=["RS","RS","RS","RS","RS"]
	var i;
	for (i=0;i<5;i++) {
		if ( isEqual(card,pokerhand[i]) ) return true;
	}
	return false
};

var isEqual = function (card1, card2) {
	if ( (card1[0]==card2[0]) && (card1[1]==card2[1]) )
		return true;
	return false
};

var hasRank = function (pokerhand, rank) {
	var i;
	for (i=0;i<5;i++) if (isofRank(pokerhand[i],rank)) return true;
	return false;
};

var hasSuit = function (pokerhand, suit) {
	var i;
	for (i=0;i<5;i++) if (isofSuit(pokerhand[i],suit)) return true;
	return false;
};

var isofRank = function (card, rank) { // card="R[ank]S[uit]"
	if (card[0]==rank) return true;
	return false;
};

var isofSuit = function (card, suit) { // card="R[ank]S[uit]"
	if (card[1]==suit) return true;
	return false;
};
