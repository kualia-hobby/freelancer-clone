var navbar;
var navbarOffset;

var sections;
var menuItems;
const sectionCoords = []

const onDomContentLoaded = () => {
  this.navbar = document.getElementById("navbar");
  this.navbarOffset = navbar.clientHeight - 32;
  this.sections = document.querySelectorAll("section")
  this.menuItems = document.getElementsByClassName("menu-item")

  for (const section of sections) {
    sectionCoords.push(section.getBoundingClientRect().top + window.scrollY)
  } 

  onScrolled()
}


const onScrolled = (e) =>{
  let scroll = this.scrollY + navbarOffset;
  // expanding navbar
  if(scrollY <= 0){
    navbar.classList.add("navbar-expanded");

  }else{
    navbar.classList.remove("navbar-expanded");
  }

  // select current section
  let currentSection = -1
  for (let i = 0; i < (sectionCoords.length); i++) {
    if(scroll >= sectionCoords[i] - 6)
      currentSection = i;
    else break;
  }

  if(lastSection != currentSection){
    if (lastSection != -1)
      menuItems[lastSection].classList.remove("selected");
    if (currentSection != -1)
      menuItems[currentSection].classList.add("selected");
    lastSection = currentSection
  }

}

const onClick = (e) => {
  clickedOn = e.target;
  tagName = clickedOn.tagName
  

  if(tagName === 'A'){
    href = (clickedOn.attributes.href.value)
    if (href[0] != '#') return
    
    scrollTo(href)
    e.preventDefault();
    return
  }
  
  var targetModal = clickedOn.getAttribute("targetModal")
  if(targetModal){
    document.querySelector(targetModal).classList.add("show");
    return
  }

  if(clickedOn.id == "close-modal" || clickedOn.getAttribute("class") == "modal show"){
    let active_modal = document.querySelector(".modal.show");
    active_modal.classList.remove("show");
    return
  }

}

const scrollTo = (targetID) => {
  target = document.querySelector(targetID);
  pos = target.getBoundingClientRect()

  windowTop = window.scrollY
  offset = windowTop + pos.top +1

  window.scroll(0, offset - navbarOffset)

}

document.addEventListener("click", onClick);
document.addEventListener("DOMContentLoaded", onDomContentLoaded);
let lastSection = -1
document.addEventListener("scroll", onScrolled)
