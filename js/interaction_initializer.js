const buildUrl = "webassembly/interactive_header";
const loaderUrl = buildUrl + "/Andromeda.loader.js";
const config = {
    dataUrl: buildUrl + "/Andromeda.data",
    frameworkUrl: buildUrl + "/Andromeda.framework.js",
    codeUrl: buildUrl + "/Andromeda.wasm"
};

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    config.devicePixelRatio = 1;

const script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
    // override log function to get rid of nasty log statements
    const oldLog = console.log;
    console.log = () => {};
    // creating unity instance
    createUnityInstance(document.getElementById("interactive-header"), config, () => {}).then(() => {
        document.getElementsByClassName("head")[0].getElementsByTagName("img")[0].style.display = "none";
        document.getElementById("interactive-header").addEventListener("wheel", (e) => {
            if (e.deltaY < 0)
                scrollTop();
            else
                window.scrollBy({
                    behavior: "smooth",
                    top: document.getElementsByClassName("head")[0].getBoundingClientRect().height + 10,
                    left: 0
                });
        });
        // give me back my old console :(
        console.log = oldLog;
    }).catch((message) => {
        alert(message);
    });
};
document.head.appendChild(script);