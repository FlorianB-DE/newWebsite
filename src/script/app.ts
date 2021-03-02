window.onload = () => {
    Array.prototype.forEach.call(document.getElementsByClassName("randomly-colored"), (element) => {
        ColorFunctions.randomColors(element);
    });
    //Unity.init();
};
