let preloader, indrag = false, indrags = 0;

function initPreloader() {
    preloader = createGraphics(424, 440);
    preloader.background("#101010");
    preloader.fill("#171717");
    preloader.rect(0, 0, 424, 24);
    preloader.textFont(roboto);
    preloader.fill("white");
    preloader.textSize(30);
    preloader.text("Mahiro Network", 71, 116);
    preloader.textSize(25);
    preloader.text("video editor", 71, 144);
    document.querySelector("#defaultCanvas0").addEventListener("drop", e => {
        e.preventDefault();
        e.stopPropagation();
        let path = "";
        for (const file of e.dataTransfer.files) {
            console.log("File Path of dragged files: ", file.path);
            path = file.path;
        }
        createEditorX(path);
    });
    document.querySelector("#defaultCanvas0").addEventListener("dragover", e => {
        e.preventDefault();
        e.stopPropagation();
        indrag = true;
        indrags = 0;
    });
}

let colorbase = "#F2F2F2", darken = "#E3E3E3";

function draw_preloader() {
    push();
    image(preloader, 0, 0);
    push();
    noStroke();
    fill("#171717");
    rect(71, 208, 276, 155, 7);
    textFont(roboto);
    fill("#A5A5A5");
    textAlign(CENTER, CENTER);
    textSize(16);
    text(indrag ? "Drag it here :)" : "Drag & drop replay here", 209, 285.5);
    pop();
    pop();
    indrags++;
    if (indrags > 15)
        indrag = false;
}
