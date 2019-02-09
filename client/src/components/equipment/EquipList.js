import template from './templates/equiplist.jst';
import { View, Model } from 'backbone.marionette';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import 'owl.carousel';
import { setWrapHeight } from '../../Utils';


export default View.extend({
    template: template,
    onRender: function() {
        this.$('.owl-carousel').owlCarousel({
            //nav: true,
            dots: true,
            //navText: [&#x27;<span class='icon-chevron-thin-left'>&#x27;,&#x27;<span class='icon-chevron-thin-left'>&#x27;]
            //navElement: "span class='icon-chevron-thin-left'",
            //navClass: [&#x27;owl-prev&#x27;,&#x27;owl-next&#x27;]
            onInitialized: () => {

                setWrapHeight(this.$el)
                $(window).resize(() => {
                    setWrapHeight(this.$el)
                });
                // Get rid of that pesky wrapping-div.
                // Assumes 1 child element present in template.
                this.$el = this.$el.children();
                // Unwrap the element to prevent infinitely
                // nesting elements during re-render.
                this.$el.unwrap();
                this.setElement(this.$el);
            },
            onChanged: ()=>{
                //this.$el.animate({opacity: 1}, {duration: 100})
                this.$el.css('opacity', 1)
            }
        });





    }
});