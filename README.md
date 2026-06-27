# 小皮休桌宠 (Cat Pet)

> **透明背景、始终置顶的桌面宠物 —— 猫头 360 度跟随鼠标转动**  
> 基于 Electron 开发，从真实猫咪视频逐帧提取 + AI 抠图制作动画精灵图。

---

## ✨ 功能一览

- **透明窗口** - 无边框、无背景，只有猫咪浮在桌面上
- **始终置顶** - 不会被其他窗口挡住。连全屏程序也不会覆盖
- **360 度鼠标跟随** - 猫头根据鼠标位置平滑旋转，圆插值无跳帧（150 帧动画）
- **空闲状态** - 鼠标靠近时，猫头自然回到正面
- **右键菜单** - 解除锁定/锁定/开机自启动/退出
- **拖拽移动** - 解锁后可拖到屏幕任意位置
- **鼠标穿透** - 锁定状态下点击穿透到后面窗口
- **开机自启动** - 可在右键菜单中一键设置
- **便携 exe** - 打包后无需 Node.js

---

## 🚀 快速开始

### 方式一：克隆源码运行（开发者）

```bash
git clone https://github.com/lwh666666/wtbdlwh-xiaopixiu-cat-pet.git
cd wtbdlwh-xiaopixiu-cat-pet
npm install
npm start
```

### 方式二：双击 start.bat

start.bat 会自动检测并安装依赖，双击即可运行。

### 方式三：便携版 exe（无需 Node.js）

```bash
npm install
npm run build
```

打包产物在 release/ 目录。

---

## 🎮 使用说明

| 操作 | 效果 |
|------|------|
| 双击 start.bat 或 小皮休.exe | 启动桌宠，默认在桌面右下角 |
| 右键点击猫咪 | 弹出菜单 |
| 菜单 > 解除锁定 | 猫咪可拖拽、可操作 |
| 菜单 > 开机自启动 | 下次开机自动运行 |
| 菜单 > 退出 | 关闭程序 |
| 左键按住猫咪（解锁后） | 拖到屏幕任意位置 |

---

## 📄 MIT

MIT License

Copyright (c) 2026 lwh666666

Permission is hereby granted, free of charge...
---

## 🛠️ 如果 start.bat 无法运行

### 手动创建 start.bat

在程序所在文件夹新建文本文件，重命名为 start.bat，右键编辑，粘贴以下内容：

```batch
@echo off
cd /d "%~dp0"
start "" "node_modules\electron\dist\electron.exe" "%~dp0."
exit
```

保存后双击 start.bat 即可启动。

### 或者直接用 CMD 启动

```cmd
cd 程序所在文件夹路径
npx electron .
```

### 便携版 (release/小皮休)

便携版不需要 start.bat，直接双击 小皮休.exe 即可运行。

