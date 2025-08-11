# 🦋 Betterfly Proxy Switcher

<div align="center">

![Betterfly Logo](assets/icons/icon128.png)

**一个简洁高效的 Chrome 代理切换扩展**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-blue.svg)](https://chrome.google.com/webstore)
[![Version](https://img.shields.io/badge/version-1.1.0-green.svg)](https://github.com/your-username/betterfly-proxy-switcher/releases)

[安装扩展](#-快速开始) • [功能特性](#-主要特性) • [使用指南](#-使用指南) • [贡献代码](#-贡献指南)

</div>

---

## ✨ 主要特性

🚀 **快速切换** - 一键切换代理预设，支持直接连接  
⚙️ **预设管理** - 保存、编辑、删除常用代理配置  
🔧 **高级设置** - 自定义绕过规则，本地地址处理  
🤖 **自动切换** - 基于URL模式的智能代理切换  
💾 **配置备份** - 导入/导出配置，数据安全保障  
🎨 **现代界面** - 简洁美观，操作直观

## 📁 项目结构

```
├── manifest.json              # 扩展配置文件
├── background.js               # 后台服务脚本
├── src/                        # 源代码目录
│   ├── popup.html             # 快速设置界面
│   ├── options.html           # 详细配置页面
│   └── js/                    # JavaScript文件
│       ├── popup.js           # 弹出界面逻辑
│       └── options.js         # 配置页面逻辑
├── assets/                     # 资源文件目录
│   └── icons/                 # 图标文件
│       ├── icon16.png/svg     # 16x16图标
│       ├── icon48.png/svg     # 48x48图标
│       ├── icon128.png/svg    # 128x128图标
│       └── butterfly-icon.svg # 蝴蝶主题图标
├── tests/                      # 测试文件目录
│   ├── test-manifest.json     # 测试用配置
│   ├── debug-*.html           # 调试页面
│   └── *.html                 # 测试页面
├── .gitignore                  # Git忽略文件
├── LICENSE                     # 开源许可证
├── CHANGELOG.md                # 版本更新日志
├── CONTRIBUTING.md             # 贡献指南
└── README.md                   # 项目说明文档
```

## 🚀 快速开始

### 安装方法

1. 下载或克隆项目文件到本地文件夹
2. 打开 Chrome 浏览器，进入 `chrome://extensions/`
3. 开启右上角的「开发者模式」
4. 点击「加载已解压的扩展程序」
5. 选择项目文件夹
6. 扩展安装完成，点击工具栏图标开始使用

### 5分钟快速配置

1. **创建第一个代理预设**：
   ```
   点击扩展图标 → More Settings → Proxy Presets 标签
   输入预设名称：公司代理
   选择 Scheme：http
   输入 Host：proxy.company.com
   输入 Port：8080
   点击 Save Preset
   ```

2. **快速切换代理**：
   ```
   点击扩展图标
   在 Quick Presets 下拉菜单选择：公司代理
   代理立即生效！
   ```

3. **设置绕过规则**：
   ```
   More Settings → Advanced Settings 标签
   在 Bypass List 中添加：
   localhost
   127.0.0.1
   *.local
   company-internal.com
   ```

### 常用代理配置示例

#### HTTP代理
```
Scheme: http
Host: proxy.example.com
Port: 8080
```

#### SOCKS5代理（推荐）
```
Scheme: socks5
Host: socks.example.com
Port: 1080
Username: your_username (可选)
Password: your_password (可选)
```

#### 企业代理（带认证）
```
Scheme: http
Host: corporate-proxy.company.com
Port: 3128
Username: domain\username
Password: your_password
```

## 📖 使用指南

### 快速设置（弹出界面）

1. **使用预设**：
   - 点击扩展图标打开弹出界面
   - 在「Quick Presets」下拉菜单中选择预设
   - 自动应用代理设置

2. **手动配置**：
   - 在「Manual Configuration」部分输入：
     - Scheme: `http`、`https`、`socks4` 或 `socks5`
     - Host: 代理服务器地址
     - Port: 端口号
   - 点击「Set Proxy」应用设置
   - 点击「Clear Proxy」清除代理

3. **访问高级设置**：
   - 点击「More Settings」按钮打开详细配置页面

### 详细配置（选项页面）

#### 1. 代理预设管理
- **创建预设**：输入名称、代理信息，点击「Save Preset」
- **编辑预设**：点击预设旁的「Edit」按钮
- **删除预设**：点击「Delete」按钮
- **测试连接**：点击「Test Connection」验证代理可用性

#### 2. 高级设置
- **绕过列表**：设置不使用代理的域名或IP
- **本地地址绕过**：自动绕过本地地址
- **自动检测**：启用系统代理自动检测

#### 3. 自动切换规则
- **添加规则**：为特定URL模式设置专用代理
- **模式匹配**：支持通配符，如 `*.google.com`
- **规则管理**：查看、删除已有规则

#### 4. 备份与恢复
- **导出配置**：下载当前所有设置为JSON文件
- **导入配置**：从JSON文件恢复设置
- **重置设置**：清除所有配置，恢复默认状态

## 🔧 技术特性

- **Manifest V3**：使用最新的Chrome扩展标准
- **现代JavaScript**：ES6+语法，模块化设计
- **响应式UI**：适配不同屏幕尺寸
- **数据持久化**：使用Chrome Storage API
- **权限最小化**：仅请求必要的扩展权限

## 🎯 支持的代理类型

- **HTTP代理**：标准HTTP代理服务器
- **HTTPS代理**：加密HTTPS代理服务器
- **SOCKS4代理**：SOCKS4协议代理
- **SOCKS5代理**：SOCKS5协议代理（推荐）

## 📝 使用提示

- 代理设置会立即生效，无需重启浏览器
- 绕过列表支持域名、IP地址和通配符
- 自动切换规则按添加顺序匹配，第一个匹配的规则生效
- 配置数据自动同步到Chrome账户（如果已登录）
- 建议定期备份配置以防数据丢失

## 🔍 故障排除

### 常见问题

1. **代理设置不生效**
   - 检查代理服务器地址和端口是否正确
   - 确认代理服务器是否正常运行
   - 查看是否被绕过规则影响

2. **扩展无法加载**
   - 确认所有文件都在同一文件夹内
   - 检查manifest.json语法是否正确
   - 重新加载扩展程序

3. **配置无法保存**
   - 检查Chrome存储权限
   - 确认输入数据格式正确
   - 尝试重启浏览器

### 调试方法

- 右键扩展图标 → 检查弹出式窗口 → 查看控制台错误
- 进入 `chrome://extensions/` → 点击扩展详情 → 检查背景页
- 查看 `chrome://net-internals/#proxy` 确认代理状态

## � 详细功能说明

### 界面截图说明

#### 简单界面（Popup）
- **预设选择区域**：快速选择已保存的代理配置
- **手动配置区域**：输入自定义代理设置
- **操作按钮**：设置代理、清除代理、打开详细设置
- **状态显示**：实时显示操作结果和错误信息

#### 详细配置页面（Options）
- **标签页导航**：四个功能模块的清晰分类
- **预设管理**：完整的CRUD操作界面
- **高级设置**：专业级配置选项
- **规则管理**：智能切换规则配置
- **备份恢复**：数据安全保障功能

### 配置文件格式

导出的配置文件为JSON格式，包含以下结构：

```json
{
  "proxyPresets": {
    "预设名称": {
      "scheme": "http",
      "host": "proxy.example.com",
      "port": 8080,
      "username": "用户名（可选）",
      "password": "密码（可选）"
    }
  },
  "advancedSettings": {
    "bypassList": "localhost\n127.0.0.1\n*.local",
    "bypassLocal": true,
    "autoDetect": false
  },
  "autoSwitchRules": [
    {
      "pattern": "*.google.com",
      "preset": "预设名称或direct"
    }
  ],
  "exportDate": "2024-01-01T00:00:00.000Z"
}
```

### URL模式匹配规则

自动切换规则支持以下模式：

- **精确匹配**：`https://www.example.com/path`
- **域名通配符**：`*.example.com`（匹配所有子域名）
- **路径通配符**：`https://example.com/*`（匹配所有路径）
- **协议通配符**：`*://example.com`（匹配http和https）
- **组合模式**：`*://*.example.com/*`（最灵活的匹配）

### 安全注意事项

1. **密码存储**：代理密码以明文形式存储在Chrome同步数据中
2. **权限范围**：扩展仅能访问代理设置，无法读取浏览数据
3. **数据同步**：配置会同步到已登录的Chrome账户
4. **本地存储**：未登录时配置仅保存在本地设备

## � 高级使用技巧

### 1. 智能代理切换策略

**场景一：工作环境自动切换**
```
规则1: *.company.com → 公司代理
规则2: *.github.com → 开发代理
规则3: *.google.com → 直接连接
```

**场景二：地区访问优化**
```
规则1: *.youtube.com → 海外代理
规则2: *.bilibili.com → 直接连接
规则3: *.netflix.com → 流媒体专用代理
```

### 2. 绕过规则最佳实践

**基础绕过列表**：
```
localhost
127.0.0.1
::1
*.local
10.*
172.16.*
192.168.*
```

**企业环境绕过**：
```
*.company.com
*.corp
*.internal
company-mail.com
company-wiki.com
```

### 3. 代理链配置技巧

虽然本扩展不直接支持代理链，但可以通过以下方式实现：

1. **本地代理软件**：使用Privoxy等软件作为中间层
2. **SSH隧道**：通过SSH建立SOCKS代理
3. **VPN + 代理**：先连接VPN，再使用HTTP代理

### 4. 性能优化建议

- **减少规则数量**：过多规则会影响匹配性能
- **优先级排序**：常用规则放在前面
- **定期清理**：删除不再使用的预设和规则
- **测试连接**：定期测试代理可用性

## ❓ 常见问题 (FAQ)

### Q1: 为什么代理设置后网页无法访问？

**A**: 可能的原因和解决方案：
- 检查代理服务器地址和端口是否正确
- 确认代理服务器是否正常运行
- 检查是否需要用户名和密码认证
- 查看目标网站是否在绕过列表中

### Q2: 如何知道当前使用的是哪个代理？

**A**: 几种检查方法：
- 访问 `https://whatismyipaddress.com/` 查看IP地址
- 在扩展popup中查看当前配置
- 使用 `chrome://net-internals/#proxy` 查看详细信息

### Q3: 自动切换规则不生效怎么办？

**A**: 排查步骤：
- 确认规则模式是否正确（支持通配符）
- 检查规则顺序（第一个匹配的规则生效）
- 验证目标预设是否存在
- 重新加载扩展程序

### Q4: 配置数据会丢失吗？

**A**: 数据安全保障：
- 已登录Chrome账户：配置自动同步
- 未登录：建议定期导出配置备份
- 支持一键导入恢复所有设置

### Q5: 支持PAC脚本吗？

**A**: 当前版本不直接支持PAC脚本，但可以通过自动切换规则实现类似功能。未来版本可能会添加PAC支持。

### Q6: 如何批量导入代理配置？

**A**: 两种方式：
- 手动编辑导出的JSON文件，然后导入
- 在配置页面逐个添加预设（推荐）

### Q7: 扩展会影响浏览器性能吗？

**A**: 性能影响极小：
- 使用Chrome原生API，性能优化
- 仅在需要时激活，平时处于休眠状态
- 配置数据存储在本地，访问速度快

## ��🚀 版本历史

### v1.1 (当前版本)
- ✨ 新增预设管理功能
- ✨ 新增详细配置页面
- ✨ 新增自动切换规则
- ✨ 新增配置备份恢复
- 🎨 全新现代化界面设计
- 🔧 增强错误处理和状态反馈

### v1.0 (初始版本)
- ✅ 基本代理设置功能
- ✅ 简单的弹出界面
- ✅ 代理清除功能

## 📄 许可证

本项目采用 MIT 许可证，详情请查看 LICENSE 文件。

## 🤝 贡献指南

我们欢迎所有形式的贡献！无论是报告bug、提出功能建议，还是提交代码改进。

### 如何贡献

1. **报告问题**：
   - 在GitHub Issues中详细描述问题
   - 提供复现步骤和环境信息
   - 附上相关的错误截图或日志

2. **功能建议**：
   - 描述新功能的使用场景
   - 说明功能的预期行为
   - 考虑对现有功能的影响

3. **代码贡献**：
   - Fork项目到您的GitHub账户
   - 创建功能分支：`git checkout -b feature/new-feature`
   - 提交更改：`git commit -m 'Add new feature'`
   - 推送分支：`git push origin feature/new-feature`
   - 创建Pull Request

### 开发环境设置

1. 克隆项目：`git clone [repository-url]`
2. 在Chrome中加载扩展进行测试
3. 修改代码后重新加载扩展
4. 运行测试确保功能正常

### 代码规范

- 使用ES6+语法
- 保持代码简洁和可读性
- 添加必要的注释
- 遵循现有的代码风格

## 🔮 未来计划

### 即将推出的功能

- [ ] **PAC脚本支持**：完整的PAC文件配置
- [ ] **代理测试增强**：延迟检测和可用性监控
- [ ] **流量统计**：代理使用情况统计
- [ ] **主题定制**：多种界面主题选择
- [ ] **快捷键支持**：键盘快速切换代理
- [ ] **代理链配置**：多级代理支持
- [ ] **移动端适配**：支持移动版Chrome

### 长期目标

- 🌐 **多浏览器支持**：Firefox、Edge等
- 🔒 **安全增强**：密码加密存储
- 📊 **高级分析**：网络流量分析
- 🤖 **智能推荐**：基于使用习惯的代理推荐

## 📞 联系我们

- **问题反馈**：通过GitHub Issues
- **功能建议**：通过GitHub Discussions
- **安全问题**：请通过私有渠道联系

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户！

特别感谢：
- Chrome Extensions API 文档团队
- SwitchyOmega 项目的设计灵感
- 所有测试用户的反馈和建议

---

**祝您使用愉快！** 🎉

如有问题或建议，请随时通过GitHub Issues反馈。
