# SVR Command Center — TS 維修看板

**中文** ｜ [English](#english)

固定 16:9 大屏儀表板（數字大屏），監控維修工站的 MB / P-CARD：IN/OUT/WFR KPI、
依客戶碼（A31 / N88 / T66 / A26）的不良統計表，以及 WIP 走勢圖。深色 HUD 風格，
依 `docs/mockup.png` 製作（規格：`docs/layout.md`）。

> **狀態：** 目前僅有 **前端**（資料為 `src/data/mockData.js` 靜態 mock）。後端 / 資料庫尚未實作。

## 技術
Vue 3 + Vite 5 + ECharts 5 + Sass

## 執行（前端）
需 Node.js 20+。

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build    # 產出 -> frontend/dist
npm run preview  # 預覽 build 結果
```

## 結構
```
frontend/src/
├── App.vue                 # 1920×1080 舞台 + 縮放適配 + 背景氛圍
├── views/Dashboard.vue     # 版面：header / KPI / 表格 / 圖表 / footer
├── components/             # DashboardHeader, PanelBox, StatPanel, DataTable, WipChart
├── composables/useScale.js # 將 1920×1080 縮放至任意視窗
├── data/mockData.js        # KPI / 表格 / 圖表資料（mock）
└── styles/variables.scss   # 設計 tokens（顏色、間距、字體）
```

## 備註
- 版面固定 **16:9、不重排**，最適合大型橫向螢幕；直向手機會提示「旋轉為橫向」。
- 改數據：`src/data/mockData.js`；改顏色 / tokens：`src/styles/variables.scss`。
- 設計依據（source of truth）：`docs/mockup.png` + `docs/layout.md`。
