
const version=80;


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
  
  // 文字列
  btx.fillStyle = "white";
  btx.textAlign = "center";
  btx.font = "60px serif";
  btx.fillText(
    "ver"+version,
    1000,
    100
  );

  btx.save();

  //座標変換
  btx.translate(50,1050);
  btx.scale(1,-1);

  //軸
  btx.fillStyle = "black";
  btx.beginPath();
  btx.moveTo(-40,5);
  btx.lineTo(-5,5);
  btx.lineTo(-5,1000);
  btx.lineTo(-40,1000);
  btx.lineTo(0,1040);
  btx.lineTo(40,1000);
  btx.lineTo(5,1000);
  btx.lineTo(5,5);
  btx.lineTo(1000,5);
  btx.lineTo(1000,40);
  btx.lineTo(1040,0);
  btx.lineTo(1000,-40);
  btx.lineTo(1000,-5);
  btx.lineTo(5,-5);
  btx.lineTo(5,-40);
  btx.lineTo(-5,-40);
  btx.lineTo(-5,-5);
  btx.lineTo(-40,-5);
  btx.fill();

  //文字
  btx.fillText("x",1025,25);
  btx.fillText("y",25,1025);
  btx.fillText("o",-25,-25);

  btx.restore();
}



const loop = () => {

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
  

  draw();
  loop();
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
ver72
変化がない。矢印を削除。verを出力する部分をコメントアウト
ver73
座標変換の頭にbtx.を追加
ver74
上手くいった。loop導入
ver75
verを出力
ver76
矢印を追加
ver77
ミス修正
ver78
軸を描く
ver79
文字列を右上へ。軸を修正。
ver80
xyoの文字を追加


*/
