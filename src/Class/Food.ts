class Food {
  frame: HTMLElement;
  element: HTMLElement;
  
  constructor () {
    this.frame = document.getElementById('frame')!;
    this.element = document.getElementById('food')!; // 使用 ! 表示确定有值
  }

  get X () {
    // 相对于父元素
    return this.element.offsetLeft;
  }

  get Y () {
    return this.element.offsetTop;
  }

  change () {
    // 食物位置X: 0-(屏幕宽度-食物宽度); Y: 0-(屏幕高度-食物高度); 
    // 蛇每次移动都是 食物宽度 的值(20px);
    // 食物随机位置是 蛇移动距离的整数倍;
    const frameWidth: number = this.frame.offsetWidth;
    const frameHeight: number = this.frame.offsetHeight;
    const foodboxXY :number = this.element.offsetWidth;
    const maxX: number = frameWidth - foodboxXY;
    const maxY: number = frameHeight - foodboxXY;
    this.element.style.left = Math.floor(Math.random() * (maxX / foodboxXY)) * foodboxXY + 'px';
    this.element.style.top = Math.floor(Math.random() * (maxY / foodboxXY)) * foodboxXY + 'px';    
  }
}

export default Food;
