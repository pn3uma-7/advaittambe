// ================================
// MOVIE DATA
// ================================
let movies = []; // Will be populated from API

// API Configuration
// Change this to your deployed Render.com backend URL after deployment
const API_BASE_URL = process.env.API_BASE_URL || 'https://advait-imdb-backend.onrender.com';

/**
 * Fetch filmography from the backend API
 */
async function fetchFilmography() {
    try {
        console.log('Fetching filmography from API...');
        const response = await fetch(`${API_BASE_URL}/api/filmography`);
        const result = await response.json();

        if (result.success && result.data) {
            movies = result.data;
            console.log(`Loaded ${movies.length} movies from ${result.source}`);
            return movies;
        } else {
            throw new Error(result.error || 'Failed to fetch filmography');
        }
    } catch (error) {
        console.error('Error fetching filmography:', error);
        // Fallback to hardcoded data if API fails
        movies = getFallbackMovies();
        console.log('Using fallback movie data');
        return movies;
    }
}

/**
 * Fallback movie data in case API is unavailable
 */
function getFallbackMovies() {
    return [
        {
            title: "Family Man S3",
            role: "Production Coordinator",
            year: "2024",
            poster: "https://m.media-amazon.com/images/M/MV5BYTlkN2Y1YjktYjI5OS00NGFlLWI4MjktNWRhM2VlNjY5MzZiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        },
        {
            title: "Dabba Cartel",
            role: "Production Coordinator",
            year: "2024",
            poster: "https://m.media-amazon.com/images/M/MV5BNzFlYjcwMGMtMWM3Yy00YjNmLWI5ZmEtYzFmN2E2ZGY3MGViXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        },
        {
            title: "Salaar",
            role: "Production Coordinator",
            year: "2023",
            poster: "https://m.media-amazon.com/images/M/MV5BYjJjOGNhODMtOWZmMC00NTQ1LTk0ZDEtMDEzOGQzYWYzNDNkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        },
        {
            title: "Leo",
            role: "Production Coordinator",
            year: "2023",
            poster: "https://m.media-amazon.com/images/M/MV5BNzAyM2E1MWYtNzBkZi00NjdkLTk2ZTEtODcwMGZkMmU4YmM3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        },
        {
            title: "Sam Bahadur",
            role: "Production Coordinator",
            year: "2023",
            poster: "https://m.media-amazon.com/images/M/MV5BOGY5NzcyMTEtNTk2ZC00NWM3LWJkNmQtZTk5MDdmODcyOWJkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        },
        {
            title: "The Crew",
            role: "Production Coordinator",
            year: "2024",
            poster: "https://m.media-amazon.com/images/M/MV5BNmQzNTYwMjktYWJkNy00ZDkzLWI3OWEtZTZjNmZmNzI4NzZkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        },
        {
            title: "Adipurush",
            role: "Production Coordinator",
            year: "2023",
            poster: "https://m.media-amazon.com/images/M/MV5BN2Y3YWJkMDMtMmE2Ni00ZTU1LWJlZmEtNGRlMGUxNGQ0NzI1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        },
        {
            title: "Guntur Kaaram",
            role: "Production Coordinator",
            year: "2024",
            poster: "https://m.media-amazon.com/images/M/MV5BN2FiYTczZGUtZjBjZC00NjU0LTk1NjUtNjA1MjJlNWRjMjgxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        },
        {
            title: "Laal Singh Chaddha",
            role: "Trainee FX Artist",
            year: "2022",
            poster: "https://m.media-amazon.com/images/M/MV5BODU2MmM4OTktNDdlNC00OTdmLWJlYjgtMjMzZDYwZGJlNzVkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        },
        {
            title: "Bhool Bhulaiyaa 2",
            role: "Trainee FX Artist",
            year: "2022",
            poster: "https://m.media-amazon.com/images/M/MV5BYzI4ZGNjYjEtZGUwYi00Yzk5LWE5ZjMtNWQ2NTY1MDUxMzI2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        }
    ];
}

// ================================
// MOVIE CAROUSEL
// ================================
class MovieCarousel {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.dotsContainer = document.querySelector('.carousel-dots');
        this.currentIndex = 0;
        this.autoRotateInterval = null;
        this.init();
    }

    async init() {
        // Fetch filmography data first
        await fetchFilmography();

        // Then create the carousel
        this.createMovieCards();
        this.createDots();
        this.attachEventListeners();
        this.startAutoRotate();
        this.updateCarousel();
    }

    createMovieCards() {
        movies.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'movie-card';
            card.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" onerror="this.src='https://via.placeholder.com/300x400?text=${encodeURIComponent(movie.title)}'">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <p class="movie-role">${movie.role}</p>
                    <p class="movie-year">${movie.year}</p>
                </div>
            `;
            this.track.appendChild(card);
        });
    }

    createDots() {
        const visibleCards = this.getVisibleCards();
        const dotCount = Math.ceil(movies.length / visibleCards);

        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    getVisibleCards() {
        const containerWidth = document.querySelector('.carousel-wrapper').offsetWidth;
        return Math.floor(containerWidth / 310); // 280px card + 30px gap
    }

    attachEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Pause auto-rotate on hover
        const container = document.querySelector('.carousel-container');
        container.addEventListener('mouseenter', () => this.stopAutoRotate());
        container.addEventListener('mouseleave', () => this.startAutoRotate());
    }

    updateCarousel() {
        const cardWidth = 310; // 280px + 30px gap
        const offset = -this.currentIndex * cardWidth;
        this.track.style.transform = `translateX(${offset}px)`;
        this.updateDots();
    }

    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.dot');
        const visibleCards = this.getVisibleCards();
        const currentDot = Math.floor(this.currentIndex / visibleCards);

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentDot);
        });
    }

    next() {
        const maxIndex = movies.length - this.getVisibleCards();
        this.currentIndex = Math.min(this.currentIndex + 1, maxIndex);
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = Math.max(this.currentIndex - 1, 0);
        this.updateCarousel();
    }

    goToSlide(index) {
        const visibleCards = this.getVisibleCards();
        this.currentIndex = index * visibleCards;
        this.updateCarousel();
    }

    startAutoRotate() {
        this.autoRotateInterval = setInterval(() => {
            const maxIndex = movies.length - this.getVisibleCards();
            if (this.currentIndex >= maxIndex) {
                this.currentIndex = 0;
            } else {
                this.next();
            }
        }, 1800); // Rotate every 1.8 seconds (much faster)
    }

    stopAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
        }
    }
}

// ================================
// NAVIGATION
// ================================
class Navigation {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.attachScrollListener();
        this.attachClickListeners();
    }

    attachScrollListener() {
        window.addEventListener('scroll', () => {
            let current = '';

            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    attachClickListeners() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            });
        });
    }
}

// ================================
// STATS COUNTER
// ================================
class StatsCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.hasAnimated = false;
        this.init();
    }

    init() {
        this.observeSection();
    }

    observeSection() {
        const options = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateCounters();
                    this.hasAnimated = true;
                }
            });
        }, options);

        const homeSection = document.querySelector('.home-section');
        observer.observe(homeSection);
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }
}

// ================================
// FLOATING CTA
// ================================
class FloatingCTA {
    constructor() {
        this.floatingBtn = document.querySelector('.floating-cta');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                this.floatingBtn.classList.add('visible');
            } else {
                this.floatingBtn.classList.remove('visible');
            }
        });
    }
}

// ================================
// LOADING OVERLAY
// ================================
class LoadingOverlay {
    constructor() {
        this.overlay = document.getElementById('loading-overlay');
        this.init();
    }

    init() {
        // Hide loading overlay after a short delay
        // Don't wait for all images to load
        setTimeout(() => {
            this.overlay.classList.add('hidden');
        }, 300);
    }
}

// ================================
// TIMELINE ANIMATIONS
// ================================
class TimelineAnimations {
    constructor() {
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.init();
    }

    init() {
        this.observeItems();
    }

    observeItems() {
        const options = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, options);

        this.timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(item);
        });
    }
}

// ================================
// INITIALIZE ALL
// ================================
document.addEventListener('DOMContentLoaded', () => {
    new MovieCarousel();
    new Navigation();
    new StatsCounter();
    new FloatingCTA();
    new LoadingOverlay();
    new TimelineAnimations();
});

// ================================
// SMOOTH SCROLL PERFORMANCE
// ================================
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
});
