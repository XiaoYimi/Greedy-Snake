class Panel {
  count: number;
  level: number;
  maxLevel: number; // 等級上限
  upLevelNum: number; // 每 20 分数 + 1 level

  countEl: HTMLElement;
  levelEl: HTMLElement;

  constructor (maxLevel: number = 10, upLevelNum: number = 5) {
    this.count = 0;
    this.level = 1;
    this.maxLevel = maxLevel;
    this.upLevelNum = upLevelNum;

    this.countEl = document.getElementById('count')!;
    this.levelEl = document.getElementById('level')!;
  }

  countAdd () {
    this.countEl.innerHTML = ++ this.count + '';
    if (this.count % this.upLevelNum === 0) { this.levelUp(); } // 每 20 分升級一次 level
  }

  levelUp () {
    this.levelEl.innerHTML = (this.level < this.maxLevel ? ++ this.level : this.maxLevel) + '';
  }
}

export default Panel;
