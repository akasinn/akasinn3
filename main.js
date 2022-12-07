
const version=71;


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize, false);
resize();

const buffer = document.createElement("canvas");
const btx = buffer.getContext("2d");
buffer.width = buffer.height = 1100;




const draw = () => {
  // 背景
  btx.fillStyle = "green";
  btx.fillRect(0, 0, buffer.width, buffer.height);
  
  btx.save();

  //座標変換
  translate(50,1050);
  scale(1,-1);

  // 文字列
  btx.fillStyle = "white";
  btx.textAlign = "center";
  btx.font = "60px serif";
  btx.fillText(
    "ver"+version,
    500,
    500
  );

/*
  //軸
  btx.fillStyle = "red";
  btx.beginPath();
  btx.moveTo(10,495);
  btx.lineTo(550,495);
  btx.lineTo(550,490);
  btx.lineTo(560,500);
  btx.lineTo(550,510);
  btx.lineTo(550,505);
  btx.lineTo(10,505);
  btx.closePath();
  btx.fill();
  
  btx.fillStyle = "black";
  btx.beginPath();
  btx.moveTo(10,1095);
  btx.lineTo(850,1095);
  btx.lineTo(850,1090);
  btx.lineTo(860,1100);
  btx.lineTo(850,1110);
  btx.lineTo(850,1105);
  btx.lineTo(10,1105);
  btx.closePath();
  btx.fill();
*/
  btx.restore();
}



const loop = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //update();
  draw();

  ctx.drawImage(
    buffer,
    0, 0, buffer.width, buffer.height,
    0, 0, canvas.width, canvas.width
  );

  window.requestAnimationFrame(loop);
}


function main() {
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //return;

  draw();

  ctx.drawImage(
    buffer,
    0, 0, buffer.width, buffer.height,
    0, canvas.height/2, canvas.width, canvas.width
  );
  
  ctx.fillStyle = "gray";
  ctx.beginPath();
  ctx.moveTo(10,600,);
  ctx.lineTo(1190,600);
  ctx.lineTo(1190,610);
  ctx.lineTo(10,610);
  ctx.closePath();
  ctx.fill();

  //loop();
  return ;
}

window.onload = main;


/*更新履歴
11/27/8:28
GROUND_Yを850から800へ
11/27/8:31
変化が見られなかったのでGROUND_Yを800から100へ
11/27/8:36
変化があった。背景をwhiteにした。
11/27/8:41
変化がない。背景をgreenにして、groundを消す。
11/27/8:47
変化があった。いらん所をコメントアウト
11/27/22:41
ループしやんようにした。
11/27/22:50
最後のifを消してみた。
11/27/22:57
大胆にコメントアウト
11/27/23:03
コメントアウトした所を削除
11/28/6:40
"kWh"をf(x)に変える
11/28/7:15
main関数を導入し、roop関数を使わないようにした
11/28/15:03
aspectを2に
11/28/20:23
aspectを0.5に。
12/3/11:43
ctx.fillStyle = "green->blue";
12/3/12:05
main関数中のreturnをコメントアウト
12/3/14:50
resize関数をコメントアウト
12/3/15:02
resize関数復活。画面全体がcanvasになるように。
12/3/20:40
"f(x)->関数f(x)"
12/4/11:06
下の方は青く表示されるように
12/4/19:40
bufferの縦横を1000->1200
12/4/20:32
x軸を追加
12/4/20:38
x軸を消して三角形を追加
12/4/20:54
stroke->fill
12/4/20:58
青い三角形ができてしまったので黒くした
12/5/7:10
三角形を横長の長方形へ
12/5/7:21
btxにも同様の長方形を少し上に。
12/5/7:24ver10
文字列がバージョンを表すように。
12/5/7:33ver11
軸を矢印に。versionを文字でおく。
12/5/19:47ver12
矢印を短く
ver13
矢印をもう一つ
ver14
追加した矢印を修正、矢印をカラフルに
ver15
loopを用いて、消えないように
ver16
ちゃんとloopするように
ver64
縦横比をしっかり
ver65
幅を1100にして、座標変換
ver66
エラーが出たので、いっぱいコメントアウト
ver67
エラーが治らない。loopをmainに
ver68
drawImageをbuffer.width->canvas.width
ver69
buffer.widthを削除
ver70
描き始めの位置を下に
ver71
変化がない。saveとrestoreを追加
*/
