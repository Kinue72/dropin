let oldpath = [];

class EditorCanvas {
    constructor() {
        this.w = 512;
        this.h = 384;
        this.okRadius = 30;
        this.ww = 512;
        this.wh = 384;
        this.wx = windowWidth / 2 - this.ww / 2;
        this.wy = windowHeight / 2 - this.wh / 2;
        this.resizeDisplay();
        this.cursor = {start: 0, end: 0, range: 1300};
        this.wcursor = 0;
        this.brush = 40;
        this.newbrush = 40;
        this.mouse = {x: 0, y: 0};
        this.mode = "brush";
        this.init();
    }

    init() {
        this.pg = createGraphics(this.w, this.h);
    }

    calculateVirtualMouse() {
        let point = {x: 0, y: 0};
        point.x = 512 * ((mouseX - this.display.x) / this.display.w);
        point.y = 384 * ((mouseY - this.display.y) / this.display.h);
        return point;
    }

    resizeDisplay() {
        this.display = {x: this.wx, y: this.wy, w: this.ww, h: this.wh};
    }

    drawPath() {
        this.pg.push();
        this.pg.rectMode(CENTER);
        if (this.mode === "advanced" && this.closestPoint) {
            this.pg.push();
            this.pg.fill("red");
            this.pg.noStroke();
            this.pg.rect(this.closestPoint.x, this.closestPoint.y, 5);
            this.pg.pop()
        }
        let point1, point2, _0x2cb400 = Infinity, point3;
        for (let i = 1; i < path.length; i++) {
            const last = path[i - 1], current = path[i];
            if (last.gametime >= this.cursor.start) {
                this.pg.stroke(180);
                this.pg.strokeWeight(2);
                if (last.buttons.k1)
                    this.pg.stroke("#BB6BD9");
                if (last.buttons.k2)
                    this.pg.stroke("#F2994A");
                if (last.buttons.k1 && last.buttons.k2)
                    this.pg.stroke("red");
                this.pg.line(last.x, last.y, current.x, current.y);
                let distance = dist(last.x, last.y, this.mouse.x, this.mouse.y);
                if (distance < _0x2cb400) {
                    _0x2cb400 = distance;
                    point3 = last;
                }
                if (last.keypoint) {
                    this.pg.noStroke();
                    this.pg.fill("purple");
                    this.pg.circle(last.x, last.y, 5)
                }
                if (this.wcursor >= last.gametime && this.wcursor <= current.gametime && !point1) {
                    point1 = last;
                    point2 = current
                }
            }
            if (last.gametime > this.cursor.end) break;
        }
        this.closestPoint = point3;
        if (point1) this.drawCursor(point1, point2, "SQUARE");
        this.pg.pop();
    }

    drawPathMin() {
        this.pg.push();
        let point1, ponit2;
        for (let i = 1; i < path.length; i++) {
            const last = path[i - 1], current = path[i];
            if (last.gametime >= this.cursor.start && this.wcursor >= last.gametime && this.wcursor <= current.gametime && !point1) {
                point1 = last;
                ponit2 = current;
            }
            if (last.gametime > this.cursor.end) break;
        }
        if (point1)
            this.drawCursor(point1, ponit2, "NORMAL");
        this.pg.pop();
    }

    drawCursor(point1, point2, type) {
        this.pg.push();
        this.pg.rectMode(CENTER);
        this.pg.fill("blue");
        this.pg.noStroke();
        let diffPoint = point2.gametime - point1.gametime, diffCursor = this.wcursor - point1.gametime,
            scale = diffCursor / diffPoint, tmp = {
                x: point1.x + (point2.x - point1.x) * scale,
                y: point1.y + (point2.y - point1.y) * scale
            };
        if (type === "SQUARE") {
            this.pg.push();
            this.pg.translate(tmp.x, tmp.y);
            this.pg.rotate(Math.atan2(point2.y - point1.y, point2.x - point1.x) - PI / 2);
            this.pg.triangle(-3, 0, 0, 10, 3, 0), this.pg.pop()
        } else {
            this.pg.fill("orange");
            this.pg.circle(tmp.x, tmp.y, 20), this.pg.fill("white");
            this.pg.circle(tmp.x, tmp.y, 15)
        }
        this.pg.pop();
    }

    renderBrush() {
        this.pg.push();
        this.pg.noFill();
        if (mouseIsPressed && mouseButton === 2) {
            this.newmouse = this.calculateVirtualMouse();
            this.newbrush = this.brush + (this.newmouse.x - this.mouse.x);
            this.pg.stroke("red");
            this.pg.circle(this.mouse.x, this.mouse.y, this.newbrush);
        } else {
            this.brush = this.newbrush;
            this.mouse = this.calculateVirtualMouse();
            this.pg.stroke(64);
            this.pg.circle(this.mouse.x, this.mouse.y, this.brush);
        }
        this.pg.pop();
    }

    renderBrushFix() {
        this.pg.push();
        this.pg.noFill();
        if (mouseIsPressed && mouseButton === 2) {
            this.pg.stroke("red");
            this.pg.circle(this.mouse.x, this.mouse.y, this.newbrush);
        } else {
            this.brush = this.newbrush;
            this.pg.stroke("white");
            this.pg.circle(this.mouse.x, this.mouse.y, this.brush);
        }
        this.pg.pop();
    }

    render() {
        if (playing) {
            this.pg.erase(90, 90);
            this.pg.rect(0, 0, this.pg.width, this.pg.height);
            this.pg.noErase();
            editor.cursor_shift(audio.currentTime * 1000 - this.cursor.range / 2);
            this.drawPathMin();
        } else {
            audio.currentTime = (this.cursor.start + this.cursor.range / 2) / 1000;
            this.pg.clear();
            this.drawPath();
            if (this.mode === "brush") {
                if (mouseY > 40 && mouseY < windowHeight - 100) this.renderBrush();
            } else {
                if (this.mode === "advanced") this.mouse = this.calculateVirtualMouse();
                else if (this.mode === "fixing")
                    this.renderBrushFix();
            }
            this.modarr && this.editPath(), this.parseKeys();
        }
        push();
        noFill();
        pop();
    }

    parseKeys() {
        if (keyIsDown(81) && this.cursor.range - 7 > 400) {
            this.cursor.range -= 7;
            this.cursor.start += 3.5;
            this.cursor_shift(this.cursor.start);
        }
        if (keyIsDown(69) && this.cursor.range + 7 < 1300) {
            this.cursor.range += 7;
            this.cursor.start -= 3.5;
            this.cursor_shift(this.cursor.start)
        }
        if (!keyIsDown(17)) {
            if (keyIsDown(37))
                this.cursor_shift_by(-4)
            if (keyIsDown(39))
                this.cursor_shift_by(4)
        }
    }

    editPath() {
        this.modarr.forEach(mod => {
            path[mod.n].x = mod.start_POINT.x + (this.mouse.x - mod.start_mouse.x) * mod.rate;
            path[mod.n].y = mod.start_POINT.y + (this.mouse.y - mod.start_mouse.y) * mod.rate;
        });
    }

    draw() {
        this.render();
        this.drawUR();
        image(this.pg, this.display.x, this.display.y, this.display.w, this.display.h);
        if (preview && preview.beatmap && mapImage) {
            push();
            textFont(roboto);
            textAlign(LEFT, CENTER);
            fill(colors.text);
            textSize(22);
            stroke(colors.text);
            strokeWeight(1);
            text(preview.beatmap.Artist + " - " + preview.beatmap.Title, 185, 65);
            pop()
        }
        if (preview) preview.at(this.wcursor);
    }

    cursor_shift(start) {
        this.cursor.start = start;
        this.cursor.end = start + this.cursor.range;
        this.wcursor = (this.cursor.start + this.cursor.end) / 2;
        timeline.redraw();
        lower_timeline.redraw();
    }

    cursor_shift_by(offset) {
        this.cursor.start += offset;
        this.cursor.end = this.cursor.start + this.cursor.range;
        this.wcursor = (this.cursor.start + this.cursor.end) / 2, timeline.redraw();
        lower_timeline.redraw();
    }

    zoomTowards(scale) {
        let x = (mouseX - this.wx) / this.ww, y = (mouseY - this.wy) / this.wh;
        if (this.ww - scale > 300) {
            this.ww -= scale;
            this.wh = this.ww / 1.33
        }
        this.wx = mouseX + -this.ww * x;
        this.wy = mouseY + -this.wh * y;
        this.resizeDisplay();
    }

    parseBrush() {
        this.modarr = [];
        if (this.mode === "brush") {
            if (mouseY > 64 && mouseY < windowHeight - 100)
                for (let i = 1; i < path.length; i++) {
                    const last = path[i - 1], current = path[i];
                    if (last.gametime >= this.cursor.start && dist(last.x, last.y, this.mouse.x, this.mouse.y) <= this.brush / 2) {
                        this.modarr.push({
                            n: i - 1,
                            start_mouse: {x: this.mouse.x, y: this.mouse.y},
                            start_POINT: {x: last.x, y: last.y},
                            rate: 1 - dist(this.mouse.x, this.mouse.y, last.x, last.y) / (this.brush / 2)
                        });
                    }

                    if (last.gametime > this.cursor.end) break;
                }
        } else {
            if (this.mode === "advanced") {
                if (mouseY > 64 && mouseY < windowHeight - 100) {
                    let _0x4bfc45, _0x46a08b, _0x4dc8dd, _0xaffd03, _0x1bee5e, array = [];
                    for (let i = 1; i < path.length; i++) {
                        const last = path[i - 1], current = path[i];
                        if (last.gametime >= this.cursor.start && last.keypoint)
                            array.push({obj: last, index: i});
                        if (last.gametime > this.cursor.end)
                            break;
                    }
                    if (array.length >= 3) {
                        let _0x51d83e = {dist: Infinity, obj: undefined, index: 0};
                        array.forEach((_0x115d65, _0x4ae6fc) => {
                            let _0x396f25 = dist(_0x115d65.obj.x, _0x115d65.obj.y, this.mouse.x, this.mouse.y);
                            if (_0x396f25 < _0x51d83e.dist) {
                                _0x51d83e.dist = _0x396f25;
                                _0x51d83e.obj = _0x115d65;
                                _0x51d83e.index = _0x4ae6fc
                            }
                        });
                        _0x46a08b = array[_0x51d83e.index];
                        _0x4bfc45 = array[_0x51d83e.index - 1];
                        _0x4dc8dd = array[_0x51d83e.index + 1];
                        if (_0x4bfc45 && _0x46a08b && _0x4dc8dd) {
                            _0xaffd03 = dist(_0x46a08b.obj.x, _0x46a08b.obj.y, _0x4bfc45.obj.x, _0x4bfc45.obj.y);
                            _0x1bee5e = dist(_0x46a08b.obj.x, _0x46a08b.obj.y, _0x4dc8dd.obj.x, _0x4dc8dd.obj.y);
                            for (let i = _0x46a08b.index; i < _0x4dc8dd.index; i++) {
                                let _0x4ebef1 = path[i];
                                this.modarr.push({
                                    n: i,
                                    start_mouse: {x: this.mouse.x, y: this.mouse.y},
                                    start_POINT: {x: _0x4ebef1.x, y: _0x4ebef1.y},
                                    rate: 1 - dist(this.mouse.x, this.mouse.y, _0x4ebef1.x, _0x4ebef1.y) / _0x1bee5e
                                });
                            }
                            console.log(this.modarr);
                            for (let i = _0x4bfc45.index; i < _0x46a08b.index; i++) {
                                let _0x48b3b1 = path[i];
                                this.modarr.push({
                                    n: i,
                                    start_mouse: {x: this.mouse.x, y: this.mouse.y},
                                    start_POINT: {x: _0x48b3b1.x, y: _0x48b3b1.y},
                                    rate: 1 - dist(this.mouse.x, this.mouse.y, _0x48b3b1.x, _0x48b3b1.y) / _0xaffd03
                                });
                            }
                        }
                    }
                }
            }
        }
    }

    parseKeyPress() {
        //todo broken af
        if (keyIsDown(17)) {
            if (keyIsDown(37))
                for (let i = path.length - 1; i > 0; i--) {
                    let last = path[i - 1], current = path[i];
                    if (last.gametime < this.wcursor && (current.buttons.k1 || current.buttons.k2)) {
                        if (current.buttons.k1 && !last.buttons.k1) {
                            this.cursor_shift(last.gametime - this.cursor.range / 2);
                            break;
                        }
                        if (current.buttons.k2 && !last.buttons.k2) {
                            this.cursor_shift(last.gametime - this.cursor.range / 2);
                            break;
                        }
                    }
                }
            if (keyIsDown(39))
                for (let i = 1; i < path.length; i++) {
                    const last = path[i - 1], current = path[i];
                    if (last.gametime > this.wcursor && (current.buttons.k1 || current.buttons.k2)) {
                        if (current.buttons.k1 && !last.buttons.k1) {
                            this.cursor_shift(last.gametime - this.cursor.range / 2);
                            break;
                        }
                        if (current.buttons.k2 && !last.buttons.k2) {
                            this.cursor_shift(last.gametime - this.cursor.range / 2);
                            break;
                        }
                    }
                }
        }
    }

    parseRelease() {
        this.modarr = undefined;
    }

    drawUR() {
        let blue = timeline.ranges.blue, green = timeline.ranges.green, yellow = timeline.ranges.yellow;
        push();
        //let pos = {x: windowWidth / 2, y: windowHeight - 30 - lower_timeline.active * 100};
        let pos = {x: windowWidth / 2, y: 60};
        strokeWeight(16);
        strokeCap(SQUARE);
        stroke("#dcad46");
        line(windowWidth / 2 - yellow, pos.y, windowWidth / 2 + yellow, pos.y);
        stroke("#57e213");
        line(windowWidth / 2 - green, pos.y, windowWidth / 2 + green, pos.y);
        stroke("#39c6f2");
        line(windowWidth / 2 - blue, pos.y, windowWidth / 2 + blue, pos.y);
        stroke("white");
        strokeWeight(2);
        if (timeline.hits) {
            for (let i = 0; i < timeline.hits.length; i++) {
                const hit = timeline.hits[i];
                if (hit.time < this.wcursor) {
                    drawingContext.globalAlpha = constrain(700 / Math.abs(hit.time - this.wcursor), 0, 1);
                    line(pos.x - hit.pressRange, pos.y - 15, pos.x - hit.pressRange, pos.y + 15);
                } else break;
            }
            for (let i = 0; i < timeline.hits.length; i++) {
                const hit = timeline.hits[i];
                if (hit.selected) {
                    stroke("blue");
                    line(pos.x - hit.pressRange, pos.y - 15, pos.x - hit.pressRange, pos.y + 15)
                }
            }
        }
        pop();
    }

    selectPress() {
        if (timeline.hits)
            for (let i = 0; i < timeline.hits.length; i++) {
                const hit = timeline.hits[i];
                if (hit.time > this.cursor.start && hit.time < this.cursor.end) {
                    if (dist(hit.position.x, hit.position.y, this.mouse.x, this.mouse.y) < preview.beatmap.circleRadius)
                        hit.selected = !hit.selected;
                    if (hit.selected)
                        hit.color = "rgb(0,0,100)";
                    timeline.analyze()
                }
                if (hit.time > this.cursor.end) break;
            }
    }

    ctrlz() {
        console.log("undo");
        if (oldpath.length > 0) {
            path = JSON.parse(oldpath[oldpath.length - 1]);
            timeline.analyze();
            oldpath.pop()
        }
    }

    create_key_point() {
        this.mode = "advanced";
        this.closestPoint.keypoint = true;
    }

    kill_keypoints() {
        for (let i = 1; i < path.length; i++) {
            const last = path[i - 1], current = path[i];
            last.keypoint = false;
            this.mode = "brush";
        }
    }

    fixBrush() {
        if (this.mode === "fixing") {
            this.kill_keypoints();
            this.mode = "brush"
        } else
            this.mode = "fixing"
    }
}

let editor;

function createEditor() {
    editor = new EditorCanvas;
}
