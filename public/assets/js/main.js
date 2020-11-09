(function($) {
    "user strict";
    // Preloader Js
    $(window).on('load', function() {
        $('.preloader').fadeOut(1000);
        var img = $('.bg_img');
        img.css('background-image', function() {
            var bg = ('url(' + $(this).data('background') + ')');
            return bg;
        });
        // filter functions
        var $grid = $(".grid-area");
        var filterFns = {};
        $grid.isotope({
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: 0,
            }
        });
        // bind filter button click
        $('ul.filter').on('click', 'li', function() {
            var filterValue = $(this).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[filterValue] || filterValue;
            $grid.isotope({
                filter: filterValue
            });
        });
        // change is-checked class on buttons
        $('ul.filter').each(function(i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'li', function() {
                $buttonGroup.find('.active').removeClass('active');
                $(this).addClass('active');
            });
        });
    });
    $(document).ready(function() {
        // Nice Select
        $('.select-bar').niceSelect();
        // Lightcase 
        $('.video-popup').magnificPopup({
            type: 'iframe',
        });
        $("body").each(function() {
            $(this).find(".img-pop").magnificPopup({
                type: "image",
                gallery: {
                    enabled: true
                }
            });
        });
        // Wow js active
        new WOW().init();
        //Faq
        $('.faq-wrapper .faq-title').on('click', function(e) {
            var element = $(this).parent('.faq-item');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('.faq-content').removeClass('open');
                element.find('.faq-content').slideUp(300, "swing");
            } else {
                element.addClass('open');
                element.children('.faq-content').slideDown(300, "swing");
                element.siblings('.faq-item').children('.faq-content').slideUp(300, "swing");
                element.siblings('.faq-item').removeClass('open');
                element.siblings('.faq-item').find('.faq-title, .faq-title-two').removeClass('open');
                element.siblings('.faq-item').find('.faq-content').slideUp(300, "swing");
            }
        });

        //MenuBar
        $('.header-bar').on('click', function() {
            $(".menu").toggleClass("active");
            $(".header-bar").toggleClass("active");
            $('.overlay').toggleClass('active');
        });
        $('.overlay').on('click', function() {
            $(".menu").removeClass("active");
            $(".header-bar").removeClass("active");
            $('.overlay').removeClass('active');
        });
        //Menu Dropdown Icon Adding
        $("ul>li>.submenu").parent("li").addClass("menu-item-has-children");
        // drop down menu width overflow problem fix
        $('ul').parent('li').hover(function() {
            var menu = $(this).find("ul");
            var menupos = $(menu).offset();
            if (menupos.left + menu.width() > $(window).width()) {
                var newpos = -$(menu).width();
                menu.css({
                    left: newpos
                });
            }
        });
        $('.menu li a').on('click', function(e) {
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp(300, "swing");
            } else {
                element.addClass('open');
                element.children('ul').slideDown(300, "swing");
                element.siblings('li').children('ul').slideUp(300, "swing");
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp(300, "swing");
            }
        })
        // Scroll To Top 
        var scrollTop = $(".scrollToTop");
        $(window).on('scroll', function() {
            if ($(this).scrollTop() < 500) {
                scrollTop.removeClass("active");
            } else {
                scrollTop.addClass("active");
            }
        });
        //Click event to scroll to top
        $('.scrollToTop').on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            return false;
        });
        // Header Sticky Here
        var headerOne = $(".header-section");
        $(window).on('scroll', function() {
            if ($(this).scrollTop() < 1) {
                headerOne.removeClass("header-active");
            } else {
                headerOne.addClass("header-active");
            }
        });
        $('.window-warning .lay').on('click', function() {
            $('.window-warning').addClass('inActive');
        })
        $('.seat-plan-wrapper li .movie-schedule .item').on('click', function() {
            $(".seatPlanButton").removeAttr("href");
            let hall_route = $(this).attr('id');
            let film_time = $(this).text();
            let ms = Number(film_time.split(':')[0]) * 60 * 1000 + Number(film_time.split(':')[1]) * 1000;
            let film_id = $('.details-banner-wrapper').attr('id');
            let new_href = `/movie-seat-plan?film=${film_id}&time=${ms}&hall=${hall_route}`;
            $(".seatPlanButton").attr( "href", new_href );
            $('.window-warning').removeClass('inActive');
        })
        //Tab Section
        $('.tab ul.tab-menu li').on('click', function(g) {
            var tab = $(this).closest('.tab')
              , index = $(this).closest('li').index();
            tab.find('li').siblings('li').removeClass('active');
            $(this).closest('li').addClass('active');
            tab.find('.tab-area').find('div.tab-item').not('div.tab-item:eq(' + index + ')').fadeOut(500);
            tab.find('.tab-area').find('div.tab-item:eq(' + index + ')').fadeIn(500);
            g.preventDefault();
        });
        $('.search-tab ul.tab-menu li').on('click', function(k) {
            var search_tab = $(this).closest('.search-tab')
              , searchIndex = $(this).closest('li').index();
            search_tab.find('li').siblings('li').removeClass('active');
            $(this).closest('li').addClass('active');
            search_tab.find('.tab-area').find('div.tab-item').not('div.tab-item:eq(' + searchIndex + ')').hide(10);
            search_tab.find('.tab-area').find('div.tab-item:eq(' + searchIndex + ')').show(10);
            k.preventDefault();
        });
        $('.tabTwo ul.tab-menu li').on('click', function(g) {
            var tabTwo = $(this).closest('.tabTwo')
              , index = $(this).closest('li').index();
            tabTwo.find('li').siblings('li').removeClass('active');
            $(this).closest('li').addClass('active');
            tabTwo.find('.tab-area').find('div.tab-item').not('div.tab-item:eq(' + index + ')').fadeOut(10);
            tabTwo.find('.tab-area').find('div.tab-item:eq(' + index + ')').fadeIn(10);
            g.preventDefault();
        });
        //Odometer
        $(".counter-item").each(function() {
            $(this).isInViewport(function(status) {
                if (status === "entered") {
                    for (var i = 0; i < document.querySelectorAll(".odometer").length; i++) {
                        var el = document.querySelectorAll('.odometer')[i];
                        el.innerHTML = el.getAttribute("data-odometer-final");
                    }
                }
            });
        });
        $('.social-icons li a').on('mouseover', function(e) {
            var social = $(this).parent('li');
            if (social.children('a').hasClass('active')) {
                social.siblings('li').children('a').removeClass('active');
                $(this).addClass('active');
            } else {
                social.siblings('li').children('a').removeClass('active');
                $(this).addClass('active');
            }
        });
        $('.tab-slider').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: false,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 2,
                },
                768: {
                    items: 2,
                },
                992: {
                    items: 3,
                },
                1200: {
                    items: 4,
                }
            }
        })
        $('.sponsor-slider').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: false,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 1500,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                },
                500: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 4,
                },
                1200: {
                    items: 5,
                }
            }
        })
        $('.casting-slider').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: false,
            margin: 100,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                },
                450: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 3,
                },
                1200: {
                    items: 4,
                }
            }
        });
        var owl = $('.casting-slider');
        owl.owlCarousel();
        // Go to the next item
        $('.cast-next').on('click', function() {
            owl.trigger('next.owl.carousel');
        })
        // Go to the previous item
        $('.cast-prev').on('click', function() {
            owl.trigger('prev.owl.carousel', [300]);
        })
        $('.casting-slider-two').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: false,
            margin: 100,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                },
                450: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 3,
                },
                1200: {
                    items: 4,
                }
            }
        });
        var owlTT = $('.casting-slider-two');
        owlTT.owlCarousel();
        // Go to the next item
        $('.cast-next-2').on('click', function() {
            owlTT.trigger('next.owl.carousel');
        })
        // Go to the previous item
        $('.cast-prev-2').on('click', function() {
            owlTT.trigger('prev.owl.carousel', [300]);
        })
        $('.details-photos').owlCarousel({
            // loop:true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000,
            margin: 30,
            nav: false,
            responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                1024: {
                    items: 3
                },
                1200: {
                    items: 3
                }
            }
        });
        // var bookList = [];
        // var book = 0;
        // $(".seat-free img").on('click', function(e) {
        //     if (book == 0) {
        //         $(this).attr("src", "./assets/images/movie/seat01-free.png");
        //         book = 1;
        //         let bookItem = $(".seat-free").attr("id");
        //         console.log(bookItem);
        //         if(bookList.includes(bookItem)){
        //             bookList = seatRemove(bookList, bookItem);
        //         }
        //         $('#seatItem').html('');
        //         $('#seatItem').append([bookList]);
        //     } else if (book == 1) {
        //         $(this).attr("src", "./assets/images/movie/seat01-booked.png");
        //         book = 0;
        //         let bookItem = $(".seat-free").attr('id');
        //         console.log(bookItem);
        //         if(!bookList.includes(bookItem)){
        //             bookList = [...bookList,bookItem];
        //         }
        //         $('#seatItem').html('');
        //         $('#seatItem').append([bookList]);
        //     }
        // });
        // var bookTwo = 0;
        // $(".seat-free-two img").on('click', function(e) {
        //     if (bookTwo == 0) {
        //         $(this).attr("src", "./assets/images/movie/seat02-free.png");
        //         bookTwo = 1;
        //     } else if (bookTwo == 1) {
        //         $(this).attr("src", "./assets/images/movie/seat02-booked.png");
        //         bookTwo = 0;
        //     }
        // });
        // shop cart + - start here
        var CartPlusMinus = $('.cart-plus-minus');
        CartPlusMinus.prepend('<div class="dec qtybutton">-</div>');
        CartPlusMinus.append('<div class="inc qtybutton">+</div>');
        $(".qtybutton").on("click", function() {
            var $button = $(this);
            var oldValue = $button.parent().find("input").val();
            if ($button.text() === "+") {
                var newVal = parseFloat(oldValue) + 1;
            } else {
                // Don't allow decrementing below zero
                if (oldValue > 1) {
                    var newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 1;
                }
            }
            $button.parent().find("input").val(newVal);
            $button.parent().parent().find("button").attr('value',newVal);
            let check = $button.parent().parent().find("button").attr('onclick');
            check = check.split(",",3).join(',')+`,'${newVal}')`;
            // console.log(check);
            $button.parent().parent().find("button").attr('onclick',check);
        });
        //Bill Fast Food
        $("span").click(function(e) {
            let value = $(e.target).text();
            if (value === ""){
                let type = $(e.target).parent().parent().closest("span").attr("class");
                let typeTrim = type.substring(5,type.length);
                if (typeTrim === 'combosInfo'){
                    let minus = $(e.target).parent().closest("span").next().text();
                    let minusTrim = minus.substring(1,minus.length);
                    combosAmount -= Number(minusTrim)
                    $("#combosAmount").html('');
                    if (combosAmount !== 0) {$("#combosAmount").html(`$${combosAmount}`);}                
                    $(e.target).parent().closest("span").next().remove();
                    $(e.target).parent().closest("span").prev().remove();
                    $(e.target).parent().closest("span").remove();
                    $(e.target).remove();
                    invoiceTotal();
                }
                if (typeTrim === 'foodInfo'){
                    let minus = $(e.target).parent().closest("span").next().text();
                    let minusTrim = minus.substring(1,minus.length);
                    foodAmount -= Number(minusTrim)
                    $("#foodAmount").html('');
                    if (foodAmount !== 0) {$("#foodAmount").html(`$${foodAmount}`);}                
                    $(e.target).parent().closest("span").next().remove();
                    $(e.target).parent().closest("span").prev().remove();
                    $(e.target).parent().closest("span").remove();
                    $(e.target).remove();
                    invoiceTotal();
                }
                if (typeTrim === 'popcornInfo'){
                    let minus = $(e.target).parent().closest("span").next().text();
                    let minusTrim = minus.substring(1,minus.length);
                    popcornAmount -= Number(minusTrim)
                    $("#popcornAmount").html('');
                    if (popcornAmount !== 0) {$("#popcornAmount").html(`$${popcornAmount}`);}                
                    $(e.target).parent().closest("span").next().remove();
                    $(e.target).parent().closest("span").prev().remove();
                    $(e.target).parent().closest("span").remove();
                    $(e.target).remove();
                    invoiceTotal();
                }
                if (typeTrim === 'drinkInfo'){
                    let minus = $(e.target).parent().closest("span").next().text();
                    let minusTrim = minus.substring(1,minus.length);
                    drinkAmount -= Number(minusTrim)
                    $("#drinkAmount").html('');
                    if (drinkAmount !== 0) {$("#drinkAmount").html(`$${drinkAmount}`);}                
                    $(e.target).parent().closest("span").next().remove();
                    $(e.target).parent().closest("span").prev().remove();
                    $(e.target).parent().closest("span").remove();
                    $(e.target).remove();
                    invoiceTotal();
                }
            }
        });
        
        
        //Speaker Slider
        $('.speaker-slider').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: false,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 3,
                },
                1200: {
                    items: 4,
                }
            }
        });
        var owlT = $('.speaker-slider');
        owlT.owlCarousel();
        // Go to the next item
        $('.speaker-next').on('click', function() {
            owlT.trigger('next.owl.carousel');
        })
        // Go to the previous item
        $('.speaker-prev').on('click', function() {
            owlT.trigger('prev.owl.carousel', [300]);
        })
        //Client SLider
        $('.client-slider').owlCarousel({
            loop: true,
            nav: false,
            dots: true,
            items: 1,
            autoplay: true,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
        })
        //Count Down JAva Script
        $('.countdown').countdown({
            date: '10/15/2022 05:00:00',
            offset: +2,
            day: 'Day',
            days: 'Days'
        }, function() {
            alert('Done!');
        });
        //Widget Slider
        $('.widget-slider').owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            items: 1,
            autoplay: true,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
            margin: 30,
        });
        var owlBela = $('.widget-slider');
        owlBela.owlCarousel();
        // Go to the next item
        $('.widget-next').on('click', function() {
            owlBela.trigger('next.owl.carousel');
        })
        // Go to the previous item
        $('.widget-prev').on('click', function() {
            owlBela.trigger('prev.owl.carousel', [300]);
        })
        $('.blog-slider').owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            items: 1,
            autoplay: true,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
        });
        var owlB = $('.blog-slider');
        owlB.owlCarousel();
        // Go to the next item
        $('.blog-next').on('click', function() {
            owlB.trigger('next.owl.carousel');
        })
        // Go to the previous item
        $('.blog-prev').on('click', function() {
            owlB.trigger('prev.owl.carousel', [300]);
        })
    });
}
)(jQuery);

function seatRemove(arr, value) { return arr.filter(function(ele){ return ele != value; });}

var bookList = [];
var book = 0;
var bookTwo = 0;
var amount = 0;
function getSeat(seatNo,priceSeat){ 
    
    // bookList = $('#seatItem').val();
    // $(".seat-free img").on('click', function(e) {
        if (book == 0) {
            $(`#s${seatNo}`).attr("src", "./assets/images/movie/seat01-free.png");
            book = 1;
            let bookItem = seatNo;
            console.log(bookItem);
            if(bookList.includes(bookItem)){
                bookList = seatRemove(bookList, bookItem);
                if (amount >= 0) {amount -= Number(priceSeat)}
            }
            $('#seatItem').html('');
            $('#totalPrice').html('');
            $('#seatItem').append([bookList]);
            $('#totalPrice').append(amount).prepend(`$`);
            let full_url = new URLSearchParams(window.location.search); // Get current url
            let presentHall = full_url.get('hall');
            let presentSchedule = full_url.get('schedule');
            // let new_href = `/popcorn?hall=${presentHall}&schedule=${presentSchedule}&amount=${amount}&tickets=${bookList}`;
            let new_href = `#`;
            if (amount > 0) {
                new_href = `/popcorn?hall=${presentHall}&schedule=${presentSchedule}&amount=${amount}&tickets=${bookList}`;
            } 
            $(".foodButton").removeAttr("href");
            $(".foodButton").attr( "href", new_href );
        } else if (book == 1) {
            $(`#s${seatNo}`).attr("src", "./assets/images/movie/seat01-booked.png");
            book = 0;
            let bookItem = seatNo;
            console.log(bookItem);
            if(!bookList.includes(bookItem)){
                bookList = [...bookList,bookItem];
                if (amount >= 0) {amount += Number(priceSeat)}
            }
            $('#seatItem').html('');
            $('#totalPrice').html('');
            $('#seatItem').append([bookList]);
            $('#totalPrice').append(amount).prepend(`$`);
            let full_url = new URLSearchParams(window.location.search); // Get current url
            let presentHall = full_url.get('hall');
            let presentSchedule = full_url.get('schedule');
            // let new_href = `/popcorn?hall=${presentHall}&schedule=${presentSchedule}&amount=${amount}&tickets=${bookList}`;
            let new_href = `#`;
            if (amount > 0) {
                new_href = `/popcorn?hall=${presentHall}&schedule=${presentSchedule}&amount=${amount}&tickets=${bookList}`;
            } 
            $(".foodButton").removeAttr("href");
            $(".foodButton").attr( "href", new_href );
        }
    // });
}
function getSeatTwo(seatNo,priceSeat){ 
    // $(".seat-free-two img").on('click', function(e) {
        if (bookTwo == 0) {
            $(`#s${seatNo}`).attr("src", "./assets/images/movie/seat02-free.png");
            bookTwo = 1;
            let bookItem = seatNo;
            console.log(bookItem);
            if(bookList.includes(bookItem)){
                bookList = seatRemove(bookList, bookItem);
                if (amount >= 0) {amount -= Number(priceSeat)}

            }
            $('#seatItem').html('');
            $('#totalPrice').html('');
            $('#seatItem').append([bookList]);
            $('#totalPrice').append(amount).prepend(`$`);
            let full_url = new URLSearchParams(window.location.search); // Get current url
            let presentHall = full_url.get('hall');
            let presentSchedule = full_url.get('schedule');
            let new_href = `#`;
            if (amount > 0) {
                new_href = `/popcorn?hall=${presentHall}&schedule=${presentSchedule}&amount=${amount}&tickets=${bookList}`;
            } 
            $(".foodButton").removeAttr("href");
            $(".foodButton").attr( "href", new_href );
        } else if (bookTwo == 1) {
            $(`#s${seatNo}`).attr("src", "./assets/images/movie/seat02-booked.png");
            bookTwo = 0;
            let bookItem = seatNo;
            console.log(bookItem);
            if(!bookList.includes(bookItem)){
                bookList = [...bookList,bookItem];
                if (amount >= 0) {amount += Number(priceSeat)}

            }
            $('#seatItem').html('');
            $('#totalPrice').html('');
            $('#seatItem').append([bookList]);
            $('#totalPrice').append(amount).prepend(`$`);
            let full_url = new URLSearchParams(window.location.search); // Get current url
            let presentHall = full_url.get('hall');
            let presentSchedule = full_url.get('schedule');
            let new_href = `#`;
            if (amount > 0) {
                new_href = `/popcorn?hall=${presentHall}&schedule=${presentSchedule}&amount=${amount}&tickets=${bookList}`;
            }
            $(".foodButton").removeAttr("href");
            $(".foodButton").attr( "href", new_href );
        }
    // });
}
var combosAmount = 0;
function combosOrder(price,discount,name,qty){
    let total = (Number(price)-Number(price)*(Number(discount)*0.01))*Number(qty);
    $("#combosAmount").html('');
    $("#combosAmount").html(`$${combosAmount += total}`);
    let comboItems = '';
    comboItems = $(`<span>${qty} ${name}</span><span><i class="fas fa-eraser"></i></span><span>$${total.toFixed(2)}</span>`);
    $(".combosInfo").append(comboItems);
    invoiceTotal();
}
var foodAmount = 0;
function foodOrder(price,discount,name,qty){
    let total = (Number(price)-Number(price)*(Number(discount)*0.01))*Number(qty);
    $("#foodAmount").html('');
    $("#foodAmount").html(`$${foodAmount += total}`);
    let foodItems = '';
    foodItems = $(`<span>${qty} ${name}</span><span><i class="fas fa-eraser"></i></span><span>$${total.toFixed(2)}</span>`);
    $(".foodInfo").append(foodItems);
    invoiceTotal();
}
var popcornAmount = 0;
function popcornOrder(price,discount,name,qty){
    let total = (Number(price)-Number(price)*(Number(discount)*0.01))*Number(qty);
    $("#popcornAmount").html('');
    $("#popcornAmount").html(`$${popcornAmount += total}`);
    let popcornItems = '';
    popcornItems = $(`<span>${qty} ${name}</span><span><i class="fas fa-eraser"></i></span><span>$${total.toFixed(2)}</span>`);
    $(".popcornInfo").append(popcornItems);
    invoiceTotal();
}
var drinkAmount = 0;
function drinkOrder(price,discount,name,qty){
    let total = (Number(price)-Number(price)*(Number(discount)*0.01))*Number(qty);
    $("#drinkAmount").html('');
    $("#drinkAmount").html(`$${drinkAmount += total}`);
    let drinkItems = '';
    drinkItems = $(`<span>${qty} ${name}</span><span><i class="fas fa-eraser"></i></span><span>$${total.toFixed(2)}</span>`);
    $(".drinkInfo").append(drinkItems);
    invoiceTotal();
}
function invoiceTotal(){
    var fastfoodAmount = 0;
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('amount');
    fastfoodAmount += Number(myParam);
    let drinkTotal = $("#drinkAmount").text();
    if (drinkTotal !== ""){
        let drinkTotalTrim = drinkTotal.substring(1,drinkTotal.length);
        fastfoodAmount += Number(drinkTotalTrim);
    }
    let foodTotal = $("#foodAmount").text();
    if (foodTotal !== ""){
        let foodTotalTrim = foodTotal.substring(1,foodTotal.length);
        fastfoodAmount += Number(foodTotalTrim);
    }
    let popcornTotal = $("#popcornAmount").text();
    if (popcornTotal !== ""){
        let popcornTotalTrim = popcornTotal.substring(1,popcornTotal.length);
        fastfoodAmount += Number(popcornTotalTrim);
    }
    let combosTotal = $("#combosAmount").text();
    if (combosTotal !== ""){
        let combosTotalTrim = combosTotal.substring(1,combosTotal.length);
        fastfoodAmount += Number(combosTotalTrim);
    }
    $("#invoiceTotal").html('');
    if (fastfoodAmount !== 0) {$("#invoiceTotal").html(`$${fastfoodAmount.toFixed(2)}`);}
    $("#invoiceVAT").html('');
    if (fastfoodAmount !== 0) {$("#invoiceVAT").html(`$${(fastfoodAmount*0.05).toFixed(2)}`);}
    $("#invoicePayment").html('');
    if (fastfoodAmount !== 0) {$("#invoicePayment").html(`$${(fastfoodAmount+(fastfoodAmount*0.05)).toFixed(2)}`);}
}