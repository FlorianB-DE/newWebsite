function scrollTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function getRandomVisibleColor() {
    const cssColor = window.getComputedStyle(document.querySelector(".app"));
    console.log(cssColor);
}