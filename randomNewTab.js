import MDN from './data.json' assert { type: 'json' }

function getNewMDNPage() {
  return MDN[Math.floor(Math.random() * MDN.length)]
}

function checkTab() {
  browser.tabs.query({ active: true }, (tabs) => {
    if (tabs[0].url === 'about:newtab') {
      browser.tabs.update({ url: getNewMDNPage() })
    }
  })
}

function onError(error) {
  console.log(`Error: ${error}`)
}

function newTabEvent() {
  const gettingActiveTab = browser.tabs.query({
    active: true,
    currentWindow: true,
  })
  gettingActiveTab.then(checkTab, onError)
}

browser.tabs.onCreated.addListener(newTabEvent)
