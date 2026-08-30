import gsap from "gsap"

document.addEventListener("DOMContentLoaded", ()=> {
    const menuIcon = document.querySelector(".header__menuIcon")
    const menu = document.querySelector(".header__menu")

    menuIcon.addEventListener("click", ()=> {
        gsap.fromTo(menu, {
            autoAlpha: 0,
        }, {
            autoAlpha: 1
        })
    })

})