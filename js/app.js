window.onload = () => {
    Array.prototype.forEach.call(document.getElementsByClassName("randomly-colored"), (element) => {
        element.innerHTML = [...element.innerText].reduce((a, ch, i) => {
            const color= '#'+ (Math.random() * 0xffffff).toString(16).substr(-6);
            getRandomVisibleColor();
            return a + `<span style="color:${color}">${ch}</span>`
        });
    });
}