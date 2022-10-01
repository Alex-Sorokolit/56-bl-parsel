import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('input'),
  startBtn: document.querySelector('button'),
};
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future', {
        timeout: 6000,
        width: '300px',
        clickToClose: true,
        position: 'center-top',
      });
      return;
    }
    refs.startBtn.disabled = false;
    selectedDate = selectedDates[0];
  },
};

flatpickr('#datetime-picker', options);

class Timer {
  #timerId = null;
  #refs = {};

  constructor(selector) {
    this.selector = selector;
  }

  start() {
    console.log(this);
    this.#getRefs();
  }

  #getRefs() {
    console.log(this.selector);
    this.#refs.output = {};
    this.#refs.output = document.querySelectorAll(
      `${this.selector} .timer__item`
    );
    console.log(this.#refs.output);
  }
}
const timer = new Timer('.timer__items', selectedDate);
refs.startBtn.addEventListener('click', timer.start.bind(timer));
