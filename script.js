// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark / Light Mode Toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Project Card Expand / Collapse with Accordion Behavior
document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const projectCard = this.closest('.project-card-full');
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            // Collapse this project
            this.setAttribute('aria-expanded', 'false');
            projectCard.classList.add('collapsed');
        } else {
            // Close all other projects first
            document.querySelectorAll('.expand-btn').forEach(otherBtn => {
                if (otherBtn !== btn && otherBtn.getAttribute('aria-expanded') === 'true') {
                    otherBtn.setAttribute('aria-expanded', 'false');
                    const otherCard = otherBtn.closest('.project-card-full');
                    otherCard.classList.add('collapsed');
                }
            });
            
            // Expand this project
            this.setAttribute('aria-expanded', 'true');
            projectCard.classList.remove('collapsed');
        }
    });
});

// Allow clicking on project header to expand/collapse
document.querySelectorAll('.project-header-full').forEach(header => {
    header.addEventListener('click', function() {
        const btn = this.querySelector('.expand-btn');
        btn.click();
    });
});

// Generate poster from video first frame
document.querySelectorAll('.project-content video').forEach(video => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    video.addEventListener('loadedmetadata', function() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        const posterDataUrl = canvas.toDataURL();
        video.poster = posterDataUrl;
    });
});

// Intersection Observer for autoplay/pause based on visibility
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
            // Video is in viewport
            video.play().catch(() => {
                // Autoplay might be blocked, that's okay
            });
        } else {
            // Video is out of viewport
            video.pause();
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of video is visible
});

// Observe all videos
document.querySelectorAll('.project-content video').forEach(video => {
    videoObserver.observe(video);
});
