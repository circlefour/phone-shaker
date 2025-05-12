window.addEventListener("devicemotion", (event) => {
  const acceleration = event.accelerationIncludingGravity;
  const intensity = Math.sqrt(
    acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
  );

  console.log("shake intensity: ", intensity);
  document.getElementByID("txt").textContent= `${intensity}`;
});

