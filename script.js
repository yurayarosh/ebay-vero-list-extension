const UID = Math.random().toString(36).substring(2, 9);

const Message = `
  <span>All clear!</span>
  <style>
  .alert-message_${UID} {
    display: flex;
    align-items-center;
    justify-content: center;

    position: fixed;
    z-index: 5555560;
    top: 2rem;
    left: calc(50% - 100px);  

    width: 200px;

    padding: .75rem 1.25rem;
    border: 1px solid transparent;
    border-radius: .25rem;

    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;

    animation-name: fade-in;
    animation-duration: 500ms;
  }

  .alert-message_${UID}.fade-out {
    animation-name: fade-out;
  }

  @keyframes fade-in {
    0% {
      transform: translateY(-1rem);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes fade-out {
    0% {
      transform: translateY(0);
      opacity: 1;
    }

    100% {
      transform: translateY(-1rem);
      opacity: 0;
    }
  }
  </style>
`;

const showSuccessMessage = () => {
  const message = document.createElement('div');
  message.className = `alert-message_${UID}`;
  message.innerHTML = Message;
  document.body.appendChild(message);

  setTimeout(() => {
    message.classList.add('fade-out');
    message.addEventListener(
      'animationend',
      () => {
        document.body.removeChild(message);
      },
      { once: true }
    );
  }, 1500);
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message.isValid) {
    alert(`Contains VeRO words: ${message.matches}`);
  } else {
    showSuccessMessage();
  }
});
