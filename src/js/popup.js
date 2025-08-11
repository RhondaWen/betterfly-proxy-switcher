// Load presets and current settings when popup opens
document.addEventListener('DOMContentLoaded', () => {
  loadPresets();
  loadCurrentSettings();
  setupEventListeners();
});

// Load saved presets into dropdown
function loadPresets() {
  chrome.storage.sync.get(['proxyPresets'], (result) => {
    const presets = result.proxyPresets || {};
    const presetsSelect = document.getElementById('presets');

    // Clear existing options except the first two
    while (presetsSelect.children.length > 2) {
      presetsSelect.removeChild(presetsSelect.lastChild);
    }

    // Add saved presets
    Object.keys(presets).forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      presetsSelect.appendChild(option);
    });
  });
}

// Load current proxy settings and update UI
function loadCurrentSettings() {
  chrome.runtime.sendMessage({ action: "getCurrentProxy" }, (response) => {
    updateUIFromCurrentSettings(response);
  });
}

// Update UI based on current proxy settings
function updateUIFromCurrentSettings(response) {
  console.log('Updating UI from current settings:', response);

  if (response && response.config) {
    const config = response.config;
    console.log('Current proxy config:', config);

    if (config.mode === 'fixed_servers' && config.rules && config.rules.singleProxy) {
      const proxy = config.rules.singleProxy;
      console.log('Current proxy:', proxy);

      // Fill in the manual configuration fields
      document.getElementById('scheme').value = proxy.scheme || '';
      document.getElementById('host').value = proxy.host || '';
      document.getElementById('port').value = proxy.port || '';

      // Try to match with existing presets
      chrome.storage.sync.get(['proxyPresets'], (result) => {
        const presets = result.proxyPresets || {};
        const presetsSelect = document.getElementById('presets');

        for (const [name, preset] of Object.entries(presets)) {
          if (preset.host === proxy.host &&
              preset.port === proxy.port &&
              preset.scheme === proxy.scheme) {
            presetsSelect.value = name;
            console.log(`Matched preset: ${name}`);
            return;
          }
        }

        // No preset match found, clear selection
        presetsSelect.value = '';
        console.log('No matching preset found');
      });
    } else {
      // Clear manual configuration for direct/system proxy
      document.getElementById('scheme').value = '';
      document.getElementById('host').value = '';
      document.getElementById('port').value = '';

      if (config.mode === 'system') {
        // Could add system proxy indication here
        console.log('System proxy mode detected');
      } else {
        // Direct connection
        document.getElementById('presets').value = 'direct';
        console.log('Direct connection mode detected');
      }
    }
  } else {
    // Default state - clear everything
    document.getElementById('scheme').value = '';
    document.getElementById('host').value = '';
    document.getElementById('port').value = '';
    document.getElementById('presets').value = 'direct';
    console.log('Default state - direct connection');
  }
}

// Show status message
function showStatus(message, isError = false) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.className = `status ${isError ? 'error' : 'success'}`;
  statusDiv.style.display = 'block';

  setTimeout(() => {
    statusDiv.style.display = 'none';
  }, 3000);
}

// Setup all event listeners
function setupEventListeners() {
  // Handle preset selection
  document.getElementById('presets').addEventListener('change', (e) => {
    const selectedPreset = e.target.value;

    if (selectedPreset === 'direct') {
      // Clear proxy
      chrome.runtime.sendMessage({
        action: "clearProxy"
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error clearing proxy:', chrome.runtime.lastError.message);
          showStatus('Error clearing proxy', true);
        } else {
          console.log('Direct connection activated:', response);
          showStatus(response.status);
          // Clear manual inputs
          document.getElementById('scheme').value = '';
          document.getElementById('host').value = '';
          document.getElementById('port').value = '';
        }
      });
    } else if (selectedPreset) {
      // Load preset
      chrome.storage.sync.get(['proxyPresets'], (result) => {
        const presets = result.proxyPresets || {};
        const preset = presets[selectedPreset];

        if (preset) {
          document.getElementById('scheme').value = preset.scheme || '';
          document.getElementById('host').value = preset.host || '';
          document.getElementById('port').value = preset.port || '';

          // Apply the preset
          chrome.runtime.sendMessage({
            action: "setProxy",
            scheme: preset.scheme,
            host: preset.host,
            port: preset.port
          }, (response) => {
            if (chrome.runtime.lastError) {
              console.error('Error setting proxy:', chrome.runtime.lastError.message);
              showStatus('Error setting proxy', true);
            } else {
              console.log(`Preset "${selectedPreset}" activated:`, response);
              showStatus(response.status);
            }
          });
        }
      });
    }
  });

  // Set proxy manually
  document.getElementById('set').addEventListener('click', () => {
    const scheme = document.getElementById('scheme').value;
    const host = document.getElementById('host').value;
    const port = document.getElementById('port').value;

    if (!host || !port) {
      showStatus('Please enter both host and port', true);
      return;
    }

    chrome.runtime.sendMessage({
      action: "setProxy",
      scheme: scheme || 'http',
      host,
      port
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error setting proxy:', chrome.runtime.lastError.message);
        showStatus('Error setting proxy', true);
      } else {
        console.log('Manual proxy set:', response);
        showStatus(response.status);
        // Reset preset selection
        document.getElementById('presets').value = '';
      }
    });
  });

  // Clear proxy
  document.getElementById('clear').addEventListener('click', () => {
    chrome.runtime.sendMessage({
      action: "clearProxy"
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error clearing proxy:', chrome.runtime.lastError.message);
        showStatus('Error clearing proxy', true);
      } else {
        console.log('Proxy cleared:', response);
        showStatus(response.status);
        // Clear manual inputs and preset selection
        document.getElementById('scheme').value = '';
        document.getElementById('host').value = '';
        document.getElementById('port').value = '';
        document.getElementById('presets').value = 'direct';
      }
    });
  });

  // Open options page
  document.getElementById('options').addEventListener('click', () => {
    try {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage((result) => {
          if (chrome.runtime.lastError) {
            console.error('openOptionsPage error:', chrome.runtime.lastError.message);
            chrome.tabs.create({ url: chrome.runtime.getURL('src/options.html') });
          }
        });
      } else {
        chrome.tabs.create({ url: chrome.runtime.getURL('src/options.html') });
      }
    } catch (error) {
      console.error('Error opening options page:', error);
      showStatus('Error opening settings page', true);
    }
  });
}