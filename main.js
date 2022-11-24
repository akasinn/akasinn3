const PLAYER_X = 200;
const GROUND_Y = 850;
const PLAYER_RADIUS = 80;
const HURDLE_RADIUS = 63;
const MARGIN = 200;

const GRAVITY = 2.5;
const INITIAL_JUMP_V = 50;
const INITIAL_JUMP_LIMIT = 1;

const INITIAL_HURDLE_V = 15;
const MAX_HURDLE_V = 32;
const HURDLE_A = 0.5;

const INITIAL_ARGULAR_V = 0.1;
const MAX_ANGULAR_V = 0.3;
const ANGULAR_A = Math.PI / 2000;

const game = {
  score: 0,
  isOver: false,
  isRunning: false,
  hurdleV: -INITIAL_HURDLE_V,
  hurdles: []
}

class Player {
  constructor() {
    this.x = PLAYER_X;
    this.y = GROUND_Y - PLAYER_RADIUS;
    this.vy = 0;
    this.angle = 0;
    this.angularV = 0;
    this.jumpLimit = INITIAL_JUMP_LIMIT;
    this.jumpLives = this.jumpLimit;
  }

  draw() {
    btx.save();
    btx.translate(this.x, this.y);
    btx.rotate(this.angle);
    btx.drawImage(
      playerImage,
      -playerImage.width / 2,
      -playerImage.height / 2
    );
    btx.restore();
  }

  update() {
    // ゲームオーバーの後、減速する
    if (game.isOver) {
      this.angularV -= ANGULAR_A;
      this.angularV = Math.max(0, this.angularV);
    }

    this.angle += this.angularV;
    this.angle %= Math.PI * 2;

    this.vy += GRAVITY;
    this.y += this.vy;

    // 接地している時、y座標を一定に保つ
    this.y = Math.min(this.y, GROUND_Y - PLAYER_RADIUS);
    if (this.y === GROUND_Y - PLAYER_RADIUS) {
      this.jumpLives = this.jumpLimit;
    }
  }
}

class Hurdle {
  constructor() {
    this.x = buffer.width + MARGIN;
    this.y = GROUND_Y - HURDLE_RADIUS;
    this.vx = game.hurdleV;
  }

  draw() {
    btx.save();
    btx.translate(this.x, this.y);
    btx.drawImage(
      hurdleImage,
      -hurdleImage.width / 2,
      -hurdleImage.height / 2
    );
    btx.restore();
  }

  update() {
    this.x += this.vx;

    // プレイヤーとハードルのx座標の差 が プレイヤーの半径 以下
    if (Math.abs(PLAYER_X - this.x) <= PLAYER_RADIUS) {
      // プレイヤーの下端のy座標 が ハードルの上端のy座標 以上 (下向きが正)
      if (player.y + PLAYER_RADIUS >= GROUND_Y - HURDLE_RADIUS * 2) {
        game.isRunning = false;
        game.isOver = true;
      }
    }

    // ハードルがスクリーン外に出た時
    if (this.x < -MARGIN && !game.isOver) {
      game.score++;
      game.hurdleV = Math.max(game.hurdleV - HURDLE_A, -MAX_HURDLE_V);
      player.angularV = Math.min(player.angularV + ANGULAR_A, MAX_ANGULAR_V);
      return false;
    }
    return true;
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const resize = () => {
  const aspect = 1;
  if (window.innerWidth / aspect < window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth / aspect;
  } else {
    canvas.width = window.innerHeight * aspect;
    canvas.height = window.innerHeight;
  }
}
window.addEventListener('resize', resize, false);
resize();

const buffer = document.createElement("canvas");
const btx = buffer.getContext("2d");
buffer.width = buffer.height = 1000;

const playerImage = new Image();
playerImage.src = "image/power-plant.png";
const hurdleImage = new Image();
hurdleImage.src = "image/conifer.png";

const player = new Player();

const draw = () => {
  // 背景
  btx.fillStyle = "gray";
  btx.fillRect(0, 0, buffer.width, buffer.height);

  // スコア
  btx.fillStyle = "white";
  btx.textAlign = "center";
  btx.font = "60px serif";
  btx.fillText(
    game.score + "kWh",
    buffer.width / 2,
    buffer.height / 4
  );

  // 地面
  btx.fillStyle = "black";
  btx.fillRect(0, GROUND_Y, buffer.width, buffer.height - GROUND_Y);

  player.draw();
  game.hurdles.forEach(hurdle => hurdle.draw());
}

const update = () => {
  player.update();
  game.hurdles = game.hurdles.filter(hurdle => hurdle.update());
  // ハードルを補充する
  if (game.isRunning && game.hurdles.length < 1) {
    game.hurdles.push(new Hurdle());
  }
}

const loop = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  update();
  draw();

  ctx.drawImage(
    buffer,
    0, 0, buffer.width, buffer.height,
    0, 0, canvas.width, canvas.height
  );

  window.requestAnimationFrame(loop);
}

const onInput = (e) => {
  // ゲームオーバーの後、入力を受け付けない
  if (game.isOver) return;
  // ゲームが始まる前
  if (!game.isRunning) {
    game.isRunning = true;
    player.angularV = INITIAL_ARGULAR_V;
    return;
  }
  // ゲームが進行している時
  if (player.jumpLives <= 0) return;
  player.jumpLives--;
  player.vy = -INITIAL_JUMP_V;
}

window.onload = loop;

if ("ontouchstart" in window) {
  window.ontouchend = onInput;
} else {
  window.onclick = onInput;
}
