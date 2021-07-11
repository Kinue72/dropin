function DonKat(a, b) {
    HitCircle.call(this, a, b);
}

DonKat.prototype = Object.create(HitCircle.prototype, {
    don: {
        get: function () {
            return !this.kai | 0;
        }
    }, kai: {
        get: function () {
            return (this.hitSound & 10) !== 0 | 0;
        }
    }, dai: {
        get: function () {
            return this.hitSound & 4;
        }
    }
});
DonKat.prototype.constructor = DonKat;
DonKat.ID = 1;
Taiko.prototype.hitObjectTypes[DonKat.ID] = DonKat;
DonKat.prototype.draw = function (_0x17b7b8, _0x20ff5b) {
    let _0x1b91c2 = Taiko.DIAMETER * (this.dai ? 1.5 : 1), width = 3;
    _0x20ff5b.beginPath();
    _0x20ff5b.arc(this.beatmap.calcX(this.position.x, _0x17b7b8), 0, _0x1b91c2 / 2 - width / 2, -Math.PI, Math.PI);
    _0x20ff5b.fillStyle = Taiko.DEFAULT_COLORS[this.kai];
    _0x20ff5b.fill();
    _0x20ff5b.strokeStyle = "#fff";
    _0x20ff5b.lineWidth = width;
    _0x20ff5b.stroke();
};
