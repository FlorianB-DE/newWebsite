window.onload = () => {
    Array.prototype.forEach.call(document.getElementsByClassName("randomly-colored"), (element) => {
        ColorFunctions.randomColors(element);
    });

    document.querySelector(".socials > .button").addEventListener("click", (evt => {
        let element = evt.target as HTMLElement;
        if (element.tagName.toLowerCase() == "span")
            element = element.parentElement.parentElement;
        else element = element.parentElement;
        if (element.classList.contains("expanded-icons"))
            element.classList.remove("expanded-icons");
        else
            element.classList.add("expanded-icons");
    }));
    //Unity.init();
};
