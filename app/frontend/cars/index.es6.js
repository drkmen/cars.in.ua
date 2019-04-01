// TODO: remove to something separate
const debounce = (fn, time) => {
    let timeout;

    return function() {
        const functionCall = () => fn.apply(this, arguments);

        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    }
}

$(document).ready(() => {

    $('.spinner').hide();

    const endpoint = $('#loadMore').attr('data-endpoint');
    const pagesAmount = $('#loadMore').attr('data-pages-amount');

    let currentPage = $('#page').val() || 1;
    let isPaginating = false;

    $(window).scroll(debounce( () => {
        if ($('#loadMore').visible(true) && !isPaginating && currentPage < pagesAmount) {
            $('.spinner').show();
            isPaginating = true;
            currentPage++;

            $.ajax({
                url: endpoint,
                dataType: 'script',
                data: {
                    page: currentPage
                },
            }).done(function (result) {
                isPaginating = false;
                $('.spinner').hide();
            });
        }
    }, 100));

});
