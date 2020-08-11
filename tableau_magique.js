console.log('ok');

const canvas = document.querySelector('#magicBoard');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');

const { width } = canvas;
const { height } = canvas;

const MOVE_AMOUNT = 20;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

let hue = 0;

console.log(x, y);
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

function draw({ key }) {
  console.log(key);
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  hue += 5;
  console.log(hue);
  console.log(ctx.strokeStyle);
  ctx.beginPath();
  ctx.moveTo(x, y);

  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    default:
      break;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
}

function handlekey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
    console.log(e.key);
  }
}

window.addEventListener('keydown', handlekey);

function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    function() {
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}

shakeButton.addEventListener('click', clearCanvas);
