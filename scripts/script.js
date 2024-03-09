// ACCORDION
const accordion = document.getElementsByClassName("accordion")
for (i = 0; i<accordion.length; i++){
    accordion[i].addEventListener('click', function(){
        this.classList.toggle('active')
    })
}

// SHOW & REMOVE SEARCH
const searchButton = document.getElementById("toggleSearch")
const searchClose = document.getElementById("search-close")
const searchContent = document.getElementsByClassName("search")[0]
$(searchButton).click(function(){
    $(searchContent).css({
        top: "0",
        position: "fixed"
    })
})
$(searchClose).click(function(){
    $(searchContent).css({
        top: "-100%",
        position: "fixed"
    })
})

// SHOW & REMOVE LOGIN
const loginButton = document.getElementById("toggleLogIn")
const loginClose = document.getElementById("login-close")
const loginContent = document.getElementsByClassName("login")[0]
$(loginButton).click(function(){
    $(loginContent).css({
        top: "0",
        position: "fixed"
    })
})
$(loginClose).click(function(){
    $(loginContent).css({
        top: "-100%",
        position: "fixed"
    })
})
// SWITCH LOGIN & SIGNUP
const loginForm = document.getElementById("loginForm")
const signinForm = document.getElementById("signupForm")
$("#goToLogin").click(function(){
    $(signinForm).css({
        left: "200%",
        transition: ".3s"
    }),
    $(loginForm).css({
        left: "35%",
        transition: ".4s"
    })
})
$("#goToSignup").click(function(){
    $(signinForm).css({
        left: "35%",
        display: "block",
        transition: ".2s"
    }),
    $(loginForm).css({
        left: "-100%",
        transition: ".4s"
    })
})

$("#expClose").click(function(){
    $("#experienceAdd").css({
        top: "-100%",
        transition: ".4s"
    })
})
$("#exp").click(function(){
    $("#experienceAdd").css({
        top: "24cm",
        transition: ".4s"
    })
})

let locClose = $("#locClose").click(function(){
    $("#locationAdd").css({
        top: "-100%",
        transition: ".4s"
    })
})
let locBtn = $("#ppp").click(function(){
    $("#locationAdd").css({
        top: "30cm",
        transition: ".4s"
    })
})

// REVIEW SWIPER
$(document).ready(function() {
    const $carousel = $("#carousel");
    const $arrowBtns = $(".wrapper i");
    const firstCard = $carousel.find(".reviewCard").width();

    $arrowBtns.each(function() {
        $(this).on("click", function() {
            const direction = $(this).attr("id");
            const scrollAmount = direction === "left" ? -firstCard : firstCard;
            $carousel.scrollLeft($carousel.scrollLeft() + scrollAmount);
        });
    });

    let isDragging = false,
        startX,
        startScrollLeft;

    const dragStart = function(e) {
        isDragging = true;
        $carousel.addClass("dragging");
        startX = e.pageX;
        startScrollLeft = $carousel.scrollLeft();
    };

    const dragging = function(event) {
        if (!isDragging) return;
        $carousel.scrollLeft(startScrollLeft - (event.pageX - startX));
    };

    const dragStop = function() {
        isDragging = false;
        $carousel.removeClass("dragging");
    };

    $carousel.on("mousedown", dragStart);
    $(document).on("mousemove", dragging);
    $(document).on("mouseup", dragStop);
});
