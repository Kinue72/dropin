function Preview(contain) {
    this.container = contain;
    this.screen = document.createElement("canvas");
    this.screen.id = "drawingCanvas";
    this.screen.width = windowWidth;
    this.screen.height = windowHeight;
    this.ctx = this.screen.getContext("2d");
    this.container.appendChild(this.screen);
    let preview = this;
    this.background = new Image;
    this.background.setAttribute("crossOrigin", "anonymous");
    this.background.addEventListener("load", function () {
        if (!/^http/i.test(this.src)) return;
        let canvas = document.createElement("canvas");
        canvas.width = preview.screen.width, canvas.height = preview.screen.height;
        let context2D = canvas.getContext("2d"),
            _0x405e2a = this.height * (preview.screen.width / preview.screen.height);
        context2D.drawImage(this, (this.width - _0x405e2a) / 2, 0, _0x405e2a, this.height, 0, 0, preview.screen.width, preview.screen.height);
        if (typeof preview.beatmap.processBG !== "undefined")
            preview.beatmap.processBG(context2D)
        canvas.toBlob(function (url) {
            let obj = URL.createObjectURL(url);
            preview.background.src = obj, preview.container.style.backgroundImage = "url(" + obj + ")";
        });
    });
    this.background.addEventListener("error", function () {
        preview.container.style.backgroundImage = "none";
    });
}

Preview.prototype.load = function (_0x583f93, source, url, callback, excep) {
    if (typeof this.xhr !== "undefined")
        this.xhr.abort()
    let preview = this;
    this.xhr = new XMLHttpRequest;
    this.xhr.addEventListener("load", function () {
        try {
            preview.beatmap = Beatmap.parse(this.responseText);
            preview.background.src = source;
            preview.ctx.restore();
            preview.ctx.save();
            preview.beatmap.update(preview.ctx);
            preview.at(1500);
            if (typeof callback == "function")
                callback.call(preview);
        } catch (e) {
            if (typeof excep === "function")
                excep.call(preview, e)
        }
    });
    preview.xhr.open("GET", url);
    preview.xhr.send();
}
Preview.prototype.at = function (_0x194b5b) {
    try {
        preview.beatmap.refresh();
        this.ctx.save();
        this.ctx.clearRect(0, 0, windowWidth, windowHeight);
        this.ctx.shadowColor = "rgba(0,0,0,0.25)";
        this.ctx.shadowBlur = 14;
        this.ctx.fillStyle = colors.editor.back;
        this.ctx.fillRect(editor.display.x, editor.display.y, editor.display.w, editor.display.h, 25);
        this.ctx.shadowBlur = "";
        this.ctx.translate(editor.display.x, editor.display.y);
        this.ctx.scale(editor.display.w / 512, editor.display.h / 384);
        this.beatmap.draw(_0x194b5b, this.ctx);
        this.ctx.restore();
    } catch (e) {
    }
};