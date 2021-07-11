function Curve() {
    this.startAngle = this.path[0].angleTo(this.path[1]);
    let points = this.path.slice(-2);
    this.endAngle = points[1].angleTo(points[0]);
}

Curve.prototype.path = undefined;
Curve.prototype.pointAt = undefined;
Curve.PRECISION = 5;
Curve.parse = function (_0x2f7402, _0x4de055, _0x38faf7) {
    try {
        if (_0x2f7402 === "P") return new CircumscribedCircle(_0x4de055, _0x38faf7);
        if (_0x2f7402 === "C") return new CatmullCurve(_0x4de055, _0x38faf7);
    } catch (_0x5b27c1) {
    }
    return new LinearBezier(_0x4de055, _0x38faf7, _0x2f7402 === "L");
};
