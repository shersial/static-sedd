//tooltip initialize
$(document).ready(function () {
    var tooltip = $('[data-bs-toggle="tooltip"]').tooltip();
});
// font increase and decrease
const  affectedElements = $("html, body,  div, span, applet, object, iframe," +
    " h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address," +
    " big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong," +
    " sub, sup, tt, var, b, u, i, center,dl, dt, dd, ol, ul, li, fieldset, form, label, legend," +
    " table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure," +
    " figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary,time, mark, audio, video"); // Can be extended, ex. $("div, p, span.someClass")

// Storing the original size in a data attribute so size can be reset
affectedElements.each( function(){
    const $this = $(this);
    $this.data("orig-size", $this.css("font-size") );
});

$("#increase_text").click(function(){
    changeFontSize(1);
})

$("#decrease_text").click(function(){
    changeFontSize(-1);
})

$("#default_text").click(function(){
    affectedElements.each( function(){
        const $this = $(this);
        $this.css( "font-size" , $this.data("orig-size") );
    });
})

function changeFontSize(direction){
    affectedElements.each( function(){
        const $this = $(this);
        $this.css( "font-size" , parseInt($this.css("font-size"))+direction );
    });
}

// Text to speech
onload = function () {
    let msg;
    if ('speechSynthesis' in window)
        with (speechSynthesis) {

        const playEle = document.querySelector('#play');
        const pauseEle = document.querySelector('#pause');
        const stopEle = document.querySelector('#stop');
        let flag = false;

        playEle.addEventListener('click', onClickPlay);
        pauseEle.addEventListener('click', onClickPause);
        stopEle.addEventListener('click', onClickStop);

        function onClickPlay() {
            let utterance;
            if (!flag) {
                flag = true;
                utterance = new SpeechSynthesisUtterance(document.querySelector(
                    " body, div, span, applet, object, iframe," +
                    " h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address," +
                    " big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong," +
                    " sub, sup, tt, var, b, u, i, center,dl, dt, dd, ol, ul, li, fieldset, form, label, legend," +
                    " table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure," +
                    " figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary,time, mark, audio, video").textContent);
                utterance.voice = getVoices()[0];
                utterance.onend = function () {
                    flag = false;
                };
                speak(utterance);
            }
            if (paused) { /* unpause/resume narration */
                resume();
            }
        }
        function onClickPause() {
            if (speaking && !paused) { /* pause narration */
               pause();
            }
        }
        function onClickStop() {
            if (speaking) { /* stop narration */
                /* for safari */
              flag = false;
                cancel();

            }
        }

    }
    else { /* speech synthesis not supported */
        msg = document.createElement('h5');
        msg.textContent = "Detected no support for Speech Synthesis";
        msg.style.textAlign = 'center';
        msg.style.backgroundColor = 'red';
        msg.style.color = 'white';
        document.body.insertBefore(msg, document.querySelector('div'));
    }


}

//Setting Nav View
const settingNav = document.getElementById("setting_nav");
const btnSetting = document.getElementById("toggle_setting");
btnSetting.addEventListener('click', (e) => {
    e.preventDefault();

    settingNav.classList.toggle('d-block')

});

//Search Nav View
const searchNav = document.getElementById("search_nav");
const btnSearch = document.getElementById("toggle_search");
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    searchNav.classList.toggle('d-block')
});


// check for saved 'grayScale' in localStorage
let grayScale = localStorage.getItem('grayScale');
const grayScaleToggle = document.querySelector('#gray_view');

const enableGrayScale = () => {
    // 1. Add the class to the body
    document.body.classList.add('grayscale-100');
    // 2. Update grayScale in localStorage
    localStorage.setItem('grayScale', 'enabled');
    // 3. Add remove class on icon
    if ($( "#gray_view i" ).hasClass('fa-eye')) {
        $( "#gray_view i" ).removeClass( 'fa-eye');
        $( "#gray_view i" ).addClass( 'fa-eye-slash');
    } else {
        $( "#gray_view i" ).removeClass( 'fa-eye-slash');
        $( "#gray_view i" ).addClass( 'fa-eye');

    }
}

const disableGrayScale = () => {
    // 1. Remove the class from the body
    document.body.classList.remove('grayscale-100');
    // 2. Update grayScale in localStorage
    localStorage.setItem('grayScale', null);
    // 3. Add remove class on icon
    if ($( "#gray_view i" ).hasClass('fa-eye-slash')) {
        $( "#gray_view i" ).removeClass( 'fa-eye-slash');
        $( "#gray_view i" ).addClass( 'fa-eye');
    } else {
        $( "#gray_view i" ).removeClass( 'fa-eye');
        $( "#gray_view i" ).addClass( 'fa-eye-slash');

    }
}

// If the user already visited and enabled grayScale
// start things off with it on
if (grayScale === 'enabled') {
    enableGrayScale();
}

// When someone clicks the button
grayScaleToggle.addEventListener('click', () => {
    // get their grayScale setting
    grayScale = localStorage.getItem('grayScale');

    // if it not current enabled, enable it
    if (grayScale !== 'enabled') {
        enableGrayScale();
        // if it has been enabled, turn it off
    } else {
        disableGrayScale();
    }
});



// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('#dark-mode-toggle');
const enableDarkMode = () => {
    // 1. Add the class to the body
    document.body.classList.add('darkmode');
    // 2. Update darkMode in localStorage
    localStorage.setItem('darkMode', 'enabled');
    // 3. Add remove class on icon
    if ($( "#dark-mode-toggle i" ).hasClass('fa-moon')) {
        $( "#dark-mode-toggle i" ).removeClass( 'fa-moon');
        $( "#dark-mode-toggle i" ).addClass( 'fa-sun');
    } else {
        $( "#dark-mode-toggle i" ).removeClass( 'fa-sun');
        $( "#dark-mode-toggle i" ).addClass( 'fa-moon');

    }
}

const disableDarkMode = () => {
    // 1. Remove the class from the body
    document.body.classList.remove('darkmode');
    // 2. Update darkMode in localStorage
    localStorage.setItem('darkMode', null);
    // 3. Add remove class on icon
    if ($( "#dark-mode-toggle i" ).hasClass('fa-moon')) {
        $( "#dark-mode-toggle i" ).removeClass( 'fa-moon');
        $( "#dark-mode-toggle i" ).addClass( 'fa-sun');
    } else {
        $( "#dark-mode-toggle i" ).removeClass( 'fa-sun');
        $( "#dark-mode-toggle i" ).addClass( 'fa-moon');

    }
}

// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === 'enabled') {
    enableDarkMode();
}

// When someone clicks the button
darkModeToggle.addEventListener('click', () => {
    // get their darkMode setting
    darkMode = localStorage.getItem('darkMode');

    // if it not current enabled, enable it
    if (darkMode !== 'enabled') {
        enableDarkMode();
        // if it has been enabled, turn it off
    } else {
        disableDarkMode();
    }
});

//cookie banner close
const cookieBanner = document.getElementsByClassName("cookie-banner")
const clickBtn = document.getElementsByClassName("cookie-banner-button");

clickBtn.onclick = function () {
    if (cookieBanner.style.display !== "none") {
        cookieBanner.style.display = "none";
    } else {
        cookieBanner.style.display = "block";
    }
};




