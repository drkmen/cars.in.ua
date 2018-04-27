// removee = () => {
//     setTimeout( () => {
//         $('.row.car-show').removeClass('animated fadeOut slideInLeft')
//     }), 2000
//
//     // $('#ajax-loader').hide()
//     // window.clearTimeout(App.transitionLoader) if App.transitionLoader?
// }
//
// inner = () => {
//     $('.row.car-show').addClass('animated slideOutLeft')
//     setTimeout( removee(), 1000 )
//     // window.clearTimeout(App.transitionLoader) if App.transitionLoader?
// }
//
// out = () => {
//     setTimeout( () => {
//         $('.row.car-show').addClass('animated slideOutLeft')
//     }), 1500
//     // $('.row.car-show').addClass('animated slideInRight')
//     // App.transitionLoader = setTimeout( () => {
//     //     $('#ajax-loader').fadeIn('slow')
//     //         , 1500
//     //     )
//     // }
// }
//
//
// $(document).on('turbolinks:load.transition', inner)
// $(document).on('turbolinks:request-start.transition', out)
// $(document).on('turbolinks:before-cache.transition', removee)
