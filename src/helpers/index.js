

export function relativeTime(previous) {
    var date = new Date();
    var prevDate = new Date(previous);
    var min = 60 * 1000;
    var hour = min * 60;
    var day = hour * 24;
    var week = day * 7;
    // var month = day * 30;
    // var year = month * 365;

    var elapsed = date - prevDate;

    if (elapsed < min) {
        console.log('-------------------elapsed min-------------------------')
        console.log(elapsed)
        return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < hour) {
        console.log('-------------------elapsed hour-------------------------')
        console.log(elapsed)
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
        return prevDate.toLocaleDateString("en-US", options);
    }

    // else if (elapsed < msPerMonth) {
    //     return 'approximately ' + Math.round(elapsed / day) + ' days ago';
    // }

    // else if (elapsed < msPerYear) {
    //     return 'approximately ' + Math.round(elapsed / month) + ' months ago';
    // }

    // else {
    //     return 'approximately ' + Math.round(elapsed / year) + ' years ago';
    // }
}

export function genRan(arr) {
    var ran = Math.floor(Math.random() * 1000);
    while (arr.indexOf(ran) !== -1) {
        break;
    }
    return ran;
}