function CircumscribedCircle(points, _0x44a608) {
    let _0x184a16 = points[0].x - points[1].x, _0x354dbd = points[0].y - points[1].y,
        _0x5d8ca9 = points[1].x - points[2].x, _0x24cc19 = points[1].y - points[2].y,
        _0x8ebf3e = (_0x184a16 * _0x24cc19 - _0x354dbd * _0x5d8ca9) * 2,
        _0x35f82d = points[0].x * points[0].x + points[0].y * points[0].y,
        _0x3e67a0 = points[1].x * points[1].x + points[1].y * points[1].y,
        _0x3cdf06 = points[2].x * points[2].x + points[2].y * points[2].y,
        x = ((_0x35f82d - _0x3e67a0) * _0x24cc19 + (_0x3e67a0 - _0x3cdf06) * -_0x354dbd) / _0x8ebf3e,
        y = ((_0x35f82d - _0x3e67a0) * -_0x5d8ca9 + (_0x3e67a0 - _0x3cdf06) * _0x184a16) / _0x8ebf3e,
        _0x32def8 = points[0].x - x, _0x204a92 = points[0].y - y,
        radius = Math.hypot(_0x32def8, _0x204a92), base = Math.atan2(_0x204a92, _0x32def8),
        delta = _0x44a608 / radius * Math.ccw(points[0], points[1], points[2]);
    if (!delta) throw "invalid data";
    this.circle = {x: x, y: y, radius: radius};
    this.angle = {base: base, delta: delta};
    let _0x378de4 = _0x44a608 / Curve.PRECISION;
    this.path = [];
    for (let i = 0; i <= _0x378de4; i++) {
        this.path[i] = this.pointAt(i / _0x378de4);
    }
    Curve.call(this);
}

CircumscribedCircle.prototype = Object.create(Curve.prototype);
CircumscribedCircle.prototype.constructor = CircumscribedCircle;
CircumscribedCircle.prototype.pointAt = function (_0x3b28a9) {
    var _0x4e0e3b = this.angle.base + this.angle.delta * _0x3b28a9;
    return new Point(this.circle.x + Math.cos(_0x4e0e3b) * this.circle.radius, this.circle.y + Math.sin(_0x4e0e3b) * this.circle.radius);
};
