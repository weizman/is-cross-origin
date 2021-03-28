const isWindow = require('is-window');
const {DST_IS_NOT_A_WINDOW, SRC_IS_NOT_A_WINDOW, SRC_IS_NOT_SAME_ORIGIN_AS_WINDOW} = require('./errors');

function isCrossOrigin(dst, src) {
    return src.Object.getPrototypeOf(dst) === null;
}

module.exports = function(dst, src) {
    src = src || window;
    if (!isWindow(src)) {
        throw new Error(SRC_IS_NOT_A_WINDOW);
    }
    if (!isWindow(dst)) {
        throw new Error(DST_IS_NOT_A_WINDOW);
    }
    if (isCrossOrigin(window, src)) {
        throw new Error(SRC_IS_NOT_SAME_ORIGIN_AS_WINDOW);
    }
    return isCrossOrigin(dst, src);
};
