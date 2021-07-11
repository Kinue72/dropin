function CentripetalCatmullRom(data) {
    if (data.length !== 4) throw "invalid data";
    this.points = data;
    let tmp = 0;
    for (let i = 1; i < 4; i++) {
        tmp += this.points[i].distanceTo(this.points[i - 1]);
    }
    CurveType.call(this, tmp / 2);
}

CentripetalCatmullRom.prototype = Object.create(CurveType.prototype);
CentripetalCatmullRom.prototype.constructor = CentripetalCatmullRom;
CentripetalCatmullRom.prototype.pointAt = function (idx) {
    let lerp = Math.lerp(1, 2, idx);
    let point = this.points[0].clone().scale(1 - lerp).translate(this.points[1].clone().scale(lerp)),
        point1 = this.points[1].clone().scale(2 - lerp).translate(this.points[2].clone().scale(lerp - 1)),
        point2 = this.points[2].clone().scale(3 - lerp).translate(this.points[3].clone().scale(lerp - 2)),
        point3 = point.clone().scale(2 - lerp).translate(point1.clone().scale(lerp)),
        point4 = point1.clone().scale(3 - lerp).translate(point2.clone().scale(lerp - 1));
    return point3.clone().scale(2 - lerp).translate(point4.clone().scale(lerp - 1)).scale(.5);
};
