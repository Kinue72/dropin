function Taiko(_0x2a063c) {
    Scroll.call(this, _0x2a063c);
    for (let i = 0; i < this.HitObjects.length; i++) {
        let object = this.HitObjects[i];
        object.position.x = this.scrollAt(object.time);
        object.endPosition.x = this.scrollAt(object.endTime);
    }
}

Taiko.prototype = Object.create(Scroll.prototype, {});
Taiko.prototype.constructor = Taiko;
Taiko.prototype.hitObjectTypes = {};
Taiko.ID = 1;
Beatmap.modes[Taiko.ID] = Taiko;
Taiko.DEFAULT_COLORS = ["#eb452c", "#438eac", "#fcb806"];
Taiko.DIAMETER = 56;
Taiko.prototype.calcX = function (_0x523a6c, _0x14b385) {
    return (_0x523a6c - _0x14b385) * 20 * 260 / 1e3 / (this.SliderMultiplier * 8);
};
Taiko.prototype.update = function (elem) {
    elem.shadowColor = "#666";
    elem.lineCap = "round";
    elem.lineJoin = "round";
    elem.textAlign = "center";
    elem.textBaseline = "middle";
    elem.translate(160, 200);
};
Taiko.prototype.draw = function (time, _0x341dc2) {
    if (typeof this.tmp.first === "undefined") {
        this.tmp.first = 0;
        this.tmp.last = -1;
        this.tmp.barLine = 0
    }
    let pos = this.scrollAt(time);
    while (this.tmp.first < this.HitObjects.length && time > this.HitObjects[this.tmp.first].endTime) {
        this.tmp.first++;
    }
    while (this.tmp.last + 1 < this.HitObjects.length) {
        let obj = this.HitObjects[this.tmp.last + 1];
        if (this.calcX(obj.position.x, pos) > Beatmap.WIDTH) break;
        this.tmp.last++;
    }
    while (this.tmp.barLine < this.barLines.length && this.calcX(this.barLines[this.tmp.barLine], pos) < -Taiko.DIAMETER) {
        this.tmp.barLine++;
    }
    for (var i = this.tmp.barLine; i < this.barLines.length && this.calcX(this.barLines[i], pos) < Beatmap.WIDTH; i++) {
        let x = this.calcX(this.barLines[i], pos);
        _0x341dc2.beginPath();
        _0x341dc2.moveTo(x, -Taiko.DIAMETER);
        _0x341dc2.lineTo(x, Taiko.DIAMETER);
        _0x341dc2.strokeStyle = "#fff";
        _0x341dc2.lineWidth = 1;
        _0x341dc2.stroke();
    }
    for (var i = this.tmp.last; i >= this.tmp.first; i--) {
        var obj = this.HitObjects[i];
        if (time > obj.endTime) continue;
        obj.draw(pos, _0x341dc2);
    }
    _0x341dc2.clearRect(-160, -200, Taiko.DIAMETER * 2, 400);
};
Taiko.prototype.processBG = function (_0x49a3f5) {
    var _0x325cd1 = 200 - Taiko.DIAMETER;
    _0x49a3f5.drawImage(_0x49a3f5.canvas, 0, _0x325cd1, _0x49a3f5.canvas.width, _0x49a3f5.canvas.height);
    _0x49a3f5.beginPath();
    _0x49a3f5.rect(0, 0, Beatmap.WIDTH, _0x325cd1);
    _0x49a3f5.fillStyle = "#000";
    _0x49a3f5.fill();
    _0x49a3f5.beginPath();
    _0x49a3f5.rect(0, _0x325cd1, Beatmap.WIDTH, Taiko.DIAMETER * 2);
    _0x49a3f5.strokeStyle = "#ddd";
    _0x49a3f5.lineWidth = 8;
    _0x49a3f5.stroke();
    _0x49a3f5.fillStyle = "#000";
    _0x49a3f5.fill();
    _0x49a3f5.beginPath();
    _0x49a3f5.rect(0, _0x325cd1, Taiko.DIAMETER * 2, Taiko.DIAMETER * 2);
    _0x49a3f5.fillStyle = "#ff0080";
    _0x49a3f5.fill();
    var _0x3a3d63 = 6;
    _0x49a3f5.beginPath();
    _0x49a3f5.arc(160, 200, Taiko.DIAMETER / 2, -Math.PI, Math.PI);
    _0x49a3f5.fillStyle = "rgba(255,255,255,.2)";
    _0x49a3f5.fill();
    _0x49a3f5.strokeStyle = "rgba(255,255,255,.2)";
    _0x49a3f5.lineWidth = _0x3a3d63;
    _0x49a3f5.stroke();
};
