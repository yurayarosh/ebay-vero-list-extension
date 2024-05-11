chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: '1',
    title: 'Check for VeRO words',
    type: 'normal',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(async (item, tab) => {
  try {
    const res = await fetch('https://ebay-vero-list-api.onrender.com/list');
    const veroList = await res.json();
    const descr = item.selectionText;

    const matches = veroList.filter(word => descr.toLowerCase().includes(word.toLowerCase()));

    await chrome.tabs.sendMessage(tab.id, {
      isValid: !matches.length,
      matches,
    });
  } catch (error) {
    throw new Error(error);
  }
});
