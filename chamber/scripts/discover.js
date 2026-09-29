import { discoverItems } from '../data/discover.mjs';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Visitor message handling using localStorage
    const visitorMessageDiv = document.getElementById('visitor-message');
    if (visitorMessageDiv) {
        const lastVisit = localStorage.getItem('last-visit-date');
        const currentDate = Date.now();
        let message = "";

        if (!lastVisit) {
            message = "Welcome! Let us know if you have any questions.";
        } else {
            const daysDifference = Math.floor((currentDate - Number(lastVisit)) / (1000 * 60 * 60 * 24));
            if (daysDifference < 1) {
                message = "Back so soon! Awesome!";
            } else if (daysDifference === 1) {
                message = "You last visited 1 day ago.";
            } else {
                message = `You last visited ${daysDifference} days ago.`;
            }
        }
        visitorMessageDiv.textContent = message;
        localStorage.setItem('last-visit-date', currentDate);
    }

    // 2. Dynamic rendering of the 8 cards
    const gridContainer = document.getElementById('discover-grid');
    if (gridContainer) {
        let htmlCards = '';
        discoverItems.forEach((item, index) => {
            htmlCards += `