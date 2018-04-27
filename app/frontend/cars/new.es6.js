$(document).ready(() => {

    let $model = $('select#car_model');
    let $mark = $('select#car_mark');

    console.log($mark);

    fill_model_list = (markId) => {
        $.getJSON(`/car_mark_lists/${markId}/mark_models`, (data) => {
            $model.find('option').remove();

            $.each(data, (index, item) => {
                $model.append(`<option value=${item.id}>${item.name}</option>`)
            } )
        })
    };

    if ($mark.val()) { fill_model_list($mark.val()) } // get model list if page was reloaded

    $mark.on('change', function() {
        fill_model_list($(this).val());
        $model.attr('disabled', false)
    })

});
