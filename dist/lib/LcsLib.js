"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LcsLib {
    constructor(options) {
        this.options = options;
        const dp = new Array(this.options.PATH_COMPARE_RANGE + 1);
        for (let i = 0; i < dp.length; i++) {
            dp[i] = new Array(dp.length);
        }
        this.fastDp = dp;
    }
    getLcsLength(seqA, seqB, compare = (a, b) => a === b) {
        const dp = new Array(seqA.length + 1);
        for (let i = 0; i < seqA.length + 1; i++) {
            dp[i] = new Array(seqB.length + 1);
        }
        for (let i = 0; i <= seqA.length; i++) {
            dp[i][0] = 0;
        }
        for (let i = 0; i <= seqB.length; i++) {
            dp[0][i] = 0;
        }
        for (let i = 1; i <= seqA.length; i++) {
            for (let j = 1; j <= seqB.length; j++) {
                if (compare(seqA[i - 1], seqB[j - 1])) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                }
                else if (dp[i - 1][j] > dp[i][j - 1]) {
                    dp[i][j] = dp[i - 1][j];
                }
                else {
                    dp[i][j] = dp[i][j - 1];
                }
            }
        }
        return dp[seqA.length][seqB.length];
    }
    getLcsLengthFast(seqA, seqB) {
        for (let i = 0; i <= seqA.length; i++) {
            this.fastDp[i][0] = 0;
        }
        for (let i = 0; i <= seqB.length; i++) {
            this.fastDp[0][i] = 0;
        }
        for (let i = 1; i <= seqA.length; i++) {
            for (let j = 1; j <= seqB.length; j++) {
                if (seqA[i - 1] === seqB[j - 1]) {
                    this.fastDp[i][j] = this.fastDp[i - 1][j - 1] + 1;
                }
                else if (this.fastDp[i - 1][j] > this.fastDp[i][j - 1]) {
                    this.fastDp[i][j] = this.fastDp[i - 1][j];
                }
                else {
                    this.fastDp[i][j] = this.fastDp[i][j - 1];
                }
            }
        }
        return this.fastDp[seqA.length][seqB.length];
    }
}
exports.default = LcsLib;
//# sourceMappingURL=LcsLib.js.map