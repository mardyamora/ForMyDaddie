const ourSong =
    document.getElementById("our-song");

const passcodeInput = 
    document.getElementById("passcode"); 

const enterButton =
    document.getElementById("enter-button");

const message =
    document.getElementById("message");

const mommieReaction =
    document.getElementById("mommie-reaction");


const passcodeScreen =
    document.getElementById("passcode-screen");

const envelopeScreen =
    document.getElementById("envelope-screen");

const envelope =
    document.getElementById("envelope");


const correctPasscode = "0606";

/* =========================
   RETURN FROM MOVIE
========================= */

if (window.location.hash === "#memories") {

    const passcodeScreen =
        document.getElementById("passcode-screen");

    const envelopeScreen =
        document.getElementById("envelope-screen");

    const memoriesScreen =
        document.getElementById("memories-screen");

    const movieMusicWasPlaying =
        sessionStorage.getItem(
            "movieMusicPlaying"
        );

    const movieMusicTime =
        sessionStorage.getItem(
            "movieMusicTime"
        );


    passcodeScreen.style.display =
        "none";

    envelopeScreen.style.display =
        "none";

    memoriesScreen.style.display =
        "block";


    setTimeout(() => {

        memoriesScreen.classList.add(
            "show-memories"
        );

    }, 100);


    /* =========================
       RESUME MUSIC
    ========================= */

    setTimeout(() => {

        if (
            movieMusicTime !== null
        ) {

            ourSong.currentTime =
                parseFloat(
                    movieMusicTime
                );

        }


        if (
            movieMusicWasPlaying === "true"
        ) {

            ourSong.play().catch(
                () => {

                    /*
                       Browser may delay
                       autoplay until interaction.
                    */

                }
            );

        }

    }, 200);

}

/* =========================
   PASSCODE
========================= */

function checkPasscode() {

    const enteredPasscode =
        passcodeInput.value;

    if (enteredPasscode === correctPasscode) {

        passcodeInput.disabled = true;
        enterButton.disabled = true;

        message.textContent =
            "That's our little secret ♡";

        setTimeout(() => {

            passcodeScreen.classList.add(
                "fade-out"
            );

        }, 500);

        setTimeout(() => {

            passcodeScreen.style.display =
                "none";

            envelopeScreen.classList.add(
                "show"
            );

        }, 1300);

    } else {

        message.textContent =
            "Are you sure you are my Daddie?";

        mommieReaction.classList.add(
            "show"
        );

        passcodeInput.value = "";

        passcodeInput.focus();

    }

}


enterButton.addEventListener(
    "click",
    checkPasscode
);


passcodeInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            checkPasscode();

        }

    }
);


/* =========================
   MUSIC
========================= */

/* =========================
   MUSIC TOGGLE
========================= */

const musicToggle =
    document.getElementById("music-toggle");


/*
   When the song actually starts playing,
   update the button.
*/

ourSong.addEventListener(
    "play",
    () => {

        musicToggle.textContent =
            "♫ PLAYING";

        musicToggle.classList.add(
            "playing"
        );

    }
);


/*
   When the song actually pauses,
   update the button.
*/

ourSong.addEventListener(
    "pause",
    () => {

        musicToggle.textContent =
            "♫ PAUSED";

        musicToggle.classList.remove(
            "playing"
        );

    }
);


/*
   Clicking the music button
   starts or pauses the song.
*/

musicToggle.addEventListener(
    "click",
    () => {

        if (ourSong.paused) {

            ourSong.play();

        } else {

            ourSong.pause();

        }

    }
);


/* =========================
   ENVELOPE
========================= */

envelope.addEventListener(
    "click",
    () => {

        envelope.classList.toggle(
            "open"
        );

        if (
            envelope.classList.contains(
                "open"
            )
        ) {

            ourSong.play();

        }

    }
);


/* =========================
   CONTINUE TO MEMORIES
========================= */

const continueButton =
    document.getElementById(
        "continue-button"
    );

const memoriesScreen =
    document.getElementById(
        "memories-screen"
    );


continueButton.addEventListener(
    "click",
    () => {

        envelopeScreen.style.display =
            "none";

        memoriesScreen.style.display =
            "block";

        setTimeout(() => {

            memoriesScreen.classList.add(
                "show-memories"
            );

        }, 100);

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    }
);


/* =========================
   MEMORY VIEWER
========================= */

const memoryViewer =
    document.getElementById(
        "memory-viewer"
    );

const expandedMemory =
    document.getElementById(
        "expanded-memory"
    );

const closeMemory =
    document.getElementById(
        "close-memory"
    );

const memoryCards =
    document.querySelectorAll(
        ".memory-card"
    );


memoryCards.forEach((card) => {

    card.addEventListener(
        "click",
        () => {

            const image =
                card.querySelector("img");

            expandedMemory.src =
                image.src;

            expandedMemory.alt =
                image.alt;

            memoryViewer.classList.add(
                "show"
            );

        }
    );

});


/* =========================
   CLOSE MEMORY
========================= */

closeMemory.addEventListener(
    "click",
    () => {

        memoryViewer.classList.remove(
            "show"
        );

    }
);


/* =========================
   CLOSE BY CLICKING OUTSIDE
========================= */

memoryViewer.addEventListener(
    "click",
    (event) => {

        if (
            event.target === memoryViewer
        ) {

            memoryViewer.classList.remove(
                "show"
            );

        }

    }
);


/* =========================
   CONTINUE TO MOVIE
========================= */

const movieButton =
    document.querySelector(
        ".movie-button"
    );

if (movieButton) {

    movieButton.addEventListener(
        "click",
        () => {

            sessionStorage.setItem(
                "movieMusicPlaying",
                ourSong.paused
                    ? "false"
                    : "true"
            );

            sessionStorage.setItem(
                "movieMusicTime",
                ourSong.currentTime
            );

        }
    );

}


/* =========================
   MOVIE CREDITS REVEAL
========================= */

const movieCreditGroups =
    document.querySelectorAll(
        ".movie-credit-group"
    );

if (movieCreditGroups.length) {

    const creditsObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "credits-visible"
                            );

                            creditsObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.25
            }
        );

    movieCreditGroups.forEach(
        (group) => {

            creditsObserver.observe(
                group
            );

        }
    );

}