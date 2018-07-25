// #window.App ||= {}
// #class App.Base
// #
// #    constructor: ->
// #    App.transitions = new Element.Transitions
// #    return this
// #
// #window.Element ||= {}
// #class Element.Transitions
// #
// #    constructor: ->
// #        $(document).on 'turbolinks:request-start.transition', @out
// #        $(document).on 'turbolinks:load.transition', @in
// #        $(document).on 'turbolinks:before-cache.transition', @remove
// #
// #        return this
// #
// #    out: =>
// #        $('#main-container .page-content').addClass('animated fadeOut')
// #        App.transitionLoader = setTimeout( ->
// #            $('#ajax-loader').fadeIn('slow')
// #        , 1500
// #        )
// #        return
// #
// #    in: =>
// #        $('#main-container .page-content').addClass('animated fadeIn')
// #        setTimeout( @remove, 1000 )
// #        window.clearTimeout(App.transitionLoader) if App.transitionLoader?
// #        return
// #
// #    remove: =>
// #        $('#main-container .page-content').removeClass('animated fadeOut fadeIn')
// #        $('#ajax-loader').hide()
// #        window.clearTimeout(App.transitionLoader) if App.transitionLoader?
// #        return

$(document).on('turbolinks:request-start.transition', function(){
    // $('.arrow.prev-car').on('click', function(){});
    console.log('turbolinks:request-start.transition');
    $('.car-show').addClass('animated slideOutLeft');
    // $('.car-show').addClass('animated slideInRight');
    // $('.page-content')
    //     .addClass('animated slideInRight')
    //     .off('webkitAnimationEnd oanimationend msAnimationEnd animationend')
});

$(document).on('turbolinks:load', function(){
    console.log('turbolinks:load');
    $('.car-show').removeClass('animated slideOutLeft');
    $('.car-show').addClass('animated slideInRight');
});

$(document).on('turbolinks:before-cache.transition', function(){
    console.log('turbolinks:before-cache.transition');
    $('.car-show').removeClass('animated slideInRight slideOutLeft');
});