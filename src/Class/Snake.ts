class Snake {
  frame: HTMLElement;

  element: HTMLElement;
  bodies: HTMLCollection;
  head: HTMLElement;

  constructor() {
    this.frame = document.getElementById('frame')!;

    // 蛇容器元素
    this.element = document.getElementById("snake")!;
    // 蛇身体元素集合
    this.bodies = this.element.getElementsByTagName("div");
    // 蛇头元素
    this.head = this.element.querySelector("div")!;
  }

  get X () {
    return this.head.offsetLeft;
  }

  get Y () {
    return this.head.offsetTop;
  }

  set X (value: number) {
    if (this.X === value) { return; }
    const maxX = this.frame.offsetWidth - (this.head.offsetWidth + 4);   // -4 边框长度(左右)
    // 异常抛出,程序停止(除 try-catch)
    if (value < 0 || value > maxX) { throw new Error('小蛇撞墙,游戏结束!'); }
    // 如果水平移动方向的值与小蛇身体第二部分X值一致,则发生掉头
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      console.log(this.X, value)
      // 新旧值比较,新值>旧值, 则往右掉头, 重设新值 = 旧值 - 移动值,反之亦然.
      value = value > this.X ? this.X - this.head.offsetWidth : this.X + this.head.offsetWidth;
    }
    // 移动蛇头之前先移动身体
    this.moveBodies();
    this.head.style.left = value + 'px';
    this.isConflictBodies();
  }

  set Y (value: number) {
    if (this.Y === value) { return; }
    const maxY = this.frame.offsetHeight - (this.head.offsetHeight + 4);   // -4 边框长度(上下)
    // 异常抛出,程序停止(除 try-catch)
    if (value < 0 || value > maxY) { throw new Error('小蛇撞墙,游戏结束!'); }

    // 如果垂直移动方向的值与小蛇身体第二部分Y值一致,则发生掉头
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      // 新旧值比较,新值>旧值, 则往下掉头, 重设新值 = 旧值 - 移动值,反之亦然.
      value = value > this.Y ? this.Y - this.head.offsetHeight : this.Y + this.head.offsetHeight;
    }
    // 移动蛇头之前先移动身体
    this.moveBodies();
    this.head.style.top = value + 'px';
    this.isConflictBodies();
  }

  addBodies () {
    // 在蛇尾添加身体
    this.element.insertAdjacentElement('beforeend', document.createElement('div'));
  }

  moveBodies () {
    // 后一节位置 = 前一节位置
    for (let i=this.bodies.length - 1; i>0; i--) {
      let preX = (this.bodies[i-1] as HTMLElement).offsetLeft;
      let preY = (this.bodies[i-1] as HTMLElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = preX + 'px';
      (this.bodies[i] as HTMLElement).style.top = preY + 'px';
    }
  }

  isConflictBodies () {
    const X = this.X;
    const Y = this.Y;
    const isConflict = [...this.bodies].slice(1).some(item =>
      (item as HTMLElement).offsetLeft === X && (item as HTMLElement).offsetTop === Y
    );
    if (isConflict) {
      throw new Error('身体冲突,游戏结束!')
    }
  }
}

export default Snake;
