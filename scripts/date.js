const currentYearSpan = document.querySelector('#currentyear');
const lastModifiedSpan = document.querySelector('#lastModified');

currentYearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;