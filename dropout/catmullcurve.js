function CatmullCurve(p0, p1) {
    let list = [], list1 = [];
    !p0[0].equalTo(p0[1]) && list1.push(p0[0]);
    for (let i = 0; i < p0.length; i++) {
        list1.push(p0[i]);
        try {
            list.push(new CentripetalCatmullRom(list1)), list1.shift();
        } catch (e) {
        }
    }
    let tmp = p0.slice(-2);
    !tmp[1].equalTo(tmp[0]) && list1.push(tmp[1]);
    try {
        list.push(new CentripetalCatmullRom(list1));
    } catch (e) {
    }
    EqualDistanceMultiCurve.call(this, list, p1);
}

CatmullCurve.prototype = Object.create(EqualDistanceMultiCurve.prototype);
CatmullCurve.prototype.constructor = CatmullCurve;
