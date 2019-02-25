$(document).on('turbolinks:load', () => {
    $('#search_form').on('change', () => {
        // console.log(this);
        $('#search_form').find('input[type=submit]').trigger('click');
    })
});