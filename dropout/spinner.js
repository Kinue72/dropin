function Spinner(_0x4fb51e, _0x293692) {
    HitCircle.call(this, _0x4fb51e, _0x293692), this.endTime = _0x4fb51e[5] | 0;
    this.duration = this.endTime - this.time;
}

Spinner.prototype = Object.create(HitCircle.prototype);
Spinner.prototype.constructor = Spinner;
Spinner.ID = 8;
Standard.prototype.hitObjectTypes[Spinner.ID] = Spinner;
Spinner.FADE_IN_TIME = 500;
Spinner.FADE_OUT_TIME = 200;
Spinner.RADIUS = Beatmap.MAX_Y / 2;
Spinner.BORDER_WIDTH = Spinner.RADIUS / 20;
Spinner.prototype.draw = function (_0x3e28b0, _0x325a15) {
    var _0x1411ae = this.time - _0x3e28b0, _0x4f4c58 = 1;
    if (_0x1411ae >= 0)
        _0x4f4c58 = (this.beatmap.approachTime - _0x1411ae) / Spinner.FADE_IN_TIME;
    else
        _0x3e28b0 > this.endTime && (_0x4f4c58 = 1 - (_0x3e28b0 - this.endTime) / Spinner.FADE_OUT_TIME);
    _0x325a15.globalAlpha = Math.max(0, Math.min(_0x4f4c58, 1));
    _0x325a15.save();
    _0x325a15.beginPath();
    _0x325a15.arc(this.position.x, this.position.y, Spinner.RADIUS - Spinner.BORDER_WIDTH / 2, -Math.PI, Math.PI);
    _0x325a15.globalCompositeOperation = "destination-over";
    _0x325a15.shadowBlur = 0;
    _0x325a15.fillStyle = "rgba(0,0,0,.4)";
    _0x325a15.fill();
    _0x325a15.shadowBlur = Spinner.BORDER_WIDTH;
    _0x325a15.strokeStyle = "#fff";
    _0x325a15.lineWidth = Spinner.BORDER_WIDTH;
    _0x325a15.stroke();
    _0x325a15.restore();
    if (_0x1411ae < 0 && _0x3e28b0 <= this.endTime) {
        var _0x5cb9d8 = 1 + _0x1411ae / this.duration;
        _0x325a15.beginPath();
        _0x325a15.arc(this.position.x, this.position.y, (Spinner.RADIUS - Spinner.BORDER_WIDTH / 2) * _0x5cb9d8, -Math.PI, Math.PI);
        _0x325a15.shadowBlur = 3;
        _0x325a15.strokeStyle = "#fff";
        _0x325a15.lineWidth = Spinner.BORDER_WIDTH / 2 * _0x5cb9d8;
        _0x325a15.stroke();
    }
};
