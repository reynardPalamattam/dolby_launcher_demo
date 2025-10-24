# Dolby Launcher Demo

A web-based launcher interface for the **Dolby MS12 SDK ODA** testing.  
This project simulates a TV-style UI to start and manage Dolby test playback dynamically.

---

## 🎯 Features

- Modern UI with sidebar and main content area  
- Version info loaded dynamically from `release.json`  
- IFrame-based player that loads Dolby streaming demo only when started  
- Keyboard navigation for launching and exiting the test  
- 100% Vanilla JavaScript (no external libraries)

---

## 📁 Project Structure

| File | Description |
|------|--------------|
| `index.html` | Main HTML launcher page |
| `style.css` | Styles for layout and UI |
| `TestDolbyPage.js` | JavaScript for logic, event handling, and iframe management |
| `release.json` | Contains version information for display |

---

## 🚀 How to Run Locally

1. Clone or download the repository.  
2. Open `index.html` in a web browser (Chrome recommended).  
3. Use keyboard navigation:
   - Enter Key Combination **5464**  to launch.

## 🌐 Live Demo

Project is live at:  
👉 **[https://reynardpalamattam.github.io/dolby_launcher_demo/](https://reynardpalamattam.github.io/dolby_launcher_demo/)**

---

## 🧩 Version Info

```json
[
  {
    "releaseVersion": "17.09.DT25.0",
    "releasetext": "Dolby Test App Prototype version .0"
  }
]
