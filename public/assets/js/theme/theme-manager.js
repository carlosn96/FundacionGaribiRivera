/**
 * Theme Manager for Fundación Garibi Rivera
 * Handles persistence of Light/Dark mode using localStorage.
 * Prevents FOUC by applying theme immediately on load.
 */

(function () {
    'use strict';

    const THEME_KEY = 'fgr_theme_preference';

    console.log('Theme Manager Loaded'); // Debug: Verify execution


    function getStoredTheme() {
        return localStorage.getItem(THEME_KEY);
    }

    function setStoredTheme(theme) {
        localStorage.setItem(THEME_KEY, theme);
    }

    function getPreferredTheme() {
        const stored = getStoredTheme();
        if (stored) {
            return stored;
        }
        // Check system preference if no stored theme
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function setTheme(theme) {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme);
        }
    }

    // Apply theme immediately
    const theme = getPreferredTheme();
    setTheme(theme);

    // Expose global toggle function
    window.toggleTheme = function () {
        const currentCheck = document.documentElement.getAttribute('data-bs-theme');
        const newTheme = currentCheck === 'dark' ? 'light' : 'dark';

        setTheme(newTheme);
        setStoredTheme(newTheme);

        // Update any toggle icons if they exist (optional but good UI)
        updateThemeIcons(newTheme);
    };

    function updateThemeIcons(theme) {
        const iconSun = document.querySelector('.theme-icon-sun');
        const iconMoon = document.querySelector('.theme-icon-moon');

        if (theme === 'dark') {
            if (iconSun) iconSun.style.display = 'none';
            if (iconMoon) iconMoon.style.display = 'inline-block';
        } else {
            if (iconSun) iconSun.style.display = 'inline-block';
            if (iconMoon) iconMoon.style.display = 'none';
        }
    }

    // Initialize icons on load (defer slightly to ensure DOM is ready for icons)
    window.addEventListener('DOMContentLoaded', () => {
        const theme = getPreferredTheme();
        updateThemeIcons(theme);
        updateGlobalHeaderIcons(theme);

        // Attach listeners to existing global header buttons (if present)
        const darkButtons = document.querySelectorAll('.dark-layout');
        const lightButtons = document.querySelectorAll('.light-layout');

        darkButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                setTheme('dark');
                setStoredTheme('dark');
                updateThemeIcons('dark');
                updateGlobalHeaderIcons('dark');
            });
        });

        lightButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                setTheme('light');
                setStoredTheme('light');
                updateThemeIcons('light');
                updateGlobalHeaderIcons('light');
            });
        });
    });

    function updateGlobalHeaderIcons(theme) {
        // Hide/Show logic for the specific structure in header.php
        // header.php shows BOTH by default? Or toggles visibility?
        // Based on view_file, they are just links. Let's assume we want to show the one that SWITCHES to the other theme.
        // Or maybe standard behavior is: Sun shows when Dark (to switch to Light), Moon shows when Light (to switch to Dark).

        const moonBtns = document.querySelectorAll('.moon.dark-layout');
        const sunBtns = document.querySelectorAll('.sun.light-layout');

        if (theme === 'dark') {
            moonBtns.forEach(el => el.style.display = 'none'); // Already dark, don't show "Switch to Dark" button? 
            // Wait, usually Moon icon = "Switch to Dark" (visible in Light mode). Sun icon = "Switch to Light" (visible in Dark mode).
            // Let's verify the classes.
            // .moon.dark-layout -> Likely "Click to go Dark"
            // .sun.light-layout -> Likely "Click to go Light"

            moonBtns.forEach(el => el.style.display = 'none');
            sunBtns.forEach(el => el.style.display = 'inline-flex');
        } else {
            moonBtns.forEach(el => el.style.display = 'inline-flex');
            sunBtns.forEach(el => el.style.display = 'none');
        }
    }

})();
