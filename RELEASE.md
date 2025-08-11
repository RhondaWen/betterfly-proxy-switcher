# 🚀 GitHub 发布指南

## 📦 推荐上传的文件

### ✅ 必须上传的核心文件
```
├── manifest.json              # 扩展配置文件 ⭐
├── background.js               # 后台服务脚本 ⭐
├── src/                        # 源代码目录 ⭐
│   ├── popup.html             # 快速设置界面
│   ├── options.html           # 详细配置页面
│   └── js/
│       ├── popup.js           # 弹出界面逻辑
│       └── options.js         # 配置页面逻辑
├── assets/                     # 资源文件目录 ⭐
│   └── icons/                 # 图标文件
│       ├── icon16.png         # 16x16 PNG图标
│       ├── icon48.png         # 48x48 PNG图标
│       ├── icon128.png        # 128x128 PNG图标
│       ├── icon16.svg         # 16x16 SVG图标
│       ├── icon48.svg         # 48x48 SVG图标
│       ├── icon128.svg        # 128x128 SVG图标
│       └── butterfly-icon.svg # 蝴蝶主题图标
├── README.md                   # 项目说明文档 ⭐
├── LICENSE                     # 开源许可证 ⭐
├── CHANGELOG.md                # 版本更新日志 ⭐
├── CONTRIBUTING.md             # 贡献指南 ⭐
├── RELEASE.md                  # 发布指南 ⭐
└── .gitignore                  # Git忽略文件 ⭐
```



### ⚠️ 可选上传的测试文件
```
├── tests/                      # 测试文件目录
│   ├── test-manifest.json     # 测试用配置
│   ├── debug-*.html           # 调试页面
│   └── *.html                 # 测试页面
```

### ❌ 不建议上传的文件
```
├── .vscode/                    # IDE配置文件
├── *.log                       # 日志文件
├── *.tmp                       # 临时文件
├── node_modules/               # 依赖包（如果有）
└── *.zip                       # 打包文件
```

## 🎯 我的建议

### 方案一：完整上传（推荐）
**上传所有文件**，包括测试和文档目录。

**优势：**
- ✅ 完整的项目展示
- ✅ 便于其他开发者学习和贡献
- ✅ 包含完整的测试和调试工具
- ✅ 详细的文档说明

**适合场景：**
- 开源项目
- 希望获得社区贡献
- 作为学习资源分享

### 方案二：精简上传
**只上传核心文件**，不包括 `tests/` 目录。

**优势：**
- ✅ 仓库更简洁
- ✅ 专注于核心功能
- ✅ 减少维护负担

**适合场景：**
- 个人项目
- 不需要外部贡献
- 仅作为代码备份

## 📋 发布前检查清单

### 代码质量检查
- [ ] 所有功能正常工作
- [ ] 没有控制台错误
- [ ] 代码注释完整
- [ ] 变量命名规范

### 文档完整性检查
- [ ] README.md 内容准确
- [ ] 安装说明清晰
- [ ] 功能介绍完整
- [ ] 联系方式正确

### 文件组织检查
- [ ] 目录结构清晰
- [ ] 文件命名规范
- [ ] 路径引用正确
- [ ] 图标文件完整

### 许可证和法律检查
- [ ] LICENSE 文件存在
- [ ] 版权信息正确
- [ ] 第三方依赖声明
- [ ] 隐私政策（如需要）

## 🚀 发布步骤

### 1. 创建 GitHub 仓库
```bash
# 在 GitHub 上创建新仓库
# 仓库名建议：betterfly-proxy-switcher
```

### 2. 初始化本地仓库
```bash
git init
git add .
git commit -m "Initial commit: Betterfly Proxy Switcher v1.1.0"
```

### 3. 连接远程仓库
```bash
git remote add origin https://github.com/your-username/betterfly-proxy-switcher.git
git branch -M main
git push -u origin main
```

### 4. 创建发布标签
```bash
git tag -a v1.1.0 -m "Release version 1.1.0"
git push origin v1.1.0
```

### 5. 创建 GitHub Release
- 在 GitHub 仓库页面点击 "Releases"
- 点击 "Create a new release"
- 选择标签 v1.1.0
- 填写发布说明
- 可以上传打包的 .zip 文件

## 📝 发布说明模板

```markdown
## 🦋 Betterfly Proxy Switcher v1.1.0

### ✨ 新功能
- 🎨 全新的项目目录结构
- 🦋 完整的 SVG 图标集
- 🔧 代理预设管理功能
- ⚙️ 高级设置选项
- 🔄 自动切换规则
- 💾 配置备份和恢复功能

### 🐛 问题修复
- 修复了"More Settings"按钮点击无响应的问题
- 解决了弹出界面状态同步问题
- 修复了预设选择和应用的逻辑错误

### 📦 安装方法
1. 下载源代码
2. 在 Chrome 中加载解压的扩展程序
3. 详细说明请查看 README.md

### 🔗 相关链接
- [使用指南](README.md#使用指南)
- [问题反馈](https://github.com/your-username/betterfly-proxy-switcher/issues)
- [贡献代码](CONTRIBUTING.md)
```

## 🎯 最终建议

**我强烈推荐你上传完整项目**，原因如下：

1. **专业性**：完整的项目结构显示你的专业水平
2. **可维护性**：详细的文档便于后续维护
3. **社区价值**：其他开发者可以学习和贡献
4. **展示价值**：作为你的技术作品集的一部分

你的项目已经组织得很好，文档也很完整，完全可以作为一个高质量的开源项目发布！

## 📞 需要帮助？

如果在发布过程中遇到任何问题，可以：
- 查看 GitHub 官方文档
- 在项目 Issues 中提问
- 参考其他优秀的开源项目

祝你发布顺利！🎉