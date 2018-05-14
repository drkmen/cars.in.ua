/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import 'jquery/src/jquery'
// import 'bootstrap';
import 'bootstrap/dist/js/bootstrap';
import 'turbolinks';

import '../cars/new.es6';
import '../cars/show.es6';

import 'stylesheets/application.scss';

// Support component names relative to this directory:
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);

import * as Turbolinks from 'turbolinks'
// import * as $ from 'jquery'

// Start turbolinks
Turbolinks.start()