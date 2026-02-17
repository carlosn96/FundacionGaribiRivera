<style>
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bs-body-bg, #ffffff);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color 0.3s ease;
    }
    .preloader.hidden {
        display: none;
    }
    .professional-spinner {
        width: 60px;
        height: 60px;
        border: 4px solid var(--bs-gray-200, #f3f3f3);
        border-top: 4px solid var(--bs-primary, #173f35);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
<div class="preloader" id="preloader">
    <div class="professional-spinner"></div>
</div>