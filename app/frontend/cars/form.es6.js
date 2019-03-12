// $( document ).on('turbolinks:load', () => {});

$(document).ready(() => {

    let $model = $('.car-new select#car_model_id');
    let $mark = $('.car-new select#car_mark_id');

    fill_model_list = (markId) => {
        $.getJSON(`/car_marks/${markId}/mark_models`, (data) => {
            $model.find('option').remove();

            $.each(data, (index, item) => {
                $model.append(`<option value=${item.id}>${item.name}</option>`)
            } )
        })
    };

    console.log($model.val());
    console.log(!$model.val());

    if ($mark.val()) {
        fill_model_list($mark.val())
        $model.attr('disabled', false)
    } // get model list if page was reloaded

    $mark.on('change', function() {
        fill_model_list($(this).val());
        $model.attr('disabled', false)
    })

});
