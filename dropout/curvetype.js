function CurveType(_0x406fed) {
    let _0x25a949 = (_0x406fed / 4 | 0) + 1;
    this.path = [];
    for (let i = 0; i <= _0x25a949; i++) {
        this.path[i] = this.pointAt(i / _0x25a949);
    }
    this.distance = [0];
    for (let i = 1; i <= _0x25a949; i++) {
        this.distance[i] = this.path[i].distanceTo(this.path[i - 1]);
    }
}

CurveType.prototype.pointAt = undefined;
