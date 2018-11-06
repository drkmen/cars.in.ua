$( document ).on('turbolinks:load', () => {

    // $('#exampleModal').modal({
    //     keyboard: true
    // })
    // $('#exampleModal').modal('show');
    // $('#exampleModal').modal('hide');

});

$(document).ready(() => {
    // $('#exampleModal').modal({keyboard: true, backdrop: 'static'})

    let $model = $('select#car_model_id');
    let $mark = $('select#car_mark_id');

    fill_model_list = (markId) => {
        $.getJSON(`/car_mark_lists/${markId}/mark_models`, (data) => {
            $model.find('option').remove();

            $.each(data, (index, item) => {
                $model.append(`<option value=${item.id}>${item.name}</option>`)
            } )
        })
    };

    if ($mark.val()) {
        fill_model_list($mark.val())
        $model.attr('disabled', false)
    } // get model list if page was reloaded

    $mark.on('change', function() {
        fill_model_list($(this).val());
        $model.attr('disabled', false)
    })

});
