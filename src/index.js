require('bulma/css/bulma.min.css');
require('./index.css');

// Mount the body of the page
const pageBody = require('./body.html');
const pageMount = document.getElementById("page-mount");
pageMount.innerHTML = pageBody;

// On Click function for sending an email
window.sendMessage = () => {
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const endpoint = "/api/contact";
  const payload = { email, message };

  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
};
