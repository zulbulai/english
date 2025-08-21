// Premium English Learning Ebooks Landing Page - Ultra Conversion Focused JavaScript

// Global timer variables
let timerMinutes = 15;
let timerSeconds = 0;
let timerInterval;

// Carousel variables
let currentSlide = 0;
let totalSlides = 8;
let isAutoPlaying = true;
let autoPlayInterval;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let isSwipping = false;

// Initialize countdown timer with urgency effects
function initializeTimer() {
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    
    if (!minutesDisplay || !secondsDisplay) return;
    
    // Set initial display
    minutesDisplay.textContent = timerMinutes.toString().padStart(2, '0');
    secondsDisplay.textContent = timerSeconds.toString().padStart(2, '0');
    
    // Clear any existing interval
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Start countdown
    timerInterval = setInterval(() => {
        // Decrease time
        if (timerSeconds > 0) {
            timerSeconds--;
        } else if (timerMinutes > 0) {
            timerMinutes--;
            timerSeconds = 59;
        } else {
            // Timer finished
            clearInterval(timerInterval);
            handleTimerExpired();
            return;
        }
        
        // Update display
        minutesDisplay.textContent = timerMinutes.toString().padStart(2, '0');
        secondsDisplay.textContent = timerSeconds.toString().padStart(2, '0');
        
        // Add urgency effects when time is running low
        addUrgencyEffects();
        
    }, 1000);
}

// Add urgency effects based on remaining time
function addUrgencyEffects() {
    const timerBoxes = document.querySelectorAll('.timer-box');
    const urgencyText = document.querySelector('.urgency-text');
    
    if (timerMinutes < 5) {
        timerBoxes.forEach(box => {
            box.style.animation = 'timerPulse 1s infinite';
            box.style.borderColor = '#ff0000';
        });
        
        if (urgencyText) {
            urgencyText.style.color = '#ff0000';
            urgencyText.textContent = '🚨 केवल ' + timerMinutes + ' मिनट बचे! जल्दी करें!';
        }
    }
    
    if (timerMinutes < 2) {
        timerBoxes.forEach(box => {
            box.style.background = 'linear-gradient(135deg, #ff0000, #ff4444)';
            box.style.animation = 'timerPulse 0.5s infinite';
        });
        
        // Add flash effect to buy buttons
        const buyButtons = document.querySelectorAll('.hero-buy-btn, .main-buy-btn, .instant-checkout-btn');
        buyButtons.forEach(btn => {
            btn.style.animation = 'buyButtonGlow 1s infinite';
        });
    }
}

// Handle timer expiration with conversion optimization
function handleTimerExpired() {
    const timerText = document.querySelector('.timer-text');
    const timerBoxes = document.querySelectorAll('.timer-box');
    const urgencyText = document.querySelector('.urgency-text');
    
    if (timerText) {
        timerText.textContent = '🚨 OFFER EXPIRED!';
        timerText.style.color = '#ff0000';
    }
    
    if (urgencyText) {
        urgencyText.textContent = '😞 आप छूट चूक गए! अब Regular Price पर मिलेगा';
        urgencyText.style.color = '#ff0000';
    }
    
    timerBoxes.forEach(box => {
        box.style.background = '#666666';
        box.style.animation = 'none';
        box.querySelector('span').textContent = '00';
    });
    
    // Update pricing to regular price
    updatePricingAfterExpiry();
    
    // Show expired modal after 2 seconds
    setTimeout(showTimerExpiredModal, 2000);
}

// Update pricing after timer expiry
function updatePricingAfterExpiry() {
    const currentPriceElements = document.querySelectorAll('.current-price');
    const discountElements = document.querySelectorAll('.discount-banner, .savings');
    
    currentPriceElements.forEach(element => {
        element.textContent = '₹1,499';
        element.style.color = '#ff0000';
    });
    
    discountElements.forEach(element => {
        element.style.display = 'none';
    });
}

// Show timer expired modal with recovery offer
function showTimerExpiredModal() {
    const modal = document.createElement('div');
    modal.className = 'expired-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-icon">⏰</div>
                <h2>Time's Up! But Wait...</h2>
                <p>आप Special Offer चूक गए, लेकिन फिर भी आप हमारे Premium Ebooks ले सकते हैं!</p>
                <div class="recovery-offer">
                    <div class="new-price">
                        <span class="old-price">₹2,999</span>
                        <span class="recovery-price">₹1,499</span>
                        <div class="recovery-discount">50% OFF Still Available!</div>
                    </div>
                </div>
                <div class="modal-buttons">
                    <button class="btn btn--primary recovery-buy-btn">
                        🔥 Get Now at ₹1,499
                    </button>
                    <button class="btn btn--secondary modal-close-btn">
                        Maybe Later
                    </button>
                </div>
                <p class="recovery-note">🔒 Same Quality, Same Content, Still Great Value!</p>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        <style>
        .expired-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            animation: modalFadeIn 0.3s ease;
        }
        .modal-overlay {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }
        .modal-content {
            background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            max-width: 500px;
            width: 100%;
            border: 3px solid #ff4444;
            color: white;
            animation: modalSlideIn 0.3s ease;
        }
        .modal-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
        .modal-content h2 {
            color: #ff4444;
            margin-bottom: 1rem;
        }
        .recovery-offer {
            background: rgba(255, 68, 68, 0.1);
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
        }
        .recovery-price {
            font-size: 2rem;
            color: #ff4444;
            font-weight: bold;
        }
        .old-price {
            text-decoration: line-through;
            color: #999;
            margin-right: 1rem;
        }
        .recovery-discount {
            color: #00aa44;
            font-weight: bold;
            margin-top: 0.5rem;
        }
        .modal-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin: 1.5rem 0;
        }
        .modal-buttons .btn {
            padding: 1rem;
            border-radius: 8px;
            font-weight: bold;
        }
        .recovery-note {
            font-size: 0.9rem;
            color: #ccc;
            margin: 0;
        }
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes modalSlideIn {
            from { transform: translateY(-50px) scale(0.9); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.recovery-buy-btn').addEventListener('click', (e) => {
        e.preventDefault();
        trackButtonClick('Recovery Buy Button');
        modal.remove();
        showCheckoutSuccess(e);
    });
    
    modal.querySelector('.modal-close-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    // Close modal on overlay click
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            modal.remove();
        }
    });
}

// Initialize image carousel with touch support
function initializeCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    const container = document.querySelector('.carousel-container');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    // Auto-play functionality
    function startAutoPlay() {
        if (isAutoPlaying) {
            autoPlayInterval = setInterval(() => {
                nextSlide();
            }, 4000);
        }
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    // Update carousel display
    function updateCarousel() {
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    // Button event listeners
    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        setTimeout(startAutoPlay, 5000);
    });
    
    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        setTimeout(startAutoPlay, 5000);
    });
    
    // Indicator event listeners
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(index);
            setTimeout(startAutoPlay, 5000);
        });
    });
    
    // Touch/swipe support
    if (container) {
        // Touch events
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Mouse events for desktop
        container.addEventListener('mousedown', handleMouseStart);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseup', handleMouseEnd);
        container.addEventListener('mouseleave', handleMouseEnd);
    }
    
    // Touch handlers
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwipping = true;
        stopAutoPlay();
    }
    
    function handleTouchMove(e) {
        if (!isSwipping) return;
        
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
        
        const diffX = startX - currentX;
        const diffY = startY - currentY;
        
        // Prevent vertical scroll when swiping horizontally
        if (Math.abs(diffX) > Math.abs(diffY)) {
            e.preventDefault();
        }
    }
    
    function handleTouchEnd(e) {
        if (!isSwipping) return;
        
        const diffX = startX - currentX;
        const diffY = startY - currentY;
        
        // Only trigger if horizontal swipe is significant
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        isSwipping = false;
        setTimeout(startAutoPlay, 5000);
    }
    
    // Mouse handlers (for desktop)
    function handleMouseStart(e) {
        startX = e.clientX;
        isSwipping = true;
        stopAutoPlay();
    }
    
    function handleMouseMove(e) {
        if (!isSwipping) return;
        currentX = e.clientX;
    }
    
    function handleMouseEnd(e) {
        if (!isSwipping) return;
        
        const diffX = startX - currentX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        isSwipping = false;
        setTimeout(startAutoPlay, 5000);
    }
    
    // Pause auto-play on hover
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
    
    // Start auto-play
    startAutoPlay();
}

// Show checkout success instead of redirecting
function showCheckoutSuccess(event) {
    if (event) {
        event.preventDefault();
    }
    
    const clickedButton = event ? event.target : null;
    if (clickedButton) {
        // Add loading state
        clickedButton.classList.add('loading');
        clickedButton.disabled = true;
        const originalText = clickedButton.textContent;
        
        // Track the button click
        trackButtonClick(originalText);
        
        // Show processing state
        clickedButton.textContent = 'Processing Order...';
        
        setTimeout(() => {
            clickedButton.textContent = 'Order Confirmed!';
            clickedButton.style.background = '#00aa44';
            
            // Show success modal
            setTimeout(() => {
                showSuccessModal();
            }, 500);
        }, 1500);
    } else {
        // Direct call without button
        showSuccessModal();
    }
    
    // Analytics tracking
    trackConversion('purchase_completed');
}

// Show success modal after purchase
function showSuccessModal() {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="success-modal-content">
                <div class="success-icon">🎉</div>
                <h2>Order Confirmed!</h2>
                <p><strong>Congratulations!</strong> आपका order successfully place हो गया है।</p>
                
                <div class="order-details">
                    <div class="order-summary">
                        <h3>📚 Your Purchase</h3>
                        <div class="purchased-item">
                            <span>10 Premium English Learning Ebooks</span>
                            <span class="item-price">₹499</span>
                        </div>
                        <div class="discount-applied">
                            <span>Discount Applied (83% OFF)</span>
                            <span class="discount-price">-₹2,500</span>
                        </div>
                        <div class="order-total">
                            <span><strong>Total Paid</strong></span>
                            <span class="total-price"><strong>₹499</strong></span>
                        </div>
                    </div>
                </div>
                
                <div class="download-info">
                    <h3>📧 Download Instructions</h3>
                    <p>आपके ebooks का download link आपके email पर भेजा गया है:</p>
                    <div class="email-info">
                        <strong>📧 Check your email inbox</strong>
                        <p>Download link valid for 30 days</p>
                    </div>
                </div>
                
                <div class="contact-support">
                    <h3>🛟 Need Help?</h3>
                    <div class="support-options">
                        <div class="support-item">
                            <span>📞 WhatsApp:</span>
                            <a href="https://wa.me/917905350614" target="_blank">7905350614</a>
                        </div>
                        <div class="support-item">
                            <span>📧 Email:</span>
                            <a href="mailto:padhteraho2021@gmail.com">padhteraho2021@gmail.com</a>
                        </div>
                    </div>
                </div>
                
                <div class="social-follow">
                    <h3>📱 Follow Us</h3>
                    <div class="social-buttons">
                        <a href="https://facebook.com/englishpro" target="_blank" class="social-btn facebook-btn">
                            📘 Facebook
                        </a>
                        <a href="https://www.instagram.com/rozpadhteraho" target="_blank" class="social-btn instagram-btn">
                            📷 Instagram
                        </a>
                        <a href="https://youtube.com/@englishpro" target="_blank" class="social-btn youtube-btn">
                            📺 YouTube
                        </a>
                    </div>
                </div>
                
                <button class="btn btn--primary success-close-btn">
                    ✨ Start Learning Now!
                </button>
            </div>
        </div>
    `;
    
    // Add success modal styles
    const modalStyles = `
        <style>
        .success-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 3000;
            animation: modalFadeIn 0.5s ease;
        }
        .success-modal .modal-overlay {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            overflow-y: auto;
        }
        .success-modal-content {
            background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            max-width: 600px;
            width: 100%;
            border: 3px solid #00aa44;
            color: white;
            animation: successSlideIn 0.5s ease;
            margin: 1rem;
            max-height: 90vh;
            overflow-y: auto;
        }
        .success-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
            animation: celebrationBounce 1s ease infinite;
        }
        .success-modal-content h2 {
            color: #00aa44;
            margin-bottom: 1rem;
            font-size: 2rem;
        }
        .order-details {
            background: rgba(0, 170, 68, 0.1);
            padding: 1.5rem;
            border-radius: 10px;
            margin: 1.5rem 0;
            border: 1px solid rgba(0, 170, 68, 0.3);
        }
        .order-summary h3 {
            color: #00aa44;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        .purchased-item, .discount-applied, .order-total {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .order-total {
            border-bottom: none;
            margin-top: 0.5rem;
            padding-top: 0.5rem;
            border-top: 2px solid #00aa44;
        }
        .item-price, .total-price {
            color: #00aa44;
        }
        .discount-price {
            color: #ff6600;
        }
        .download-info {
            background: rgba(255, 102, 0, 0.1);
            padding: 1.5rem;
            border-radius: 10px;
            margin: 1.5rem 0;
            border: 1px solid rgba(255, 102, 0, 0.3);
        }
        .download-info h3 {
            color: #ff6600;
            margin-bottom: 1rem;
        }
        .email-info {
            background: rgba(255, 255, 255, 0.1);
            padding: 1rem;
            border-radius: 5px;
            margin-top: 1rem;
        }
        .contact-support {
            background: rgba(68, 68, 255, 0.1);
            padding: 1.5rem;
            border-radius: 10px;
            margin: 1.5rem 0;
            border: 1px solid rgba(68, 68, 255, 0.3);
        }
        .contact-support h3 {
            color: #4444ff;
            margin-bottom: 1rem;
        }
        .support-options {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.5rem;
        }
        .support-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 5px;
        }
        .support-item a {
            color: #4444ff;
            text-decoration: none;
            font-weight: bold;
        }
        .social-follow {
            margin: 1.5rem 0;
        }
        .social-follow h3 {
            color: #ff6600;
            margin-bottom: 1rem;
        }
        .social-buttons {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1rem;
            margin: 1rem 0;
        }
        .social-btn {
            padding: 0.75rem 1rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            transition: transform 0.2s ease;
            font-size: 0.9rem;
        }
        .facebook-btn {
            background: #1877f2;
            color: white;
        }
        .instagram-btn {
            background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
            color: white;
        }
        .youtube-btn {
            background: #ff0000;
            color: white;
        }
        .social-btn:hover {
            transform: translateY(-2px);
        }
        .success-close-btn {
            background: linear-gradient(135deg, #00aa44, #44ffaa);
            color: #000;
            padding: 1rem 2rem;
            border: none;
            border-radius: 10px;
            font-size: 1.1rem;
            font-weight: bold;
            margin-top: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .success-close-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 170, 68, 0.4);
        }
        @keyframes celebrationBounce {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(-5deg); }
            75% { transform: translateY(-5px) rotate(5deg); }
        }
        @keyframes successSlideIn {
            from { transform: translateY(-30px) scale(0.9); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @media (max-width: 768px) {
            .success-modal-content {
                padding: 1.5rem;
                margin: 0.5rem;
            }
            .social-buttons {
                grid-template-columns: 1fr;
            }
            .support-options {
                gap: 1rem;
            }
            .support-item {
                flex-direction: column;
                gap: 0.5rem;
                text-align: center;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.success-close-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    // Close modal on overlay click
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            modal.remove();
        }
    });
    
    // Auto-close after 30 seconds
    setTimeout(() => {
        if (document.body.contains(modal)) {
            modal.remove();
        }
    }, 30000);
}

// Use showCheckoutSuccess instead of redirectToCheckout
function redirectToCheckout(event) {
    showCheckoutSuccess(event);
}

// Track button clicks for analytics and optimization
function trackButtonClick(buttonText) {
    const analyticsData = {
        button_text: buttonText,
        page_location: window.location.href,
        timestamp: new Date().toISOString(),
        timer_remaining: `${timerMinutes}:${timerSeconds.toString().padStart(2, '0')}`,
        scroll_position: window.pageYOffset,
        viewport_size: {
            width: window.innerWidth,
            height: window.innerHeight
        }
    };
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', analyticsData);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'InitiateCheckout', {
            content_type: 'product',
            content_ids: ['10_english_ebooks'],
            value: 499,
            currency: 'INR'
        });
    }
    
    console.log('Button clicked:', analyticsData);
}

// Track conversions
function trackConversion(eventName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: 'conversion',
            event_label: '10_english_ebooks',
            value: 499
        });
    }
    
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Purchase', {
            value: 499,
            currency: 'INR'
        });
    }
}

// Handle sticky mobile buy button
function handleStickyButton() {
    const stickyBtn = document.querySelector('.sticky-buy-btn');
    const heroSection = document.querySelector('.hero');
    const pricingSection = document.querySelector('.pricing');
    
    if (!stickyBtn || window.innerWidth > 768) {
        if (stickyBtn) stickyBtn.style.display = 'none';
        return;
    }
    
    function toggleStickyButton() {
        const heroRect = heroSection ? heroSection.getBoundingClientRect() : null;
        const pricingRect = pricingSection ? pricingSection.getBoundingClientRect() : null;
        
        // Show sticky button when hero is out of view and pricing is not visible
        const showButton = (!heroRect || heroRect.bottom < 0) && 
                          (!pricingRect || pricingRect.top > window.innerHeight);
        
        stickyBtn.style.display = showButton ? 'block' : 'none';
    }
    
    // Add scroll listener with throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
            toggleStickyButton();
            scrollTimeout = null;
        }, 100);
    });
    
    // Initial check
    toggleStickyButton();
}

// Handle scroll animations with intersection observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .feature-card, .ebook-item, .testimonial-card, .trust-badge,
        .contact-item, .social-link
    `);
    
    animatedElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        // Stagger animations
        el.style.transitionDelay = `${index * 100}ms`;
        observer.observe(el);
    });
}

// Add enhanced hover effects
function addHoverEffects() {
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
    
    // Ebook card hover effects
    const ebookItems = document.querySelectorAll('.ebook-item');
    ebookItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) scale(1.02)';
            item.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
            item.style.zIndex = '';
        });
    });
}

// Handle contact info copying with user feedback
function addCopyFunctionality() {
    const contactElements = document.querySelectorAll('.contact-details a');
    
    contactElements.forEach(element => {
        if (element.href.includes('mailto:') || element.href.includes('tel:')) {
            element.style.cursor = 'pointer';
            element.title = 'Click to copy';
            
            element.addEventListener('click', (e) => {
                e.preventDefault();
                
                const text = element.textContent.trim();
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(() => {
                        showCopyFeedback(element, 'Copied!');
                    }).catch(() => {
                        // Fallback for older browsers
                        fallbackCopyText(text);
                        showCopyFeedback(element, 'Copied!');
                    });
                } else {
                    fallbackCopyText(text);
                    showCopyFeedback(element, 'Copied!');
                }
            });
        }
    });
}

// Fallback copy function
function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

// Show copy feedback
function showCopyFeedback(element, message) {
    const originalText = element.textContent;
    const originalColor = element.style.color;
    
    element.style.color = '#00aa44';
    element.textContent = `✅ ${message}`;
    
    setTimeout(() => {
        element.textContent = originalText;
        element.style.color = originalColor;
    }, 2000);
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Page load performance
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`Page loaded in ${loadTime}ms`);
        
        // Track performance in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                name: 'load',
                value: loadTime
            });
        }
    });
}

// Error handling and reporting
function initializeErrorHandling() {
    window.addEventListener('error', (event) => {
        console.error('JavaScript Error:', event.error);
        
        // Report to analytics (in production)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: event.error.message,
                fatal: false
            });
        }
    });
    
    // Handle promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled Promise Rejection:', event.reason);
    });
}

// Initialize page visibility handling
function initializeVisibilityHandling() {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page is hidden - pause timer and carousel
            if (timerInterval) {
                clearInterval(timerInterval);
            }
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        } else {
            // Page is visible - resume timer and carousel
            if (timerMinutes > 0 || timerSeconds > 0) {
                initializeTimer();
            }
            if (isAutoPlaying && document.querySelector('.carousel-container')) {
                initializeCarousel();
            }
        }
    });
}

// Add keyboard shortcuts for better accessibility
function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Only if no input is focused
        if (document.activeElement.tagName === 'INPUT' || 
            document.activeElement.tagName === 'TEXTAREA') {
            return;
        }
        
        switch (e.key.toLowerCase()) {
            case 'b': // Buy now
                scrollToSection('pricing');
                break;
            case 'f': // Features
                scrollToSection('features');
                break;
            case 't': // Testimonials
                scrollToSection('testimonials');
                break;
            case 'c': // Content
                scrollToSection('content');
                break;
            case 'enter': // Quick buy
                const mainBuyBtn = document.querySelector('.main-buy-btn');
                if (mainBuyBtn && !mainBuyBtn.disabled) {
                    mainBuyBtn.click();
                }
                break;
            case 'arrowright': // Next carousel slide
                const nextBtn = document.getElementById('nextBtn');
                if (nextBtn) nextBtn.click();
                break;
            case 'arrowleft': // Previous carousel slide
                const prevBtn = document.getElementById('prevBtn');
                if (prevBtn) prevBtn.click();
                break;
        }
    });
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Premium English Ebooks Landing Page Loaded');
    
    // Initialize core functionality
    initializeTimer();
    initializeCarousel();
    
    // Add all event listeners for buy buttons
    const buyButtons = document.querySelectorAll(`
        .hero-buy-btn, .instant-buy-btn, .content-buy-btn,
        .main-buy-btn, .instant-checkout-btn, .sticky-cta-btn
    `);
    
    buyButtons.forEach(button => {
        button.addEventListener('click', redirectToCheckout);
    });
    
    // Add navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Initialize enhanced features
    setTimeout(() => {
        initializeScrollAnimations();
        addHoverEffects();
        addCopyFunctionality();
        handleStickyButton();
        addKeyboardShortcuts();
        initializePerformanceMonitoring();
        initializeErrorHandling();
        initializeVisibilityHandling();
    }, 100);
    
    // Analytics page view
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: 'Premium English Ebooks Landing Page',
            page_location: window.location.href
        });
    }
});

// Handle window resize events
window.addEventListener('resize', () => {
    handleStickyButton();
    
    // Update carousel for mobile
    if (window.innerWidth <= 768 && currentSlide >= 0) {
        const track = document.getElementById('carouselTrack');
        if (track) {
            const translateX = -currentSlide * 100;
            track.style.transform = `translateX(${translateX}%)`;
        }
    }
});

// Export functions for external use or testing
window.EbooksLanding = {
    scrollToSection,
    redirectToCheckout,
    initializeTimer,
    initializeCarousel,
    trackButtonClick,
    trackConversion,
    showCheckoutSuccess
};

// Make key functions globally available
window.scrollToSection = scrollToSection;
window.redirectToCheckout = redirectToCheckout;