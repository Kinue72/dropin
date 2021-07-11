function LinearBezier(_0x4f243b, _0x4b4626, _0x2e9bc6) {
    let _0xcead4b = [], _0x49a388 = [], _0x19b8ab;
    for (let i = 0; i < _0x4f243b.length; i++) {
        let _0x2efbfc = _0x4f243b[i];
        if (_0x2e9bc6) {
            if (typeof _0x19b8ab != "undefined") {
                _0x49a388.push(_0x2efbfc), _0xcead4b.push(new Bezier2(_0x49a388)), _0x49a388 = []
            }
        } else {
            if (_0x2efbfc.equalTo(_0x19b8ab)) {
                try {
                    _0xcead4b.push(new Bezier2(_0x49a388));
                } catch (e) {
                }
                _0x49a388 = [];
            }
        }
        _0x49a388.push(_0x2efbfc), _0x19b8ab = _0x2efbfc;
    }
    try {
        _0xcead4b.push(new Bezier2(_0x49a388));
    } catch (e) {
    }
    EqualDistanceMultiCurve.call(this, _0xcead4b, _0x4b4626);
}

LinearBezier.prototype = Object.create(EqualDistanceMultiCurve.prototype);
LinearBezier.prototype.constructor = LinearBezier;
