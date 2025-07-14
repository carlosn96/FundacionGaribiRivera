class PhotoManager {
    constructor() {
        this.photos = [];
        this.previewPhotos = [];
        this.initializeElements();
        this.bindEvents();
        this.updatePhotoCount();
    }

    initializeElements() {
        this.uploadZone = document.getElementById('uploadZone');
        this.fileInput = document.getElementById('inputAgregarFotos');
        this.previewContainer = document.getElementById('previewFotos');
        this.saveBtn = document.getElementById('btnGuardarFotos');
        this.cancelBtn = document.getElementById('btnCancelar');
        this.clearAllBtn = document.getElementById('clearAllBtn');
        this.selectFilesBtn = document.getElementById('selectFilesBtn');
        this.carouselSection = document.getElementById('carouselSection');
        this.emptyState = document.getElementById('emptyState');
        this.previewSection = document.getElementById('previewSection');
        this.photoCount = document.getElementById('photoCount');
        this.uploadProgress = document.getElementById('uploadProgress');
        this.btnSpinner = document.getElementById('btnSpinner');
        this.btnText = document.getElementById('btnText');
    }

    bindEvents() {
        // Drag and drop
        this.uploadZone.addEventListener('dragover', this.handleDragOver.bind(this));
        this.uploadZone.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.uploadZone.addEventListener('drop', this.handleDrop.bind(this));
        this.uploadZone.addEventListener('click', () => this.fileInput.click());

        // File selection
        this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        this.selectFilesBtn.addEventListener('click', () => this.fileInput.click());

        // Buttons
        this.saveBtn.addEventListener('click', this.savePhotos.bind(this));
        this.cancelBtn.addEventListener('click', this.cancelSelection.bind(this));
        this.clearAllBtn.addEventListener('click', this.clearAll.bind(this));
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadZone.classList.add('border-primary', 'bg-primary-subtle');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadZone.classList.remove('border-primary', 'bg-primary-subtle');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadZone.classList.remove('border-primary', 'bg-primary-subtle');
        const files = Array.from(e.dataTransfer.files);
        this.processFiles(files);
    }

    handleFileSelect(e) {
        const files = Array.from(e.target.files);
        this.processFiles(files);
    }

    processFiles(files) {
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        if (imageFiles.length === 0) {
            this.showToast('Por favor selecciona solo archivos de imagen', 'error');
            return;
        }

        imageFiles.forEach(file => {
            if (file.size > 5 * 1024 * 1024) {
                this.showToast(`${file.name} es demasiado grande. Máximo 5MB`, 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const photo = {
                    id: Date.now() + Math.random(),
                    file: file,
                    url: e.target.result,
                    name: file.name
                };
                this.previewPhotos.push(photo);
                this.updatePreview();
            };
            reader.readAsDataURL(file);
        });

        this.fileInput.value = '';
    }

    updatePreview() {
        if (this.previewPhotos.length === 0) {
            this.previewSection.style.display = 'none';
            this.saveBtn.disabled = true;
            this.cancelBtn.style.display = 'none';
            return;
        }

        this.previewSection.style.display = 'block';
        this.saveBtn.disabled = false;
        this.cancelBtn.style.display = 'inline-block';

        this.previewContainer.innerHTML = '';
        this.previewPhotos.forEach(photo => {
            const col = document.createElement('div');
            col.className = 'col';
            col.innerHTML = `
                        <div class="position-relative">
                            <img src="${photo.url}" class="img-fluid rounded shadow-sm" style="height: 120px; width: 100%; object-fit: cover;" alt="${photo.name}">
                            <button class="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle" 
                                    onclick="photoManager.removePreview('${photo.id}')"
                                    style="width: 30px; height: 30px; padding: 0;">
                                <i class="bi bi-x"></i>
                            </button>
                        </div>
                    `;
            this.previewContainer.appendChild(col);
        });
    }

    removePreview(photoId) {
        this.previewPhotos = this.previewPhotos.filter(photo => photo.id !== photoId);
        this.updatePreview();
    }

    clearAll() {
        this.previewPhotos = [];
        this.updatePreview();
    }

    cancelSelection() {
        this.clearAll();
    }

    async savePhotos() {
        if (this.previewPhotos.length === 0) return;

        this.btnSpinner.classList.remove('d-none');
        this.btnText.textContent = 'Guardando...';
        this.saveBtn.disabled = true;

        this.uploadProgress.style.display = 'block';
        const progressBar = this.uploadProgress.querySelector('.progress-bar');

        for (let i = 0; i <= 100; i += 10) {
            progressBar.style.width = i + '%';
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        this.photos.push(...this.previewPhotos);
        this.previewPhotos = [];

        this.updateCarousel();
        this.updatePreview();
        this.updatePhotoCount();

        this.btnSpinner.classList.add('d-none');
        this.btnText.textContent = 'Guardar fotografías';
        this.saveBtn.disabled = false;
        this.uploadProgress.style.display = 'none';

        this.showToast('Fotografías guardadas exitosamente', 'success');
    }

    updateCarousel() {
        const carouselItems = document.getElementById('carouselItems');
        const carouselIndicators = document.getElementById('carouselIndicators');

        if (this.photos.length === 0) {
            this.carouselSection.style.display = 'none';
            this.emptyState.style.display = 'block';
            return;
        }

        this.carouselSection.style.display = 'block';
        this.emptyState.style.display = 'none';

        carouselItems.innerHTML = '';
        carouselIndicators.innerHTML = '';

        this.photos.forEach((photo, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            carouselItem.innerHTML = `
                        <img src="${photo.url}" class="d-block w-100 h-100" style="object-fit: cover;" alt="${photo.name}">
                        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
                            <h6 class="mb-0">${photo.name}</h6>
                        </div>
                    `;
            carouselItems.appendChild(carouselItem);

            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.setAttribute('data-bs-target', '#photoCarousel');
            indicator.setAttribute('data-bs-slide-to', index);
            indicator.className = index === 0 ? 'active' : '';
            indicator.setAttribute('aria-label', `Slide ${index + 1}`);
            if (index === 0) indicator.setAttribute('aria-current', 'true');
            carouselIndicators.appendChild(indicator);
        });
    }

    updatePhotoCount() {
        this.photoCount.textContent = this.photos.length;
    }

    showToast(message, type = 'success') {
        const fn = type === 'success' ? mostrarMensajeOK : mostrarMensajeError;
        fn(message, false);
    }
}

const photoManager = new PhotoManager();