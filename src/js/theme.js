'use strict';
const toggleTheme = function(){
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light' ;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
}

const storedTheme = localStorage.getItem('theme')  // string/null
const systemThemeIsDark = window.matchMedia('(prefers-color-scheme:dark').matches // boolean
const initialTheme = storedTheme ?? (systemThemeIsDark ? 'dark': 'light')
document.documentElement.setAttribute('data-theme', initialTheme)

// Attach toggleTheme to theme btn click event

window.addEventListener('DOMContentLoaded',function(){
    const themeBtn = document.querySelector('[data-theme-btn]')
    if(themeBtn) themeBtn.addEventListener('click',toggleTheme)
})