function Standard(_0x52a147) {
    Beatmap.call(this, _0x52a147);
    this.Colors.length ? this.Colors.push(this.Colors.shift()) : this.Colors = Standard.DEFAULT_COLORS;
    var _0x29d365 = 1, _0x4cee7b = -1, _0x56c2d5 = 1;
    for (var _0x58af58 = 0; _0x58af58 < this.HitObjects.length; _0x58af58++) {
        var _0x5637d0 = this.HitObjects[_0x58af58];
        if (_0x5637d0 instanceof Spinner) _0x56c2d5 = 1; else (_0x5637d0.newCombo || _0x56c2d5) && (_0x29d365 = 1, _0x4cee7b = (_0x4cee7b + 1 + _0x5637d0.comboSkip) % this.Colors.length, _0x56c2d5 = 0);
        _0x5637d0.combo = _0x29d365++, _0x5637d0.color = "rgb(0,0,0)";
    }
    for (var _0x58af58 = this.HitObjects.length - 1; _0x58af58 > 0; _0x58af58--) {
        var _0x5637d0 = this.HitObjects[_0x58af58];
        if (_0x5637d0.stack != 0 || _0x5637d0 instanceof Spinner) continue;
        for (var _0x5739d7 = _0x58af58 - 1; _0x5739d7 >= 0; _0x5739d7--) {
            var _0x4aaf6a = this.HitObjects[_0x5739d7];
            if (_0x4aaf6a instanceof Spinner) continue;
            if (_0x5637d0.time - _0x4aaf6a.endTime > this.approachTime * this.StackLeniency) break;
            if (_0x5637d0.position.distanceTo(_0x4aaf6a.endPosition) < Standard.STACK_LENIENCE) {
                if (_0x4aaf6a instanceof Slider) {
                    var _0x194bb0 = _0x5637d0.stack - _0x4aaf6a.stack + 1;
                    for (var _0x3c99ac = _0x5739d7 + 1; _0x3c99ac <= _0x58af58; _0x3c99ac++) {
                        var _0x1d3873 = this.HitObjects[_0x3c99ac];
                        _0x1d3873.position.distanceTo(_0x4aaf6a.endPosition) < Standard.STACK_LENIENCE && (_0x1d3873.stack -= _0x194bb0);
                    }
                    break;
                }
                _0x4aaf6a.stack = _0x5637d0.stack + 1, _0x5637d0 = _0x4aaf6a;
            }
        }
    }
    this.circleRadius = this.circleDiameter / 2, this.circleBorder = this.circleRadius / 8, this.shadowBlur = this.circleRadius / 15;
}

Standard.prototype = Object.create(Beatmap.prototype, {
    approachTime: {
        get: function () {
            return this.ApproachRate < 5 ? 1800 - this.ApproachRate * 120 : 1200 - (this.ApproachRate - 5) * 150;
        }
    }, circleDiameter: {
        get: function () {
            return 108.848 - this.CircleSize * 8.9646;
        }
    }, stackOffset: {
        get: function () {
            return this.circleDiameter / 20;
        }
    }
}), Standard.prototype.constructor = Standard, Standard.prototype.hitObjectTypes = {}, Standard.ID = 0, Beatmap.modes[Standard.ID] = Standard, Standard.DEFAULT_COLORS = ["rgb(0,202,0)", "rgb(18,124,255)", "rgb(242,24,57)", "rgb(255,292,0)"], Standard.STACK_LENIENCE = 3, Standard.prototype.update = function (_0x403d9e) {
    _0x403d9e.shadowColor = "#666", _0x403d9e.lineCap = "round", _0x403d9e.lineJoin = "round";
    try {
        _0x403d9e.font = this.circleRadius + 'px "Comic Sans MS", cursive, sans-serif';
    } catch (_0x1a9c0c) {
    }
    _0x403d9e.textAlign = "center", _0x403d9e.textBaseline = "middle", _0x403d9e.translate((Beatmap.WIDTH - Beatmap.MAX_X) / 2, (Beatmap.HEIGHT - Beatmap.MAX_Y) / 2);
}, Standard.prototype.draw = function (_0x23d40e, _0x292927) {
    typeof this.tmp.first == "undefined" && (this.tmp.first = 0, this.tmp.last = -1);
    while (this.tmp.first < this.HitObjects.length) {
        var _0x34111c = this.HitObjects[this.tmp.first];
        if (_0x23d40e <= _0x34111c.endTime + _0x34111c.__proto__.constructor.FADE_OUT_TIME) break;
        this.tmp.first++;
    }
    while (this.tmp.last + 1 < this.HitObjects.length && _0x23d40e >= this.HitObjects[this.tmp.last + 1].time - this.approachTime) {
        this.tmp.last++;
    }
    for (var _0x5211f5 = this.tmp.last; _0x5211f5 >= this.tmp.first; _0x5211f5--) {
        var _0x34111c = this.HitObjects[_0x5211f5];
        if (_0x23d40e > _0x34111c.endTime + _0x34111c.__proto__.constructor.FADE_OUT_TIME) continue;
        _0x34111c.draw(_0x23d40e, _0x292927);
    }
};
