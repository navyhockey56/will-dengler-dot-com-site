require('bulma/css/bulma.min.css');
require('./index.css');

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
    body: payload
  });
};
