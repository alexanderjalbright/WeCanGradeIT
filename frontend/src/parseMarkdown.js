export default function parseMarkdown(reqs) {
    var requirementsArray = [];
    var prevChar = "";
    var reqNum = -1;
    var useSpace = false;

    for (const c of reqs) {
        if (c === '*') {
            console.log(c);
            reqNum++;
        } else {
            console.log('char:' + c);
            if (c === ' ') {
                useSpace = true;
            } else if (c === ' ' && prevChar === ' ') {
                useSpace = false;
            } else {
                if (requirementsArray[reqNum] === undefined) {
                    requirementsArray[reqNum] = c;
                    useSpace = false;
                } else {
                    if (useSpace === true) {
                        requirementsArray[reqNum] += ' ';
                        useSpace = false;
                    }
                    requirementsArray[reqNum] += c;
                }
            }
        }
        prevChar = c;
    }
    return (requirementsArray);
}