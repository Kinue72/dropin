function Slider(_0x482691, _0x3f5815) {
    HitCircle.call(this, _0x482691, _0x3f5815);
    let _0x46dcd3 = _0x482691[5].split("|"), _0x43297c = _0x46dcd3[0];
    _0x46dcd3[0] = this.position;
    for (let i = 1; i < _0x46dcd3.length; i++) {
        _0x46dcd3[i] = new Point(_0x46dcd3[i].split(":"));
    }
    this.repeat = _0x482691[6] | 0;
    this.pixelLength = +_0x482691[7];
    var _0x1365a9 = this.beatmap.timingPointAt(this.time).beatLength * (this.pixelLength / this.beatmap.SliderMultiplier) / 100;
    this.endTime += _0x1365a9 * this.repeat;
    this.duration = this.endTime - this.time;
    this.curve = Curve.parse(_0x43297c, _0x46dcd3, this.pixelLength);
    this.endPosition = this.curve.pointAt(1);
}

Slider.prototype = Object.create(HitCircle.prototype);
Slider.prototype.constructor = Slider;
Slider.ID = 2;
Standard.prototype.hitObjectTypes[Slider.ID] = Slider;
Slider.FADE_IN_TIME = 375;
Slider.FADE_OUT_TIME = 200;
Slider.REVERSE_ARROW = String.fromCharCode(10132);
Slider.OPACITY = .66;
Slider.prototype.draw = function (_0x4577e6, _0xf5d555) {
    var _0x254a67 = this.time - _0x4577e6, _0x13ac7b = 1;
    if (_0x254a67 >= 0)
        _0x13ac7b = (this.beatmap.approachTime - _0x254a67) / Slider.FADE_IN_TIME;
    else
        _0x4577e6 > this.endTime && (_0x13ac7b = 1 - (_0x4577e6 - this.endTime) / Slider.FADE_OUT_TIME);
    _0xf5d555.globalAlpha = Math.max(0, Math.min(_0x13ac7b, 1));
    this.drawPath(_0xf5d555);
    this.drawCircle(this.position, _0xf5d555);
    var _0x48ac6b = -_0x254a67 * this.repeat / this.duration;
    if (this.repeat > 1 && _0x48ac6b + 1 <= (this.repeat & -2))
        this.drawText(this.endPosition, Slider.REVERSE_ARROW, this.curve.endAngle, _0xf5d555);
    if (_0x254a67 >= 0)
        this.drawApproach(_0x254a67, _0xf5d555);
    else if (_0x4577e6 < this.endTime)
        this.drawFollowCircle(_0x48ac6b, _0xf5d555);
}
Slider.prototype.drawPath = function (_0x385b6b) {
    _0x385b6b.save();
    _0x385b6b.globalAlpha *= Slider.OPACITY;
    _0x385b6b.beginPath();
    _0x385b6b.moveTo(this.position.x - this.stack * this.beatmap.stackOffset, this.position.y - this.stack * this.beatmap.stackOffset);
    for (var i = 1; i < this.curve.path.length; i++) {
        _0x385b6b.lineTo(this.curve.path[i].x - this.stack * this.beatmap.stackOffset, this.curve.path[i].y - this.stack * this.beatmap.stackOffset);
    }
    _0x385b6b.shadowBlur = 0;
    _0x385b6b.strokeStyle = this.color;
    _0x385b6b.lineWidth = (this.beatmap.circleRadius - this.beatmap.circleBorder) * 2;
    _0x385b6b.stroke();
    _0x385b6b.globalCompositeOperation = "destination-over";
    _0x385b6b.shadowBlur = 0;
    _0x385b6b.strokeStyle = "#fff";
    _0x385b6b.lineWidth = this.beatmap.circleRadius * 2;
    _0x385b6b.stroke();
    _0x385b6b.restore();
};
Slider.prototype.drawFollowCircle = function (_0x40514b, _0x3062e8) {
    _0x40514b %= 2;
    _0x40514b > 1 && (_0x40514b = 2 - _0x40514b);
    var _0x45df6a = this.curve.pointAt(_0x40514b);
    _0x3062e8.beginPath();
    _0x3062e8.arc(_0x45df6a.x - this.stack * this.beatmap.stackOffset, _0x45df6a.y - this.stack * this.beatmap.stackOffset, this.beatmap.circleRadius - this.beatmap.circleBorder / 2, -Math.PI, Math.PI);
    _0x3062e8.shadowBlur = this.beatmap.shadowBlur;
    _0x3062e8.strokeStyle = "#fff";
    _0x3062e8.lineWidth = this.beatmap.circleBorder;
    _0x3062e8.stroke();
};
