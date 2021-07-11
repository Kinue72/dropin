const express = require("express");
const eapp = express();
const cors = require("cors");
const fs = require("fs");

const port = 3000;
const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

eapp.use(cors());
eapp.get("/api/", async (req, res) => {
    let set_id = req.query["id"];
    let diff = req.query["sd"]
    let type = req.query["type"];
    if (typeof diff  !== "undefined")
        diff = Buffer.from(diff, 'base64').toString().replaceAll("\"", "");

    console.log(set_id, diff, type);


    try {
        let song_folder = fs
            .readdirSync(config.osu_songs)
            .filter((maps) => maps.includes(set_id + " "));
        let files = fs.readdirSync(config.osu_songs + "/" + song_folder);
        let bm_file = files.filter((file) => file.includes("[" + diff + "]"))[0];
        let audio_file = files.filter((files) => files.includes(".mp3"))[0];

        if (bm_file && audio_file) {
            if (type === "beatmap")
                res.sendFile(config.osu_songs + "/" + song_folder + "/" + bm_file);
             else if (type === "audio")
                res.sendFile(config.osu_songs + "/" + song_folder + "/" + audio_file);
        } else
            res.send("Wrong difficulty name or no audio file.");
    } catch (ex) {
        res.send(ex);
    }
});

eapp.listen(port, () => {
    console.log("Created API");
});
