function TimingPoint(data) {
    let split = data.split(",");
    if (split.length < 2) throw "invalid data";
    this.time = split[0] | 0;
    this.beatLength = +split[1];
    this.meter = split[2] | 0 || 4;
    if (this.beatLength >= 0) TimingPoint.parent = this; else {
        this.parent = TimingPoint.parent;
        let _0x5d6ab7 = -100 / this.beatLength;
        this.beatLength = this.parent.beatLength / _0x5d6ab7;
        this.meter = this.parent.meter;
    }
}

Object.defineProperties(TimingPoint.prototype, {
    bpm: {
        get: function () {
            return 60000 / this.beatLength;
        }
    }
});
