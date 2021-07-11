function Drumroll(a, b) {
    Slider.call(this, a, b);
}

Drumroll.prototype = Object.create(Slider.prototype, {});
Drumroll.prototype.constructor = Drumroll;
Drumroll.ID = 2;
Taiko.prototype.hitObjectTypes[Drumroll.ID] = Drumroll;
Drumroll.prototype.draw = function (_0x558bb4, _0x146de1) {
    let width = Taiko.DIAMETER, _0x52accd = 3;
    _0x146de1.beginPath();
    _0x146de1.moveTo(this.beatmap.calcX(this.position.x, _0x558bb4), 0);
    _0x146de1.lineTo(this.beatmap.calcX(this.endPosition.x, _0x558bb4), 0);
    _0x146de1.strokeStyle = "#333";
    _0x146de1.lineWidth = width;
    _0x146de1.stroke();
    _0x146de1.strokeStyle = Taiko.DEFAULT_COLORS[2];
    _0x146de1.lineWidth = width - _0x52accd;
    _0x146de1.stroke();
    _0x146de1.beginPath();
    _0x146de1.arc(this.beatmap.calcX(this.position.x, _0x558bb4), 0, width / 2 - _0x52accd / 2, -Math.PI, Math.PI);
    _0x146de1.fillStyle = Taiko.DEFAULT_COLORS[2];
    _0x146de1.fill();
    _0x146de1.strokeStyle = "#fff";
    _0x146de1.lineWidth = _0x52accd;
    _0x146de1.stroke();
};
