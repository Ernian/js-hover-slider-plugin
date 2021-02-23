class Slider {
  constructor(elementId, data) {
    this.elementId = elementId
    this.data = data
    this.sliderContainer = document.getElementById(`${this.elementId}`)
    this.domElements = {}
    this.init()
  }

  init() {
    this.renderSlider()
    this.getDomElements()
    this.setDefaultState()
    this.setEventListeners()
  }

  renderSlider() {
    let titleList = document.createElement('ul')
    titleList.classList.add(`hover-slider-nav`)
    let imageList = document.createElement('ul')
    imageList.classList.add(`hover-slider`)

    for (let i = 0; i < this.data.length; i++) {
      titleList.innerHTML += `
      <li class="hover-slider-nav__item" data-index="${i}">
        ${this.data[i].title}
      </li>`
      imageList.innerHTML += `
        <li class="hover-slider__item" data-index="${i}">
          <img class="hover-slider__item-img"
          src="${this.data[i].src}"
          alt="${this.data[i].alt}">
        </li>
      `
    }
    this.sliderContainer.classList.add('slider-container')
    this.sliderContainer.append(titleList, imageList)
  }

  getDomElements() {
    this.domElements.slider = document.getElementById(`${this.elementId}`)
    this.domElements.navLists = document.querySelectorAll('.hover-slider-nav')
    this.domElements.sliderItems = document.querySelectorAll('.hover-slider')
  }

  setDefaultState() {
    this.domElements.navLists.forEach(list => {
      for(let child of list.children){
        if (child.dataset.index === '0') {
          child.classList.add('hover-slider-nav__item--active')
        }
      }
    })

    this.domElements.sliderItems.forEach(slider => {
      for(let child of slider.children){
        if (child.dataset.index === '0') {
          child.classList.add('hover-slider__item--active')
        }
      }
    })
  }

  setEventListeners() {
    this.domElements.slider.addEventListener('mouseover', event => {
      if (event.target.classList.contains('hover-slider-nav__item')) {
        const parent = event.target.parentElement.parentElement
        this.toggleActivity(event.target.dataset.index, parent)
      }
    })
  }

  toggleActivity(index, parent) {
    
    for(let child of parent.children){
      if(child.className === 'hover-slider-nav'){        
        for(let navItem of child.children){          
          if(navItem.dataset.index === index) {            
            navItem.classList.add('hover-slider-nav__item--active')
          }
          else navItem.classList.remove('hover-slider-nav__item--active')
        }
      }

      if(child.className === 'hover-slider'){
        for (let image of child.children){
          if (image.dataset.index === index){
            image.classList.add('hover-slider__item--active')
          }
          else image.classList.remove('hover-slider__item--active')
        }
      }
    }
  }
}