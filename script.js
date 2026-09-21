/* =========================================
   GOOGLE SHEETS CONNECTION
========================================= */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyF8o1uD-brx2NMHHKQ9NzZK7SAdgV-FKrVwfuYkmpRB24wFdw4b0kLuzCGqWSIzwd4lw/exec";
/* =========================================
   GODPARENT PROPOSAL WEBSITE
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const openingScreen = document.getElementById("opening-screen");
const typingText = document.getElementById("typing-text");
const openProposalButton = document.getElementById("open-proposal");

const mainContent = document.getElementById("main-content");

const backgroundMusic = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");


/* =========================================
   TYPING ANIMATION
========================================= */

const message = "Has a special question for you";

let characterIndex = 0;


function typeMessage() {

    if (characterIndex < message.length) {

        typingText.textContent += message.charAt(characterIndex);

        characterIndex++;

        setTimeout(typeMessage, 70);

    }

}


/* Start typing when page loads */

window.addEventListener("load", () => {

    setTimeout(() => {

        typeMessage();

    }, 800);

});


/* =========================================
   OPEN PROPOSAL
========================================= */

openProposalButton.addEventListener("click", async () => {

    /*
        IMPORTANT:

        The music starts here because this function
        runs directly after the user's button click.

        This gives the browser permission to play
        the audio with sound.
    */

    try {

        backgroundMusic.volume = 0.35;

        await backgroundMusic.play();

        musicToggle.classList.add("show");

        musicToggle.setAttribute(
            "aria-label",
            "Turn music off"
        );

        musicToggle.setAttribute(
            "title",
            "Music On"
        );

    } catch (error) {

        console.log(
            "Music could not start automatically:",
            error
        );

    }


    /* Hide opening screen */

    openingScreen.classList.add("hide");


    /* Show main website */

    setTimeout(() => {

        mainContent.classList.add("show");

    }, 500);

});


/* =========================================
   MUSIC ON / OFF
========================================= */

musicToggle.addEventListener("click", () => {

    if (backgroundMusic.paused) {

        backgroundMusic.play();

        musicToggle.textContent = "♫";

        musicToggle.setAttribute(
            "aria-label",
            "Turn music off"
        );

        musicToggle.setAttribute(
            "title",
            "Music On"
        );

    } else {

        backgroundMusic.pause();

        musicToggle.textContent = "🔇";

        musicToggle.setAttribute(
            "aria-label",
            "Turn music on"
        );

        musicToggle.setAttribute(
            "title",
            "Music Off"
        );

    }

});
/* =========================================
   PERSONALIZED GODPARENT GREETING
========================================= */

const urlParams = new URLSearchParams(window.location.search);

const godparentName =
    urlParams.get("name");

const godparentRole =
    urlParams.get("role");

const questionRoleElement =
    document.getElementById("question-role");


/* =========================================
   GODPARENT TITLE FOR THE BIG QUESTION

   Tita  → Ninang
   Tito  → Ninong
========================================= */

if (godparentRole === "Tita") {

    questionRoleElement.textContent =
        "Ninang";

} else if (godparentRole === "Tito") {

    questionRoleElement.textContent =
        "Ninong";

} else {

    questionRoleElement.textContent =
        "Godparent";

}
const roleElement =
    document.getElementById("godparent-role");

const nameElement =
    document.getElementById("godparent-name");


if (godparentName) {

    nameElement.textContent =
        godparentName;

}


if (godparentRole) {

    roleElement.textContent =
        godparentRole;

} else {

    roleElement.textContent =
        "Someone Special";

}
/* =========================================
   RESPONSE POPUP
========================================= */

let currentResponse = "";


const yesButton =
    document.getElementById("yes-button");

const guestButton =
    document.getElementById("guest-button");
  
    const responsePopup =
    document.getElementById("response-popup");

const popupTitle =
    document.getElementById("popup-title");

const popupMessage =
    document.getElementById("popup-message");

const closePopupButton =
    document.getElementById("close-popup");

const popupContinueButton =
    document.getElementById("popup-continue");

const selectedResponse =
    document.getElementById("selected-response");

const godparentForm =
    document.getElementById("godparent-form");
  
/* =========================================
   OPEN RESPONSE POPUP
========================================= */

function showResponsePopup(response) {

    currentResponse = response;


    /* =========================================
       UPDATE RSVP RESPONSE
    ========================================= */

    if (selectedResponse) {

        if (currentResponse === "yes") {

            selectedResponse.textContent =
                "YES, WITH PLEASURE!";

        } else {

            selectedResponse.textContent =
                "I'LL CHEER AS A GUEST";

        }

    }


    /* YES RESPONSE */

    if (response === "yes") {

        popupTitle.textContent =
            "Thank You So Much!";


        popupMessage.innerHTML = `
            My heart is so full! Thank you for
            choosing to walk alongside me as my
            godparent. We are so excited to share
            this sacred milestone with you.
            <br><br>
            An official invitation with all the
            christening details will be sent to you
            very soon!
            <br><br>
            <em>Lots of love, Kaleigh Franzelle</em>
        `;

    }


    /* GUEST RESPONSE */

    else {

        popupTitle.textContent =
            "Thank You From the Bottom of Our Hearts!";


        popupMessage.innerHTML = `
            Thank you so much for reading my story.
            We completely understand, and we value
            your honesty and love!
            <br><br>
            Your presence in our family's life means
            the world to us. We would still be
            overjoyed to have you celebrate my baptism
            as our guest if your schedule permits.
            <br><br>
            We'll send over an invitation with the
            date, time, and venue details soon!
            <br><br>
            <em>Lots of love, Kaleigh Franzelle</em>
        `;

    }


    /* SHOW POPUP */

    responsePopup.classList.add(
        "popup-visible"
    );

    responsePopup.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "popup-open"
    );

}


/* =========================================
   CLOSE RESPONSE POPUP
========================================= */

function closeResponsePopup() {

    if (!responsePopup) return;


    responsePopup.classList.remove(
        "popup-visible"
    );


    responsePopup.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "popup-open"
    );

}


/* =========================================
   YES BUTTON
========================================= */

if (yesButton) {

    yesButton.addEventListener(
        "click",
        () => {

            showResponsePopup("yes");

        }
    );

}


/* =========================================
   GUEST BUTTON
========================================= */

if (guestButton) {

    guestButton.addEventListener(
        "click",
        () => {

            showResponsePopup("guest");

        }
    );

}


/* =========================================
   CLOSE BUTTON
========================================= */

if (closePopupButton) {

    closePopupButton.addEventListener(
        "click",
        closeResponsePopup
    );

}


/* =========================================
   CONTINUE BUTTON
========================================= */

if (popupContinueButton) {

    popupContinueButton.addEventListener(
        "click",
        () => {

            closeResponsePopup();


            const responseSection =
                document.getElementById(
                    "response-section"
                );


            if (responseSection) {

                setTimeout(() => {

                    responseSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }, 300);

            }

        }
    );

}


/* =========================================
   CLICK OUTSIDE POPUP
========================================= */

if (responsePopup) {

    responsePopup.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                responsePopup
            ) {

                closeResponsePopup();

            }

        }
    );

}


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeResponsePopup();

        }

    }
);
/* =========================================
   RSVP FORM SUBMISSION
   SEND RESPONSE TO GOOGLE SHEETS
========================================= */

let formSubmitting = false;

if (godparentForm) {

    godparentForm.addEventListener(
        "submit",
        async (event) => {

            /* Prevent page refresh */

            event.preventDefault();

if (formSubmitting) {
    return;
}

formSubmitting = true;

            /* Get form values */

            const name =
                document
                    .getElementById("respondent-name")
                    .value
                    .trim();

            const relationship =
                document
                    .getElementById("relationship")
                    .value
                    .trim();

            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            /* Make sure a response exists */

            if (!currentResponse) {

                alert(
                    "Please choose your answer first."
                );

                return;

            }


            /* Convert response */

            const responseText =
                currentResponse === "yes"
                    ? "YES, WITH PLEASURE!"
                    : "I'LL CHEER AS A GUEST";


            /* Get personalized role */

            const godparentRole =
                urlParams.get("role") || "";


            /* Create data to send */

            const responseData = {

                name: name,

                relationship: relationship,

                response: responseText,

                message: message,

                godparentRole: godparentRole

            };


            /* Find submit button */

            const submitButton =
                godparentForm.querySelector(
                    ".form-submit"
                );


            /* Loading state */

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Sending...";

            }


            try {

                /* Send to Google Apps Script */

                await fetch(
                    GOOGLE_SCRIPT_URL,
                    {
                        method: "POST",

                        mode: "no-cors",

                        headers: {
                            "Content-Type":
                                "text/plain;charset=utf-8"
                        },

                        body:
                            JSON.stringify(
                                responseData
                            )
                    }
                );


                /* Show success message */

                showFormSuccess(name);


            } catch (error) {

                console.error(
                    "Error sending response:",
                    error
                );

                formSubmitting = false;

                alert(
                    "Something went wrong while sending your answer. Please try again."
                );


                /* Restore button */

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "Send My Answer";

                }

            }

        }
    );

}
/* =========================================
   FORM SUCCESS MESSAGE
========================================= */

function showFormSuccess(name) {

    const responseSection =
        document.getElementById(
            "response-section"
        );

    if (!responseSection) return;


    responseSection.innerHTML = `

        <div class="response-container form-success">

            <p class="response-eyebrow">
                Thank You
            </p>

            <h2 class="response-title">
                Thank you, ${name}.
            </h2>

            <p class="response-introduction">

                Your answer has been received.

                <br><br>

                We are so grateful that you took
                the time to be part of this little
                moment in Kaleigh's story.

                <br><br>

                <em>
                    Lots of love,<br>
                    Kaleigh Franzelle
                </em>

            </p>

        </div>

    `;

}
