function Scroll(_0x8f856f) {
    Beatmap.call(this, _0x8f856f), this.scrollAtTimingPointIndex = [0];
    var timing = this.timingPointIndexAt(0), _0x374334 = this.TimingPoints[timing],
        _0x26a354 = this.TimingPoints[0], _0x57dcc4 = _0x26a354.beatLength / _0x374334.beatLength;
    this.scrollAtTimingPointIndex[timing] = _0x374334.time * _0x57dcc4;
    while (++timing < this.TimingPoints.length) {
        let _0x197ad2 = this.TimingPoints[timing];
        this.scrollAtTimingPointIndex[timing] = (_0x197ad2.time - _0x374334.time) * _0x57dcc4 + this.scrollAtTimingPointIndex[timing - 1];
        _0x374334 = _0x197ad2;
        _0x57dcc4 = _0x26a354.beatLength / _0x374334.beatLength;
    }
    this.barLines = [];
    var _0x267506 = (this.HitObjects.length ? this.HitObjects[this.HitObjects.length - 1].endTime : 0) + 1;
    for (var i = 0; i < this.TimingPoints.length; i++) {
        var _0x374334 = this.TimingPoints[i], _0x26a354 = _0x374334.parent || _0x374334,
            _0x206ac9 = _0x26a354.beatLength * _0x26a354.meter, _0x197ad2 = this.TimingPoints[i + 1],
            _0x11b6b1 = _0x197ad2 ? (_0x197ad2.parent || _0x197ad2).time : _0x267506;
        for (let j = _0x26a354.time; j < _0x11b6b1; j += _0x206ac9) {
            this.barLines.push(this.scrollAt(j));
        }
    }
}

Scroll.prototype = Object.create(Beatmap.prototype), Scroll.prototype.constructor = Scroll, Scroll.prototype.scrollAt = function (_0x3f1e80) {
    let _0x5cc90b = this.timingPointIndexAt(_0x3f1e80), _0xad0425 = this.TimingPoints[_0x5cc90b],
        _0x2ed681 = this.TimingPoints[0], _0x4a72d7 = _0x2ed681.beatLength / _0xad0425.beatLength;
    return (_0x3f1e80 - _0xad0425.time) * _0x4a72d7 + this.scrollAtTimingPointIndex[_0x5cc90b];
};
