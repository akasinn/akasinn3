

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
buffer.width = buffer.height = 1200;




const draw = () => {
  // 背景
  btx.fillStyle = "green";
  btx.fillRect(0, 0, buffer.width, buffer.height);

  // 文字列
  btx.fillStyle = "white";
  btx.textAlign = "center";
  btx.font = "60px serif";
  btx.fillText(
    "関数f(x)",
    buffer.width / 4,
    buffer.height / 4
  );
  
}



const loop = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //update();
  draw();

  ctx.drawImage(
    buffer,
    0, 0, buffer.width, buffer.height,
    0, 0, canvas.width, canvas.height
  );

  //window.requestAnimationFrame(loop);
}


function main() {
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //return;

  draw();

  ctx.drawImage(
    buffer,
    0, 0, buffer.width, buffer.height,
    0, 0, buffer.width, buffer.height
  );
  
  ctx.beginPath();
  ctx.moveTo(125, 125);
  ctx.lineTo(125, 45);
  ctx.lineTo(45, 125);
  ctx.closePath();
  ctx.stroke();

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
*/
