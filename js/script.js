// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu after clicking a link
        if (navLinks && hamburger) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Gallery modal and lightbox functionality
let currentPhotoIndex = 0;
let currentAlbumPhotos = [];

// Define album data
const albums = {
    '2025': [
        { src: 'images/Sasana Ramsi 2025/504183502_1131133172376750_1218493082655093356_n.jpg', alt: 'Sasana Ramsi 2025 photo 1' },
        { src: 'images/Sasana Ramsi 2025/504198392_1131145422375525_7527317003308748646_n.jpg', alt: 'Sasana Ramsi 2025 photo 2' },
        { src: 'images/Sasana Ramsi 2025/504646200_1131145059042228_468024638424950533_n.jpg', alt: 'Sasana Ramsi 2025 photo 3' },
        { src: 'images/Sasana Ramsi 2025/504930396_1131134079043326_5496411270690488682_n.jpg', alt: 'Sasana Ramsi 2025 photo 4' },
        { src: 'images/Sasana Ramsi 2025/505156112_1131145399042194_2764953283520151391_n.jpg', alt: 'Sasana Ramsi 2025 photo 5' },
        { src: 'images/Sasana Ramsi 2025/505375516_1131145405708860_6069215934757759122_n.jpg', alt: 'Sasana Ramsi 2025 photo 6' },
        { src: 'images/Sasana Ramsi 2025/509431882_1139609534862447_3503583069561466629_n.jpg', alt: 'Sasana Ramsi 2025 photo 7' }
    ],
    '2024': [
        { src: 'images/Sasan Ramsi 2024/484503056_1065662992257102_6428353005039563766_n.jpg', alt: 'Sasana Ramsi 2024 photo 1' },
        { src: 'images/Sasan Ramsi 2024/484645033_1065663005590434_5142643707229326793_n.jpg', alt: 'Sasana Ramsi 2024 photo 2' },
        { src: 'images/Sasan Ramsi 2024/484802794_1065663365590398_191873119787382856_n.jpg', alt: 'Sasana Ramsi 2024 photo 3' },
        { src: 'images/Sasan Ramsi 2024/484804175_1065663028923765_5167710303968742255_n.jpg', alt: 'Sasana Ramsi 2024 photo 4' },
        { src: 'images/Sasan Ramsi 2024/485144037_1065663048923763_1453606047414318699_n.jpg', alt: 'Sasana Ramsi 2024 photo 5' },
        { src: 'images/Sasan Ramsi 2024/485166237_1065663345590400_8630885882442065697_n.jpg', alt: 'Sasana Ramsi 2024 photo 6' },
        { src: 'images/Sasan Ramsi 2024/515443198_10161702484447555_4024370618505971145_n.jpg', alt: 'Sasana Ramsi 2024 photo 7' }
    ],
    '2023': [
        { src: 'images/Sasana Ramsi 2023/480273407_1042589887897746_4681106906146158410_n.jpg', alt: 'Sasana Ramsi 2023 photo 1' },
        { src: 'images/Sasana Ramsi 2023/480328128_1042589764564425_716004075818786500_n.jpg', alt: 'Sasana Ramsi 2023 photo 2' },
        { src: 'images/Sasana Ramsi 2023/480331235_1042590014564400_3108344701923981292_n.jpg', alt: 'Sasana Ramsi 2023 photo 3' },
        { src: 'images/Sasana Ramsi 2023/480471671_1041954811294587_2093414353888819581_n.jpg', alt: 'Sasana Ramsi 2023 photo 4' },
        { src: 'images/Sasana Ramsi 2023/480485670_1042590024564399_4905141003396093300_n.jpg', alt: 'Sasana Ramsi 2023 photo 5' },
        { src: 'images/Sasana Ramsi 2023/480496831_1042588747897860_8805263164924213545_n.jpg', alt: 'Sasana Ramsi 2023 photo 6' },
        { src: 'images/Sasana Ramsi 2023/480508893_1042589731231095_8551804208474768481_n.jpg', alt: 'Sasana Ramsi 2023 photo 7' }
    ],
    '2020': [
        { src: 'images/Sasana Ramsi 2020/60925520_10156680260113227_7772591569563025408_n.jpg', alt: 'Sasana Ramsi 2020 photo 1' },
        { src: 'images/Sasana Ramsi 2020/81090017_10157250583023227_5828623855962292224_n.jpg', alt: 'Sasana Ramsi 2020 photo 2' },
        { src: 'images/Sasana Ramsi 2020/81317104_10157250582858227_3212918382479278080_n.jpg', alt: 'Sasana Ramsi 2020 photo 3' },
        { src: 'images/Sasana Ramsi 2020/81344893_10157250582528227_2276157561063342080_n.jpg', alt: 'Sasana Ramsi 2020 photo 4' },
        { src: 'images/Sasana Ramsi 2020/81955196_10157250583413227_806616040967503872_n.jpg', alt: 'Sasana Ramsi 2020 photo 5' },
        { src: 'images/Sasana Ramsi 2020/81963385_10157250582653227_4204056109792624640_n.jpg', alt: 'Sasana Ramsi 2020 photo 6' }
    ],
    '2019': [
        { src: 'images/Sasana Ramsi 2019/471638786_10161454123288227_5962029447539752372_n.jpg', alt: 'Sasana Ramsi 2019 photo 1' },
        { src: 'images/Sasana Ramsi 2019/60925520_10156680260113227_7772591569563025408_n.jpg', alt: 'Sasana Ramsi 2019 photo 2' },
        { src: 'images/Sasana Ramsi 2019/61056025_10156680314348227_6054391603605274624_n.jpg', alt: 'Sasana Ramsi 2019 photo 3' },
        { src: 'images/Sasana Ramsi 2019/67184128_10156797848608227_2821695918930132992_n.jpg', alt: 'Sasana Ramsi 2019 photo 4' },
        { src: 'images/Sasana Ramsi 2019/67252328_10156808554053227_1620188576039829504_n.jpg', alt: 'Sasana Ramsi 2019 photo 5' },
        { src: 'images/Sasana Ramsi 2019/74311373_10157079794993227_2271778249199583232_n.jpg', alt: 'Sasana Ramsi 2019 photo 6' },
        { src: 'images/Sasana Ramsi 2019/74417787_10157079794473227_6581108332449234944_n.jpg', alt: 'Sasana Ramsi 2019 photo 7' }
    ]
};

function openAlbum(element) {
    const albumTitle = element.querySelector('.album-info h3').textContent;
    const modal = document.getElementById('albumModal');
    const photosContainer = document.getElementById('modalPhotosContainer');
    
    // Set album title
    document.getElementById('modalAlbumTitle').textContent = albumTitle;
    
    // Get photos for this album
    const photos = albums[albumTitle] || [];
    currentAlbumPhotos = photos;
    
    // Generate HTML for photos
    photosContainer.innerHTML = photos.map((photo, index) => 
        `<div class="photo-item" onclick="openLightbox(${index})">
            <img src="${photo.src}" alt="${photo.alt}">
        </div>`
    ).join('');
    
    // Show modal
    modal.classList.add('active');
}

function closeAlbum() {
    document.getElementById('albumModal').classList.remove('active');
}

function openLightbox(index) {
    currentPhotoIndex = index;
    
    // Display the lightbox with the selected photo
    const photo = currentAlbumPhotos[currentPhotoIndex];
    document.getElementById('lightboxImage').src = photo.src;
    document.getElementById('lightbox').classList.add('active');
    
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function nextPhoto() {
    if (currentAlbumPhotos.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % currentAlbumPhotos.length;
    const photo = currentAlbumPhotos[currentPhotoIndex];
    document.getElementById('lightboxImage').src = photo.src;
}

function previousPhoto() {
    if (currentAlbumPhotos.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex - 1 + currentAlbumPhotos.length) % currentAlbumPhotos.length;
    const photo = currentAlbumPhotos[currentPhotoIndex];
    document.getElementById('lightboxImage').src = photo.src;
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    const albumModal = document.getElementById('albumModal');
    if (e.target === albumModal) {
        closeAlbum();
    }
});

// Add some interactive effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in effect
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Image lazy loading (placeholder for actual implementation)
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));
