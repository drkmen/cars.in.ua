$(document).on('turbolinks:load', () => {

    window.csrfToken = $('meta[name=csrf-token]').attr('content');

    const $section = $('#sessionSection');
    const $overlay = $section.find('.overlay');

    window.openLogin = (event, user = false) => {
        if (user) {
            // return false;
        } else {
            if (event) {
                event.preventDefault();
            }
            $section.css('right', 0);
            $('body .body').css('filter', 'blur(5px)')
        }
    };

    $('#sessionLink').on('click', () => {
        openLogin();
    });

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

    $('#currentUserDropdown').on('show.bs.dropdown', function () {
        $(this).addClass('')
    })
});