window.onload = () => {
    Array.prototype.forEach.call(document.getElementsByClassName("randomly-colored"), (element) => {
        ColorFunctions.randomColors(element);
    });

    document.querySelector(".socials > .button").addEventListener("click", (evt => {
        const element = evt.target as HTMLElement;
        const span = element.tagName.toLowerCase() == "span" ? element : element.querySelector("span");
        const icons = span.parentElement.parentElement.querySelector(".social-icons") || document.querySelector(".social-icons");
        if (span.style.display == "none") {
            span.style.display = "block";
            icons.classList.remove("expanded-icons");
        }
        else{
            span.style.display = "none";
            icons.classList.add("expanded-icons");
        }
    }));
    //Unity.init();
};
