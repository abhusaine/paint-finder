const getColors = () => {
  const colors = fetch("./palette.json")
    .then((res) => res.json())
    .then((data) => data);
  return colors;
};

document.addEventListener("DOMContentLoaded", async () => {
  const palette = document.querySelector(".color-palette");
  const scene = document.querySelector(".view");
  const sceneImage = document.querySelector(".view-img");
  const colors = await getColors();
  if (colors.length) {
    colors.map((color, index) => {
      const swatchElement = document.createElement("span");
      swatchElement.classList.add("color-swatch");
      swatchElement.setAttribute("data-title", color.name);
      swatchElement.setAttribute("data-color", color.color);
      swatchElement.style.background = color.color;
      palette.appendChild(swatchElement);

      swatchElement.addEventListener("mouseover", () => {
        scene.style.backgroundColor = swatchElement.getAttribute("data-color");
      });
      swatchElement.addEventListener("mouseout", () => {
        scene.style.backgroundColor = "#ffffff";
      });
    });
  }

  const setLivingRoom = document.querySelector("#btn-living-room");
  const setBedroom = document.querySelector("#btn-bedroom");
  const setBathroom = document.querySelector("#btn-bathroom");

  setLivingRoom.addEventListener("click", () => {
    sceneImage.src = "./media/living-room.png";
  });
  setBedroom.addEventListener("click", () => {
    sceneImage.src = "./media/bedroom.png";
  });
  setBathroom.addEventListener("click", () => {
    sceneImage.src = "./media/bathroom.png";
  });
});
