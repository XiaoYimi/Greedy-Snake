import Panel from './Panel';
import Food from './Food';
import Snake from './Snake';

class GameMain {
  food: Food;
  panel: Panel;
  snake: Snake;
  // 移动方向
  direction: string = '';
  // 游戏在线中|结束
  isLive: boolean = true;
  // 定时器开关(类型有问题)
  timer: any = 0;
  
  constructor () {
    this.food = new Food();
    this.panel = new Panel(10, 10);
    this.snake = new Snake();
    this.init();
  }

  // 游戏初始化
  init () {
    document.addEventListener('keydown', this.keyDownHandle.bind(this));
    // console.log(this.keyDownHandle.bind(this) === this.keyDownHandle.bind(this)
  }

  // 用户操作响应事件
  keyDownHandle (event: KeyboardEvent) {
    this.direction = event.key;
    this.snakeMove();
  }

  // 根据用户操作方向操作小蛇移动
  snakeMove () {
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch (this.direction) {
      case "Up":
      case "ArrowUp":
        Y -= 20;
        break;
      case "Down":
      case "ArrowDown":
        Y += 20;
        break;
      case "Left":
      case "ArrowLeft":
        X -= 20;
        break;
      case "Right":
      case "ArrowRight":
        X += 20;
        break;
      default: break;
    }

    // 检测是否吃到食物
    this.isEatFood(X, Y);

    // 接收 Snake 位置合法值的异常捕获;
    // try-catch 不会终止程序, 故可设置 this.isLive = false 表示游戏结束
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (err) {
      document.removeEventListener('keydown', this.keyDownHandle.bind(this));
      console.log(err.message);
      this.isLive = false;
      setTimeout(() => {
        window.alert(err.message);
      }, 0);
    }

    // 实现根据方向自动移动
    window.clearTimeout(this.timer);
    this.timer = 0;
    this.isLive && (this.timer = setTimeout(this.snakeMove.bind(this), 300 - (this.panel.level - 1) * 30));
  }

  // 检测蛇是否吃到食物
  isEatFood (X: number, Y: number) {
    if (this.food.X === X && this.food.Y === Y) {
      this.panel.countAdd();
      this.snake.addBodies();
      this.food.change();
    }
  }
}

export default GameMain;
