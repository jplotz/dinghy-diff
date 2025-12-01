"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLis = void 0;
function getLis(arr) {
    const len = arr.length;
    const parent = new Array(len);
    parent[0] = -1;
    const m = new Array(len);
    m[0] = 0;
    let maxLength = 0;
    for (let i = 0; i < len; i++) {
        let low = 0;
        let high = maxLength;
        while (low !== high) {
            const mid = Math.ceil((low + high) / 2);
            if (arr[m[mid]] >= arr[i]) {
                high = mid - 1;
            }
            else {
                low = mid;
            }
        }
        const j = low;
        m[j + 1] = i;
        parent[i] = m[j];
        if (j + 1 > maxLength) {
            maxLength = j + 1;
        }
    }
    const lis = [];
    let index = m[maxLength];
    for (let i = 0; i < maxLength; i++) {
        lis.push(index);
        index = parent[index];
    }
    return lis.reverse();
}
exports.getLis = getLis;
//# sourceMappingURL=Lis.js.map