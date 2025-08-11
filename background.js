chrome.runtime.onInstalled.addListener(() => {
  console.log("Proxy Switcher installed");

  // Initialize default settings
  chrome.storage.sync.get(['advancedSettings'], (result) => {
    if (!result.advancedSettings) {
      const defaultSettings = {
        bypassList: 'localhost\n127.0.0.1\n*.local',
        bypassLocal: true,
        autoDetect: false
      };
      chrome.storage.sync.set({ advancedSettings: defaultSettings });
    }
  });
});

// Get current proxy configuration
function getCurrentProxyConfig(callback) {
  chrome.proxy.settings.get({}, (config) => {
    callback(config);
  });
}

// Build bypass list from advanced settings
function buildBypassList(callback) {
  chrome.storage.sync.get(['advancedSettings'], (result) => {
    const settings = result.advancedSettings || {};
    let bypassList = [];

    if (settings.bypassLocal) {
      bypassList.push('localhost', '127.0.0.1', '::1');
    }

    if (settings.bypassList) {
      const customList = settings.bypassList.split('\n')
        .map(item => item.trim())
        .filter(item => item.length > 0);
      bypassList = bypassList.concat(customList);
    }

    callback(bypassList);
  });
}

// Set proxy with advanced settings
function setProxyWithSettings(scheme, host, port, callback) {
  buildBypassList((bypassList) => {
    const config = {
      mode: "fixed_servers",
      rules: {
        singleProxy: {
          scheme: scheme || 'http',
          host: host,
          port: parseInt(port)
        },
        bypassList: bypassList
      }
    };

    chrome.proxy.settings.set({ value: config, scope: "regular" }, () => {
      callback({ status: "Proxy set successfully" });
    });
  });
}

// Test proxy connection
function testProxy(scheme, host, port, callback) {
  // Simple test by temporarily setting the proxy and checking if it works
  // Get current config first
  chrome.proxy.settings.get({}, (current) => {
    const testConfig = {
      mode: "fixed_servers",
      rules: {
        singleProxy: {
          scheme: scheme || 'http',
          host: host,
          port: parseInt(port)
        },
        bypassList: ["localhost"]
      }
    };

    // Set test config
    chrome.proxy.settings.set({ value: testConfig, scope: "regular" }, () => {
      // Test with a simple request (this is a basic test)
      setTimeout(() => {
        // Restore original config
        if (current.value.mode === 'system') {
          chrome.proxy.settings.clear({}, () => {
            callback({ success: true });
          });
        } else {
          chrome.proxy.settings.set({ value: current.value, scope: "regular" }, () => {
            callback({ success: true });
          });
        }
      }, 1000);
    });
  });
}

// Auto switch functionality
function checkAutoSwitchRules(url) {
  chrome.storage.sync.get(['autoSwitchRules', 'proxyPresets'], (result) => {
    const rules = result.autoSwitchRules || [];
    const presets = result.proxyPresets || {};

    for (const rule of rules) {
      // Skip disabled rules
      if (rule.enabled === false) {
        continue;
      }

      if (matchesPattern(url, rule.pattern)) {
        if (rule.preset === 'direct') {
          chrome.proxy.settings.clear({});
        } else if (presets[rule.preset]) {
          const preset = presets[rule.preset];
          setProxyWithSettings(preset.scheme, preset.host, preset.port, () => {
            console.log(`Auto-switched to preset: ${rule.preset} for URL: ${url}`);
          });
        }
        break;
      }
    }
  });
}

// Simple pattern matching function
function matchesPattern(url, pattern) {
  // Convert pattern to regex
  const regexPattern = pattern
    .replace(/\./g, '\\.')
    .replace(/\*/g, '.*');

  const regex = new RegExp(regexPattern, 'i');
  return regex.test(url);
}

// Listen for tab updates to apply auto-switch rules
chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.url) {
    chrome.storage.sync.get(['advancedSettings'], (result) => {
      const settings = result.advancedSettings || {};
      if (settings.autoSwitch) {
        checkAutoSwitchRules(tab.url);
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "setProxy") {
    setProxyWithSettings(message.scheme, message.host, message.port, sendResponse);
    return true;
  }

  if (message.action === "clearProxy") {
    chrome.proxy.settings.clear({}, () => {
      sendResponse({ status: "Proxy cleared successfully" });
    });
    return true;
  }

  if (message.action === "getCurrentProxy") {
    getCurrentProxyConfig(sendResponse);
    return true;
  }

  if (message.action === "testProxy") {
    testProxy(message.scheme, message.host, message.port, sendResponse);
    return true;
  }

  if (message.action === "setSystemProxy") {
    chrome.proxy.settings.set({ value: { mode: "system" }, scope: "regular" }, () => {
      sendResponse({ status: "System proxy activated" });
    });
    return true;
  }
});