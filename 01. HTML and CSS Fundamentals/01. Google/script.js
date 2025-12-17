document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.search-field');
    const buttons = document.querySelectorAll('.search-buttons button');

    function normalSearch(q) {
        q = (q || '').trim();
        const url = q ? `https://www.google.com/search?q=${encodeURIComponent(q)}` : 'https://www.google.com';
        window.location.href = url;
    }

    function feelingLucky(q) {
        q = (q || '').trim();
        const url = q ? `https://www.google.com/search?q=${encodeURIComponent(q)}&btnI=1` : 'https://www.google.com';
        window.location.href = url;
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            normalSearch(input.value);
        }
    });

    buttons.forEach((btn, idx) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (idx === 0) normalSearch(input.value);
            else feelingLucky(input.value);
        });
    });
});