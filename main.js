

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const resize = () => {
  const aspect = 0.5;
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




const draw = () => {
  // 背景
  btx.fillStyle = "green";
  btx.fillRect(0, 0, buffer.width, buffer.height);

  // スコア
  btx.fillStyle = "white";
  btx.textAlign = "center";
  btx.font = "60px serif";
  btx.fillText(
    "f(x)",
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
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return;

  draw();

  ctx.drawImage(
    buffer,
    0, 0, buffer.width, buffer.height,
    0, 0, canvas.width, canvas.height
  );

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
*/
