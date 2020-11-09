var url = "../assets/js/webenv.js";
$.getScript(url, function(){
    $(function() {
        var full_url = document.URL; // Get current url
        var movie_id = full_url.substring(full_url.lastIndexOf('/') + 1);
        $.ajax({
            url: `${PATH_URL}/timeslots?movie.id=${movie_id}&_sort=hall,start_time:ASC`,
            type: 'GET'
        })
        .then(data => {
            let temp = [...data];
            let cities = [];
            let dates = [];
            let cinemas = [];
            for (item of temp){
                if(!cities.includes(item.location.city_id)){
                    cities = [item.location.city_id,...cities];
                }
            }  
            console.log(cities);
            $('.selectedCities').html('');     
            for (item of cities) {
                let citiesSelect = $(`<option value="${item}">${item}</option>`);
                $('.selectedCities').append(citiesSelect);
            }
            $('.selectedCities').niceSelect();
            $('.selectedCities span').remove(); 
            $('.selectedCities').prepend($(`<span class="current">${cities[0]}</span>`));    
            
            let cityStatus = $('.selectedCities').val();
            for (item of temp){
                if (cityStatus === item.location.city_id){
                    if(!dates.includes(item.start_date)){
                        dates = [...dates,item.start_date];
                    }
                };
            }
            $('.selectedDates').html('');     
            for (item of dates) {
                var newStr = item.split('-').reverse().join('/');                
                let datesSelect = $(`<option value="${item}" id="${item}">${newStr}</option>`);
                $('.selectedDates').append(datesSelect);
            }
            $('.selectedDates').niceSelect();
            $('.selectedDates span').remove(); 
            let curretStr = String(dates[0]).split('-').reverse().join('/');
            $('.selectedDates').prepend($(`<span class="current">${curretStr}</span>`));

            let dateStatus = $('.selectedDates').val();
            for (item of temp){
                if (cityStatus === item.location.city_id){
                    if (dateStatus === item.start_date){
                        if(!cinemas.includes(item.cinema.cinema_name)){
                            cinemas = [...cinemas,item.cinema.cinema_name];
                        }
                    }
                };
            }
            $('.selectedCinemas').html('');     
            for (item of cinemas) {
                let cinemasSelect = $(`<option value="${item}">${item}</option>`);
                $('.selectedCinemas').append(cinemasSelect);
            }
            $('.selectedCinemas').niceSelect();
            $('div[style*="display: none"]').remove();
            $('.selectedCinemas span').remove(); 
            $('.selectedCinemas').prepend($(`<span class="current">${cinemas[0]}</span>`));    
            
            let cinemaStatus = $('.selectedCinemas').val();
            movieSchedule(cityStatus,dateStatus,cinemaStatus);
        })      
        .catch(() => {
            alert('Server Error Issue')
        }) 
    });
   
    // $(".seat-plan-wrapper li .movie-schedule .item").click(function() {
    //     alert('Hello How are you?');
    //     // $(".seatPlanButton").removeAttr("href");
    //     // let hall_route = $(this).attr('id');
    //     // let film_time = $(this).text();
    //     // let ms = Number(film_time.split(':')[0]) * 60 * 1000 + Number(film_time.split(':')[1]) * 1000;
    //     // let film_id = $('.details-banner-wrapper').attr('id');
    //     // let new_href = `/movie-seat-plan?film=${film_id}&time=${ms}&hall=${hall_route}`;
    //     // $(".seatPlanButton").attr( "href", new_href );
    //     // $('.window-warning').removeClass('inActive');
    // })

    $("select.selectedCities").change(function() {    
        cityLoading();
        let city = $("select.selectedCities").children("option:selected").val();
        let date = $("select.selectedDates").children("option:selected").val();
        let cinema = $("select.selectedCinemas").children("option:selected").val();
        movieSchedule(city,date,cinema);
    });
    $("select.selectedDates").change(function() {    
        dateLoading();
        let city = $("select.selectedCities").children("option:selected").val();
        let date = $("select.selectedDates").children("option:selected").val();
        let cinema = $("select.selectedCinemas").children("option:selected").val();
        movieSchedule(city,date,cinema);
    });
});

function cityLoading(){ 
    let full_url = document.URL; // Get current url
    let movie_id = full_url.substring(full_url.lastIndexOf('/') + 1);
    let dates = [];
    let cinemas = [];
    var city = $("select.selectedCities").children("option:selected").val();
    $.ajax({
        url: `${PATH_URL}/timeslots?movie.id=${movie_id}&location.city_id=${city}&_sort=hall,start_time:ASC`,
        type: 'GET'
    })
    .then(data => {
        let temp = [...data];
        for (item of temp){
            if(!dates.includes(item.start_date)){
                dates = [...dates,item.start_date];
            }
        }
        $('.selectedDates').html('');     
        for (item of dates) {
            let newStr = item.split('-').reverse().join('/');                
            let datesSelect = $(`<option value="${item}" id="${item}">${newStr}</option>`);
            $('.selectedDates').append(datesSelect);
        }
        $('.selectedDates').niceSelect();
        $('.selectedDates span').remove(); 
        let curretStr = dates[0].split('-').reverse().join('/');
        $('.selectedDates').prepend($(`<span class="current">${curretStr}</span>`));

        let dateStatus = $('.selectedDates').val();
        for (item of temp){
            if (dateStatus === item.start_date){
                if(!cinemas.includes(item.cinema.cinema_name)){
                    cinemas = [...cinemas,item.cinema.cinema_name];
                }
            }
        }
        $('.selectedCinemas').html('');     
        for (item of cinemas) {
            let cinemasSelect = $(`<option value="${item}">${item}</option>`);
            $('.selectedCinemas').append(cinemasSelect);
        }
        $('.selectedCinemas').niceSelect();
        $('div[style*="display: none"]').remove();
        $('.selectedCinemas span').remove(); 
        $('.selectedCinemas').prepend($(`<span class="current">${cinemas[0]}</span>`));    

    })      
    .catch(() => {
        alert('Server Error Issue')
    }) 
}

function dateLoading(){ 
    let full_url = document.URL; // Get current url
    let movie_id = full_url.substring(full_url.lastIndexOf('/') + 1);
    let cinemas = [];
    var city = $("select.selectedCities").children("option:selected").val();
    var date = $("select.selectedDates").children("option:selected").val();
    $.ajax({
        url: `${PATH_URL}/timeslots?movie.id=${movie_id}&location.city_id=${city}&start_date=${date}&_sort=hall,start_time:ASC`,
        type: 'GET'
    })
    .then(data => {
        let temp = [...data];
        for (item of temp){
            if(!cinemas.includes(item.cinema.cinema_name)){
                cinemas = [...cinemas,item.cinema.cinema_name];
            }
        }
        $('.selectedCinemas').html('');     
        for (item of cinemas) {
            let cinemasSelect = $(`<option value="${item}">${item}</option>`);
            $('.selectedCinemas').append(cinemasSelect);
        }
        $('.selectedCinemas').niceSelect();
        $('div[style*="display: none"]').remove();
        $('.selectedCinemas span').remove(); 
        $('.selectedCinemas').prepend($(`<span class="current">${cinemas[0]}</span>`));   
    })      
    .catch(() => {
        alert('Server Error Issue')
    }) 
}

function movieSchedule(city,date,cinema) {
    let full_url = document.URL; // Get current url
    let movie_id = full_url.substring(full_url.lastIndexOf('/') + 1);
    let halls = [];

        $.ajax({
            url: `${PATH_URL}/timeslots?movie.id=${movie_id}&location.city_id=${city}&start_date=${date}&cinema.cinema_name=${cinema}&_sort=hall,start_time:ASC`,
            type: 'GET'
        })
        .then(data => {
            times = [...data]
            $('.seat-plan-wrapper').html('');           
            for (item of times) {
                if(!halls.includes(item.hall.hall_id)){
                    halls = [...halls,item.hall.hall_id];
                }
            }
            let flag = false;
            for (item of halls) {
                if (!flag) {
                    let timeSelectName = $(`
                    <li class="active">
                    <div class="movie-name">
                        <div class="icons">
                            <i class="fa fa-heart"></i>
                        </div>
                        <a href="#0" class="name">${item}</a>
                        <div class="location-icon">
                            <i class="fa fa-map-marker"></i>
                        </div>
                    </div>
                    <div class="movie-schedule" id="${item}-schedule"></div>
                    </li>
                    `)
                    flag = true;
                    $('.seat-plan-wrapper').append(timeSelectName); 
                }else {
                    let timeSelectName = $(`
                    <li>
                    <div class="movie-name">
                        <div class="icons">
                            <i class="fa fa-heart"></i>
                        </div>
                        <a href="#0" class="name">${item}</a>
                        <div class="location-icon">
                            <i class="fa fa-map-marker"></i>
                        </div>
                    </div>
                    <div class="movie-schedule" id="${item}-schedule"></div>
                    </li>
                    `)    
                    $('.seat-plan-wrapper').append(timeSelectName); 
                }
                // let hallId = item;
                $.ajax({
                    url: `${PATH_URL}/timeslots?movie.id=${movie_id}&location.city_id=${city}&start_date=${date}&cinema.cinema_name=${cinema}&hall.hall_id=${item}&_sort=hall,start_time:ASC`,
                    type: 'GET'
                })
                .then(hallData => {
                    // console.log(hallData);
                    for (item of hallData){
                        // console.log(item);
                        // <div class="item" onclick="popupSeat('${item.halls[0].hall_id}','${item.start_time.slice(0,5)}')">${item.start_time.slice(0,5)}
                        let scheduleOption = $(`                               
                            <div class="item" onclick="popupSeat('${item.hall.hall_id}','${item.id}')">${item.start_time.slice(0,5)}
                        </div>                               
                        `);
                        $(`#${item.hall.hall_id}-schedule`).append(scheduleOption);
                    }
                })      
                .catch(() => {
                    alert('Server Error Issue')
                })
            }
            let wrapItem = $('.seat-plan-wrapper').val();
            $('.col-lg-9').append(wrapItem);
        })      
        .catch(() => {
            alert('Server Error Issue')
        })
}

function popupSeat(hallId,scheduleId){ 
    // let full_url = document.URL; // Get current url
    // let movie_id = full_url.substring(full_url.lastIndexOf('/') + 1);
    // let ms = Number(timeId.split(':')[0]) * 60 * 1000 + Number(timeId.split(':')[1]) * 1000;
    // let new_href = `/movie-seat-plan?film=${movie_id}&hall=${hId}&time=${timeId}`;
    let new_href = `/movie-seat-plan?hall=${hallId}&schedule=${scheduleId}`;
    // let new_href = `/movie-seat-plan`;
    $(".seatPlanButton").removeAttr("href");
    $(".seatPlanButton").attr( "href", new_href );
    $('.window-warning').removeClass('inActive');
}