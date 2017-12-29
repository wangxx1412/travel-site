import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
import $ from 'jquery';
import StickyHeader from "./modules/Stickyheader";

var mobileMenu = new MobileMenu();
new RevealOnScroll($(".feature-item"),"85%");
new RevealOnScroll($(".testimonials"),"60%");
var stickyHeader = new StickyHeader(); 
