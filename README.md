# ⚡ Crypto Arbitrage Terminal

A high‑performance **terminal-based crypto arbitrage user interface** built with **Rust** and **Tokio**. The application is designed for real‑time market monitoring, cross‑exchange arbitrage detection, and low‑latency execution workflows.

---

## ✨ Features

* 🖥 **Terminal UI (TUI)** optimized for fast navigation
* ⚙️ **Async runtime** powered by Tokio
* 🔄 **Real-time order book & ticker streaming**
* 📈 **Cross‑exchange arbitrage detection**
* ⏱ **Low‑latency event loop**
* 🔐 **Exchange API key isolation**
* 📊 **PnL, spread, and latency metrics**

---

## 🧱 Architecture Overview

```
┌─────────────┐   WebSocket / REST   ┌──────────────┐
│  Exchanges  │◀──────────────────▶│  Data Feeds  │
└─────────────┘                      └──────┬───────┘
                                             │
                                      Tokio Async Tasks
                                             │
┌─────────────┐      Channels        ┌──────────────┐
│  Execution  │◀──────────────────▶│  Core Engine │
└─────────────┘                      └──────┬───────┘
                                             │
                                     Terminal UI (TUI)
```

---

## 🛠 Tech Stack

* **Language:** Rust (stable)
* **Async Runtime:** Tokio
* **Terminal UI:** ratatui / [tui-rs](https://github.com/ratatui/ratatui)
* **Concurrency:** Tokio channels, async tasks
* **Networking:** reqwest
* **Serialization:** serde




> 🔐 **Never commit API keys**. Use environment variables or encrypted storage in production.

---

## 🧭 User Interface

### Main Panels

* **Market View** — live prices per exchange
* **Arbitrage Matrix** — spread & profit estimation
* **Orders Panel** — open / filled / failed orders
* **System Panel** — latency, health, logs

### Key Bindings

| Key   | Action                |
| ----- | --------------------- |
| `q`   | Quit                  |
| `r`   | Refresh data          |
| `a`   | Toggle arbitrage view |
| `s`   | Start / Stop strategy |
| `↑ ↓` | Navigate panels       |

---

## 📐 Arbitrage Logic (High‑Level)

1. Subscribe to multiple exchange feeds
2. Normalize prices and fees
3. Detect spread above threshold
4. Validate liquidity and latency
5. Emit signal to execution engine

> Execution is **decoupled** from detection to avoid UI blocking.

