$(document).on('turbolinks:load', () => {

    // login section
    const $section = $('#sessionSection')
    $('#sessionLink').on('click', () => {
        $section.css('right', 0);
        $('body .body').css('filter', 'blur(5px)')
    });

    const $overlay = $section.find('.overlay');
    $overlay.on('click', () => {
        $section.css('right', -2000);
        $('body .body').css('filter', 'blur(0px)')
    });

    $('#registerLink').on('click', () => {
        $('.login-form').addClass('d-none');
        $('.signup-form').removeClass('d-none')
    })

    $('#loginLink').on('click', () => {
        $('.login-form').removeClass('d-none');
        $('.signup-form').addClass('d-none')
    })
});