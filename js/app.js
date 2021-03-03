var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
window.onload = function () {
    Array.prototype.forEach.call(document.getElementsByClassName("randomly-colored"), function (element) {
        ColorFunctions.randomColors(element);
    });
    Unity.init();
};
var ColorFunctions;
(function (ColorFunctions) {
    var MIN_COLOR_DIFFERENCE = 400;
    var CLASS = "randomly-colored";
    function randomColors(element) {
        element.innerText = "#" + element.innerText;
        var characters = __spreadArrays(element.innerText);
        var colors = getRandomHexColors(characters.length, element.classList.contains(CLASS + "__sorted"));
        element.innerHTML = characters.reduce(function (a, ch, index) {
            if (a.charAt(0) == '#')
                a = a.substring(1);
            if (index == 1 && element.classList.contains(CLASS + "__background")) {
                var alpha = element.hasAttribute("data-alpha") ? parseFloat(element.getAttribute("data-alpha")) : 0;
                var color = (element.hasAttribute("data-reference")) ? (element.getAttribute("data-reference") == "lightest") ? colors[colors.length - 1] : colors[0] : colors[0];
                var targetElement = (element.hasAttribute("data-query-selector") ? document.querySelector(element.getAttribute("data-query-selector")) : element);
                targetElement.style.background = "rgba(" + invertRGB(hexToRGB(color)).join(",") + ", " + alpha + ")";
            }
            return a + ("<span style=\"color:" + colors[index - 1] + "\">" + ch + "</span>");
        });
    }
    ColorFunctions.randomColors = randomColors;
    function getRandomHexColors(amount, sorted) {
        if (amount === void 0) { amount = 1; }
        if (sorted === void 0) { sorted = false; }
        if (amount == 1)
            return rgbArrayToHex(getRandomRGBArray());
        var colors = [];
        for (var i = 0; i < amount; i++)
            colors.push(getRandomRGBArray());
        if (sorted) {
            var clamp_1 = function (number, min, max) { return Math.min(Math.max(number, min), max); };
            var pseudoRandom = function (constantVal) { return clamp_1(Math.round(MIN_COLOR_DIFFERENCE / Math.round(constantVal * Math.random()) + 0.00001), 0, 255); };
            var rs = [], gs = [], bs = [];
            for (var i = 0; i < colors.length; i++) {
                rs.push(clamp_1(colors[i][0], pseudoRandom(1000), pseudoRandom(6)));
                gs.push(clamp_1(colors[i][1], pseudoRandom(1000), pseudoRandom(6)));
                bs.push(clamp_1(colors[i][2], pseudoRandom(1000), pseudoRandom(6)));
            }
            rs = rs.sort(function (a, b) { return a - b; });
            gs = gs.sort(function (a, b) { return a - b; });
            bs = bs.sort(function (a, b) { return a - b; });
            for (var i = 0; i < colors.length; i++) {
                colors[i][0] = rs[i];
                colors[i][1] = gs[i];
                colors[i][2] = bs[i];
            }
        }
        return colors.map(function (rgbArray) { return rgbArrayToHex(rgbArray); });
    }
    ColorFunctions.getRandomHexColors = getRandomHexColors;
    function getRandomRGBArray() {
        var computedStyle = window.getComputedStyle(document.querySelector(".app"));
        var backgroundRGBArray = rgbStringToArray(computedStyle["background-color"]);
        var generatedRGBArray = __spreadArrays(backgroundRGBArray);
        while (generatedRGBArray.reduce(function (accumulator, currentRGB, index) {
            return accumulator + Math.abs(currentRGB - backgroundRGBArray[index]);
        }, 0) < MIN_COLOR_DIFFERENCE)
            generatedRGBArray = randomRGB();
        return generatedRGBArray;
    }
    function randomRGB() {
        return [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)];
    }
    function rgbStringToArray(rgbString) {
        rgbString = rgbString.split("(")[1].split(")")[0];
        var rgbArray = rgbString.split(",");
        return rgbArray.map(function (rgbValue) {
            return parseInt(rgbValue);
        });
    }
    function hexToRGB(hexColor) {
        if (hexColor.replace("#", "").length == 3) {
            return hexToRGB(__spreadArrays(hexColor).reduce(function (accumulator, currentHex) { return accumulator + currentHex + currentHex; }).replace("#", ""));
        }
        return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor.replace("#", "")).map(function (element) { return parseInt(element, 16); }).splice(1);
    }
    function invertRGB(rgbArray) {
        return rgbArray.map(function (value) { return 255 - value; });
    }
    function rgbArrayToHex(rgb) {
        return "#" + rgb.map(function (rgbValue, index) {
            if (index == 3)
                return;
            var stringHex = rgbValue.toString(16);
            return (stringHex.length == 1) ? "0" + stringHex : stringHex;
        }).join("");
    }
})(ColorFunctions || (ColorFunctions = {}));
var Functions;
(function (Functions) {
    function scrollTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    Functions.scrollTop = scrollTop;
})(Functions || (Functions = {}));
var Unity;
(function (Unity) {
    var scrollTop = Functions.scrollTop;
    function init() {
        var buildUrl = "webassembly/interactive_header";
        var loaderUrl = buildUrl + "/Andromeda.loader.js";
        var config = {
            dataUrl: buildUrl + "/Andromeda.data",
            frameworkUrl: buildUrl + "/Andromeda.framework.js",
            codeUrl: buildUrl + "/Andromeda.wasm"
        };
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            config.devicePixelRatio = 1;
        }
        var script = document.createElement("script");
        script.src = loaderUrl;
        script.onload = function () {
            var oldLog = console.log;
            console.log = function () {
            };
            createUnityInstance(document.getElementById("interactive-header"), config, function () {
            }).then(function () {
                document.getElementById("interactive-header").addEventListener("wheel", function (e) {
                    if (e.deltaY < 0)
                        scrollTop();
                    else
                        window.scrollBy({
                            behavior: "smooth",
                            top: document.querySelector(".head").getBoundingClientRect().height + 10,
                            left: 0
                        });
                });
                console.log = oldLog;
            }).catch(function (message) {
                alert(message);
            });
        };
        document.head.appendChild(script);
    }
    Unity.init = init;
})(Unity || (Unity = {}));
