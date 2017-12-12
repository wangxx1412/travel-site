import $ from 'jquery';

class MobileMenu {
  constructor(){
    this.siteHeader = $(".site-header");
    this.menuIcon = $(".site-header__menu-icon");
    this.menuContent = $(".site-header__menu-content");
    this.events();
  }

  /*After the event triggerd when calling 'this', this points to the
  element that triggered the event*/
  /*We dont want 'this'=the element triggered the event,
  add bind to the method of 'this', anything inside the parenthesis will
  become 'this'.*/

  events(){
    this.menuIcon.click(this.toggleTheMenu.bind(this));
  }

  toggleTheMenu(){
    this.menuContent.toggleClass("site-header__menu-content-visible");
    this.siteHeader.toggleClass("site-header--is-expanded");
    this.menuIcon.toggleClass("site-header__menu-icon--close-x");
  }
}

export default MobileMenu;
