$(document).on('turbolinks:load', () => {
    $('#search_form').on('change', () => {
        $('#search_form').find('input[type=submit]').trigger('click');
    })
});