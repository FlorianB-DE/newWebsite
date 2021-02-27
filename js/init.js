(function () {
    const functions = document.createElement("script"), design = functions.cloneNode(false);
    functions.type = "text/javascript";
    functions.src = "js/functions.js";

    design.type = functions.type;
    design.src = "js/app.js";

    document.head.appendChild(functions);
    document.head.appendChild(design);
})()