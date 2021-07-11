function Bezier2(array) {
    if (array.length < 2) throw "invalid data";
    this.points = array;
    let tmp = 0;
    for (let i = 1; i < this.points.length; i++) {
        tmp += this.points[i].distanceTo(this.points[i - 1]);
    }
    CurveType.call(this, tmp);
}

Bezier2.prototype = Object.create(CurveType.prototype);
Bezier2.prototype.constructor = Bezier2;
Bezier2.prototype.pointAt = function (idx) {
    let total = this.points.length - 1, point = new Point, tmp1 = 1;
    for (let i = 0; i <= total; i++) {
        let tmp = tmp1 * Math.pow(idx, i) * Math.pow(1 - idx, total - i);
        point.x += this.points[i].x * tmp;
        point.y += this.points[i].y * tmp;
        tmp1 = tmp1 * (total - i) / (i + 1);
    }
    return point;
};
