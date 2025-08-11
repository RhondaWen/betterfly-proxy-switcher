// Initialize options page
document.addEventListener('DOMContentLoaded', () => {
  initializeTabs();
  loadPresets();
  loadAdvancedSettings();
  loadAutoSwitchRules();
  setupEventListeners();

  // Reset editing state on page load
  editingPresetName = null;
});

// Tab functionality
function initializeTabs() {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      document.getElementById(`${targetTab}-tab`).classList.add('active');

      // Check rule status when switching to rules tab
      if (targetTab === 'rules') {
        setTimeout(checkRuleStatus, 100); // Small delay to ensure tab is visible
      }
    });
  });
}

// Show status message
function showStatus(message, isError = false) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.className = `status-message ${isError ? 'error' : 'success'}`;
  statusDiv.style.display = 'block';
  
  setTimeout(() => {
    statusDiv.style.display = 'none';
  }, 4000);
}

// Load and display presets
function loadPresets() {
  chrome.storage.sync.get(['proxyPresets'], (result) => {
    const presets = result.proxyPresets || {};
    const presetsList = document.getElementById('presets-list');
    const rulePresetSelect = document.getElementById('rule-preset');
    
    // Clear existing presets
    presetsList.innerHTML = '';
    
    // Clear and repopulate rule preset select
    while (rulePresetSelect.children.length > 1) {
      rulePresetSelect.removeChild(rulePresetSelect.lastChild);
    }
    
    Object.keys(presets).forEach(name => {
      const preset = presets[name];
      
      // Add to presets list
      const presetDiv = document.createElement('div');
      presetDiv.className = 'preset-item';

      const presetInfo = document.createElement('div');
      presetInfo.className = 'preset-info';
      presetInfo.innerHTML = `
        <h4>${name}</h4>
        <p>${preset.scheme}://${preset.host}:${preset.port}</p>
      `;

      const presetActions = document.createElement('div');
      presetActions.className = 'preset-actions';

      const editBtn = document.createElement('button');
      editBtn.className = 'btn btn-secondary';
      editBtn.textContent = 'Edit';
      editBtn.onclick = () => editPreset(name);

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger';
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => deletePreset(name);

      presetActions.appendChild(editBtn);
      presetActions.appendChild(deleteBtn);

      presetDiv.appendChild(presetInfo);
      presetDiv.appendChild(presetActions);
      presetsList.appendChild(presetDiv);
      
      // Add to rule preset select
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      rulePresetSelect.appendChild(option);
    });
  });
}

// Save preset
function savePreset() {
  const name = document.getElementById('preset-name').value.trim();
  const scheme = document.getElementById('preset-scheme').value;
  const host = document.getElementById('preset-host').value.trim();
  const port = document.getElementById('preset-port').value.trim();
  const username = document.getElementById('preset-username').value.trim();
  const password = document.getElementById('preset-password').value.trim();

  if (!name || !host || !port) {
    showStatus('Please fill in all required fields', true);
    return;
  }

  chrome.storage.sync.get(['proxyPresets'], (result) => {
    const presets = result.proxyPresets || {};

    // If editing and name changed, delete the old preset
    if (editingPresetName && editingPresetName !== name) {
      delete presets[editingPresetName];
    }

    // Save the preset (new or updated)
    presets[name] = {
      scheme,
      host,
      port: parseInt(port),
      username: username || undefined,
      password: password || undefined
    };

    chrome.storage.sync.set({ proxyPresets: presets }, () => {
      const action = editingPresetName ? 'updated' : 'saved';
      showStatus(`Preset "${name}" ${action} successfully`);
      loadPresets();
      clearPresetForm();
    });
  });
}

// Track editing state
let editingPresetName = null;

// Edit preset
function editPreset(name) {
  chrome.storage.sync.get(['proxyPresets'], (result) => {
    const presets = result.proxyPresets || {};
    const preset = presets[name];

    if (preset) {
      // Set editing mode
      editingPresetName = name;

      // Fill form with preset data
      document.getElementById('preset-name').value = name;
      document.getElementById('preset-scheme').value = preset.scheme;
      document.getElementById('preset-host').value = preset.host;
      document.getElementById('preset-port').value = preset.port;
      document.getElementById('preset-username').value = preset.username || '';
      document.getElementById('preset-password').value = preset.password || '';

      // Update button text to indicate editing
      const saveBtn = document.querySelector('#save-preset');
      if (saveBtn) {
        saveBtn.textContent = 'Update Preset';
      }
    }
  });
}

// Delete preset
function deletePreset(name) {
  if (confirm(`Are you sure you want to delete the preset "${name}"?`)) {
    chrome.storage.sync.get(['proxyPresets'], (result) => {
      const presets = result.proxyPresets || {};
      delete presets[name];
      
      chrome.storage.sync.set({ proxyPresets: presets }, () => {
        showStatus(`Preset "${name}" deleted successfully`);
        loadPresets();
      });
    });
  }
}

// Clear preset form
function clearPresetForm() {
  document.getElementById('preset-name').value = '';
  document.getElementById('preset-host').value = '';
  document.getElementById('preset-port').value = '';
  document.getElementById('preset-username').value = '';
  document.getElementById('preset-password').value = '';

  // Reset editing state
  editingPresetName = null;

  // Reset button text
  const saveBtn = document.querySelector('#save-preset');
  if (saveBtn) {
    saveBtn.textContent = 'Save Preset';
  }
}

// Test preset connection
function testPreset() {
  const scheme = document.getElementById('preset-scheme').value;
  const host = document.getElementById('preset-host').value.trim();
  const port = document.getElementById('preset-port').value.trim();

  if (!host || !port) {
    showStatus('Please enter host and port to test', true);
    return;
  }

  // Simple connection test by trying to set the proxy temporarily
  chrome.runtime.sendMessage({
    action: "testProxy",
    scheme,
    host,
    port
  }, (response) => {
    if (response && response.success) {
      showStatus('Connection test successful');
    } else {
      showStatus('Connection test failed', true);
    }
  });
}

// Load advanced settings
function loadAdvancedSettings() {
  chrome.storage.sync.get(['advancedSettings'], (result) => {
    const settings = result.advancedSettings || {};
    
    document.getElementById('bypass-list').value = settings.bypassList || 'localhost\n127.0.0.1\n*.local';
    document.getElementById('bypass-local').checked = settings.bypassLocal !== false;
    document.getElementById('auto-detect').checked = settings.autoDetect === true;
  });
}

// Save advanced settings
function saveAdvancedSettings() {
  const settings = {
    bypassList: document.getElementById('bypass-list').value,
    bypassLocal: document.getElementById('bypass-local').checked,
    autoDetect: document.getElementById('auto-detect').checked
  };

  chrome.storage.sync.set({ advancedSettings: settings }, () => {
    showStatus('Advanced settings saved successfully');
  });
}

// Load auto switch rules
function loadAutoSwitchRules() {
  chrome.storage.sync.get(['autoSwitchRules'], (result) => {
    const rules = result.autoSwitchRules || [];
    const rulesList = document.getElementById('rules-list');
    
    rulesList.innerHTML = '';
    
    rules.forEach((rule, index) => {
      const ruleDiv = document.createElement('div');
      ruleDiv.className = 'preset-item';
      ruleDiv.setAttribute('data-rule-index', index);

      // Add disabled class if rule is disabled
      if (rule.enabled === false) {
        ruleDiv.classList.add('rule-disabled');
      }

      const ruleInfo = document.createElement('div');
      ruleInfo.className = 'preset-info';

      // Create status indicator
      const statusIndicator = document.createElement('span');
      statusIndicator.className = 'rule-status';
      statusIndicator.textContent = '●';
      statusIndicator.title = 'Rule status';

      ruleInfo.innerHTML = `
        <h4>${rule.pattern} <span class="rule-status-container"></span></h4>
        <p>Proxy: ${rule.preset} ${rule.enabled === false ? '<span class="rule-disabled-text">(Disabled)</span>' : ''}</p>
      `;

      // Add status indicator to the container
      const statusContainer = ruleInfo.querySelector('.rule-status-container');
      statusContainer.appendChild(statusIndicator);

      const ruleActions = document.createElement('div');
      ruleActions.className = 'preset-actions';

      // Toggle enable/disable button
      const toggleBtn = document.createElement('button');
      toggleBtn.className = rule.enabled === false ? 'btn btn-success' : 'btn btn-warning';
      toggleBtn.textContent = rule.enabled === false ? 'Enable' : 'Disable';
      toggleBtn.onclick = () => toggleRule(index);

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger';
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => deleteRule(index);

      ruleActions.appendChild(toggleBtn);
      ruleActions.appendChild(deleteBtn);

      ruleDiv.appendChild(ruleInfo);
      ruleDiv.appendChild(ruleActions);
      rulesList.appendChild(ruleDiv);
    });

    // Check rule status after loading
    checkRuleStatus();
  });
}

// Check if rules are currently active
function checkRuleStatus() {
  // Get current active tab URL
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;

    const currentUrl = tabs[0].url;
    if (!currentUrl) return;

    // Get auto switch rules
    chrome.storage.sync.get(['autoSwitchRules'], (result) => {
      const rules = result.autoSwitchRules || [];

      rules.forEach((rule, index) => {
        const ruleDiv = document.querySelector(`[data-rule-index="${index}"]`);
        if (!ruleDiv) return;

        const statusIndicator = ruleDiv.querySelector('.rule-status');
        if (!statusIndicator) return;

        // If rule is disabled, show disabled status
        if (rule.enabled === false) {
          statusIndicator.className = 'rule-status disabled';
          statusIndicator.title = 'Rule is disabled';
          return;
        }

        // Check if current URL matches the rule pattern
        const isActive = matchesPattern(currentUrl, rule.pattern);

        if (isActive) {
          statusIndicator.className = 'rule-status active';
          statusIndicator.title = `Active - matches current URL: ${currentUrl}`;
        } else {
          statusIndicator.className = 'rule-status inactive';
          statusIndicator.title = 'Inactive - not matching current URL';
        }
      });
    });
  });
}

// Check if URL matches pattern (supports wildcards)
function matchesPattern(url, pattern) {
  try {
    // Convert wildcard pattern to regex
    const regexPattern = pattern
      .replace(/\./g, '\\.')  // Escape dots
      .replace(/\*/g, '.*');  // Convert * to .*

    const regex = new RegExp(regexPattern, 'i');
    return regex.test(url);
  } catch (e) {
    console.error('Invalid pattern:', pattern, e);
    return false;
  }
}

// Add auto switch rule
function addAutoSwitchRule() {
  const pattern = document.getElementById('rule-pattern').value.trim();
  const preset = document.getElementById('rule-preset').value;

  if (!pattern) {
    showStatus('Please enter a URL pattern', true);
    return;
  }

  chrome.storage.sync.get(['autoSwitchRules'], (result) => {
    const rules = result.autoSwitchRules || [];

    // Add new rule with enabled: true by default
    rules.push({ pattern, preset, enabled: true });

    chrome.storage.sync.set({ autoSwitchRules: rules }, () => {
      showStatus('Auto switch rule added successfully');
      loadAutoSwitchRules();
      document.getElementById('rule-pattern').value = '';
      document.getElementById('rule-preset').value = 'direct';
    });
  });
}

// Toggle rule enabled/disabled
function toggleRule(index) {
  chrome.storage.sync.get(['autoSwitchRules'], (result) => {
    const rules = result.autoSwitchRules || [];

    if (rules[index]) {
      // Toggle enabled state (default to true if not set)
      rules[index].enabled = rules[index].enabled === false ? true : false;

      chrome.storage.sync.set({ autoSwitchRules: rules }, () => {
        const status = rules[index].enabled ? 'enabled' : 'disabled';
        showStatus(`Rule ${status} successfully`);
        loadAutoSwitchRules();
      });
    }
  });
}

// Delete auto switch rule
function deleteRule(index) {
  chrome.storage.sync.get(['autoSwitchRules'], (result) => {
    const rules = result.autoSwitchRules || [];
    rules.splice(index, 1);

    chrome.storage.sync.set({ autoSwitchRules: rules }, () => {
      showStatus('Rule deleted successfully');
      loadAutoSwitchRules();
    });
  });
}

// Export configuration
function exportConfiguration() {
  chrome.storage.sync.get(null, (data) => {
    const config = {
      proxyPresets: data.proxyPresets || {},
      advancedSettings: data.advancedSettings || {},
      autoSwitchRules: data.autoSwitchRules || [],
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `proxy-switcher-config-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showStatus('Configuration exported successfully');
  });
}

// Import configuration
function importConfiguration() {
  const fileInput = document.getElementById('import-file');
  const file = fileInput.files[0];
  
  if (!file) {
    showStatus('Please select a file to import', true);
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const config = JSON.parse(e.target.result);
      
      chrome.storage.sync.set(config, () => {
        showStatus('Configuration imported successfully');
        loadPresets();
        loadAdvancedSettings();
        loadAutoSwitchRules();
        fileInput.value = '';
      });
    } catch (error) {
      showStatus('Invalid configuration file', true);
    }
  };
  
  reader.readAsText(file);
}

// Reset all settings
function resetAllSettings() {
  if (confirm('Are you sure you want to reset all settings? This action cannot be undone.')) {
    chrome.storage.sync.clear(() => {
      showStatus('All settings have been reset');
      loadPresets();
      loadAdvancedSettings();
      loadAutoSwitchRules();
      clearPresetForm();
    });
  }
}

// Setup event listeners
function setupEventListeners() {
  document.getElementById('save-preset').addEventListener('click', savePreset);
  document.getElementById('test-preset').addEventListener('click', testPreset);
  document.getElementById('save-advanced').addEventListener('click', saveAdvancedSettings);
  document.getElementById('add-rule').addEventListener('click', addAutoSwitchRule);
  document.getElementById('refresh-status').addEventListener('click', checkRuleStatus);
  document.getElementById('export-config').addEventListener('click', exportConfiguration);
  document.getElementById('import-config').addEventListener('click', importConfiguration);
  document.getElementById('reset-all').addEventListener('click', resetAllSettings);

  // Set up periodic status checking (every 5 seconds when on rules tab)
  setInterval(() => {
    const rulesTab = document.getElementById('rules-tab');
    if (rulesTab && rulesTab.classList.contains('active')) {
      checkRuleStatus();
    }
  }, 5000);
}

// Make functions globally available
window.editPreset = editPreset;
window.deletePreset = deletePreset;
window.toggleRule = toggleRule;
window.deleteRule = deleteRule;