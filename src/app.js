import { fetchData } from './fetchdata.js';
import './style.css';
let btn = document.querySelector(".button-haz");
btn.addEventListener("click", fetchData);