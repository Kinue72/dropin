function EqualDistanceMultiCurve(_0x56bdd5, _0x36a157) {
    let _0x249c7a = _0x36a157 / Curve.PRECISION | 0;
    this.path = [];
    let _0x4a651c = 0, _0x4f8151 = 0, _0x7457d3 = _0x56bdd5[_0x4f8151], _0x8121e9 = 0, _0x3bb8d5 = _0x7457d3.path[0],
        _0x44d992 = 0;
    for (let i = 0; i <= _0x249c7a; i++) {
        let _0xaf17d7 = i * _0x36a157 / _0x249c7a | 0;
        while (_0x4a651c < _0xaf17d7) {
            _0x44d992 = _0x4a651c;
            _0x3bb8d5 = _0x7457d3.path[_0x8121e9];
            if (++_0x8121e9 >= _0x7457d3.path.length) {
                if (_0x4f8151 + 1 < _0x56bdd5.length) {
                    _0x7457d3 = _0x56bdd5[++_0x4f8151];
                    _0x8121e9 = 0;
                } else {
                    _0x8121e9 = _0x7457d3.path.length - 1;
                    if (_0x44d992 === _0x4a651c) break;
                }
            }
            _0x4a651c += _0x7457d3.distance[_0x8121e9];
        }
        let _0x2260c2 = _0x7457d3.path[_0x8121e9];
        if (_0x4a651c - _0x44d992 > 1)
            this.path[i] = Math.lerp(_0x3bb8d5, _0x2260c2, (_0xaf17d7 - _0x44d992) / (_0x4a651c - _0x44d992));
        else
            this.path[i] = _0x2260c2;
    }
    Curve.call(this);
}

EqualDistanceMultiCurve.prototype = Object.create(Curve.prototype);
EqualDistanceMultiCurve.prototype.constructor = EqualDistanceMultiCurve;
EqualDistanceMultiCurve.prototype.pointAt = function (idx) {
    let _0x196866 = this.path.length * idx, _0x24a248 = _0x196866 | 0;
    return _0x24a248 + 1 < this.path.length ? Math.lerp(this.path[_0x24a248], this.path[_0x24a248 + 1], _0x196866 - _0x24a248) : this.path[this.path.length - 1];
};
