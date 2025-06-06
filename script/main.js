function handleCommunityClick() {
    alert('Community button clicked');
  }

  function handlePreRegisterClick() {
    alert('Pre-register button clicked');
  }

  const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  
  corners.forEach(corner => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      canvas: document.createElement('canvas')
    });
    
    const container = document.querySelector(`.corner-sphere.${corner}`);
    const containerSize = getComputedStyle(container);
    const width = parseInt(containerSize.width);
    const height = parseInt(containerSize.height);
    
    renderer.setSize(height,width);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 10, 10);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 2.5;

    function animate() {
      requestAnimationFrame(animate);
      
      sphere.rotation.x += 0.004;
      sphere.rotation.y += 0.005;
      
      renderer.render(scene, camera);
    }
    
    animate();
  });

  document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease-in-out';
      document.body.style.opacity = '1';
    }, 100);
  });

  window.addEventListener('resize', function() {
    corners.forEach(corner => {
      const container = document.querySelector(`.corner-sphere.${corner}`);
      const canvas = container.querySelector('canvas');
      if (canvas) {
        const containerSize = getComputedStyle(container);
        const width = parseInt(containerSize.width);
        const height = parseInt(containerSize.height);
        canvas.width = width;
        canvas.height = height;
      }
    });
  });