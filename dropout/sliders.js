let slide = {AR: undefined, CS: undefined, OD: undefined}, slidersVisible = false;

function initSliders() {
    const dat = require("dat.gui"), gui = new dat.GUI;
    gui.domElement.id = "gui";
    audio.volume = .2;
    slide.AR = createSlider(0, 11, preview.beatmap.ApproachRate, .1).position(10, -110);
    slide.OD = createSlider(0, 11, preview.beatmap.OverallDifficulty, .1).position(10, -130);
    slide.CS = createSlider(0, 70, preview.beatmap.circleRadius, .1).position(10, -150);
    gui.add(preview.beatmap, "ApproachRate", 0, 11);
    gui.add(preview.beatmap, "OverallDifficulty", 0, 11);
    gui.add(preview.beatmap, "circleRadius", 10, 51);
    gui.add(audio, "volume", 0, 1);
    gui.add({
        next_miss: () => {
            timeline.gotoMiss("next");
        }
    }, "next_miss").name("Next miss");
    gui.add({
        prev_miss: () => {
            timeline.gotoMiss("prev");
        }
    }, "prev_miss").name("Previous miss");
    gui.add({
        invert_path: () => {
            path.forEach(p => {
                p.y = (1 - p.y / 384) * 384;
            });
        }
    }, "invert_path").name("Invert Path"), gui.add(timeline, "scorev2").name("ScoreV2");
}

function toggleSliders() {
    slidersVisible = !slidersVisible;
}
