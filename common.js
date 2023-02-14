const tomato = document.querySelector('.tomato');
const box = document.querySelector('.main');

let shiftX = null;
let shiftY = null;

let sound = new Audio('./assets/peter-griffins-laugh.mp3');

tomato.addEventListener('mousedown', (e) => startDrag(e));
tomato.addEventListener('touchstart', (e) => startDrag(e));

const startDrag = (e) => {
  shiftX = (e.clientX || e.touches[0].clientX) - tomato.getBoundingClientRect().left;
  shiftY = (e.clientY || e.touches[0].clientY) - tomato.getBoundingClientRect().top;

  tomato.src = './assets/tomato_peter.png';
  sound.play();

  moveAt(e.pageX || e.touches[0].pageX, e.pageY || e.touches[0].pageY);
  box.addEventListener('mousemove', onmouseMove);
  box.addEventListener('touchmove', onmouseMove);
};

const stopMove = () => {
  tomato.src = './assets/tomato.png';

  sound.pause();
  sound.currentTime = 0;

  box.removeEventListener('mousemove', onmouseMove);
  box.removeEventListener('touchmove', onmouseMove);
};

tomato.addEventListener('mouseup', stopMove);
tomato.addEventListener('touchend', stopMove);

tomato.addEventListener('dragstart', (e) => e.preventDefault());

sound.addEventListener('timeupdate', () => {
  if (sound.currentTime === sound.duration) {
    sound.currentTime = 0;
    sound.play();
  }
});

const onmouseMove = (e) => moveAt(e.pageX || e.touches[0].pageX, e.pageY || e.touches[0].pageY);

const moveAt = (pageX, pageY) => {
  tomato.style.top = pageY - shiftY + 'px';
  tomato.style.left = pageX - shiftX + 'px';
};
