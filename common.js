const tomato = document.querySelector('.tomato');
const box = document.querySelector('.main');

let shiftX = null;
let shiftY = null;

let sound = new Audio('./assets/peter-griffins-laugh.mp3');

tomato.addEventListener('mousedown', (e) => {
  shiftX = e.clientX - tomato.getBoundingClientRect().left;
  shiftY = e.clientY - tomato.getBoundingClientRect().top;

  tomato.src = './assets/tomato_peter.png';
  sound.play();

  moveAt(e.pageX, e.pageY);
  box.addEventListener('mousemove', onmouseMove);
});

tomato.addEventListener('mouseup', () => {
  tomato.src = './assets/tomato.png';

  sound.pause();
  sound.currentTime = 0;

  box.removeEventListener('mousemove', onmouseMove);
});

tomato.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

sound.addEventListener('timeupdate', () => {
  if (sound.currentTime === sound.duration) {
    sound.currentTime = 0;
    sound.play();
  }
});

const onmouseMove = (e) => {
  moveAt(e.pageX, e.pageY);
};

const moveAt = (pageX, pageY) => {
  tomato.style.top = pageY - shiftY + 'px';
  tomato.style.left = pageX - shiftX + 'px';
};
