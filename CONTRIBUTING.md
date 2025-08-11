# 贡献指南

感谢你对 Betterfly Proxy Switcher 项目的关注！我们欢迎所有形式的贡献。

## 🤝 如何贡献

### 报告问题
1. 在提交问题前，请先搜索现有的 Issues
2. 使用问题模板提供详细信息
3. 包含复现步骤和环境信息
4. 如果可能，请提供截图或错误日志

### 功能建议
1. 在 Issues 中描述新功能的使用场景
2. 说明功能的预期行为
3. 考虑对现有功能的影响
4. 欢迎提供设计草图或原型

### 代码贡献
1. Fork 项目到你的 GitHub 账户
2. 创建功能分支：`git checkout -b feature/new-feature`
3. 进行开发并测试
4. 提交更改：`git commit -m 'Add new feature'`
5. 推送分支：`git push origin feature/new-feature`
6. 创建 Pull Request

## 🛠️ 开发环境设置

### 前置要求
- Chrome 浏览器（版本 88+）
- 基本的 HTML/CSS/JavaScript 知识
- Git 版本控制

### 本地开发
1. 克隆项目：
   ```bash
   git clone https://github.com/your-username/betterfly-proxy-switcher.git
   cd betterfly-proxy-switcher
   ```

2. 在 Chrome 中加载扩展：
   - 打开 `chrome://extensions/`
   - 开启"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目根目录

3. 开发和测试：
   - 修改代码后重新加载扩展
   - 使用 `tests/` 目录下的调试文件
   - 参考项目中的测试指南进行功能测试

## 📝 代码规范

### JavaScript
- 使用 ES6+ 语法
- 保持代码简洁和可读性
- 添加必要的注释
- 使用有意义的变量和函数名

### HTML/CSS
- 使用语义化的 HTML 标签
- 保持 CSS 的模块化
- 确保响应式设计
- 遵循无障碍设计原则

### 提交信息
- 使用清晰的提交信息
- 格式：`type: description`
- 类型：feat, fix, docs, style, refactor, test, chore

示例：
```
feat: add auto-switch rules functionality
fix: resolve popup click issues
docs: update installation guide
```

## 🧪 测试

### 功能测试
- 测试所有核心功能
- 验证不同代理类型的兼容性
- 检查错误处理和边界情况
- 确保配置的导入/导出功能正常

### 浏览器兼容性
- 主要支持 Chrome 88+
- 测试不同操作系统（Windows, macOS, Linux）
- 验证扩展权限的正确性

## 📋 Pull Request 检查清单

提交 PR 前请确认：

- [ ] 代码遵循项目的编码规范
- [ ] 添加了必要的测试
- [ ] 更新了相关文档
- [ ] 功能在本地测试通过
- [ ] 提交信息清晰明确
- [ ] 没有引入新的警告或错误

## 🎯 开发优先级

当前需要帮助的领域：

1. **功能增强**
   - PAC 脚本支持
   - 代理测试和延迟检测
   - 更多的自动切换规则选项

2. **用户体验**
   - 界面优化和美化
   - 多语言支持
   - 键盘快捷键

3. **技术改进**
   - 代码重构和优化
   - 单元测试覆盖
   - 构建和部署自动化

4. **文档完善**
   - API 文档
   - 用户手册
   - 开发者指南

## 📞 联系方式

- **Issues**: 通过 GitHub Issues 报告问题
- **Discussions**: 通过 GitHub Discussions 进行讨论
- **Email**: 紧急问题可通过邮件联系

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！你们的每一个贡献都让这个项目变得更好。

---

再次感谢你的贡献！让我们一起打造更好的代理切换工具。