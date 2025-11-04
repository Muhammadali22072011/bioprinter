// Image Loader for BioPrinter 3D Visualization
// Handles image uploads and integration with the printer

document.addEventListener('DOMContentLoaded', function() {
    console.log('[ImageLoader] DOMContentLoaded - Initializing...');
    
    const imageUploadBtn = document.getElementById('image-upload-btn');
    const imageUploadInput = document.getElementById('image-upload');
    const imageStatus = document.getElementById('image-status');
    
    console.log('[ImageLoader] Elements found:', {
        button: imageUploadBtn ? '✓' : '✗',
        input: imageUploadInput ? '✓' : '✗',
        status: imageStatus ? '✓' : '✗'
    });
    
    if (!imageUploadBtn || !imageUploadInput) {
        console.error('[ImageLoader] ERROR: Required elements not found!');
        return;
    }
    
    console.log('[ImageLoader] Initializing event listeners...');
    
    // Add debouncing for button clicks
    let isProcessing = false;
    
    // Click button to open file dialog
    imageUploadBtn.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        // Prevent double-click from opening dialog twice
        if (isProcessing) {
            console.log('[ImageLoader] Button click ignored - already processing');
            return;
        }
        
        console.log('[ImageLoader] Button clicked - opening file dialog');
        imageUploadInput.click();
    });
    
    // Prevent double-click
    imageUploadBtn.addEventListener('dblclick', function(event) {
        event.preventDefault();
        console.log('[ImageLoader] Double-click prevented');
    });
    
    // Handle file selection
    imageUploadInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        console.log('[ImageLoader] File selected:', file ? file.name : 'none');
        if (!file) return;
        
        isProcessing = true;
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            console.warn('[ImageLoader] Invalid file type:', file.type);
            imageStatus.textContent = '❌ Пожалуйста, выберите изображение';
            imageStatus.style.color = 'var(--color-error)';
            isProcessing = false;
            return;
        }
        
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            console.warn('[ImageLoader] File too large:', file.size);
            imageStatus.textContent = '❌ Размер файла не должен превышать 5 МБ';
            imageStatus.style.color = 'var(--color-error)';
            isProcessing = false;
            return;
        }
        
        imageStatus.textContent = '⏳ Загрузка...';
        imageStatus.style.color = 'var(--color-text-muted)';
        console.log('[ImageLoader] Processing image...');
        
        // Read and process image
        const reader = new FileReader();
        reader.onload = function(e) {
            console.log('[ImageLoader] File read - creating image element');
            const img = new Image();
            img.onload = function() {
                console.log('[ImageLoader] Image loaded - creating texture');
                // Create texture from image
                const texture = new THREE.Texture(img);
                texture.needsUpdate = true;
                
                // Send to bioprinter to create print plane
                if (typeof createPrintPlane === 'function') {
                    console.log('[ImageLoader] Calling createPrintPlane()');
                    createPrintPlane(texture);
                    imageStatus.textContent = '✅ Печать начата! Следите за процессом...';
                    imageStatus.style.color = 'var(--color-primary)';
                    
                    // Reset after animation
                    setTimeout(() => {
                        imageStatus.textContent = '✨ Печать завершена!';
                        imageStatus.style.color = 'var(--color-success)';
                        console.log('[ImageLoader] Print animation complete');
                        isProcessing = false;
                        
                        // Reset file input for next upload
                        imageUploadInput.value = '';
                    }, 4000);
                } else {
                    console.error('[ImageLoader] ERROR: createPrintPlane function not found!');
                    imageStatus.textContent = '❌ Ошибка: 3D принтер не инициализирован';
                    imageStatus.style.color = 'var(--color-error)';
                    isProcessing = false;
                }
            };
            img.onerror = function() {
                console.error('[ImageLoader] Image load error');
                imageStatus.textContent = '❌ Ошибка при загрузке изображения';
                imageStatus.style.color = 'var(--color-error)';
                isProcessing = false;
            };
            img.src = e.target.result;
        };
        reader.onerror = function() {
            console.error('[ImageLoader] FileReader error');
            imageStatus.textContent = '❌ Ошибка при чтении файла';
            imageStatus.style.color = 'var(--color-error)';
            isProcessing = false;
        };
        reader.readAsDataURL(file);
    });
    
    // Drag and drop support
    const container = document.getElementById('bioprinter-3d-container');
    if (container) {
        console.log('[ImageLoader] Drag-drop support enabled');
        container.addEventListener('dragover', function(e) {
            e.preventDefault();
            container.style.opacity = '0.8';
        });
        
        container.addEventListener('dragleave', function() {
            container.style.opacity = '1';
        });
        
        container.addEventListener('drop', function(e) {
            e.preventDefault();
            container.style.opacity = '1';
            console.log('[ImageLoader] File dropped');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                imageUploadInput.files = files;
                const event = new Event('change', { bubbles: true });
                imageUploadInput.dispatchEvent(event);
            }
        });
    } else {
        console.warn('[ImageLoader] 3D container not found - drag-drop disabled');
    }
    
    console.log('[ImageLoader] Initialization complete ✓');
});
