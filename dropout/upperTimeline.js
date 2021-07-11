//todo fix scorev1
let timeline;

function pad(number, length) {
    number = number.toString();
    while (number.length < length) number = "0" + number;
    return number;
}

function createTimeline() {
    timeline = new Timeline;
}

class Timeline {
    constructor() {
        this.pg = createGraphics(windowWidth, 70);
        this.safeAnalyze = false;
        this.redraw();
        this.inpress = false;
        this.ranges = {blue: 20, green: 20, yellow: 50};
        this.scorev2 = true;
    }

    determineRange(range) {
        this.ranges.blue = (159 - 12 * preview.beatmap.OverallDifficulty) / 2;
        this.ranges.green = (279 - 16 * preview.beatmap.OverallDifficulty) / 2;
        this.ranges.yellow = (399 - 20 * preview.beatmap.OverallDifficulty) / 2;
        if (range <= this.ranges.blue) return "300";
        if (range <= this.ranges.green) return "100";
        if (range <= this.ranges.yellow) return "50";
        return false;
    }

    parsePress() {
        if (mouseY > height - 270 && mouseY < height - 270 + 62)
            this.inpress = true;
    }

    parseRelease() {
        this.inpress = false;
    }

    draw() {
        push();
        drawingContext.shadowBlur = 11;
        drawingContext.shadowColor = "rgba(0,0,0,0.20)";
        image(this.pg, 0, height - 270);
        pop();
        if (this.inpress) {
            let _0x226138 = (mouseX - 60) / (windowWidth - 120);
            editor.cursor_shift(_0x226138 * duration - editor.cursor.range / 2), this.redraw();
            lower_timeline.redraw();
        }
    }

    timeToX(time) {
        return (windowWidth - 120) * (time / duration) + 60;
    }

    redraw() {
        if (this.safeAnalyze) this.analyze();
        this.pg.fill(colors.upper.back);
        this.pg.clear();
        this.pg.noStroke();
        this.pg.rect(35, 0, width - 70, 70, 12);
        this.pg.push();
        this.pg.strokeWeight(3);
        this.pg.stroke(colors.upper.line);
        this.pg.line(60, 18, width - 60, 18);
        this.pg.pop();
        this.pg.fill(colors.upper.text);
        this.pg.stroke(colors.upper.text);
        this.pg.strokeWeight(1);
        this.pg.textAlign(CENTER);
        this.pg.textSize(17);
        this.pg.textFont(roboto);
        let start_sec = pad(Math.round(editor.wcursor / 1e3) % 59, 2),
            start_min = pad(Math.round(editor.wcursor / 6e4) % 59, 2),
            end_sec = pad(Math.round(path[path.length - 2].gametime / 1000) % 59, 2),
            end_min = pad(Math.round(path[path.length - 2].gametime / 60000) % 59, 2), accuracy = 0;
        if (this.hit_data)
            accuracy = (this.hit_data.blue + this.hit_data.green + this.hit_data.yellow + this.hit_data.red) / this.hit_data.total
        this.pg.text(`${start_min}:${start_sec} / ${end_min}:${end_sec}    Accuracy: ${Math.round(accuracy * 1e4) / 100}%     x${this.current_combo}`, width / 2, 55);

        if (this.pressPoints) {
            this.pg.stroke("black");
            this.pg.strokeWeight(3);
            this.hit_data = {
                total: 0, blue: 0, green: 0, yellow: 0, red: 0
            };
            this.hits.forEach(obj => {
                //not sure why if (obj.bad) not work
                if (obj.bad === true) {
                    this.pg.stroke(colors.reds);
                    let pos = this.timeToX(obj.time);
                    this.pg.line(pos, 10, pos, 30);
                    this.hit_data.red += 0;
                }
                if (obj.typeof === "HitCircle" || obj.typeof === "Slider") {
                    this.hit_data.total += 300;
                    if (obj.bad === "100") {
                        if (obj.typeof === "Slider") {
                            if (this.scorev2) {
                                this.pg.stroke(colors.greens);
                                let posX = this.timeToX(obj.time);
                                this.pg.line(posX, 10, posX, 30);
                                this.hit_data.green += 100;
                            } else
                                this.hit_data.green += 300;
                        }
                        if (obj.typeof === "HitCircle") {
                            this.pg.stroke(colors.greens);
                            let posX = this.timeToX(obj.time);
                            this.pg.line(posX, 10, posX, 30);
                            this.hit_data.green += 100;
                        }
                    }
                    if (obj.bad === "50") {
                        if (obj.typeof === "Slider") {
                            if (this.scorev2) {
                                this.pg.stroke(colors.yellows);
                                let posX = this.timeToX(obj.time);
                                this.pg.line(posX, 10, posX, 30);
                                this.hit_data.yellow += 50;
                            } else this.hit_data.yellow += 300;
                        }
                        if (obj.typeof === "HitCircle") {
                            this.hit_data.yellow += 50, this.pg.stroke(colors.yellows);
                            let posX = this.timeToX(obj.time);
                            this.pg.line(posX, 10, posX, 30);
                        }
                    }
                    if (obj.bad === false)
                        this.hit_data.blue += 300
                    if (obj.selected) {
                        this.pg.stroke("blue");
                        let posX = this.timeToX(obj.time);
                        this.pg.line(posX, 10, posX, 30);
                    }
                }
            })
        }
        this.pg.fill(colors.upper.text);
        this.pg.noStroke();
        this.pg.circle(this.timeToX(editor.wcursor), 18, 9);
    }

    analyze() {
        this.hits = preview.beatmap.HitObjects;
        let radius = preview.beatmap.circleRadius;
        this.pressPoints = [];
        for (let i = 1; i < path.length; i++) {
            const current = path[i], last = path[i - 1];
            if (!last.buttons.k1 && current.buttons.k1)
                this.pressPoints.push({
                    time: current.gametime,
                    type: "k1",
                    used: false,
                    pos: {x: current.x, y: current.y}
                });
            if (!last.buttons.k2 && current.buttons.k2)
                this.pressPoints.push({
                    time: current.gametime,
                    type: "k2",
                    used: false,
                    pos: {x: current.x, y: current.y}
                });
        }
        this.current_combo = 0;
        let _0xcf0e79 = [0, 0];
        this.hits.forEach(obj => {
            obj.typeof = obj.constructor.name;
            if (obj.typeof === "HitCircle" || obj.typeof === "Slider") {
                let not_sure = false, range = "0";
                for (let i = 0; i < this.pressPoints.length; i++) {
                    const point = this.pressPoints[i];
                    if (this.determineRange(Math.abs(obj.time - point.time))) {
                        if (!point.used) {
                            if (dist(obj.position.x, obj.position.y, point.pos.x, point.pos.y) <= radius) {
                                point.used = true;
                                not_sure = true;
                                range = this.determineRange(Math.abs(obj.time - point.time));
                                obj.pressRange = obj.time - point.time;
                                break;
                            }
                        }
                    }
                }
                if (!not_sure) {
                    obj.bad = true;
                    obj.color = colors.reds;
                    obj.strokeStyle = colors.reds;
                    if (obj.time < editor.wcursor)
                        this.current_combo = 0
                } else {
                    if (obj.time < editor.wcursor)
                        this.current_combo += 1 + (obj.typeof === "Slider" ? obj.repeat : 0)

                    obj.bad = false;
                    if (!obj.selected) {
                        obj.color = colors.editor.hitobjects_normal;
                        obj.strokeStyle = "rgb(160,160,160 )";
                    }
                    if (range === "100") {
                        _0xcf0e79[0]++;
                        obj.bad = "100";
                        if (!obj.selected) {
                            obj.color = colors.greens;
                            obj.strokeStyle = colors.greens
                        }
                    }
                    if (range === "50") {
                        _0xcf0e79[1]++;
                        obj.bad = "50";
                        if (!obj.selected) {
                            obj.color = "#F2C94C";
                            obj.strokeStyle = "#F2C94C";
                        }
                    }
                }
            }
        });
        if (!this.safeAnalyze) {
            this.safeAnalyze = true;
            this.redraw();
        }
    }

    gotoMiss(action) {
        if (action === "next")
            for (let i = 0; i < this.hits.length; i++) {
                const hit = this.hits[i];
                if (hit.time > editor.wcursor && hit.bad === true) {
                    editor.cursor_shift(hit.time - editor.cursor.range / 2);
                    break;
                }
            } else for (let i = 0; i < this.hits.length; i++) {
            const obj = this.hits[i];
            if (obj.time < editor.wcursor && obj.bad === true)
                editor.cursor_shift(obj.time - editor.cursor.range / 2);
        }
    }
}
