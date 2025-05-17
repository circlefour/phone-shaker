//console.log('hiiiii');
const socket = io("https://chaos-server-dev.up.railway.app/");

function setupDeviceMotionListener() {
  window.addEventListener("devicemotion", (event) => {
    //console.log('hi wussup');

    const acceleration = event.accelerationIncludingGravity;
    const intensity = Math.sqrt(
      acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
    );

    //console.log("shake intensity: ", intensity);
    document.getElementById("txt").textContent = `${intensity}`;

    socket.emit('shake', intensity);
  });
}

// Check if permission is needed (iOS 13+)
if (
  typeof DeviceMotionEvent !== 'undefined' &&
  typeof DeviceMotionEvent.requestPermission === 'function'
) {
  // Wait for user gesture to request permission
  const btn = document.createElement('button');
  btn.textContent = 'Enable Motion Access';
  btn.style.position = 'fixed';
  btn.style.top = '20px';
  btn.style.left = '20px';
  btn.style.zIndex = 9999;
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    DeviceMotionEvent.requestPermission()
      .then(response => {
        if (response === 'granted') {
          setupDeviceMotionListener();
          btn.remove(); // remove button after granting
        } else {
          console.warn('Motion permission denied');
        }
      })
      .catch(error => {
        console.error('Motion permission error:', error);
      });
  });
} else {
  // No permission required (e.g., Android or older iOS)
  setupDeviceMotionListener();
}

