function HitObject(point, _0x16a025) {
    this.beatmap = _0x16a025;
    this.position = new Point(point);
    this.endPosition = this.position.clone();
    this.time = point[2] | 0;
    this.endTime = this.time;
    this.flag = point[3] | 0;
    this.hitSound = point[4] | 0;
}

HitObject.prototype.draw = undefined;
HitObject.parse = function (data, map) {
    let split = data.split(",");
    if (split.length < 5) throw "invalid data";
    let idx = split[3] & map.hitObjectTypeMask;
    if (!(idx in map.hitObjectTypes)) return new HitObject(split, map);
    return new map.hitObjectTypes[idx](split, map);
};
