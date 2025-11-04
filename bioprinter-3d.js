// 3D BioPrinter Model with Three.js
// Interactive 3D visualization with rotation and zoom

let scene, camera, renderer, printer, printHead;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotationVelocity = { x: 0, y: 0 };
let imageTexture = null;
let printProgress = 0;
let isPrinting = false;
let printMesh = null;

// Colors from CSS variables
const colors = {
    primary: 0x00D3A7,
    secondary: 0x4C5AFF,
    frame: 0x2a2e37,
    glass: 0x1a1d24,
    metal: 0x8B92A8,
    screen: 0x00ff00
};

function init3DPrinter() {
    const container = document.getElementById('bioprinter-3d-container');
    if (!container) return;

    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(
        50,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(10, 8, 14);
    camera.lookAt(0, 3, 0);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(10, 15, 10);
    mainLight.castShadow = true;
    mainLight.shadow.camera.near = 0.1;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -15;
    mainLight.shadow.camera.right = 15;
    mainLight.shadow.camera.top = 15;
    mainLight.shadow.camera.bottom = -15;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(colors.primary, 0.3);
    rimLight.position.set(-5, 5, -5);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(colors.secondary, 0.5, 20);
    accentLight.position.set(0, 8, 0);
    scene.add(accentLight);

    // Create printer group
    printer = new THREE.Group();
    
    // Base platform
    const baseGeometry = new THREE.BoxGeometry(6, 0.3, 6);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.frame,
        metalness: 0.7,
        roughness: 0.3
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0;
    base.castShadow = true;
    base.receiveShadow = true;
    printer.add(base);

    // Vertical frame posts (4 corners)
    const postGeometry = new THREE.CylinderGeometry(0.15, 0.15, 8, 16);
    const postMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.metal,
        metalness: 0.8,
        roughness: 0.2
    });

    const positions = [
        [-2.5, 4, -2.5],
        [2.5, 4, -2.5],
        [-2.5, 4, 2.5],
        [2.5, 4, 2.5]
    ];

    positions.forEach(pos => {
        const post = new THREE.Mesh(postGeometry, postMaterial);
        post.position.set(...pos);
        post.castShadow = true;
        printer.add(post);
    });

    // Top frame
    const topFrameGeometry = new THREE.BoxGeometry(5.5, 0.3, 5.5);
    const topFrameMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.frame,
        metalness: 0.7,
        roughness: 0.3
    });
    const topFrame = new THREE.Mesh(topFrameGeometry, topFrameMaterial);
    topFrame.position.y = 8;
    topFrame.castShadow = true;
    printer.add(topFrame);

    // Glass/acrylic panels
    const panelGeometry = new THREE.BoxGeometry(5, 7, 0.1);
    const panelMaterial = new THREE.MeshPhysicalMaterial({ 
        color: colors.glass,
        transparent: true,
        opacity: 0.3,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 0.5
    });

    // Front panel
    const frontPanel = new THREE.Mesh(panelGeometry, panelMaterial);
    frontPanel.position.set(0, 4, 2.5);
    printer.add(frontPanel);

    // Back panel
    const backPanel = new THREE.Mesh(panelGeometry, panelMaterial);
    backPanel.position.set(0, 4, -2.5);
    printer.add(backPanel);

    // Side panels
    const sidePanelGeometry = new THREE.BoxGeometry(0.1, 7, 5);
    const leftPanel = new THREE.Mesh(sidePanelGeometry, panelMaterial);
    leftPanel.position.set(-2.5, 4, 0);
    printer.add(leftPanel);

    const rightPanel = new THREE.Mesh(sidePanelGeometry, panelMaterial);
    rightPanel.position.set(2.5, 4, 0);
    printer.add(rightPanel);

    // Camera module (top center)
    const cameraHousingGeometry = new THREE.CylinderGeometry(0.4, 0.5, 0.6, 16);
    const cameraHousingMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.frame,
        metalness: 0.8,
        roughness: 0.3
    });
    const cameraHousing = new THREE.Mesh(cameraHousingGeometry, cameraHousingMaterial);
    cameraHousing.position.set(0, 8.5, 0);
    cameraHousing.castShadow = true;
    printer.add(cameraHousing);

    // Camera lens
    const lensGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.1, 16);
    const lensMaterial = new THREE.MeshPhysicalMaterial({ 
        color: colors.primary,
        metalness: 0.9,
        roughness: 0.1,
        emissive: colors.primary,
        emissiveIntensity: 0.3
    });
    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    lens.position.set(0, 8.2, 0);
    printer.add(lens);

    // Print head (moving part)
    printHead = new THREE.Group();
    
    const printHeadBodyGeometry = new THREE.BoxGeometry(2, 0.8, 1.5);
    const printHeadMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.secondary,
        metalness: 0.7,
        roughness: 0.4,
        emissive: colors.secondary,
        emissiveIntensity: 0.2
    });
    const printHeadBody = new THREE.Mesh(printHeadBodyGeometry, printHeadMaterial);
    printHeadBody.castShadow = true;
    printHead.add(printHeadBody);

    // Extruder nozzles (3 syringes)
    const nozzleGeometry = new THREE.CylinderGeometry(0.08, 0.05, 0.6, 8);
    const nozzleMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.primary,
        metalness: 0.9,
        roughness: 0.2,
        emissive: colors.primary,
        emissiveIntensity: 0.4
    });

    for (let i = -1; i <= 1; i++) {
        const nozzle = new THREE.Mesh(nozzleGeometry, nozzleMaterial);
        nozzle.position.set(i * 0.5, -0.7, 0);
        printHead.add(nozzle);
    }

    printHead.position.set(0, 6, 0);
    printer.add(printHead);

    // Build plate
    const buildPlateGeometry = new THREE.BoxGeometry(4, 0.2, 4);
    const buildPlateMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1d24,
        metalness: 0.5,
        roughness: 0.5
    });
    const buildPlate = new THREE.Mesh(buildPlateGeometry, buildPlateMaterial);
    buildPlate.position.y = 1;
    buildPlate.castShadow = true;
    buildPlate.receiveShadow = true;
    printer.add(buildPlate);

    // Printed object example (wave pattern)
    const printedObjectGroup = new THREE.Group();
    const segmentMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.primary,
        metalness: 0.3,
        roughness: 0.7,
        emissive: colors.primary,
        emissiveIntensity: 0.1
    });

    for (let i = 0; i < 8; i++) {
        const height = 0.2 + Math.sin(i * 0.8) * 0.15;
        const segmentGeometry = new THREE.CylinderGeometry(0.15, 0.15, height, 8);
        const segment = new THREE.Mesh(segmentGeometry, segmentMaterial);
        segment.position.set((i - 3.5) * 0.4, 1.2 + height / 2, 0);
        segment.castShadow = true;
        printedObjectGroup.add(segment);
    }
    printer.add(printedObjectGroup);

    // Control panel
    const controlPanelGeometry = new THREE.BoxGeometry(4.5, 0.8, 0.15);
    const controlPanelMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.frame,
        metalness: 0.6,
        roughness: 0.4
    });
    const controlPanel = new THREE.Mesh(controlPanelGeometry, controlPanelMaterial);
    controlPanel.position.set(0, 0.5, 2.6);
    controlPanel.castShadow = true;
    printer.add(controlPanel);

    // Screen on control panel
    const screenGeometry = new THREE.PlaneGeometry(2, 0.5);
    const screenMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.screen,
        emissive: colors.screen,
        emissiveIntensity: 0.5
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(-0.8, 0.5, 2.68);
    printer.add(screen);

    // Control buttons
    const buttonGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16);
    const button1Material = new THREE.MeshStandardMaterial({ 
        color: colors.primary,
        emissive: colors.primary,
        emissiveIntensity: 0.3
    });
    const button1 = new THREE.Mesh(buttonGeometry, button1Material);
    button1.position.set(1.2, 0.5, 2.65);
    button1.rotation.x = Math.PI / 2;
    printer.add(button1);

    const button2 = new THREE.Mesh(buttonGeometry, button1Material.clone());
    button2.material.color.setHex(colors.secondary);
    button2.material.emissive.setHex(colors.secondary);
    button2.position.set(1.6, 0.5, 2.65);
    button2.rotation.x = Math.PI / 2;
    printer.add(button2);

    // Add printer to scene
    printer.position.y = 0;
    scene.add(printer);

    // Mouse controls
    let mouseX = 0, mouseY = 0;
    
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('wheel', onMouseWheel);
    
    renderer.domElement.addEventListener('touchstart', onTouchStart);
    renderer.domElement.addEventListener('touchmove', onTouchMove);
    renderer.domElement.addEventListener('touchend', onTouchEnd);

    function onMouseDown(e) {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    }

    function onMouseMove(e) {
        if (isDragging) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;
            
            rotationVelocity.y = deltaX * 0.005;
            rotationVelocity.x = deltaY * 0.005;
            
            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    }

    function onMouseUp() {
        isDragging = false;
    }

    function onMouseWheel(e) {
        e.preventDefault();
        const zoomSpeed = 0.001;
        camera.position.z += e.deltaY * zoomSpeed;
        camera.position.z = Math.max(8, Math.min(20, camera.position.z));
    }

    let touchStartX = 0, touchStartY = 0;
    
    function onTouchStart(e) {
        if (e.touches.length === 1) {
            isDragging = true;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            previousMousePosition = { x: touchStartX, y: touchStartY };
        }
    }

    function onTouchMove(e) {
        if (isDragging && e.touches.length === 1) {
            const deltaX = e.touches[0].clientX - previousMousePosition.x;
            const deltaY = e.touches[0].clientY - previousMousePosition.y;
            
            rotationVelocity.y = deltaX * 0.005;
            rotationVelocity.x = deltaY * 0.005;
            
            previousMousePosition = { 
                x: e.touches[0].clientX, 
                y: e.touches[0].clientY 
            };
        }
    }

    function onTouchEnd() {
        isDragging = false;
    }

    // Animation
    let printHeadDirection = 1;
    let printHeadSpeed = 0.01;

    function animate() {
        requestAnimationFrame(animate);

        // Auto-rotate printer slowly
        if (!isDragging) {
            printer.rotation.y += 0.002;
            rotationVelocity.x *= 0.95;
            rotationVelocity.y *= 0.95;
        }

        // Apply rotation velocity
        printer.rotation.y += rotationVelocity.y;
        printer.rotation.x += rotationVelocity.x;

        // Limit X rotation
        printer.rotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, printer.rotation.x));

        // Animate print head up and down
        printHead.position.y += printHeadSpeed * printHeadDirection;
        if (printHead.position.y > 7 || printHead.position.y < 2) {
            printHeadDirection *= -1;
        }

        // Update print progress
        updatePrintProgress(0.016); // Approximately 60 frames per second

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    });
}

function createPrintPlane(texture) {
    // Remove previous print if exists
    if (printMesh) {
        printer.remove(printMesh);
        printMesh.geometry.dispose();
        printMesh.material.dispose();
    }
    
    // Create image element to work with
    let imgElement = texture.image;
    
    // Handle canvas textures and image elements
    if (imgElement instanceof HTMLCanvasElement) {
        // Already a canvas, use directly
    } else if (imgElement instanceof HTMLImageElement) {
        // Image element, create canvas from it
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        // Draw image scaled to fit
        const scale = Math.max(canvas.width / imgElement.width, canvas.height / imgElement.height);
        const x = (canvas.width - imgElement.width * scale) / 2;
        const y = (canvas.height - imgElement.height * scale) / 2;
        ctx.drawImage(imgElement, x, y, imgElement.width * scale, imgElement.height * scale);
        
        // Convert to grayscale
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
            data[i] = gray;
            data[i + 1] = gray;
            data[i + 2] = gray;
        }
        ctx.putImageData(imageData, 0, 0);
        imgElement = canvas;
    }
    
    // Create texture from canvas
    const canvasTexture = new THREE.CanvasTexture(imgElement);
    canvasTexture.magFilter = THREE.LinearFilter;
    canvasTexture.minFilter = THREE.LinearFilter;
    
    const printMaterial = new THREE.MeshStandardMaterial({
        map: canvasTexture,
        metalness: 0.2,
        roughness: 0.8,
        emissive: colors.primary,
        emissiveIntensity: 0.3
    });
    
    const printGeometry = new THREE.PlaneGeometry(3.5, 3.5);
    printMesh = new THREE.Mesh(printGeometry, printMaterial);
    printMesh.position.set(0, 1.15, 0);
    printMesh.rotation.x = -Math.PI / 2;
    printMesh.castShadow = true;
    printMesh.receiveShadow = true;
    printer.add(printMesh);
    
    // Start printing animation
    isPrinting = true;
    printProgress = 0;
}

function updatePrintProgress(deltaTime) {
    if (!isPrinting || !printMesh) return;
    
    const printSpeed = 0.4; // Progress per second
    printProgress += deltaTime * printSpeed;
    
    if (printProgress >= 1) {
        printProgress = 1;
        isPrinting = false;
    }
    
    // Update material opacity
    printMesh.material.opacity = printProgress;
    printMesh.material.transparent = true;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DPrinter);
} else {
    init3DPrinter();
}

