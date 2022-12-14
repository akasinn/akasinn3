
const version=104;


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


function mathmatical_function(x){
  const x_string=x+"";
  const keta=x_string.length;
  var y_array=[];
  for(var i=0;i<keta;i++){
    y_array=y_array.concat(x_string[i]);
  }
  for(var i=0;i<keta-1;i++){
    if(x_string[i]==x_string[i+1]){
      y_array[i]='0';
      y_array[i+1]='0';
    }
  }
  var y="";
  for(var i=0;i<keta;i++){
    y=y.concat(y_array[i]);
  }
  return Number(y);
}

const draw = () => {
  // 背景
  btx.fillStyle = "green";
  btx.fillRect(0, 0, buffer.width, buffer.height);
  
  // 文字列
  btx.fillStyle = "white";
  btx.textAlign = "center";
  btx.font = "60px serif";
  btx.fillText(
    "ver"+version,400,100
  );
  btx.fillStyle = "black";
  btx.fillText("x",1075,1025);
  btx.fillText("y",77,32);
  btx.fillText("o",25,1083);
  btx.fillText("1",25,70);
  btx.fillText("1",1050,1090);


  btx.save();

  //座標変換
  btx.translate(50,1050);
  btx.scale(1,-1);

  //軸
  btx.beginPath();
  btx.moveTo(-40,5);
  btx.lineTo(-5,5);
  btx.lineTo(-5,1000);
  btx.lineTo(-20,1000);
  btx.lineTo(0,1040);
  btx.lineTo(20,1000);
  btx.lineTo(5,1000);
  btx.lineTo(5,5);
  btx.lineTo(1000,5);
  btx.lineTo(1000,20);
  btx.lineTo(1040,0);
  btx.lineTo(1000,-20);
  btx.lineTo(1000,-5);
  btx.lineTo(5,-5);
  btx.lineTo(5,-40);
  btx.lineTo(-5,-40);
  btx.lineTo(-5,-5);
  btx.lineTo(-40,-5);
  btx.fill();

  //補助線
  for(var i=1;i<=10;i++){
    btx.beginPath();
    btx.moveTo(i*100,0);
    btx.lineTo(i*100,1000);
    btx.stroke();
    btx.beginPath();
    btx.moveTo(0,i*100);
    btx.lineTo(1000,i*100);
    btx.stroke();
  }

  //グラフ
  btx.fillStyle = "white";
  btx.font = "18px serif";
  for(var x=0;x<=10000000;x++){
    const y=mathmatical_function(x);
    btx.fillText(".", x * 0.0001 ,y*0.0001+2);
  }

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
ver99
点を10000個打つ。
ver101
縮尺を調整
ver102
点1000万個
ver103
0.1間隔で補助線を引く。
ver104
点の大きさを60->18
*/
