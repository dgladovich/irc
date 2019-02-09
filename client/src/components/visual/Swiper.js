export default class Swiper {
    constructor(el) {
        this.el = el;
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.update = this.update.bind(this);
        this.targetBCR = null;
        this.target = null;
        this.startX = 0;
        this.currentX = 0;
        this.screenX = 0;
        this.targetX = 0;
        this.draggingCard = false;

        this.addEventListeners();

        requestAnimationFrame(this.update);
    }

    addEventListeners() {
        this.el.addEventListener('touchstart', this.onStart);
        this.el.addEventListener('touchmove', this.onMove);
        this.el.addEventListener('touchend', this.onEnd);

        this.el.addEventListener('mousedown', this.onStart);
        this.el.addEventListener('mousemove', this.onMove);
        this.el.addEventListener('mouseup', this.onEnd);
    }

    onStart(evt) {
        if (this.target)
            return;

/*        if (!evt.target.classList.contains('card'))
            return;*/

        this.target = evt.target;
        this.targetBCR = this.target.getBoundingClientRect();

        this.startX = evt.pageX || evt.touches[0].pageX;
        this.currentX = this.startX;

        this.draggingCard = true;
        this.target.style.willChange = 'transform';

        evt.preventDefault();
    }

    onMove(evt) {
        if (!this.target)
            return;

        this.currentX = evt.pageX || evt.touches[0].pageX;
    }

    onEnd(evt) {
        if (!this.target)
            return;

        this.targetX = 0;
        let screenX = this.currentX - this.startX;
        if (Math.abs(screenX) > this.targetBCR.width * 0.35) {
            this.targetX = (screenX > 0) ? this.targetBCR.width : -this.targetBCR.width;
        }

        this.draggingCard = false;
    }

    update() {
        requestAnimationFrame(this.update);

        if (!this.target)
            return;

        if (this.draggingCard) {
            this.screenX = this.currentX - this.startX;
        } else {
            this.screenX += (this.targetX - this.screenX) / 4;
        }

        const normalizedDragDistance =
            (Math.abs(this.screenX) / this.targetBCR.width);
        const opacity = 1 - Math.pow(normalizedDragDistance, 3);

        this.target.style.transform = `translateX(${this.screenX}px)`;
        this.target.style.opacity = opacity;

        // User has finished dragging.
        if (this.draggingCard)
            return;

        const isNearlyAtStart = (Math.abs(this.screenX) < 0.1);
        const isNearlyInvisible = (opacity < 0.01);

        // If the card is nearly gone.
        if (isNearlyInvisible) {

            // Bail if there's no target or it's not attached to a parent anymore.
            if (!this.target || !this.target.parentNode)
                return;

            this.target.parentNode.removeChild(this.target);


        } else if (isNearlyAtStart) {
            this.resetTarget();
        }
    }


    resetTarget() {
        if (!this.target)
            return;

        this.target.style.willChange = 'initial';
        this.target.style.transform = 'none';
        this.target = null;
    }
}
