const images = document.querySelectorAll(".galeria-projetos img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

images.forEach(img => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    });
});

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});

let scale = 1;
let isDragging = false;
let startX, startY;
let translateX = 0;
let translateY = 0;

lightboxImg.addEventListener("wheel", (e) => {
    e.preventDefault();

    if (e.deltaY < 0) {
        scale += 0.1;
    } else {
        scale = Math.max(1, scale - 0.1);
    }

    lightboxImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
});

lightboxImg.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    lightboxImg.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    translateX = e.clientX - startX;
    translateY = e.clientY - startY;

    lightboxImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
});

window.addEventListener("mouseup", () => {
    isDragging = false;
    lightboxImg.style.cursor = "grab";
});

closeBtn.addEventListener("click", () => {
    scale = 1;
    translateX = 0;
    translateY = 0;
    lightboxImg.style.transform = "scale(1)";
});

