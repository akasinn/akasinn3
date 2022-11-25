

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const resize = () => {
  if (window.innerWidth  < window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
  } else {
    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight;
  }
}//function resize end
window.addEventListener('resize', resize, false);
resize();

const buffer = document.createElement("canvas");
const btx = buffer.getContext("2d");
buffer.width = buffer.height = 1000;




const draw = () => {
  // 背景
  btx.fillStyle = "gray";
  btx.fillRect(0, 0, buffer.width, buffer.height);
  // 点を打つ
  btx.fillStyle = "white";
  btx.textAlign = "center";
  btx.font = "60px serif";
  btx.fillText(
    "・",
    buffer.width * 3 / 4,
    buffer.height / 4
  );


  
  
}//function draw end



let x=0;
const loop = () => {
  while(true){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    draw();

    ctx.drawImage(
      buffer,
      0, 0, buffer.width, buffer.height,
      0, 0, canvas.width, canvas.height
    );

   // window.requestAnimationFrame(loop);
  }
  //window.requestAnimationFrame(loop);
}




if ("ontouchstart" in window) {
  window.ontouchend = onInput;
} else {
  window.onclick = onInput;
}
