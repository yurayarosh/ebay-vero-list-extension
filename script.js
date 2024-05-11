chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message.isValid) {
    alert(`Contains VeRO words: ${message.matches}`);
  } else {
    alert('All clear!');
  }
});
