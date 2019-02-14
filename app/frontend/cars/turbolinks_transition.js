$(document).on('turbolinks:request-start.transition', function(){
    $('.car-show').addClass('animated slideOutLeft');
});

$(document).on('turbolinks:load', function(){
    $('.car-show').removeClass('animated slideOutLeft');
    $('.car-show').addClass('animated slideInRight');
});

$(document).on('turbolinks:before-cache.transition', function(){
    $('.car-show').removeClass('animated slideInRight slideOutLeft');
});