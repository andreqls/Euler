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
