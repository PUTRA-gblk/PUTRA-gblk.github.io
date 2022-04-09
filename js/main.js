/*---------------------- navigation menu -----------------------*/
(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }
  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }
  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }

  // attach an event to document
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      /* make sure event.target.hash has a value before overridding default behavior */
      if (event.target.hash !== "") {
        // prevent default anchor click behavior
        event.preventDefault();
        const hash = event.target.hash;
        // deactivate existing active 'section'
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        // activate new 'section'
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        /* deactivate existing active navigation menu 'link-item' */
        navMenu
          .querySelector(".active")
          .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow");
        /* if clicked 'link-iem is contained within the navigation menu' */
        if (navMenu.classList.contains("open")) {
          // activate new navogation menu 'link-item'
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");
          // hide navigation menu
          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              // activate new navogation menu 'link-item'
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }
        // add hash (#) to url
        window.location.hash = hash;
      }
    }
  });
})();

/*-------------------- about section tabs ----------------------*/
(() => {
  const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (event) => {
    /* if event.target containsc'tab-item' class and not contains
        active class */
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      const target = event.target.getAttribute("data-target");
      // deactive existing active 'tab-item'
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // activate new 'tab-item'
      event.target.classList.add("active", "outer-shadow");
      // deactivate existing active 'tab-content'
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      // activate new 'tab-content'
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}




/*--------------------- hide all section except active --------------------------*/
(() => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();

window.addEventListener("load", () =>{
  // preloader
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() =>{
    document.querySelector(".preloader").style.display = "none";
  },600)
})

/*---------------------------- typing animation -----------------------------*/
var textAnimated = document.querySelector(".textAnimated")

var text = ""

var textArr = [
  "WELCOME",
  "TO WEBSITE",
 ] 

var currentTextIndex = -1

var letterIndex = -1

function addLetter(){
  // increment letterIndex to get to the next letter
  letterIndex++
  //
  if(letterIndex < text.length) {
    //ADD A DELAY
    setTimeout( function() {
      // add letter
      textAnimated.textContent += text[letterIndex]
      // call itself 
      addLetter()
    }, 100)
  }else {
    // call removeLetter after a delay 
    setTimeout( function() {
    removeLetter()
    }, 2000)
  }
}

function removeLetter(){
  // decrement letterIndex to get to the next letter
  letterIndex--
  //
  if(letterIndex >= 0) {
    //ADD A DELAY
    setTimeout( function() {
      // remove letter
      textAnimated.textContent = text.slice(0, letterIndex)
      // call itself 
      removeLetter()
    }, 100)
  }else {
    // no more letters to remove
    // doesn't call addLetter anymore
    // call updateText instead
    updateText()
  }
}

function updateText() {
    //increment currentTextIndex to switch to the next sentence
    currentTextIndex++

    //go to the first string index when currentTextIndex has reached the last one
  if(currentTextIndex === textArr.length) {
    currentTextIndex = 0
  }
    //update text 
    text = textArr[currentTextIndex]
    //call addLetter and get the animation going
    addLetter()
}

//the initial call to start everything
updateText()
