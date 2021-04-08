import style from "./style";
import body from "./body.html";

import { NucleusComponent, NucleusInstance } from "../../../core/nucleus/component";
import { Category, Icon } from "../../../core/puzzle/decorators";
import { ModelEventHandler } from "../../../core/nucleus/decorators/model";
import { Vars } from "../../../core/nucleus/decorators/component";

@Category("Interacts")
@Icon("fas fa-square")
@ModelEventHandler("arrowLeft", "click", function() {
    let currentSlideIndex = this.getVar("currentSlide");
    const _currentSlide = this.getCompByModel(`slide${currentSlideIndex}`) as HTMLElement;
    let nextSlide = this.getCompByModel(`slide${currentSlideIndex - 1}`) as HTMLElement;
    if (!nextSlide) {
        nextSlide = this.getCompByModel("slide2")
        currentSlideIndex = 3;
    };
    // Hide current slide
    _currentSlide.style.display = null;
    // Display next slide
    nextSlide.style.display = "block";
    this.setVarNoBuild("currentSlide", currentSlideIndex - 1);
})
@ModelEventHandler("arrowRight", "click", function() {
    let currentSlideIndex = this.getVar("currentSlide");
    const _currentSlide = this.getCompByModel(`slide${currentSlideIndex}`) as HTMLElement;
    let nextSlide = this.getCompByModel(`slide${currentSlideIndex + 1}`) as HTMLElement;
    if (!nextSlide) {
        nextSlide = this.getCompByModel("slide0")
        currentSlideIndex = -1;
    };
    // Hide current slide
    _currentSlide.style.display = null;
    // Display next slide
    nextSlide.style.display = "block";
    this.setVarNoBuild("currentSlide", currentSlideIndex + 1);
})
@Vars({
    currentSlide: 0
})
class Carousel extends NucleusComponent {
    constructor() {
        super("Carousel", body, { style });
    }
};

export default new Carousel;