module ColorFunctions {
    const MIN_COLOR_DIFFERENCE = 400;
    const CLASS = "randomly-colored"

    export function randomColors(element: HTMLElement) {
        element.innerText = "#" + element.innerText;
        // @ts-ignore
        const characters = [...element.innerText];
        const colors = getRandomHexColors(characters.length, element.classList.contains(CLASS + "__sorted"));
        element.innerHTML = characters.reduce((a, ch, index) => {
            if (a.charAt(0) == '#')
                a = a.substring(1);
            if (index == 1 && element.classList.contains(CLASS + "__background")) {
                const alpha: number = element.hasAttribute("data-alpha") ? parseFloat(element.getAttribute("data-alpha")) : 0;
                const color: string = (element.hasAttribute("data-reference")) ? (element.getAttribute("data-reference") == "lightest") ? colors[colors.length - 1] : colors[0] : colors[0];
                element.style.background = "rgba(" + invertRGB(hexToRGB(color)).join(",") + ", " + alpha + ")";
            }
            return a + `<span style="color:${colors[index - 1]}">${ch}</span>`;
        });
    }

    export function getRandomHexColors(amount = 1, sorted = false): Array<string> | string {
        if (amount == 1) return rgbArrayToHex(getRandomRGBArray());
        const colors: Array<Array<number>> = [];
        for (let i = 0; i < amount; i++)
            colors.push(getRandomRGBArray());
        if (sorted) {
            const clamp = (number: number, min: number, max: number) => Math.min(Math.max(number, min), max);
            const pseudoRandom = (constantVal: number) => clamp(Math.round(MIN_COLOR_DIFFERENCE / Math.round(constantVal * Math.random()) + 0.00001), 0, 255);
            let rs: Array<number> = [], gs: Array<number> = [], bs: Array<number> = [];
            for (let i = 0; i < colors.length; i++) {
                rs.push(clamp(colors[i][0], pseudoRandom(1000), pseudoRandom(6)));
                gs.push(clamp(colors[i][1], pseudoRandom(1000), pseudoRandom(6)));
                bs.push(clamp(colors[i][2], pseudoRandom(1000), pseudoRandom(6)));
            }
            rs = rs.sort((a, b) => a - b);
            gs = gs.sort((a, b) => a - b);
            bs = bs.sort((a, b) => a - b);
            for (let i = 0; i < colors.length; i++) {
                // console.log("r:" + rs[i] + " g:" + gs[i] + " b:" + bs[i])
                colors[i][0] = rs[i];
                colors[i][1] = gs[i];
                colors[i][2] = bs[i];
            }
        }
        return colors.map((rgbArray) => rgbArrayToHex(rgbArray));
    }

    function getRandomRGBArray(): Array<number> {
        const computedStyle: CSSStyleDeclaration = window.getComputedStyle(document.querySelector(".app"));
        const backgroundRGBArray: Array<number> = rgbStringToArray(computedStyle["background-color"]);
        let generatedRGBArray = [...backgroundRGBArray];
        while (generatedRGBArray.reduce((accumulator, currentRGB, index) => {
            return accumulator + Math.abs(currentRGB - backgroundRGBArray[index])
        }, 0) < MIN_COLOR_DIFFERENCE)
            generatedRGBArray = randomRGB();
        return generatedRGBArray;
    }

    function randomRGB(): Array<number> {
        return [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)];
    }

    function rgbStringToArray(rgbString: string): Array<number> {
        rgbString = rgbString.split("(")[1].split(")")[0];
        const rgbArray = rgbString.split(",");
        return rgbArray.map((rgbValue) => {
            return parseInt(rgbValue);
        });
    }

    function hexToRGB(hexColor: string): Array<number> {
        if (hexColor.replace("#", "").length == 3) { // @ts-ignore
            return hexToRGB([...hexColor].reduce((accumulator, currentHex) => accumulator + currentHex + currentHex).replace("#", ""));
        }
        return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor.replace("#", "")).map(element => parseInt(element, 16)).splice(1);
    }

    function invertRGB(rgbArray: Array<number>): Array<number> {
        return rgbArray.map(value => 255 - value);
    }

    function rgbArrayToHex(rgb: Array<number>): string {
        return "#" + rgb.map((rgbValue, index) => {
            if (index == 3) return;
            const stringHex = rgbValue.toString(16); // convert to hex
            return (stringHex.length == 1) ? "0" + stringHex : stringHex; // insert padding if needed
        }).join("");
    }

}