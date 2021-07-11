const Swal = require("sweetalert2"),
    {remote} = require("electron");
let roboto,
    playing = false,
    replayLoaded = false,
    scorev2 = true,
    bot = {
        status: false,
        last: false,
        settings: {
            width: '1600',
            height: '900',
            k1: "w",
            k2: "h",
            offset: "4",
            hardrock: false,
        },
    };

function preload() {
    roboto = loadFont("images/Roboto-Light.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    initPreloader();
    initSettings();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if (replayLoaded)
        editor.resizeDisplay();
}

function createEditorX(replay) {
    clear();
    try {
        remote.BrowserWindow.getFocusedWindow().maximize();
        remote.BrowserWindow.getFocusedWindow().resizable = true;
        remote.BrowserWindow.getFocusedWindow().movable = true;
    } catch (e) {
    }
    setTimeout(() => {
        replayLoaded = true;
        initTopper();
        loadReplay(replay);
        createEditor();
        createTimeline();
        createLowerTimeline();
        editor.cursor_shift(12817);
    }, 500);
}

function draw() {
    if (replayLoaded) {
        clear();
        editor.draw();
        timeline.draw();
        lower_timeline.draw();
        lower_timeline.drawSlicerPointer();
        push();
        /*
        if (preview) try {
        } catch (e) {
        }*/
        pop();
        drawTopper();
        if (bot.status !== bot.last) {
            bot.last = bot.status;
            console.log(bot.status ? "bot on" : "bot off");
        }
    } else draw_preloader();
}

function mouseWheel(wheel) {
    if (replayLoaded) {
        if (keyIsDown(17))
            editor.zoomTowards(wheel.delta);
        else
            editor.cursor_shift_by(wheel.delta / 10);
        timeline.redraw();
        lower_timeline.redraw();

    }
}

let mouseButton = 0;

function mousePressed(mouse) {
    mouseButton = mouse.button;
    if (!playing) {
        if (replayLoaded) {
            if (mouse.button === 0) {
                editor.parseBrush();
                timeline.parsePress()
            }
            lower_timeline.parsePress(mouse.button);
            oldpath.push(JSON.stringify(path))
        }
        /*
        else if (mouseX > 570 && mouseY < 19)
            window.close()
            */
    }
}

function mouseReleased() {
    if (replayLoaded) {
        timeline.redraw();
        lower_timeline.redraw();
        editor.parseRelease();
        timeline.parseRelease();
        lower_timeline.parseRelease()
    }
}

function keyPressed() {
    if (replayLoaded) {
        editor.parseKeyPress();
        switch (key.toLowerCase()) {
            case "c":
                editor.create_key_point()
                break
            case "z":
                editor.kill_keypoints()
                break
            case "o":
                toggleSliders()
                break
            case " ":
                playing = !playing;
                playing ? audio.play() : audio.pause()
                break
            case "w":
                editor.selectPress();
                timeline.redraw();
                lower_timeline.redraw()
                break;
            case "s":
                if (lower_timeline.active)
                    lower_timeline.slice();
                break;
            case "k":
                lower_timeline.active = !lower_timeline.active;
                break;
            case "f":
                editor.fixBrush();
                break;
        }
    }
}

document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        if (replayLoaded)
            saveReplay();
    }
    if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        if (replayLoaded)
            editor.ctrlz();
    }
});
let topperGraphics;

function initTopper() {
    topperGraphics = createGraphics(windowWidth, 24);
    topperGraphics.push();
    topperGraphics.fill(colors.topper.back);
    topperGraphics.noStroke();
    topperGraphics.rect(0, 0, windowWidth, 24);
    topperGraphics.fill(colors.topper.text);
    topperGraphics.textAlign(LEFT, CENTER);
    topperGraphics.textFont(roboto);
    topperGraphics.strokeWeight(.8);
    topperGraphics.stroke(colors.topper.text);
    topperGraphics.text("Dropout V4", 12, 10);
    topperGraphics.pop();
}

function drawTopper() {
    image(topperGraphics, 0, 0);
}

function initSettings() {
    document.body.style.backgroundColor = colors.back;
}

let colors = {
    back: "white",
    text: 80,
    topper: {back: 225, text: 64},
    upper: {back: 255, line: "#D6D6D6", text: "#383838"},
    lower: {zones: "#E5E5E5", back: "white", normalclicks: 210, tri: 38}
};
colors = {
    back: "#0F0F0F",
    text: "white",
    greens: "rgb(106, 176, 76)",
    reds: "rgb(231, 76, 60)",
    yellows: "rgb(241, 196, 15)",
    topper: {back: 9, text: "white"},
    upper: {back: "#171717", line: "#303030", text: "white"},
    lower: {zones: "#282828", back: "#171717", normalclicks: "rgba(255,255,255,0.2)", tri: "white"},
    editor: {back: "black", hitobjects_normal: "rgb(120,120,120)"}
};
if (require("fs").existsSync("theme.json")) try {
    colors = JSON.parse(require("fs").readFileSync("theme.json"));
} catch (e) {
}
