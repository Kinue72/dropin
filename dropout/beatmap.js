function Beatmap(map) {
    this.tmp = {};
    this.StackLeniency = 0.7;
    this.Title = "";
    this.TitleUnicode = undefined;
    this.Artist = "";
    this.ArtistUnicode = undefined;
    this.Creator = "";
    this.Version = undefined;
    this.CircleSize = 1;
    this.OverallDifficulty = 5;
    this.ApproachRate = undefined;
    this.SliderMultiplier = 1.4;
    this.TimingPoints = [];
    this.Colors = [];
    this.HitObjects = [];
    let array = map.replace(/\r\n?/g, "\n").split("\n").reverse(), type, path;
    while (typeof (path = array.pop()) !== "undefined") {
        if (/^\/\//.test(path)) continue;
        if (/^\[/.test(path)) {
            type = path.slice(1, path.indexOf("]"));
            continue;
        }
        switch (type) {
            case "General":
            case "Metadata":
            case "Difficulty": {
                let split1 = path.split(":"), shift = split1.shift(), join = split1.join(":");
                if (shift in this)
                    this[shift] = parseFloat(join) == join ? +join : join
                break;
            }
            case "TimingPoints": {
                try {
                    this.TimingPoints.push(new TimingPoint(path));
                } catch (e) {
                }
                break;
            }
            case "Colours": {
                var split = path.split(":");
                /^Combo\d+/.test(split[0]) && this.Colors.push("rgb(" + split[1] + ")");
                break;
            }
            case "HitObjects": {
                try {
                    this.HitObjects.push(HitObject.parse(path, this));
                } catch (e) {
                }
                break;
            }
        }
    }
}

Object.defineProperties(Beatmap.prototype, {
    Version: {
        get: function () {
            return typeof this._Version == "undefined" || /^$/.test(this._Version) ? "Normal" : this._Version;
        }, set: function (ver) {
            this._Version = ver;
        }
    }, ApproachRate: {
        get: function () {
            return typeof this._ApproachRate == "undefined" ? this.OverallDifficulty : this._ApproachRate;
        }, set: function (ar) {
            this._ApproachRate = ar;
        }
    }, hitObjectTypeMask: {
        get: function () {
            return typeof this._hitObjectTypeMask == "undefined" && (this._hitObjectTypeMask = Object.keys(this.hitObjectTypes).reduce(function (_0x165438, _0x2bfe62) {
                return _0x165438 | _0x2bfe62;
            })), this._hitObjectTypeMask;
        }
    }
});
Beatmap.prototype.hitObjectTypes = undefined;
Beatmap.prototype.update = undefined;
Beatmap.prototype.draw = undefined;
Beatmap.prototype.processBG = undefined;
Beatmap.WIDTH = 0;
Beatmap.HEIGHT = 0;
Beatmap.MAX_X = 0;
Beatmap.MAX_Y = 0;
Beatmap.modes = {};
Beatmap.parse = function (map) {
    if (!/^osu/.test(map)) throw "target is not a beatmap file";
    let mode = +(map.match(/[\r\n]Mode.*?:(.*?)[\r\n]/) || [])[1];
    if (!(mode in Beatmap.modes)) throw "we do not support this beatmap mode";
    return new Beatmap.modes[mode](map);
};
Beatmap.prototype.timingPointIndexAt = function (idx) {
    let i = 0, total = this.TimingPoints.length - 1;
    while (i <= total) {
        let tmp = (i + total) / 2 | 0;
        if (idx >= this.TimingPoints[tmp].time) {
            if (tmp + 1 === this.TimingPoints.length || idx < this.TimingPoints[tmp + 1].time) return tmp;
            i = tmp + 1;
        } else total = tmp - 1;
    }
    return 0;
};
Beatmap.prototype.timingPointAt = function (_0x5749d2) {
    return this.TimingPoints[this.timingPointIndexAt(_0x5749d2)];
};
Beatmap.prototype.refresh = function () {
    this.tmp = {};
};
Beatmap.prototype.toString = function () {
    let isUnicode = JSON.parse(localStorage.osu_tool || '{"unicode":false}').unicode;
    return [(isUnicode ? [this.ArtistUnicode || this.Artist, this.TitleUnicode || this.Title] : [this.Artist, this.Title]).join(" - "), " (", this.Creator, ")", " [", this.Version || "Normal", "]"].join("");
};
