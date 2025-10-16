
const TAG = '[TestDolbyPage]';

const VK_BACK = 8;
const VK_LEFT = 37;
const VK_RIGHT = 39;
const VK_DOWN = 40;
const VK_UP = 38;
const VK_ENTER = 13;
const VK_HOME = 36;
const VK_4 = 52;
const VK_5 = 53;
const VK_6 = 54;

let iframe;

export default class TestDolbyPage {
  constructor() {
    console.log(`${TAG} Initialized`);
  }

  onShow() {
  
    console.log(`${TAG} onShow`);
    this.initPage();
    this.addEventListeners();
	
  }

  onHide() {
    console.log(`${TAG} onHide`);
    document.getElementById('btn-start').classList.remove('focus-comp');
    document.getElementById('btn-exit').classList.remove('focus-comp');
    this.stopDemoPlayback();
  }

  initPage() {
    iframe = document.getElementById('player-frame');
    document.getElementById('btn-start').classList.add('focus-comp');
    this.getVersionInfo();
  }

  addEventListeners() {
    console.log(`${TAG} addEventListeners`);
    document.addEventListener('keydown', (evt) => this.handleKeyDown(evt));
  }

  removeEventListeners() {
    console.log(`${TAG} removeEventListeners`);
    document.removeEventListener('keydown', (evt) => this.handleKeyDown(evt));
  }

  handleKeyDown(evt) {
    switch (evt.keyCode) {
      case VK_BACK:
        evt.stopPropagation();
        this.closePage();
        break;
      case VK_LEFT:
      case VK_RIGHT:
      case VK_DOWN:
      case VK_UP:
      case VK_ENTER:
        this.handleSidebarNavigation(evt.keyCode);
        break;
      case VK_HOME:
        evt.preventDefault();
        this.closePage();
        break;
      default:
		evt.preventDefault();
		break;
    }
  }

  handleSidebarNavigation(keyCode) {
    const btn1 = document.getElementById('btn-start');
    const btn2 = document.getElementById('btn-exit');

    if (btn1.classList.contains('focus-comp')) {
      if (keyCode === VK_DOWN) {
        btn1.classList.remove('focus-comp');
        btn2.classList.add('focus-comp');
      } else if (keyCode === VK_ENTER) {
        btn1.classList.remove('focus-comp');
        this.startDemoPlayback();
      }
    } else {
      if (keyCode === VK_UP) {
        btn2.classList.remove('focus-comp');
        btn1.classList.add('focus-comp');
      } else if (keyCode === VK_ENTER) {
        this.closePage();
      }
    }
  }

  startDemoPlayback() {
    iframe.src = 'https://ms12.streaming.dolby.com/v28/app/index_28.html';
    const container = document.getElementById('player-container');

    setTimeout(() => {
      container.style.display = 'block';
      document.getElementById('main-contents').style.display = 'block';
      document.getElementById('right-panel').style.display = 'block';
      iframe.focus();
    }, 300);
  }

  stopDemoPlayback() {
    iframe.src = '';
    const container = document.getElementById('player-container');
    container.style.display = 'none';
    document.getElementById('right-panel').style.display = 'none';
    document.getElementById('btn-start').classList.add('focus-comp');
    document.getElementById('main-contents').style.display = 'block';
  }

async getVersionInfo() {
  let version = 'undefined';

  try {
    const response = await fetch('./release.json'); // 👈 no import, just fetch
    const data = await response.json();
    if (data.length > 0) {
      version = data[0].releaseVersion;
    }
  } catch (error) {
    console.error('Failed to load release.json:', error);
  }

  const versionInfo = document.getElementById('version-info');
  if (versionInfo) {
    versionInfo.innerHTML = `Version : ${version}`;
  }
}


  closePage() {
    this.removeEventListeners();
    this.stopDemoPlayback();
    console.log(`${TAG} Page Closed`);
  }
}

