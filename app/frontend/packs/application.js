/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

// third party
import 'jquery/src/jquery';
import 'bootstrap';
import Rails from 'rails-ujs';
import Turbolinks from "turbolinks";
import * as moment from 'moment';

// first party
import '../cars/form.es6';
import '../cars/show.es6';

// styles
import 'stylesheets/application.scss';

Rails.start();
Turbolinks.start();

// Support component names relative to this directory:
const componentRequireContext = require.context("components", true);
const ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
ReactRailsUJS.detectEvents();

// turbolinks animation while navigate between cars - < Previous and Next > cars
let $prevCar;

$(document).on('turbolinks:click', function(e){
    $prevCar = $(e.target.firstChild).attr('class').indexOf('prev-car') >= 0;
    $('.car-show').addClass('animated ' + ($prevCar ? 'slideOutRight' : 'slideOutLeft'));
});

$(document).on('turbolinks:load', function(){
    if (typeof $prevCar !== 'undefined') {
        $('.car-show').addClass('animated ' + ($prevCar ? 'slideInLeft' : 'slideInRight'));
    }
});

$(document).on('turbolinks:before-cache.transition', function(){
    $('.car-show').removeClass('animated slideInRight slideOutRight slideOutLeft slideInLeft');
});


// $('#exampleModal').modal();
// $('#exampleModal').modal('show');
// var bootstrap_enabled = (typeof $().modal == 'function');
// console.log(bootstrap_enabled);