# 🌟 明星我最懂 - Star Quiz Game

一个炫酷的网页问答游戏，测试你对明星的了解程度！

## ✨ 项目简介

明星我最懂是一款基于React + TypeScript开发的交互式问答游戏。游戏包含丰富的明星题库，支持单人挑战和双人PK两种模式，配有精美的动画效果和视觉反馈。

### 主要特色

- 🎮 **双模式游戏**：单人挑战 / AI对战
- 🎯 **动态计分系统**：基础分 + 速度倍数 + 连击加成
- 🔥 **连击特效**：2连、3连、5连不同视觉效果
- ⏱️ **倒计时压力**：颜色变化 + 心跳动画
- 💡 **道具系统**：提示、跳过、加时
- 🎲 **随机事件**：双倍狂欢、命运轮盘、极速挑战
- 📊 **排行榜系统**：本地存储最高分记录
- 🎨 **炫酷动画**：基于Framer Motion的流畅动效

## 🛠️ 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **状态管理**: React Hooks (useReducer + useContext)
- **音效**: Howler.js (可选)

## 📦 项目结构

```
star-quiz-game/
├── src/
│   ├── components/           # React组件
│   │   ├── WelcomeScreen.tsx      # 欢迎页
│   │   ├── ModeSelection.tsx      # 模式选择
│   │   ├── CategorySelection.tsx  # 题库选择
│   │   ├── GameScreen.tsx         # 游戏主界面
│   │   ├── QuestionCard.tsx       # 题目卡片
│   │   ├── ScoreBoard.tsx         # 计分板
│   │   ├── ComboEffect.tsx        # 连击特效
│   │   ├── CountdownTimer.tsx     # 倒计时
│   │   ├── PowerUpPanel.tsx       # 道具面板
│   │   ├── ResultScreen.tsx       # 结算页
│   │   └── Leaderboard.tsx        # 排行榜
│   ├── types/                # TypeScript类型定义
│   │   └── game.types.ts
│   ├── data/                 # 题库数据
│   │   └── questions.ts
│   ├── hooks/                # 自定义Hooks
│   │   ├── useGameState.ts
│   │   └── useTimer.ts
│   ├── utils/                # 工具函数
│   │   ├── scoreCalculator.ts
│   │   ├── aiOpponent.ts
│   │   ├── storage.ts
│   │   ├── nameGenerator.ts
│   │   └── eventCards.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000 查看应用

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录

### 预览生产版本

```bash
npm run preview
```

## 🎮 游戏玩法

### 游戏流程

1. **欢迎页**：输入昵称（可随机生成）
2. **模式选择**：选择单人挑战或双人PK
3. **题库选择**：从5个题库分类中选择
4. **答题环节**：10秒倒计时内选择答案
5. **结算页面**：查看得分和统计数据

### 计分规则

```typescript
最终得分 = 基础分 × 速度倍数 × 连击倍数 × 事件倍数

基础分：
- 简单题：10分
- 中等题：20分
- 困难题：50分

速度倍数：
- <3秒：×1.5
- 3-7秒：×1.0
- >7秒：×0.5

连击倍数：
- 2连击：×2
- 3连击：×3
- 5连击及以上：×5
```

### 道具使用

- 💡 **提示（50:50）**：排除两个错误选项
- ⏭️ **跳过**：跳过当前题目（不得分）
- ⏰ **加时**：增加5秒答题时间

每局游戏每种道具各有3次使用机会。

### 随机事件（仅PVP模式）

每5题可能触发随机事件：

- ⚡ **双倍狂欢**：接下来3题分数×2
- 🔄 **命运轮盘**：与对手分数互换
- 🚀 **极速挑战**：接下来3题限时5秒，答对×3

## 🎨 题库分类

- 🌟 **全明星题库**：混合各类明星题目
- 🎬 **影视明星**：电影演员相关
- 🎵 **音乐天王**：歌手音乐人相关
- 🎤 **周杰伦专题**：周杰伦专属题目
- ⚽ **体育明星**：运动员相关

目前共包含60+道精选题目，覆盖简单、中等、困难三个难度级别。

## 📱 响应式设计

- **桌面端**（1200px+）：完整布局，左右分屏PK
- **平板端**（768-1200px）：调整间距和字体
- **移动端**（<768px）：上下分屏，大按钮设计

## 🔑 键盘快捷键

答题时可使用键盘快捷键：

- `1` - 选择第一个选项
- `2` - 选择第二个选项
- `3` - 选择第三个选项
- `4` - 选择第四个选项

## 💾 数据持久化

游戏使用LocalStorage保存以下数据：

- 玩家昵称
- 各分类最高分
- 排行榜记录（前50名）
- 音效设置
- 游戏统计数据

## 🎯 AI对手机制

PVP模式中的AI对手特性：

- 根据题目难度调整正确率（简单85%、中等70%、困难50%）
- 模拟真实玩家思考时间（1-8秒随机）
- 智能使用道具（落后时概率更高）
- 随机生成昵称

## 🌐 部署

### Vercel部署

```bash
npm install -g vercel
vercel
```

### Netlify部署

```bash
npm run build
# 将 dist 目录拖放到 Netlify
```

或使用Netlify CLI：

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 🔧 开发说明

### 添加新题目

编辑 `src/data/questions.ts` 文件：

```typescript
{
  id: 'unique_id',
  category: 'category-id',
  difficulty: 'easy' | 'medium' | 'hard',
  question: '你的问题？',
  options: ['选项1', '选项2', '选项3', '选项4'],
  correctAnswer: 0, // 正确答案的索引
  explanation: '答案解析'
}
```

### 添加新分类

在 `src/data/questions.ts` 的 `categories` 数组中添加：

```typescript
{
  id: 'new-category',
  name: '新分类',
  icon: '🎭',
  color: 'from-indigo-500 to-purple-500',
  questionCount: 12
}
```

### 自定义配置

- **倒计时时间**：修改 `src/components/GameScreen.tsx` 中的 `timerDuration`
- **题目数量**：修改 `src/App.tsx` 中的 `getRandomQuestions(15, categoryId)`
- **道具次数**：修改 `src/hooks/useGameState.ts` 中的初始 `powerUps`

## 📄 许可证

MIT License

## 👥 贡献

欢迎提交Issue和Pull Request！

## 🙏 致谢

- React团队
- Tailwind CSS
- Framer Motion
- 所有贡献者

---

**享受游戏，测试你的明星知识！** 🌟
