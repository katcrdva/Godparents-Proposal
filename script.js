/* =====================================================
   KALEIGH BAPTISM INVITATION - MAIN SCRIPT
   ===================================================== */


/* =====================================================
   TYPEWRITER
   ===================================================== */

const typingElement = document.getElementById("typing");

const typingText = "A Beautiful Blessing";

let typingIndex = 0;

function typeWriter() {

    if (!typingElement) return;

    if (typingIndex < typingText.length) {

        typingElement.innerHTML += typingText.charAt(typingIndex);

        typingIndex++;

        setTimeout(typeWriter, 90);
    }
}

window.addEventListener("load", typeWriter);


/* =====================================================
   LOADER / OPEN INVITATION
   ===================================================== */

const loader = document.getElementById("loader");
const envelopeScreen = document.getElementById("envelopeScreen");
const hero = document.getElementById("hero");
const enterButton = document.getElementById("enterButton");


if (enterButton) {

    enterButton.addEventListener("click", function () {

        /*
         * Music is handled by the bgMusic player below.
         * We don't call a nonexistent #music element here.
         */

        if (loader) {

            loader.style.opacity = "0";

            setTimeout(function () {

                loader.style.display = "none";

                if (envelopeScreen) {
                    envelopeScreen.style.display = "flex";
                }

            }, 800);
        }

    });
}


/* =====================================================
   ENVELOPE OPENING
   ===================================================== */

const envelope = document.querySelector(".envelope");


if (envelope) {

    envelope.addEventListener("click", function () {

        this.classList.add("open");

        setTimeout(function () {

            if (envelopeScreen) {
                envelopeScreen.style.opacity = "0";
            }

        }, 1500);


        setTimeout(function () {

            if (envelopeScreen) {
                envelopeScreen.style.display = "none";
            }

            if (hero) {
                hero.style.display = "block";
            }

            document.body.style.overflow = "auto";

            window.scrollTo(0, 0);

        }, 2200);

    });

}


/* =====================================================
   FADE-IN SECTIONS
   ===================================================== */

const fadeSections = document.querySelectorAll(".fade");

if (fadeSections.length > 0) {

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    });

    fadeSections.forEach(function (section) {

        observer.observe(section);

    });

}


/* =====================================================
   NAME STORY BOOK ANIMATION
   ===================================================== */

const books = document.querySelectorAll(".book");


if (books.length > 0) {

    const bookObserver = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.animate(

                    [
                        {
                            opacity: 0,
                            transform: "translateY(80px) scale(.97)"
                        },

                        {
                            opacity: 1,
                            transform: "translateY(0) scale(1)"
                        }
                    ],

                    {
                        duration: 1400,
                        fill: "forwards",
                        easing: "ease"
                    }

                );

                bookObserver.unobserve(entry.target);

            }

        });

    });


    books.forEach(function (book) {

        book.style.opacity = "0";

        bookObserver.observe(book);

    });

}


/* =====================================================
   GALLERY
   ===================================================== */

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeLightbox = document.getElementById("closeLightbox");

const prevPhoto = document.getElementById("prevPhoto");

const nextPhoto = document.getElementById("nextPhoto");

let currentPhoto = 0;


/* Gallery fade animation */

if (galleryItems.length > 0) {

    const galleryGrid = document.querySelector(".gallery-grid");

    if (galleryGrid) {

        const galleryObserver = new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        galleryItems.forEach(function (photo, index) {

                            setTimeout(function () {

                                photo.classList.add("show");

                            }, index * 150);

                        });

                        galleryObserver.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.2
            }

        );

        galleryObserver.observe(galleryGrid);

    }

}


/* Gallery lightbox */

function showPhoto() {

    if (!lightboxImage || galleryItems.length === 0) return;

    lightboxImage.src = galleryItems[currentPhoto].src;

}


galleryItems.forEach(function (photo, index) {

    photo.addEventListener("click", function () {

        currentPhoto = index;

        showPhoto();

        if (lightbox) {
            lightbox.style.display = "flex";
        }

        document.body.style.overflow = "hidden";

    });

});


if (nextPhoto) {

    nextPhoto.addEventListener("click", function () {

        currentPhoto++;

        if (currentPhoto >= galleryItems.length) {
            currentPhoto = 0;
        }

        showPhoto();

    });

}


if (prevPhoto) {

    prevPhoto.addEventListener("click", function () {

        currentPhoto--;

        if (currentPhoto < 0) {
            currentPhoto = galleryItems.length - 1;
        }

        showPhoto();

    });

}


if (closeLightbox) {

    closeLightbox.addEventListener("click", function () {

        if (lightbox) {
            lightbox.style.display = "none";
        }

        document.body.style.overflow = "auto";

    });

}


if (lightbox) {

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {

            lightbox.style.display = "none";

            document.body.style.overflow = "auto";

        }

    });

}


/* =====================================================
   BIRTH CARDS
   ===================================================== */

const birthCards = document.querySelectorAll(".birth-card");


if (birthCards.length > 0) {

    const birthGrid = document.querySelector(".birth-grid");

    if (birthGrid) {

        const birthObserver = new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        birthCards.forEach(function (card, index) {

                            setTimeout(function () {

                                card.classList.add("show");

                            }, index * 180);

                        });

                        birthObserver.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.25
            }

        );

        birthObserver.observe(birthGrid);

    }

}


/* =====================================================
   COUNTDOWN
   ===================================================== */

const targetDate = new Date(
    "September 26, 2026 10:00:00"
).getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const distance = targetDate - now;


    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");


    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }


    if (distance <= 0) {

        daysElement.innerHTML = "00";
        hoursElement.innerHTML = "00";
        minutesElement.innerHTML = "00";
        secondsElement.innerHTML = "00";

        return;
    }


    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );


    daysElement.innerHTML = String(days).padStart(2, "0");

    hoursElement.innerHTML = String(hours).padStart(2, "0");

    minutesElement.innerHTML = String(minutes).padStart(2, "0");

    secondsElement.innerHTML = String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =====================================================
   TIMELINE
   ===================================================== */

const timelineItems = document.querySelectorAll(".timeline-item");


if (timelineItems.length > 0) {

    const timelineObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    timelineObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.25
        }

    );


    timelineItems.forEach(function (item) {

        timelineObserver.observe(item);

    });

}


/* =====================================================
   RSVP
   ===================================================== */

const rsvpForm = document.getElementById("rsvpForm");

const successPopup = document.getElementById("successPopup");

const closePopupButton = document.getElementById("closePopupButton");


if (rsvpForm) {

    rsvpForm.addEventListener("submit", function (event) {

        /*
         * IMPORTANT:
         * Stop the browser from refreshing/submitting the form.
         */

        event.preventDefault();

        console.log("RSVP form submitted");


        /*
         * Show success popup
         */

        if (successPopup) {

            successPopup.classList.add("show");

            console.log("RSVP popup opened");

        } else {

            console.error(
                "RSVP ERROR: #successPopup was not found in the HTML."
            );

        }


        /*
         * Clear form
         */

        rsvpForm.reset();

    });

}


/* =====================================================
   CLOSE RSVP POPUP
   ===================================================== */

function closePopup() {

    if (successPopup) {

        successPopup.classList.remove("show");

    }

}


/*
 * Make closePopup available to HTML onclick=""
 */

window.closePopup = closePopup;


if (closePopupButton) {

    closePopupButton.addEventListener("click", function () {

        closePopup();

    });

}


/* =====================================================
   MUSIC PLAYER
   ===================================================== */

const bgMusic = document.getElementById("bgMusic");

const musicButton = document.getElementById("musicBtn");

let musicPlaying = false;


if (musicButton && bgMusic) {

    musicButton.addEventListener("click", function () {

        if (musicPlaying) {

            bgMusic.pause();

            musicButton.innerHTML = "♪";

            musicPlaying = false;

        } else {

            bgMusic.play()
                .then(function () {

                    musicButton.innerHTML = "❚❚";

                    musicPlaying = true;

                })
                .catch(function (error) {

                    console.log(
                        "Music could not be played:",
                        error
                    );

                });

        }

    });

}


/* =====================================================
   SCROLL PROGRESS BAR
   ===================================================== */

window.addEventListener("scroll", function () {

    const progressBar =
        document.getElementById("progressBar");

    if (!progressBar) return;


    const winScroll =
        document.documentElement.scrollTop;

    const height =
        document.documentElement.scrollHeight
        - document.documentElement.clientHeight;


    if (height > 0) {

        progressBar.style.width =
            (winScroll / height) * 100 + "%";

    }

});


/* =====================================================
   BACK TO TOP BUTTON
   ===================================================== */

const topButton = document.getElementById("topBtn");


if (topButton) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {

            topButton.style.display = "block";

        } else {

            topButton.style.display = "none";

        }

    });


    topButton.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}
/* =========================================
   RSVP POPUP TEST
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const rsvpForm = document.getElementById("rsvpForm");
    const successPopup = document.getElementById("successPopup");
    const closePopupButton = document.getElementById("closePopupButton");

    console.log("RSVP form:", rsvpForm);
    console.log("Success popup:", successPopup);
    console.log("Close button:", closePopupButton);

    if (!rsvpForm) {
        console.error("❌ rsvpForm was NOT found.");
        return;
    }

    if (!successPopup) {
        console.error("❌ successPopup was NOT found.");
        return;
    }

    rsvpForm.addEventListener("submit", function (event) {

        event.preventDefault();

        console.log("✅ RSVP SUBMITTED");

        successPopup.classList.add("show");

        rsvpForm.reset();

    });

    if (closePopupButton) {

        closePopupButton.addEventListener("click", function () {

            successPopup.classList.remove("show");

        });

    }

});
