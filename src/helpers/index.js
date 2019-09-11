
let currVal = 1;
let maxValue = 10;
export function relativeTime(previous) {
    var date = new Date();
    var prevDate = new Date(previous);
    var min = 60 * 1000;
    var hour = min * 60;
    var day = hour * 24;
    var week = day * 7;

    var elapsed = date - prevDate;

    if (elapsed < min) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < hour) {
        return Math.round(elapsed / min) + ' minutes ago';
    }

    else if (elapsed < day) {
        return Math.round(elapsed / hour) + ' hours ago';
    }

    else if (elapsed < week) {
        return Math.round(elapsed / day) + ' days ago';
    }

    else if (elapsed >= week) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return prevDate.toLocaleDateString("en-US", options);
    }

    else {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return prevDate.toLocaleDateString("en-US", options);
    }
}

export function genRan() {
    var prev = localStorage.getItem("ADS"),
        jsonObj = JSON.parse(prev) || [];
    if (currVal === 10) {
        jsonObj = [];
        currVal = 1;
    }
    while (!jsonObj.includes(currVal)) {
        jsonObj.push(currVal)
        localStorage.setItem("ADS", JSON.stringify(jsonObj));
        currVal++;
        break;
    }
    return currVal;
}