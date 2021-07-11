function Mania(_0xb9dd58) {
    Scroll.call(this, _0xb9dd58);
    this.scrollSpeed = Mania.SCROLL_SPEED;
    for (let i = 0; i < this.keyCount; i++) {
        this.Colors[i] = Mania.DEFAULT_COLORS[i & 1];
    }
    let _0x52bf26 = this.keyCount / 2;
    if (this.keyCount & 1)
        this.Colors[_0x52bf26 | 0] = Mania.DEFAULT_COLORS[2];
    else
        this.Colors = this.Colors.slice(0, _0x52bf26).concat(this.Colors.slice(_0x52bf26 - 1));
    for (let i = 0; i < this.HitObjects.length; i++) {
        let obj = this.HitObjects[i];
        obj.color = this.Colors[obj.column];
        obj.position.x = Mania.COLUMN_WIDTH * obj.column;
        obj.position.y = this.scrollAt(obj.time);
        obj.endPosition.y = this.scrollAt(obj.endTime);
    }
}

Mania.prototype = Object.create(Scroll.prototype, {
    keyCount: {
        get: function () {
            return this.CircleSize;
        }
    }, columnSize: {
        get: function () {
            return Beatmap.MAX_X / this.keyCount;
        }
    }
});
Mania.prototype.constructor = Mania;
Mania.prototype.hitObjectTypes = {};
Mania.ID = 3;
Beatmap.modes[Mania.ID] = Mania;
Mania.DEFAULT_COLORS = ["#5bf", "#ccc", "#da2"];
Mania.COLUMN_START = 130;
Mania.HIT_POSITION = 400;
Mania.COLUMN_WIDTH = 30;
Mania.SCROLL_SPEED = 20;
Mania.prototype.calcY = function (_0x3f9f25, _0x28728d) {
    return Mania.HIT_POSITION - (_0x3f9f25 - _0x28728d) * this.scrollSpeed * .035;
};
Mania.prototype.update = function (_0x42e0e0) {
    _0x42e0e0.translate(Mania.COLUMN_START, 0);
};
Mania.prototype.draw = function (idx, _0x5e27e8) {
    typeof this.tmp.first == "undefined" && (this.tmp.first = 0, this.tmp.last = -1, this.tmp.barLine = 0);
    let _0x4ae0f8 = this.scrollAt(idx);
    while (this.tmp.first < this.HitObjects.length && idx > this.HitObjects[this.tmp.first].endTime) {
        this.tmp.first++;
    }
    while (this.tmp.last + 1 < this.HitObjects.length) {
        let _0x27cb35 = this.HitObjects[this.tmp.last + 1];
        if (this.calcY(_0x27cb35.position.y, _0x4ae0f8) < -Mania.COLUMN_WIDTH) break;
        this.tmp.last++;
    }
    while (this.tmp.barLine < this.barLines.length && this.calcY(this.barLines[this.tmp.barLine], _0x4ae0f8) > Beatmap.MAX_Y) {
        this.tmp.barLine++;
    }
    for (let i = this.tmp.barLine; i < this.barLines.length && this.calcY(this.barLines[i], _0x4ae0f8) > -Mania.COLUMN_WIDTH; i++) {
        let _0x30e92a = this.calcY(this.barLines[i], _0x4ae0f8);
        _0x5e27e8.beginPath();
        _0x5e27e8.moveTo(0, _0x30e92a);
        _0x5e27e8.lineTo(Mania.COLUMN_WIDTH * this.keyCount, _0x30e92a);
        _0x5e27e8.strokeStyle = "#fff";
        _0x5e27e8.lineWidth = 1;
        _0x5e27e8.stroke();
    }
    for (let i = this.tmp.first; i <= this.tmp.last; i++) {
        let obj = this.HitObjects[i];
        if (idx > obj.endTime) continue;
        obj.draw(_0x4ae0f8, _0x5e27e8);
    }
    _0x5e27e8.clearRect(0, Mania.HIT_POSITION, Beatmap.WIDTH, Beatmap.HEIGHT - Mania.HIT_POSITION);
};
Mania.prototype.processBG = function (render) {
    render.beginPath();
    render.rect(Mania.COLUMN_START, 0, Mania.COLUMN_WIDTH * this.keyCount, Beatmap.HEIGHT);
    render.strokeStyle = "#ddd";
    render.lineWidth = 8;
    render.stroke();
    render.fillStyle = "#000";
    render.fill();
    for (let i = 0; i < this.keyCount; i++) {
        let _0x627f3a = Mania.COLUMN_START + Mania.COLUMN_WIDTH * i;
        render.beginPath();
        render.moveTo(_0x627f3a, 0);
        render.lineTo(_0x627f3a, Mania.HIT_POSITION);
        render.strokeStyle = "#fff";
        render.lineWidth = 1;
        render.stroke();
        render.beginPath();
        render.rect(_0x627f3a, Mania.HIT_POSITION, Mania.COLUMN_WIDTH, Beatmap.HEIGHT - Mania.HIT_POSITION);
        render.fillStyle = this.Colors[i];
        render.fill();
        render.strokeStyle = "#fff";
        render.lineWidth = 3;
        render.stroke();
    }
    let _0x627f3a = Mania.COLUMN_START + Mania.COLUMN_WIDTH * this.keyCount;
    render.beginPath();
    render.moveTo(_0x627f3a, 0);
    render.lineTo(_0x627f3a, Mania.HIT_POSITION);
    render.strokeStyle = "#fff";
    render.lineWidth = 1;
    render.stroke();
    render.beginPath();
    render.rect(Mania.COLUMN_START, Mania.HIT_POSITION, Mania.COLUMN_WIDTH * this.keyCount, Mania.COLUMN_WIDTH / 3);
    render.strokeStyle = "#fff";
    render.lineWidth = 2;
    render.stroke();
    render.fillStyle = "#568";
    render.fill();
};
