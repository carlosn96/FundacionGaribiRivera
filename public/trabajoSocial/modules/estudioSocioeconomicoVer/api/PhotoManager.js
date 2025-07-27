class PhotoManager {
    constructor() {
        this.photos = [];
        this.previewPhotos = [];
        this.idConclusiones = null;
        this.initializeElements();
        this.bindEvents();
        this.updatePhotoCount();
    }

    setIdConclusiones(id) {
        this.idConclusiones = id;
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
        this.carouselEditBtnContainer = document.getElementById('carouselEditBtnContainer');
        this.btnEditarFoto = document.getElementById('btnEditarFoto');
        this.btnEliminarFoto = document.getElementById('btnEliminarFoto');
        this.carouselItems = document.getElementById('carouselItems');
        this.carouselIndicators = document.getElementById('carouselIndicators');
        this.carouselElement = document.getElementById('photoCarousel');
    }

    bindEvents() {
        if (this.uploadZone) {
            this.uploadZone.addEventListener('dragover', this.handleDragOver.bind(this));
            this.uploadZone.addEventListener('dragleave', this.handleDragLeave.bind(this));
            this.uploadZone.addEventListener('drop', this.handleDrop.bind(this));
            this.uploadZone.addEventListener('click', () => this.fileInput.click());
        }

        if (this.fileInput) {
            this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        }
        if (this.selectFilesBtn) {
            this.selectFilesBtn.addEventListener('click', () => this.fileInput.click());
        }
        if (this.saveBtn) {
            this.saveBtn.addEventListener('click', this.savePhotos.bind(this));
        }
        if (this.cancelBtn) {
            this.cancelBtn.addEventListener('click', this.cancelSelection.bind(this));
        }
        if (this.clearAllBtn) {
            this.clearAllBtn.addEventListener('click', this.clearAll.bind(this));
        }
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
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const imageFiles = files.filter(file => validTypes.includes(file.type));

        if (imageFiles.length === 0) {
            this.showToast('Por favor selecciona solo archivos de imagen JPG o PNG.', 'error');
            return;
        }

        imageFiles.forEach(file => {
            if (file.size > 5 * 1024 * 1024) {
                this.showToast(`${file.name} es demasiado grande. Máximo 5MB.`, 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                this.previewPhotos.push({
                    id: Date.now() + Math.random(),
                    file,
                    url: e.target.result,
                    name: file.name
                });
                this.updatePreview();
            };
            reader.readAsDataURL(file);
        });

        this.fileInput.value = '';
    }

    updatePreview() {
        if (!this.previewContainer) return;

        if (this.previewPhotos.length === 0) {
            this.previewSection?.style.setProperty('display', 'none');
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
            col.className = 'col position-relative';
            col.innerHTML = `
                <div class="card shadow-sm">
                    <img src="${photo.url}" class="card-img-top img-thumbnail" style="object-fit:cover; height:140px;" alt="Nueva foto">
                    <button type="button" class="btn-close position-absolute top-0 end-0 m-1" aria-label="Eliminar" title="Eliminar"></button>
                    <div class="card-body p-2">
                        <small class="text-truncate d-block">${photo.name}</small>
                    </div>
                </div>
            `;
            col.querySelector('button.btn-close').onclick = () => {
                this.removePreview(photo.id);
            };
            this.previewContainer.appendChild(col);
        });
    }

    removePreview(photoId) {
        this.previewPhotos = this.previewPhotos.filter(p => p.id !== photoId);
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
        if (!this.idConclusiones) {
            this.showToast('Falta ID de conclusiones para guardar las fotos.', 'error');
            return;
        }

        this.btnSpinner.classList.remove('d-none');
        this.btnText.textContent = 'Guardando...';
        this.saveBtn.disabled = true;

        this.uploadProgress.style.display = 'block';


        const fotosBase64 = this.previewPhotos.map(p => p.url.split(',')[1]);

        crearPeticion(urlAPI, {
            case: "agregarFotografias",
            data: $.param({
                idConclusiones: this.idConclusiones,
                fotos: fotosBase64
            })
        }, (response) => {
            if (response.es_valor_error) {
                this.showToast(response.mensaje, 'error');
            } else {
                this.photos.push(...this.previewPhotos);
                this.previewPhotos = [];
                this.updateCarousel();
                this.updatePreview();
                this.updatePhotoCount();
                this.showToast('Fotografías guardadas exitosamente', 'success');
            }

            this.btnSpinner.classList.add('d-none');
            this.btnText.textContent = 'Guardar fotografías';
            this.saveBtn.disabled = false;
            this.uploadProgress.style.display = 'none';

        });
    }

    updateCarousel() {
        if (!this.carouselItems || !this.carouselIndicators) return;

        if (this.photos.length === 0) {
            this.carouselSection?.style.setProperty('display', 'none');
            this.emptyState?.style.setProperty('display', 'block');
            this.carouselEditBtnContainer?.style.setProperty('display', 'none');
            return;
        }

        this.carouselSection.style.display = 'block';
        this.emptyState.style.display = 'none';

        this.carouselItems.innerHTML = '';
        this.carouselIndicators.innerHTML = '';

        this.photos.forEach((photo, index) => {
            const item = document.createElement('div');
            item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            item.dataset.photoId = photo.id;
            item.style.height = '400px';
            item.innerHTML = `
                <div class="d-flex justify-content-center align-items-center h-100">
                    <img src="${photo.url}" class="img-fluid rounded shadow" style="max-height:100%; max-width:100%; object-fit:contain;" alt="${photo.name}">
                </div>
            `;
            this.carouselItems.appendChild(item);

            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.setAttribute('data-bs-target', '#photoCarousel');
            indicator.setAttribute('data-bs-slide-to', index);
            indicator.className = index === 0 ? 'active' : '';
            indicator.setAttribute('aria-label', `Slide ${index + 1}`);
            if (index === 0) indicator.setAttribute('aria-current', 'true');
            this.carouselIndicators.appendChild(indicator);
        });

        this.bindCarouselEditEvents();
    }

    bindCarouselEditEvents() {
        if (!this.carouselEditBtnContainer || !this.btnEditarFoto || !this.btnEliminarFoto || !this.carouselElement) return;

        if (this.photos.length === 0) {
            this.carouselEditBtnContainer.style.display = 'none';
            return;
        }

        this.carouselEditBtnContainer.style.display = 'flex';

        const getActiveIndex = () => {
            const items = this.carouselItems.querySelectorAll('.carousel-item');
            return Array.from(items).findIndex(item => item.classList.contains('active'));
        };

        const updateDataIndex = () => {
            const idx = getActiveIndex();
            this.btnEditarFoto.dataset.photoIndex = idx;
            this.btnEliminarFoto.dataset.photoIndex = idx;
        };

        this.carouselElement.addEventListener('slid.bs.carousel', updateDataIndex);
        updateDataIndex();

        this.btnEditarFoto.onclick = () => {
            const idx = parseInt(this.btnEditarFoto.dataset.photoIndex);
            this.replacePhoto(idx);
        };

        this.btnEliminarFoto.onclick = () => {
            const idx = parseInt(this.btnEliminarFoto.dataset.photoIndex);
            this.deletePhoto(idx);
        };
    }

    replacePhoto(index) {
        if (index == null || index < 0 || index >= this.photos.length) return;

        let input = document.getElementById('inputFotoCambio');
        if (!input) {
            input = document.createElement('input');
            input.type = 'file';
            input.accept = '.jpg,.jpeg,.png';
            input.id = 'inputFotoCambio';
            input.style.display = 'none';
            document.body.appendChild(input);
        }

        input.value = '';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (evt) => {
                this.photos[index].url = evt.target.result;
                this.updateCarousel();
                this.showToast('Fotografía cambiada correctamente.', 'success');
            };
            reader.readAsDataURL(file);
        };
        input.click();
    }

    deletePhoto(index) {
        if (index == null || index < 0 || index >= this.photos.length) return;
        const photo = this.photos[index];

        alertaEliminar({
            mensajeAlerta: "La fotografía se eliminará permanentemente.",
            url: urlAPI,
            data: {
                case: "eliminarFotografia",
                data: $.param({ idFoto: photo.id })
            },
            callback: () => {
                this.photos.splice(index, 1);
                this.updateCarousel();
                this.updatePhotoCount();
                this.showToast("Fotografía eliminada correctamente.", "success");
            }
        });
    }

    updatePhotoCount() {
        if (!this.photoCount) return;
        const total = this.photos.length + this.previewPhotos.length;
        this.photoCount.textContent = `${total} ${total === 1 ? 'fotografía' : 'fotografías'}`;
    }

    showToast(message, type = 'info') {
        const fn = {
            success: mostrarMensajeOk,
            error: mostrarMensajeError,
            warning: mostrarMensajeAdvertencia,
            info: mostrarMensajeInfo
        }[type] || mostrarMensajeInfo;

        fn(message, false);
    }

    crearCarousel(fotografias = []) {
        if (!Array.isArray(fotografias)) fotografias = [];

        this.photos = fotografias.map(f => ({
            id: f.id,
            url: `data:image/jpeg;base64,${f.fotografia}`,
            name: `Foto ${f.id}`
        }));

        this.updateCarousel();
        this.updatePhotoCount();
    }
}

const photoManager = new PhotoManager();

