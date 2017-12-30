import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
  constructor() {
    this.lazyImages = $(".lazyload");
    this.siteHeader = $(".site-header");
    this.triggerHeaderElement = $(".large-hero__title");
    this.createHeaderWaypoints();
    this.pageSections = $(".page-section");
    this.headerLinks = $(".primary-nav a");
    this.createPageSectionWaypoints();
    this.addSmoothScorlling();
    this.refreshWaypoints();
  }

//Refresh waypoints to recalculate the distance pixels
//waypoint is attached to web browser global window scope, dont need to repeat in RevealOnScroll again.
  refreshWaypoints(){
    this.lazyImages.on('load',function(){
      Waypoint.refreshAll();
    })
  }

  addSmoothScorlling(){
    this.headerLinks.smoothScroll();
  }

  createHeaderWaypoints() {
    var that = this;
    new Waypoint({
      element: this.triggerHeaderElement[0],
      handler: function(direction) {
        if (direction == "down") {
          that.siteHeader.addClass("site-header--dark");
        } else {
          that.siteHeader.removeClass("site-header--dark");
        }
      }
    });
  }

  createPageSectionWaypoints() {
    var that = this;
    this.pageSections.each(function() {
      var currentPageSection = this;
      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if(direction=="down"){
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
            that.headerLinks.removeClass("is-current-link");
            $(matchingHeaderLink).addClass("is-current-link");
          }
        },
        offset:"20%"
      });
      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if(direction=="up"){
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
            that.headerLinks.removeClass("is-current-link");
            $(matchingHeaderLink).addClass("is-current-link");
          }
        },
        offset:"-40%"
      });
    });
  }
}

export default StickyHeader;
