function Shaker(_0x31e9f4, _0x3d2c07) {
    Spinner.call(this, _0x31e9f4, _0x3d2c07);
}

Shaker.prototype = Object.create(Spinner.prototype, {});
Shaker.prototype.constructor = Shaker;
Shaker.ID = 8;
Taiko.prototype.hitObjectTypes[Shaker.ID] = Shaker;
Shaker.prototype.draw = function (_0x29a124, _0x2b29b4) {
    let _0x174273 = this.beatmap.calcX(this.position.x, _0x29a124);
    if (_0x174273 > 0) {
        var _0x1e8bf6 = Taiko.DIAMETER * 1.5, _0x2e96ba = 3;
        _0x2b29b4.beginPath();
        _0x2b29b4.arc(this.beatmap.calcX(this.position.x, _0x29a124), 0, _0x1e8bf6 / 2 - _0x2e96ba / 2, -Math.PI, Math.PI);
        _0x2b29b4.fillStyle = Taiko.DEFAULT_COLORS[2];
        _0x2b29b4.fill();
        _0x2b29b4.strokeStyle = "#fff";
        _0x2b29b4.lineWidth = _0x2e96ba;
        _0x2b29b4.stroke();
    } else {
        _0x2b29b4.save();
        _0x2b29b4.setTransform(1, 0, 0, 1, 0, 0);
        _0x2b29b4.translate(Beatmap.WIDTH / 2, Beatmap.HEIGHT / 2);
        _0x2b29b4.beginPath();
        _0x2b29b4.arc(0, 0, Spinner.RADIUS - Spinner.BORDER_WIDTH / 2, -Math.PI, Math.PI);
        _0x2b29b4.globalCompositeOperation = "destination-over";
        _0x2b29b4.shadowBlur = 0;
        _0x2b29b4.fillStyle = "rgba(0,0,0,.4)";
        _0x2b29b4.fill();
        _0x2b29b4.shadowBlur = Spinner.BORDER_WIDTH;
        _0x2b29b4.strokeStyle = "#fff";
        _0x2b29b4.lineWidth = Spinner.BORDER_WIDTH;
        _0x2b29b4.stroke();
        if (_0x174273 < 0 && _0x29a124 <= this.endPosition.x) {
            var _0x597e2f = 1 + _0x174273 / this.beatmap.calcX(this.endPosition.x, this.position.x);
            _0x2b29b4.beginPath();
            _0x2b29b4.arc(0, 0, (Spinner.RADIUS - Spinner.BORDER_WIDTH / 2) * _0x597e2f, -Math.PI, Math.PI);
            _0x2b29b4.globalCompositeOperation = "source-over";
            _0x2b29b4.shadowBlur = 3;
            _0x2b29b4.strokeStyle = "#fff";
            _0x2b29b4.lineWidth = Spinner.BORDER_WIDTH / 2 * _0x597e2f;
            _0x2b29b4.stroke();
        }
        _0x2b29b4.restore();
    }
};
