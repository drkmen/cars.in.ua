window.mark_notification_as_readed = (id, readed) => {
    if (readed) {
        return false;
    } else {
        $.ajax({
            url: `/users/5bd02c9000599e69ee9f7e68/notifications/${id}/mark_as_readed`,
            dataType: 'script',
        })
    }
}