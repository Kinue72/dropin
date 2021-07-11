let lower_timeline;
function createLowerTimeline() {
    lower_timeline = new LowerTimeline;
}
class LowerTimeline {
    constructor() {
        this.pg = createGraphics(windowWidth, 350);
        this.redraw();
        this.active = true;
    }
    redraw() {
        this.pg.background(colors.lower.back);
        let keys = {k1: false, k2: false}, frames = [];
        this.pg.push();
        this.pg.noStroke();
        this.pg.fill(colors.lower.zones);
        this.pg.rect(40, 30, width - 80, 45, 15);
        this.pg.rect(40, 105, width - 80, 45, 15);
        this.pg.pop();
        this.pg.push();
        for (let i = 1; i < path.length; i++) {
            if (path[i].gametime > editor.cursor.start) {
                let _0x48ff55 = (path[i].gametime - editor.cursor.start) / (editor.cursor.end - editor.cursor.start), _0x3cd733 = _0x48ff55 * windowWidth;
                if (path[i].isSlice) {
                    this.pg.push();
                    this.pg.stroke("red");
                    this.pg.strokeWeight(3);
                    this.pg.line(_0x3cd733, windowHeight - 100, _0x3cd733, windowHeight);
                    this.pg.pop()
                }
                let last = path[i - 1], current = path[i];
                if (last.buttons.k1 && !keys.k1)
                    keys.k1 = last.gametime;
                if (!last.buttons.k1 && keys.k1) {
                    frames.push({start: keys.k1, end: last.gametime, type: "k1"});
                    keys.k1 = false;
                }
                if (last.buttons.k2 && !keys.k2)
                    keys.k2 = last.gametime;
                if (!last.buttons.k2 && keys.k2) {
                    frames.push({start: keys.k2, end: last.gametime, type: "k2"});
                    keys.k2 = false;
                }
            }
            if (path[i].gametime > editor.cursor.end) break;
        }
        if (keys.k1) {
            frames.push({start: keys.k1, end: editor.cursor.end, type: "k1"});
            keys.k1 = false;
        }
        if (keys.k2) {
            frames.push({start: keys.k2, end: editor.cursor.end, type: "k2"});
            keys.k2 = false;
        }
        this.pg.noStroke();
        if (timeline.hits)
            for (let i = 0; i < timeline.hits.length; i++) {
            const obj = timeline.hits[i];
            if (obj.time > editor.cursor.start) {
                let _0x5ba99f = (obj.time - editor.cursor.start) / (editor.cursor.end - editor.cursor.start), _0x81afea = _0x5ba99f * windowWidth;
                this.pg.push();
                this.pg.drawingContext.globalAlpha = .95;
                this.pg.fill(colors.lower.normalclicks);
                if (obj.bad === true)
                this.pg.fill(colors.reds);
                if (obj.selected) {
                    this.pg.stroke("blue");
                    this.pg.strokeWeight(3);
                }
                if (obj.bad === "100")
                    this.pg.fill(colors.greens);
                if (obj.bad === "50")
                     this.pg.fill(colors.yellows);
                let _0x3baa7a = 86;
                if (obj.duration) {
                    let _0x1f3f82 = (obj.time + obj.duration - editor.cursor.start) / (editor.cursor.end - editor.cursor.start), _0x1c43a1 = _0x1f3f82 * windowWidth;
                    this.pg.rect(_0x81afea, _0x3baa7a, _0x1c43a1 - _0x81afea, 10, 9);
                } else
                    this.pg.rect(_0x81afea, _0x3baa7a, 10, 10, 9);
                this.pg.pop();
            }
            if (obj.time > editor.cursor.end) break;
        }
        frames.forEach(frame => {
            if (!frame.end)
                frame.end = 25;
            let _0x149833 = (frame.start - editor.cursor.start) / (editor.cursor.end - editor.cursor.start), _0xa64424 = _0x149833 * windowWidth, _0x2b30fc = (frame.end - editor.cursor.start) / (editor.cursor.end - editor.cursor.start), _0xa3d566 = _0x2b30fc * windowWidth;
            if (frame.type === "k1") {
                this.pg.fill("#BB6BD9");
                this.pg.rect(_0xa64424, 36, _0xa3d566 - _0xa64424, 32, 5);
            }
            if (frame.type === "k2") {
                this.pg.fill("#F2994A");
                this.pg.rect(_0xa64424, 111, _0xa3d566 - _0xa64424, 32, 5);
            }
        });
            this.pg.pop();
            this.pg.push();
            this.pg.strokeJoin(ROUND);
            this.pg.fill(colors.lower.tri);
            this.pg.strokeWeight(2.5);
            this.pg.stroke(colors.lower.tri);
            this.pg.triangle(width / 2 - 6, 10, width / 2 + 6, 10, width / 2, 20);
            this.pg.line(windowWidth / 2, 30, windowWidth / 2, 148);
            this.pg.pop();
    }
    drawSlices() {
        push();
        stroke("rgba(255,255,255,0.6)");
        strokeWeight(1);
        for (let i = 1; i < path.length; i++) {
            if (path[i].gametime > editor.cursor.start) {
                if (path[i].isSlice) {
                    let _0x5c1c5e = (path[i].gametime - editor.cursor.start) / (editor.cursor.end - editor.cursor.start), _0x2f7108 = _0x5c1c5e * windowWidth;
                    line(_0x2f7108, windowHeight - 100, _0x2f7108, windowHeight);
                }
            }
            if (path[i].gametime > editor.cursor.end) break;
        }
        pop();
    }
    draw() {
        if (this.active) {
            if (this.drawIn) {
                this.add();
                this.redraw();
            }
            push();
            drawingContext.shadowBlur = 11;
            drawingContext.shadowColor = "rgba(0,0,0,0.20)";
            image(this.pg, 0, windowHeight - 172);
            pop();
            this.drawSlices()
        }
    }
    drawSlicerPointer() {
        if (this.active) {
            //k1
            if (mouseY > windowHeight - 142 && mouseY < windowHeight - 98) {
                push();
                strokeWeight(1);
                stroke("red");
                line(mouseX, windowHeight - 142, mouseX, windowHeight - 98);
                pop();
            }
            //k2
            if (mouseY > windowHeight - 66 && mouseY < windowHeight - 23) {
                push();
                strokeWeight(1);
                stroke("red");
                line(mouseX, windowHeight - 66, mouseX, windowHeight - 23);
                pop();
            }
        }
    }
    add() {
        if (mouseY > windowHeight - 86) {
            let _0x32915d = mouseX / windowWidth, _0x3ff971 = editor.cursor.start + _0x32915d * (editor.cursor.end - editor.cursor.start), _0x4b4461 = Infinity, _0x5a759d;
            for (let i = 0; i < path.length; i++) {
                const obj = path[i];
                if (Math.abs(_0x3ff971 - obj.gametime) < _0x4b4461) {
                    _0x4b4461 = Math.abs(_0x3ff971 - obj.gametime);
                    _0x5a759d = obj;
                }
            }
            _0x5a759d.buttons.k2 = mouseButton === 0;
        } else {
            let _0x3fcff1 = mouseX / windowWidth, _0x2fead9 = editor.cursor.start + _0x3fcff1 * (editor.cursor.end - editor.cursor.start), _0x2e3f81 = Infinity, _0x389245;
            for (let i = 0; i < path.length; i++) {
                const obj = path[i];
                if (Math.abs(_0x2fead9 - obj.gametime) < _0x2e3f81) {
                    _0x2e3f81 = Math.abs(_0x2fead9 - obj.gametime);
                    _0x389245 = obj;
                }
            }
            _0x389245.buttons.k1 = mouseButton === 0;
        }
    }
    parsePress(_0x18d69f) {
        if (this.active && mouseY > windowHeight - 172)
            this.drawIn = true;
    }
    parseRelease() {
        this.drawIn = false;
    }
    slice() {
        if (mouseY > windowHeight - 100) {
            let _0xd86458 = mouseX / windowWidth, _0x3e7e2d = editor.cursor.start + _0xd86458 * (editor.cursor.end - editor.cursor.start);
            for (let i = 0; i < path.length; i++) {
                const obj = path[i];
                if (obj.gametime > _0x3e7e2d) {
                    const _0x486c8d = path[i - 1];
                    let frame = JSON.parse(JSON.stringify(_0x486c8d)), _0x55dadf = obj.gametime - _0x486c8d.gametime, _0x1235f2 = (_0x3e7e2d - _0x486c8d.gametime) / _0x55dadf;
                    frame.gametime = _0x1235f2 * _0x55dadf + _0x486c8d.gametime;
                    let _0x34bcb9 = obj.gametime - _0x486c8d.gametime, _0x35b909 = frame.gametime - _0x486c8d.gametime, _0x3c0c59 = _0x35b909 / _0x34bcb9, _0x265649 = {x: _0x486c8d.x + (obj.x - _0x486c8d.x) * _0x3c0c59, y: _0x486c8d.y + (obj.y - _0x486c8d.y) * _0x3c0c59};
                    frame.x = _0x265649.x;
                    frame.y = _0x265649.y;
                    frame.isSlice = true;
                    frame.timestamp = Math.round(obj.timestamp * _0x3c0c59);
                    console.log(frame.timestamp);
                    obj.timestamp = obj.timestamp - frame.timestamp;
                    frame.gametime = _0x486c8d.gametime + frame.timestamp;
                    path = [...path.slice(0, i), frame, ...path.slice(i, path.length)];
                    break;
                }
            }
        }
    }
}
