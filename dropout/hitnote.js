function HitNote(_0x343a56, _0x57bc66) {
    HitObject.call(this, _0x343a56, _0x57bc66);
    this.column = Math.max(1, Math.min(this.position.x / this.beatmap.columnSize + 1 | 0, this.beatmap.keyCount)) - 1;
}

HitNote.prototype = Object.create(HitObject.prototype);
HitNote.prototype.constructor = HitNote;
HitNote.ID = 1;
Mania.prototype.hitObjectTypes[HitNote.ID] = HitNote;
HitNote.prototype.draw = function (_0x608040, _0x321ff2) {
    _0x321ff2.beginPath();
    _0x321ff2.rect(this.position.x, this.beatmap.calcY(this.position.y, _0x608040) - Mania.COLUMN_WIDTH / 3, Mania.COLUMN_WIDTH, Mania.COLUMN_WIDTH / 3);
    _0x321ff2.fillStyle = this.color;
    _0x321ff2.fill();
    _0x321ff2.strokeStyle = "#ccc";
    _0x321ff2.lineWidth = 1;
    _0x321ff2.stroke();
};
