// (work-1) modal -1 (region)

document.querySelector('.home-link').addEventListener('click', (e) => {
    e.preventDefault();

    const modal = document.querySelector('.modal-1');
    modal.style.display = 'block';

    const regionSelect = document.getElementById('region');
    const currencySelect = document.getElementById('currency');
    currencySelect.disabled = true;
    
    // Retrieve saved region and currency from localStorage
    const savedRegion = localStorage.getItem('selectedRegion');
    const savedCurrency = localStorage.getItem('selectedCurrency');
    regionSelect.value = savedRegion ? savedRegion : 'US';  // Set default to 'US' if no saved region
    if (savedRegion) regionSelect.value = savedRegion;
    if (savedCurrency) currencySelect.value = savedCurrency;

    // Function to update currency based on selected region
    function updateCurrency() {
        const selectedRegion = regionSelect.value;
        let currency;

        switch (selectedRegion) {
            case 'US':
                currency = 'USD';
                break;
            case 'ES':
            case 'DE':
                currency = 'EURO';
                break;
            case 'UK':
                currency = 'GBP';
                break;
            default:
                currency = 'USD';
        }
        currencySelect.value = currency;
        localStorage.setItem('selectedRegion', selectedRegion);
        localStorage.setItem('selectedCurrency', currency);
    }

    regionSelect.addEventListener('change', updateCurrency);
    updateCurrency();

    // Save button event
    document.querySelector('.save-button').addEventListener('click', () => {
        const regionText = document.querySelector('.region-text');
        const successMessage = document.getElementById('success-message');

        const selectedRegionName = regionSelect.options[regionSelect.selectedIndex].textContent;
        successMessage.style.display = 'block';

        setTimeout(() => {
            successMessage.style.display = 'none';
            modal.style.display = 'none';
            regionText.innerText = selectedRegionName;
            localStorage.setItem('regionText', selectedRegionName);
        }, 500);
    });

    document.querySelector('.close-button-1').addEventListener('click', () => {
        modal.style.display = 'none';
    });
});

// (work-2) icon button (save)
document.querySelector('.icon-btn-save').addEventListener('click', () => {
    const fillLove = document.querySelector('.fill-love');
    const emptyLove = document.querySelector('.empty-love');

    if (fillLove.style.display === 'block') {
        emptyLove.style.display = 'block';
        fillLove.style.display = 'none';
        localStorage.setItem('isLoved', 'false');
    } else {
        emptyLove.style.display = 'none';
        fillLove.style.display = 'block';
        localStorage.setItem('isLoved', 'true');
    }
});

// Retrieve saved love status
if (localStorage.getItem('isLoved') === 'true') {
    document.querySelector('.fill-love').style.display = 'block';
    document.querySelector('.empty-love').style.display = 'none';
} else {
    document.querySelector('.fill-love').style.display = 'none';
    document.querySelector('.empty-love').style.display = 'block';
}

// (work-3) modal - 2 (travelers)
document.querySelector('.travelers-btn').addEventListener('click', (e) => {
    e.preventDefault();

    const modal = document.querySelector('.modal-2');
    modal.style.display = 'block';

    const adultCount = document.querySelector('.adult-count');
    const childCount = document.querySelector('.child-count');

    // Load traveler counts from localStorage
    adultCount.value = localStorage.getItem('adultCount') || 0;
    childCount.value = localStorage.getItem('childCount') || 0;

    document.querySelectorAll('.form-input-group button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const input = e.target.parentNode.querySelector('input');
            let value = parseInt(input.value);
            if (e.target.textContent === '-') {
                value = Math.max(value - 1, 0);
            } else {
                value++;
            }
            input.value = value;

            // Save to localStorage
            localStorage.setItem(input.className, value);
        });
    });

    // Done button
    document.querySelector('.done-button-2').addEventListener('click', () => {
        const newlyAdded = parseInt(adultCount.value) + parseInt(childCount.value);
        document.querySelector('.count-traveler').textContent = newlyAdded;
        localStorage.setItem('totalTravelers', newlyAdded);
        modal.style.display = 'none';
    });

    // Close button
    document.querySelector('.close-button-2').addEventListener('click', () => {
        modal.style.display = 'none';
    });
});

// icon button share
document.querySelector('.icon-btn-share').addEventListener('click', () => {
    const modal = document.querySelector('.modal-3');
    modal.style.display = 'block';

    document.querySelector('.copy-link').addEventListener('click', () => {
        // Add copy to clipboard functionality here
        const vacationUrl = "https://w3engineers.com/";
        const tempInput = document.createElement('textarea');
        tempInput.value = vacationUrl;
        document.body.appendChild(tempInput);

        // Select and copy the text
        tempInput.select();
        document.execCommand('copy');

        // Remove the temporary input element
        document.body.removeChild(tempInput);

        alert('Link copied to clipboard');
    });

    // Add click event listener for the close button
    document.querySelector('.close-button').addEventListener('click', () => {
        // Add close functionality here
        // alert('Modal would close');
        modal.style.display = 'none';
    });

})

// (work-5) modal-4 Gallery button
document.querySelector('.more-image').addEventListener('click', () => {
    const modal = document.getElementById('modal-4');
    const closeButton = document.querySelector('.close-button-4');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const currentSlideSpan = document.getElementById('current-slide');
    const totalSlidesSpan = document.getElementById('total-slides');

    let currentIndex = parseInt(localStorage.getItem('currentIndex')) || 0;
    const totalSlides = slides.length;

    totalSlidesSpan.textContent = totalSlides;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        currentSlideSpan.textContent = index + 1;
        localStorage.setItem('currentIndex', index);
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Open modal and show initial slide
    modal.style.display = 'block';
    showSlide(currentIndex);
});

// Load traveler and region settings
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.region-text').innerText = localStorage.getItem('regionText') || '';
    document.querySelector('.count-traveler').textContent = localStorage.getItem('totalTravelers') || 0;
});
// Load traveler and region settings on page load
document.addEventListener('DOMContentLoaded', () => {
    const regionTextElement = document.querySelector('.region-text');
    const savedRegionText = localStorage.getItem('regionText');
    const defaultRegionText = "United States";

    // Set default region text to 'United States' if none is saved
    regionTextElement.innerText = savedRegionText || defaultRegionText;

    document.querySelector('.count-traveler').textContent = localStorage.getItem('totalTravelers') || 0;
});

// responsive navbar
// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const  singlePhotoSection=  document.querySelector('.single-photo-section');
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
     const firstHeader = document.querySelector('.first-header');
    // Add an event listener for when the hamburger icon is clicked
    menuIcon.addEventListener('click', function () {
        // Toggle the 'active' class on the nav-links
        navLinks.classList.toggle('active');
        if(singlePhotoSection.style.display=='none'){
            singlePhotoSection.style.display = 'block';
            firstHeader.style.display = 'block';
        }
        else{
        singlePhotoSection.style.display = 'none';
        firstHeader.style.display = 'none';
    }
    });
});

// gallery responsive
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const slides = document.querySelectorAll('.slide-1');
    const prevButton = document.querySelector('.prev-button-1');
    const nextButton = document.querySelector('.next-button-1');
    let currentIndex = 0;

    // Show the initial slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    // Initialize by showing the first slide
    showSlide(currentIndex);

    // Navigate to the previous slide
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    // Navigate to the next slide
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });
});

// document.addEventListener('DOMContentLoaded', () => {
//     const carousel = document.querySelector('.carousel');
//     const prevButton = document.querySelector('.prev-button-1');
//     const nextButton = document.querySelector('.next-button-1');
//     const slides = document.querySelectorAll('.slide-1');
//     const currentSlideSpan = document.getElementById('current-slide');
//     const totalSlidesSpan = document.getElementById('total-slides');

//     let currentIndex = parseInt(localStorage.getItem('currentIndex')) || 0;
//     const totalSlides = slides.length;

//     totalSlidesSpan.textContent = totalSlides;

//     // Function to update the active slide
//     function showSlide(index) {
//         // Remove active class from all slides
//         slides.forEach((slide) => {
//             slide.classList.remove('active');
//         });

//         // Add active class to the current slide
//         slides[index].classList.add('active');

//         // Move the slider
//         const slider = document.querySelector('.slider-1');
//         slider.style.transform = `translateX(-${index * 100}%)`; // Slide the slider to the desired index

//         // Update the current slide number
//         currentSlideSpan.textContent = index + 1;
//         localStorage.setItem('currentIndex', index);
//     }

//     prevButton.addEventListener('click', () => {
//         currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
//         showSlide(currentIndex);
//     });

//     nextButton.addEventListener('click', () => {
//         currentIndex = (currentIndex + 1) % totalSlides;
//         showSlide(currentIndex);
//     });

//     // Show the carousel and the initial slide
//     carousel.style.display = 'block';
//     showSlide(currentIndex);
// });


