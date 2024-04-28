const getColors = () => {
  const colors = fetch("./palette.json")
    .then((res) => res.json())
    .then((data) => data);
  return colors;
};

const setColors = (colors, scene, palette, brand) => {
  palette.innerHTML = "";
  const selectedColors = colors.filter((color) => color.brand === brand)[0]
    .colors;
  selectedColors.map((color) => {
    const swatchElement = document.createElement("span");
    swatchElement.classList.add("color-swatch");
    swatchElement.setAttribute("data-title", color.name);
    swatchElement.setAttribute("data-color", color.code);
    swatchElement.style.background = color.code;
    palette.appendChild(swatchElement);

    swatchElement.addEventListener("mouseover", () => {
      scene.style.backgroundColor = swatchElement.getAttribute("data-color");
    });
    swatchElement.addEventListener("mouseout", () => {
      scene.style.backgroundColor = "#ffffff";
    });
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const palette = document.querySelector(".color-palette");
  const brand = document.querySelector("#brand-selection");
  const scene = document.querySelector(".scene");
  const sceneImage = document.querySelector(".scene-img");
  const colors = await getColors();
  if (colors.length) {
    setColors(colors, scene, palette, brand.value);
    brand.addEventListener("change", (e) =>
      setColors(colors, scene, palette, e.target.value)
    );
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
