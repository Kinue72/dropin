const OsuReplay = require("@brunohpaiva/osu-parser").OsuReplay, fs = require("fs");
let replay, path, duration = 0, replay_name = "replay", mapImage, resized = false;
const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

function loadReplay(replay_path) {
    const file = fs.readFileSync(replay_path);
    replay = OsuReplay.parse(file);
    path = replay.actions;
    fetch(`https://osu.ppy.sh/api/get_beatmaps?k=${config.osu_api}&h=${replay.beatmapHash}`).then(response => {
        response.json().then(obj => {
            obj = obj[0];
            console.log(obj);
            mapImage = "https://assets.ppy.sh/beatmaps/" + obj.beatmapset_id + "/covers/list@2x.jpg";
            let img = createImg(mapImage, "ref");
            img.position(56, 50);
            img.elt.style.borderRadius = "4px";
            img.elt.style.width = "110px";
            img.elt.style.height = "36px";
            img.elt.style.objectFit = "cover";
            ready(obj.version, obj.beatmapset_id);
        });
    });
    let stamp = 0;
    path.forEach(file => {
        stamp += file.timestamp;
        file.gametime = stamp;
        if (stamp > duration)
            duration = stamp
        let keys = {k1: false, k2: false};
        if (file.buttons) {
            if (file.buttons.includes("KeyboardOne") || file.buttons.includes("MouseOne"))
                keys.k1 = true;
            if (file.buttons.includes("KeyboardTwo") || file.buttons.includes("MouseTwo"))
                keys.k2 = true;
        }
        file.buttons = keys;
    });
}

function saveReplay() {
    let frames = [];
    path.forEach(frame => {
        frames.push({timestamp: frame.timestamp, x: frame.x, y: frame.y, buttons: []});
        if (frame.buttons.k1)
            frames[frames.length - 1].buttons.push("KeyboardOne", "MouseOne");
        if (frame.buttons.k2)
            frames[frames.length - 1].buttons.push("KeyboardTwo", "MouseTwo");
    });
    replay.actions = frames;
    replay.playerName = "yes player name";
    const replay_buffer = replay.writeToOsuBuffer(), buffer = replay_buffer.buffer,
        edited_path = "./" + replay_name + "_edited.osr";
    require("fs").writeFileSync(edited_path, buffer);
    Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: ![],
        timer: 1500
    });
}
