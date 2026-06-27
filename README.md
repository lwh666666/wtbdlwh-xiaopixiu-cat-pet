# 小皮休桌宠 (Cat Pet)

> **透明背景、始终置顶的桌面宠物 —— 猫头 360° 跟随鼠标转动**
>
> 基于 Electron 开发，从真实猫咪视频逐帧提取 + AI 抠图制作动画精灵图。

---

## ✨ 功能一览

-  **透明窗口** — 无边框、无背景，只有猫咪浮在桌面上
-  **始终置顶** — 不会被其他窗口挡住。连全屏程序也不会覆盖
-  **360° 鼠标跟随** — 猫头根据鼠标位置平滑旋转，圆插值无跳帧（150 帧动画）
-  **空闲状态** — 鼠标靠近时，猫头自然回到正面
-  **右键菜单** — 解除锁定 / 锁定 / 开机自启动 / 退出
-  **拖拽移动** — 解锁后可拖到屏幕任意位置
-  **鼠标穿透** — 锁定状态下点击穿透到后面窗口
-  **开机自启动** — 可在右键菜单中一键设置
-  **便携 exe** — 打包后无需 Node.js，一个文件夹拷贝到其他电脑即可运行

---

## 📦 快速开始

### 方式一：克隆源码运行（开发者）

`ash
git clone https://github.com/lwh666666/wtbdlwh-xiaopixiu-cat-pet.git
cd wtbdlwh-xiaopixiu-cat-pet
npm install
npm start
`

### 方式二：双击 start.bat

start.bat 会自动检测并安装依赖，双击即可运行。

### 方式三：便携版 exe（无需 Node.js）

`ash
npm install
npm run build
`

打包产物在 
elease/ 目录。把整个 
elease/小皮休/ 文件夹复制到其他电脑即可直接运行。

---

## 🎮 使用说明

| 操作 | 效果 |
|------|------|
| 双击 start.bat 或 小皮休.exe | 启动桌宠，默认在桌面右下角 |
| **右键点击猫咪** | 弹出菜单 |
| 菜单 > **解除锁定** | 猫咪可拖拽、可操作 |
| 菜单 > **开机自启动** | 下次开机自动运行 |
| 菜单 > **退出** | 关闭程序 |
| 左键按住猫咪（解锁后） | 拖到屏幕任意位置 |

---

## 📁 项目结构

`
wtbdlwh-xiaopixiu-cat-pet/
├── main.js              # Electron 主进程（窗口、鼠标追踪、托盘）
├── preload.js           # IPC 通信桥接
├── renderer/
│   ├── index.html       # 透明窗口界面
│   └── app.js           # 动画核心（帧定位、插值、交互）
├── resources/
│   ├── spritesheet.png  # 150帧猫头精灵图（10列×15行，160×160/帧）
│   ├── icon.png         # 托盘图标 32×32
│   └── icon256.png      # 应用图标 256×256
├── package.json         # npm 依赖配置
├── start.bat            # 双击启动脚本
├── tip.md               # 新宠物替换指南
└── README.md            # 本文件
`

---

## ❤️ 替换新宠物

1. 准备一个宠物转头视频（5 秒左右，30fps）
2. 把视频路径给 AI 助手，按 	ip.md 中的流程操作
3. AI 会自动做：抽帧 → 抠图 → 拼精灵图 → 替换 
esources/spritesheet.png
4. 重新打包即可

---

## 💻 技术栈

| 技术 | 用途 |
|------|------|
| Electron 33 | 桌面框架 |
| Node.js | 主进程逻辑 |
| Chromium | 渲染透明窗口 |
| rembg (Python) | 视频帧 AI 抠图 |
| PIL/Pillow | 图片处理 |
| rcedit | 修改 exe 图标 |

---

## 🚩 支持平台

- Windows 10 (1809+)
- Windows 11

**注意：** Electron 33 不再支持 Windows 7/8。如需支持旧系统，需降级到 Electron 22。

---

## 📜 许可证

[MIT](LICENSE)

Copyright © 2026 lwh666666

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the Software), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.

---

## 🛠️ 如果 start.bat 无法运行

### 手动创建 start.bat

在程序所在文件夹新建文本文件，重命名为 start.bat，右键编辑，粘贴以下内容：

`atch
@echo off
cd /d "%~dp0"
start "" "node_modules\electron\dist\electron.exe" "%~dp0."
exit
`

保存后双击 start.bat 即可启动。

### 或者直接用 CMD 启动

`cmd
cd 程序所在文件夹路径
npx electron .
`

### 便携版 (release/小皮休)

便携版不需要 start.bat，直接双击 小皮休.exe 即可运行。