importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

// Initialize Firebase
var config = { config: 'Add the initialize Firebase' };

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(({ data } = {}) => {
    const title = data.title || 'Title';
    const opts = Object.assign(
        {
            body: data.body || 'Body'
        },
        data
    );

    return self.registration.showNotification(title, opts);
});
