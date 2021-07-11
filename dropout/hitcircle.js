function HitCircle(a, b) {
    HitObject.call(this, a, b);
    this.stack = 0;
}

HitCircle.prototype = Object.create(HitObject.prototype, {
    newCombo: {
        get: function () {
            return this.flag & 4;
        }
    }, comboSkip: {
        get: function () {
            return this.flag >> 4;
        }
    }
});
HitCircle.prototype.constructor = HitCircle;
HitCircle.ID = 1;
Standard.prototype.hitObjectTypes[HitCircle.ID] = HitCircle;
HitCircle.FADE_IN_TIME = 375;
HitCircle.FADE_OUT_TIME = 200;
HitCircle.prototype.draw = function (_0x4a77c4, _0x1dda20) {
    let _0xa62357 = this.time - _0x4a77c4, _0x56d797 = 1;
    if (_0xa62357 >= 0)
        _0x56d797 = (this.beatmap.approachTime - _0xa62357) / HitCircle.FADE_IN_TIME;
    else
        _0x56d797 = 1 + _0xa62357 / HitCircle.FADE_OUT_TIME;
    _0x1dda20.globalAlpha = Math.max(0, Math.min(_0x56d797, 1));
    this.drawCircle(this.position, _0x1dda20);
    if (_0xa62357 >= 0)
        this.drawApproach(_0xa62357, _0x1dda20)
};
HitCircle.prototype.drawCircle = function (_0x4e8ff9, render) {
    render.beginPath();
    render.arc(_0x4e8ff9.x - this.stack * this.beatmap.stackOffset, _0x4e8ff9.y - this.stack * this.beatmap.stackOffset, this.beatmap.circleRadius - this.beatmap.circleBorder / 2, -Math.PI, Math.PI);
    render.shadowBlur = 0;
    render.fillStyle = this.color;
    render.fill();
    render.shadowBlur = this.beatmap.shadowBlur;
    render.strokeStyle = this.strokeStyle;
    render.lineWidth = this.beatmap.circleBorder;
    render.stroke();
};
HitCircle.prototype.drawText = function (_0x499d6a, _0x7a0529, _0x48b510, render) {
    render.shadowBlur = this.beatmap.shadowBlur;
    render.fillStyle = "#fff";
    render.save();
    render.translate(_0x499d6a.x - this.stack * this.beatmap.stackOffset, _0x499d6a.y - this.stack * this.beatmap.stackOffset);
    render.rotate(_0x48b510);
    render.fillText(_0x7a0529, 0, 0);
    render.restore();
};
HitCircle.prototype.drawApproach = function (_0x5138b3, render) {
    let _0xc906ac = 1 + _0x5138b3 / this.beatmap.approachTime * 3;
    render.beginPath();
    render.arc(this.position.x - this.stack * this.beatmap.stackOffset, this.position.y - this.stack * this.beatmap.stackOffset, this.beatmap.circleRadius * _0xc906ac - this.beatmap.circleBorder / 2, -Math.PI, Math.PI);
    render.shadowBlur = 0;
    render.strokeStyle = this.color;
    render.lineWidth = this.beatmap.circleBorder / 2 * _0xc906ac;
    render.stroke();
};
