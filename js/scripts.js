// ========== View Post Script ==========
function goBack() {
    alert('Going back to the previous page!');
}

// ========== Create Post Script ==========
function submitPost() {
    // Clear the input fields
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';

    // Clear the image preview container
    const imagePreviewContainer = document.getElementById('image-preview-container');
    imagePreviewContainer.innerHTML = '';

    alert('Your post has been submitted! (Pretend like this actually works)');
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgPreview = document.createElement('img');
            imgPreview.src = e.target.result;
            imgPreview.style.maxWidth = '100%';
            imgPreview.style.marginTop = '15px';

            const contentField = document.getElementById('post-content');
            contentField.value += `\n[Image attached]`;
            contentField.parentNode.appendChild(imgPreview);
        };
        reader.readAsDataURL(file);
    }
}

// ========== Login Form Validation ==========
const loginForm = document.querySelector('#login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission for static site
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        if (!email || !password) {
            alert('Please fill out all required fields.');
        } else {
            alert(`Logged in successfully as ${email}! (Pretend this is an actual login)`);
            loginForm.reset(); // Clear the form fields
        }
    });
}

// ========== Signup Form Validation ==========
const signupForm = document.querySelector('#signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission for static site
        const email = document.querySelector('#email').value;
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const confirmPassword = document.querySelector('#confirm-password').value;

        if (!email || !username || !password || !confirmPassword) {
            alert('Please fill out all required fields.');
        } else if (password !== confirmPassword) {
            alert('Passwords do not match.');
        } else {
            alert(`Account created successfully for ${username}! (Pretend this actually works)`);
            signupForm.reset(); // Clear the form fields
        }
    });
}

// ========== Dynamic Search for Country Buttons ==========
const searchInput = document.querySelector('#search');
const countryButtons = document.querySelectorAll('.country-button');
const trendingHeading = document.querySelector('.trending-section h3');

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase();

        // Update the heading based on input
        if (searchText.length > 0) {
            trendingHeading.textContent = 'RESULTS';
        } else {
            trendingHeading.textContent = 'TRENDING';
        }

        // Filter the country buttons
        countryButtons.forEach(button => {
            const countryName = button.textContent.toLowerCase();
            if (countryName.includes(searchText)) {
                button.style.display = 'inline-block'; // Show button
            } else {
                button.style.display = 'none'; // Hide button
            }
        });
    });
}

// ========== Navigation Function ==========
function navigateTo(country) {
    const pages = {
        malaysia: 'browseposts-my.html',
        singapore: 'browseposts-sg.html',
        taiwan: 'browseposts-tw.html',
        japan: 'browseposts-jp.html'
    };

    if (pages[country]) {
        window.location.href = pages[country]; // Redirect to the corresponding country page
    } else {
        alert('Page not found for this country.');
    }
}

// ========== Back Button Script ==========
function goBack() {
    window.history.back(); // Navigate to the previous page in the browser history
}

// ========== Create Post Button Script ==========
function navigateToCreatePost() {
    window.location.href = 'createpost.html'; // Redirect to the Create Post page
}

// Dynamic Search for Posts
const postSearchInput = document.querySelector('#search');
const topPostsSection = document.querySelectorAll('.posts-section')[0];
const recentPostsSection = document.querySelectorAll('.posts-section')[1];

if (postSearchInput) {
    postSearchInput.addEventListener('input', () => {
        const searchText = postSearchInput.value.toLowerCase();
        const resultsSection = document.createElement('div');
        resultsSection.className = 'posts-section';

        const resultsHeading = document.createElement('h3');
        resultsHeading.textContent = 'RESULTS';

        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'posts-scrollable';

        // Clear previous results
        const existingResults = document.querySelector('.results-section');
        if (existingResults) {
            existingResults.remove();
        }

        if (searchText.length > 0) {
            document.querySelectorAll('.post-card').forEach(postCard => {
                const postTitle = postCard.querySelector('h4').textContent.toLowerCase();
                const postText = postCard.querySelector('p').textContent.toLowerCase();
                if (postTitle.includes(searchText) || postText.includes(searchText)) {
                    const clonedCard = postCard.cloneNode(true);
                    resultsContainer.appendChild(clonedCard);
                }
            });

            resultsSection.appendChild(resultsHeading);
            resultsSection.appendChild(resultsContainer);
            resultsSection.classList.add('results-section');
            topPostsSection.parentNode.insertBefore(resultsSection, topPostsSection);

            // Hide original sections
            topPostsSection.style.display = 'none';
            recentPostsSection.style.display = 'none';
        } else {
            // Restore original sections if search is cleared
            topPostsSection.style.display = 'block';
            recentPostsSection.style.display = 'block';
        }
    });
}

// ========== Preview Image ==========
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const previewContainer = document.getElementById('image-preview-container');
            
            // Create image element
            const imgPreview = document.createElement('img');
            imgPreview.src = e.target.result;
            imgPreview.className = 'image-preview';

            // Append image to the container
            previewContainer.appendChild(imgPreview);
        };
        reader.readAsDataURL(file);
    }
}

// Banner Slideshow
const images = [
    'assets/slideshow/taipei.jpg',
    'assets/slideshow/marina.jpg',
    'assets/slideshow/egypt.png',
];

let currentSlideIndex = parseInt(localStorage.getItem('currentSlideIndex')) || 0;
let lastSlideChangeTime = parseInt(localStorage.getItem('lastSlideChangeTime')) || Date.now();
const slideDuration = 3000; // Slide duration in milliseconds

function showSlide() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.style.opacity = index === currentSlideIndex ? '1' : '0';
    });

    // Save the current slide index and time to localStorage
    localStorage.setItem('currentSlideIndex', currentSlideIndex);
    localStorage.setItem('lastSlideChangeTime', Date.now());

    // Move to the next slide
    currentSlideIndex = (currentSlideIndex + 1) % images.length;
}

// Adjust slide index based on elapsed time
function adjustSlideIndex() {
    const now = Date.now();
    const elapsed = now - lastSlideChangeTime;
    const slidesPassed = Math.floor(elapsed / slideDuration);
    currentSlideIndex = (currentSlideIndex + slidesPassed) % images.length;

    // Update lastSlideChangeTime to sync with elapsed time
    lastSlideChangeTime += slidesPassed * slideDuration;
    localStorage.setItem('lastSlideChangeTime', lastSlideChangeTime);
}

document.addEventListener('DOMContentLoaded', () => {
    const slideshowContainer = document.querySelector('.slideshow-container');

    // Add slides dynamically
    images.forEach((image) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.backgroundImage = `url(${image})`;
        slideshowContainer.appendChild(slide);
    });

    // Adjust the slide index based on time elapsed since last change
    adjustSlideIndex();

    // Show the adjusted slide
    showSlide();

    // Change slides every slideDuration milliseconds
    setInterval(showSlide, slideDuration);
});
