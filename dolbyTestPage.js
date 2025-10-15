//import ReleaseData from './release.json';

const TAG = '[TestDolbyPage]';

const VK_BACK = 0;
const VK_LEFT = 0;
const VK_RIGHT = 0;
const VK_DOWN = 0;
const VK_UP = 0;
const VK_ENTER = 0;
const VK_HOME = 0;

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
    document.getElementById('oda_btn_1').classList.remove('focus_comp');
    document.getElementById('oda_btn_2').classList.remove('focus_comp');
    this.stopDemoPlayback();
  }

  initPage() {
    iframe = document.getElementById('playerFrame');
    document.getElementById('oda_btn_1').classList.add('focus_comp');
    this.showVersionInfo();
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
      case VK_OPTION:
      case VK_LIST:
        evt.stopPropagation();
        break;
      case VK_HOME:
        evt.preventDefault();
        evt.stopPropagation();
        this.closePage();
        break;
      default:
        break;
    }
  }

  handleSidebarNavigation(keyCode) {
    const btn1 = document.getElementById('oda_btn_1');
    const btn2 = document.getElementById('oda_btn_2');

    if (btn1.classList.contains('focus_comp')) {
      if (keyCode === VK_DOWN) {
        btn1.classList.remove('focus_comp');
        btn2.classList.add('focus_comp');
      } else if (keyCode === VK_ENTER) {
        btn1.classList.remove('focus_comp');
        this.startDemoPlayback();
      }
    } else {
      if (keyCode === VK_UP) {
        btn2.classList.remove('focus_comp');
        btn1.classList.add('focus_comp');
      } else if (keyCode === VK_ENTER) {
        this.closePage();
      }
    }
  }

  startDemoPlayback() {
    iframe.src = 'https://ms12.streaming.dolby.com/v28/app/index_28.html';
    const container = document.getElementById('playerContainer');

    setTimeout(() => {
      container.style.display = 'block';
      document.getElementById('oda_main_contents').style.display = 'block';
      document.getElementById('oda_main_right_Side').style.display = 'block';
      iframe.focus();
    }, 300);
  }

  stopDemoPlayback() {
    iframe.src = '';
    const container = document.getElementById('playerContainer');
    container.style.display = 'none';
    document.getElementById('oda_main_right_Side').style.display = 'none';
    document.getElementById('oda_btn_1').classList.add('focus_comp');
    document.getElementById('oda_main_contents').style.display = 'block';
  }

  showVersionInfo() {
    const releaseInfo = JSON.parse(JSON.stringify(ReleaseData));
    let version = 'undefined';

    if (releaseInfo.length > 0) {
      version = releaseInfo[0].releaseVersion;
    }

    const versionInfoEl = document.getElementById('versionInfo');
    if (versionInfoEl) {
      versionInfoEl.innerHTML = `Version : ${version}`;
    }
  }

  closePage() {
    this.removeEventListeners();
    this.stopDemoPlayback();
    console.log(`${TAG} Page Closed`);
  }
}

