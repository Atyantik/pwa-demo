const publicVapidKey = 'BC5LtMo7gB_9dqHCD6XtGgzkI80jUJRQKS9rbXhuRH9HGWbLLzhT9Oh5-1YB0kppbFSFNci5u0aLnoyQT5T0XLA';

const container = document.getElementById('container');
const notify = document.getElementById('notify');

const coffees = [
  { name: "Perspiciatis", image: "images/coffee1.jpg" },
  { name: "Voluptatem", image: "images/coffee2.jpg" },
  { name: "Explicabo", image: "images/coffee3.jpg" },
  { name: "Rchitecto", image: "images/coffee4.jpg" },
  { name: "Beatae", image: "images/coffee5.jpg" },
  { name: "Vitae", image: "images/coffee6.jpg" },
  { name: "Inventore", image: "images/coffee7.jpg" },
  { name: "Veritatis", image: "images/coffee8.jpg" },
  { name: "Accusantium", image: "images/coffee9.jpg" },
];

const showCoffes = () => {
  let output = '';
  coffees.forEach(({ name, image }) => (
    output += `<div class="card">
    <img class="card--avatar" src=${image} />
    <h1 class="card--title">${name}</h1>
    <a class="card--link" href="#">taste</a>
  </div>`
  ));
  container.innerHTML = output;
};

document.addEventListener('DOMContentLoaded', showCoffes);

if ('serviceWorker' in navigator && 'PushManager' in window) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./serviceWorker.js')
      .then(async (registration) => {
        console.log('Service worker registered!!');
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });

        await fetch('https://localhost/subscribe', {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'content-type': 'application/json'
          }
        });
      })
      .catch((err) => {
        console.log('Service worker not registered', err);
      });
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

// notify.addEventListener('click', () => {
//   Notification.requestPermission().then((perm) => {
//     if (perm = 'granted') {
//       const notification = new Notification('Test notification', {
//         body: 'This is the test',
//         data: { hello: 'World' },
//         icon: './images/icon.png',
//       });

//       notification.addEventListener('error', (e) => {
//         alert(e);
//       });
//     }
//   });
// });

// let notification;
// document.addEventListener('visibilitychange', () => {
//   if (document.visibilityState === 'hidden') {
//     new Notification('Come back please', {
//       body: 'Pleaseeee',
//       tag: 'come back',
//       icon: './images/icon.png',
//     });
//   } else {
//     notification.close();
//   }
// });
