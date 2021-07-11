function HoldNote(_0x7a46a5, _0x1d5440) {
    HitNote.call(this, _0x7a46a5, _0x1d5440);
    this.endTime = _0x7a46a5[5].split(":")[0] | 0;
}

HoldNote.prototype = Object.create(HitNote.prototype);
HoldNote.prototype.constructor = HoldNote;
HoldNote.ID = 128;
Mania.prototype.hitObjectTypes[HoldNote.ID] = HoldNote;
HoldNote.WIDTH_SCALE = 0.8;
HoldNote.OPACITY = 0.66;
HoldNote.prototype.draw = function (_0xdcc45e, _0x359eb7) {
    let _0x1a4f95 = this.beatmap.calcY(this.position.y, _0xdcc45e) - Mania.COLUMN_WIDTH / 3,
        _0x52e533 = this.beatmap.calcY(this.endPosition.y, _0xdcc45e) - Mania.COLUMN_WIDTH / 3,
        _0x2c0be2 = Mania.COLUMN_WIDTH * HoldNote.WIDTH_SCALE;
    _0x359eb7.globalAlpha = HoldNote.OPACITY;
    _0x359eb7.beginPath();
    _0x359eb7.rect(this.position.x + (Mania.COLUMN_WIDTH - _0x2c0be2) / 2, _0x52e533, _0x2c0be2, _0x1a4f95 - _0x52e533);
    _0x359eb7.fillStyle = this.color;
    _0x359eb7.fill();
    _0x359eb7.globalAlpha = 1;
    _0x359eb7.beginPath();
    _0x359eb7.rect(this.position.x, _0x1a4f95, Mania.COLUMN_WIDTH, Mania.COLUMN_WIDTH / 3);
    _0x359eb7.fill();
    _0x359eb7.strokeStyle = "#ccc";
    _0x359eb7.lineWidth = 1;
    _0x359eb7.stroke();
    _0x359eb7.beginPath();
    _0x359eb7.rect(this.position.x, _0x52e533, Mania.COLUMN_WIDTH, Mania.COLUMN_WIDTH / 3);
    _0x359eb7.fill();
    _0x359eb7.stroke();
};
