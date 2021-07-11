Math.hypot = Math.hypot || function () {

    let a = 0;
    for (let i = 0; i < arguments.length; i++) {
        a += arguments[i] * arguments[i];
    }
    return Math.sqrt(a);
};
Math.lerp = Math.lerp || function (vector1, vector2, amount) {

    if (vector1 instanceof Point)
        return new Point(
            Math.lerp(vector1.x, vector2.x, amount),
            Math.lerp(vector1.y, vector2.y, amount)
        );
    return vector1 + (vector2 - vector1) * amount;
}

Math.ccw = function (vector1, vector2, vector3) {
    let tmp = (vector2.x - vector1.x) * (vector3.y - vector1.y) - (vector3.x - vector1.x) * (vector2.y - vector1.y);
    if (tmp > 0) return 1;
    if (tmp < 0) return -1;
    return 0;
};

if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(
        HTMLCanvasElement.prototype, toBlob,
        function (_0x897076, type, quality) {
            let decode = atob(this.toDataURL(type, quality).split(",")[1]), length = decode.length,
                array = new Uint8Array(length);
            for (let i = 0; i < length; i++)
                array[i] = decode.charCodeAt(i);
            _0x897076(new Blob([array], {type: type || "image/png"}));
        }
    )
}
