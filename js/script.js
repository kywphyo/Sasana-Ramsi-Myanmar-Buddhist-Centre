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
    '2026': [
        { src: 'images\\Sasanaramsi Vihara.jpg', alt: 'Main Monastery' },
        { src: 'images\\Sasanaramsi Vihara 2.jpg', alt: 'Buddha Statue' },
        { src: 'images\\Activities 2.jpg', alt: 'Meditation Hall' },
        { src: 'images\\Activities 1.jpg', alt: 'Group Gathering' }
    ],
    '2025': [
        { src: 'images\\Sasanaramsi Vihara.jpg', alt: 'Main Monastery' },
        { src: 'images\\Sasanaramsi Vihara 2.jpg', alt: 'Buddha Statue' },
        { src: 'images\\Activities 2.jpg', alt: 'Meditation Hall' },
        { src: 'images\\Activities 1.jpg', alt: 'Group Gathering' }
    ],
    '2024': [
        { src: 'images\\Sasanaramsi Vihara 3.jpg', alt: 'Evening Prayer' },
        { src: 'images\\Sasanaramsi Vihara 4.jpg', alt: 'Monastery Building' },
        { src: 'images\\Activites 3.jpg', alt: 'Monastery Garden' },
        { src: 'images\\U Thi.jpg', alt: 'Venerable Monk' }
    ],
    '2023': [
        { src: 'images\\Sasanaramsi Vihara 2.jpg', alt: 'Buddha Statue' },
        { src: 'images\\Sasanaramsi Vihara 3.jpg', alt: 'Evening Prayer' },
        { src: 'images\\Activities 1.jpg', alt: 'Group Gathering' },
        { src: 'images\\U Thi.jpg', alt: 'Venerable Monk' }
    ],
    '2022': [
        { src: 'images\\Activities 2.jpg', alt: 'Meditation Hall' },
        { src: 'images\\Sasanaramsi Vihara 4.jpg', alt: 'Monastery Building' },
        { src: 'images\\Activites 3.jpg', alt: 'Monastery Garden' },
        { src: 'images\\Sasanaramsi Vihara.jpg', alt: 'Main Monastery' }
    ],
    '2021': [
        { src: 'images\\Activities 1.jpg', alt: 'Group Gathering' },
        { src: 'images\\Sasanaramsi Vihara.jpg', alt: 'Main Monastery' },
        { src: 'images\\Sasanaramsi Vihara 3.jpg', alt: 'Evening Prayer' },
        { src: 'images\\Activities 2.jpg', alt: 'Meditation Hall' }
    ],
    '2020': [
        { src: 'images\\Sasanaramsi Vihara.jpg', alt: 'Main Monastery' },
        { src: 'images\\Sasanaramsi Vihara 2.jpg', alt: 'Buddha Statue' },
        { src: 'images\\Sasanaramsi Vihara 3.jpg', alt: 'Evening Prayer' },
        { src: 'images\\Sasanaramsi Vihara 4.jpg', alt: 'Monastery Building' }
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