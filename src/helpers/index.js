
let advertIndexes = [];
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
    /**
     * This generates a random number between 0 and 10
     * It could be any value, 10 was used because i'm targeting integers not more than 10
     */
    let ran = Math.round(Math.random() * 10);
    while (advertIndexes.indexOf(ran) === -1) {
        /**
         * This checks for repetition twice in a row
         * Once the length is 2 it clears the array and retains the last element to avoid repeating it
         */
        if (advertIndexes.length === 2) {
            advertIndexes = [advertIndexes[advertIndexes.length - 1]];
        }
        advertIndexes.push(ran)
        console.log(advertIndexes)
        return ran;
    }
    return genRan();
}