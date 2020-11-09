var url = "../assets/js/webenv.js";
$.getScript(url, function(){
$(function() {
    var pageItem = $(".pagination-area a").not("#prev,#next");
    var prev = $("#prev");
    var next = $("#next");  

    pageItem.click(function() {
        pageItem.removeClass("active");
        $(this).not("#prev,#next").addClass("active");
        let new_status = $(this).attr("id");
        let selectItem = $("select.show").children("option:selected").val();
        let selectSort = $("select.sortBy").children("option:selected").val();       
        $.ajax({
            url: `${PATH_URL}/movies?_start=${selectItem*(new_status-1)}&_limit=${selectItem}&tags.tags_contains=${selectSort}`,
            type: 'GET'
        })
        .then(data => {        
            listLoad(data);  
        })
        .catch(() => {
            alert('Server Error Issue')
        })
    });
  
    next.click(function() {
        pre_next = $('.pagination-area a.active').next().attr("id");
        if (pre_next !== "next"){
            $('.pagination-area a.active').not("#next").removeClass('active').next().addClass('active');
            let new_status = $('.pagination-area a.active').attr('id');
            // alert("Text: " + new_status);
            let selectItem = $("select.show").children("option:selected").val();
            let selectSort = $("select.sortBy").children("option:selected").val();
            $.ajax({
                url: `${PATH_URL}/movies?_start=${selectItem*(new_status-1)}&_limit=${selectItem}&tags.tags_contains=${selectSort}`,
                type: 'GET'
            })
            .then(data => {        
                listLoad(data);  
            })
            .catch(() => {
                alert('Server Error Issue')
            })
        }        
    });
  
    prev.click(function() {
        pre_prev = $('.pagination-area a.active').prev().attr("id");
        if (pre_prev !== "prev"){
            $('.pagination-area a.active').removeClass('active').prev().addClass('active');   
            let new_status = $('.pagination-area a.active').attr('id');
            // alert("Text: " + new_status);        
            let selectItem = $("select.show").children("option:selected").val();
            let selectSort = $("select.sortBy").children("option:selected").val();
            $.ajax({
                url: `${PATH_URL}/movies?_start=${selectItem*(new_status-1)}&_limit=${selectItem}&tags.tags_contains=${selectSort}`,
                type: 'GET'
            })
            .then(data => {        
                listLoad(data);  
            })
            .catch(() => {
                alert('Server Error Issue')
            })
        }        
    });

    $("select.show").change(function(){
        $('#inputSearch').val('');
        listEvent();
    });

    $("select.sortBy").change(function(){
        $('#inputSearch').val('');
        listEvent();
    });  

    city = $("select.city");
    city.change(function() {    
        var cityValue = $("select.city").children("option:selected").val();           
        $('.cinema').html('');  
        $.ajax({
            url: `${PATH_URL}/cinemas?location.city_id_contains=${cityValue}`,
            type: 'GET'
        })
        .then(data => {     
            for (item of data) {
                let cinemaList = $(` 
                    <option value="${item.cinema_name}">${item.cinema_name}</option>
                `);      
                $('.cinema').append(cinemaList);                                    
            }     
             $('.cinema').niceSelect(); 
             $('div[style*="display: none"]').remove();
             $('.cinema span').remove(); 
             $('.cinema').prepend($(`<span class="current">${data[0].cinema_name}</span>`));                      
        })
        .catch(() => {
            alert('Server Error Issue')
        })   
    });
  });
});

(function(){
    var mouseupTimer;

    $(".clear-check").click(function(){
        clearTimeout(mouseupTimer);
        $("input:checkbox").prop("checked", false);
        $(".clear-check").off('click');
        mouseupTimer = setTimeout(listEvent(),800);
    });  
    $(".movieLang").change(function(){   
        clearTimeout(mouseupTimer); 
        $(".movieLang").off('click');           
        mouseupTimer = setTimeout(listEvent(),800);   
    })
    $(".movieExp").change(function(){   
        clearTimeout(mouseupTimer);            
        mouseupTimer = setTimeout(listEvent(),800);      
    })
    $(".movieGenre").change(function(){   
        clearTimeout(mouseupTimer);            
        mouseupTimer = setTimeout(listEvent(),800);      
   
    })          

    $(".check-box-item-genre").hide();
    $(".check-box-plus-genre").click(function(){
        $(".check-box-plus-genre").hide();
        $(".check-box-minus-genre").show();
        $(".check-box-item-genre").show(700);
    })
    $(".check-box-minus-genre").click(function(){
        $(".check-box-plus-genre").show();
        $(".check-box-minus-genre").hide();
        $(".check-box-item-genre").hide(700);
    })

    $(".check-box-item-exp").hide();
    $(".check-box-plus-exp").click(function(){
        $(".check-box-plus-exp").hide();
        $(".check-box-minus-exp").show();
        $(".check-box-item-exp").show(700);
    })
    $(".check-box-minus-exp").click(function(){
        $(".check-box-plus-exp").show();
        $(".check-box-minus-exp").hide();
        $(".check-box-item-exp").hide(700);
    })
})(jQuery);

(function(){
    var filteredData;
    var searchMovies;
    var searchTimer;
    $('#inputSearch').on('keyup', function(e) {
        clearTimeout(searchTimer);
        var userInput = e.target.value;
        if (userInput) {
            searchTimer = setTimeout(function(){
                var cityValue = $("select.city").children("option:selected").val();      
                var cinemaValue = $("select.cinema").children("option:selected").val();      
                var dateValue = $("select.date").children("option:selected").val(); 
                $.ajax({
                    url: `${PATH_URL}/timeslots?locations.city_id_contains=${cityValue}&cinemas.cinema_name_contains=${cinemaValue}&start_date_contains=${dateValue}`,
                    type: 'GET'
                })
                .then(data => {   
                    if (data === [] || data.length == 0) {
                        searchMovies = []; 
                        filteredData =[];                        
                    }  else{
                        searchMovies = [...data['0'].movies];
                        filteredData = searchMovies.filter(function(applicant) {
                            return applicant.movie_name.toLowerCase().includes(userInput.toLowerCase());
                        });
                    }
                    let pages = Math.ceil(filteredData.length/12);       
                    if (pages > 0) {
                        searchLoad(filteredData);
                        paginationLoad(pages); 
                    }else {
                        $('.pagination-area').html(''); 
                        $('#grid-ajax').html('');   
                        $('#list-ajax').html('');
                        $('#grid-ajax').append(`<br/><br/><h5>SORRY...This movie hasn't sorted schedule yet</h5>`);
                        $('#list-ajax').append(`<br/><br/><h5>SORRY...This movie hasn't sorted schedule yet</h5>`);
                    }
                })
                .catch(() => {
                    searchMovies = []; 
                })
            },2000);
        }
    });    
    $("#btnSearch").keydown(function(e){
        if(e.which === 13){
            $("#btnSearch").click();
        }
    });
    $('#btnSearch').click(function(e) {
            e.preventDefault();
            var userInput = $('#inputSearch').val();
            if (userInput) {
                    var cityValue = $("select.city").children("option:selected").val();      
                    var cinemaValue = $("select.cinema").children("option:selected").val();      
                    var dateValue = $("select.date").children("option:selected").val(); 
                    $.ajax({
                        url: `${PATH_URL}/timeslots?locations.city_id_contains=${cityValue}&cinemas.cinema_name_contains=${cinemaValue}&start_date_contains=${dateValue}`,
                        type: 'GET'
                    })
                    .then(data => {   
                        if (data === [] || data.length == 0) {
                            searchMovies = []; 
                            filteredData =[];                        
                        }  else{
                            searchMovies = [...data['0'].movies];
                            filteredData = searchMovies.filter(function(applicant) {
                                return applicant.movie_name.toLowerCase().includes(userInput.toLowerCase());
                            });
                        }
                        let pages = Math.ceil(filteredData.length/12);
                        if (pages > 0) {
                            searchLoad(filteredData);
                            paginationLoad(pages); 
                        }else {
                            $('.pagination-area').html('');
                            $('#grid-ajax').html('');   
                            $('#list-ajax').html('');
                            $('#grid-ajax').append(`<br/><br/><h5>SORRY...This movie hasn't sorted schedule yet</h5>`);
                            $('#list-ajax').append(`<br/><br/><h5>SORRY...This movie hasn't sorted schedule yet</h5>`);
                        }
                        
                    })
                    .catch(() => {
                        searchMovies = []; 
                    })
            }
    });
})(jQuery)


function paginationLoad(pagination){
    let current_page = 1;
    $('.pagination-area').html('');  
        for (i=0; i<pagination; i++){
            let paginationList2 = $(`
                <a href="#0" ${(current_page === i+1)?`class="active"`:''} id="${i+1}">${i+1}</a>
            `);
            $('.pagination-area').append(paginationList2);   
        }            
    let paginationList = $(`
        <a href="#0" id="prev">
            <i class="fas fa-angle-double-left"></i>
            <span>Prev</span>
        </a>`);  
    $('.pagination-area').prepend(paginationList);
    let paginationList3 = $(`                    
        <a href="#0" id="next">
            <span>Next</span>
            <i class="fas fa-angle-double-right"></i>
        </a>`);
    $('.pagination-area').append(paginationList3);    
}

function listLoad(movies){
    $('#grid-ajax').html('');     
    for (item of movies) {
        let gridList = $(`
            <div class="col-sm-6 col-lg-4">                                            
                <div class="movie-grid">
                    <div class="movie-thumb c-thumb">
                        <a href="movie-details/${item.id}">                                                       
                            <img src="${PATH_URL + item.movie_thumnail.url}" alt="movie">
                        </a>                                                                                                         
                    </div>
                    <div class="movie-content bg-one">
                        <h5 class="title m-0">
                            <a href="movie-details/${item.id}">${item.movie_name}</a>
                        </h5>
                        <ul class="movie-rating-percent">
                            <li>
                                <div class="thumb">
                                    <img src="../assets/images/movie/tomato.png" alt="movie">
                                </div>
                                <span class="content">${item.tomatometer}%</span>
                            </li>
                            <li>
                                <div class="thumb">
                                    <img src="../assets/images/movie/cake.png" alt="movie">
                                </div>
                                <span class="content">${item.audience_score}%</span>
                            </li>
                        </ul>
                    </div>
                </div>                                            
            </div>
        `);
        $('#grid-ajax').append(gridList);
    } 
    $('#list-ajax').html(''); 
    for (item of movies) {
        let listList = $(`  
            <div class="movie-list">
                <div class="movie-thumb c-thumb">
                    <a href="movie-details/${item.id}" class="w-100 bg_img h-100" data-background= "${PATH_URL + item.movie_thumnail.url}">
                        <img src="${PATH_URL + item.movie_thumnail.url}" alt="movie">
                    </a>                                                
                </div>
                <div class="movie-content bg-one">
                    <h5 class="title">
                        <a href="movie-details/${item.id}">${item.movie_name}</a>
                    </h5>
                    <p class="duration">${(item.movie_duration).substring(1,2)}hrs ${(item.movie_duration).substring(3,5)}min</p>
                    <div class="movie-tags" id="${item._id}">                      
                    </div>
                    <div class="release">
                        <span>Release Date : </span> 
                         ${ (!item.timeslots || !item.timeslots.length)?`<a href="#0">Not opening yet</a>`:`<a href="#0">${(item.timeslots[0].start_date).split("-").reverse().join("-")}</a>` }                        
                    </div>
                    <ul class="movie-rating-percent">
                        <li>
                            <div class="thumb">
                                <img src="../assets/images/movie/tomato.png" alt="movie">
                            </div>
                            <span class="content">${item.tomatometer}%</span>
                        </li>
                        <li>
                            <div class="thumb">
                                <img src="../assets/images/movie/cake.png" alt="movie">
                            </div>
                            <span class="content">${item.audience_score}%</span>
                        </li>
                    </ul>
                    <div class="book-area">
                        <div class="book-ticket">
                            <div class="react-item">
                                <a href="#0">
                                    <div class="thumb">
                                        <img src="../assets/images/icons/heart.png" alt="icons">
                                    </div>
                                </a>
                            </div>
                            <div class="react-item mr-auto">
                                <a href="/movie-ticket-plan/${item.id}">
                                    <div class="thumb">
                                        <img src="../assets/images/icons/book.png" alt="icons">
                                    </div>
                                    <span>book ticket</span>
                                </a>
                            </div>
                            <div class="react-item">
                                <a href="${item.movie_trailer}" class="video-popup">
                                    <div class="thumb">
                                        <img src="../assets/images/icons/play-button.png" alt="icons">
                                    </div>
                                    <span>watch trailer</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        `);
        $('#list-ajax').append(listList);
        let genrestt = false;
        $(`#${item._id}`).html('');
        for(genre of item.genres){       
            let genreID = $(`<a href="#0">${genre.name}</a>`);
            $(`#${item._id}`).append(genreID);
            if (genreID) genrestt = true;
            genreID = '';
        }          
        if (!genrestt){     
        $(`#${item._id}`).append(`<a href="#0">adventure</a>`);
        $(`#${item._id}`).append(`<a href="#0">fantasy</a>`);    
        }                
        $('.video-popup').magnificPopup({
            type: 'iframe',
        });
    }                 
}     

function listEvent(){       
    let selectItem = $("select.show").children("option:selected").val();
    // alert("You have selected the items : " + selectItem);
    let selectSort = $("select.sortBy").children("option:selected").val();
    let langQuery = '';       
        $.each($("input[name='lang']:checked"), function(){ 
            let language = '&movie_language_contains='+$(this).attr("id");
            langQuery = langQuery + language;
        });
    let experQuery = '';       
        $.each($("input[name='mode']:checked"), function(){ 
            let exper = '&experiences.name_contains='+$(this).attr("id");
            experQuery = experQuery + exper;
        });
    let genreQuery = '';       
        $.each($("input[name='genre']:checked"), function(){ 
            let genre = '&genres.name_contains='+$(this).attr("id");
            genreQuery = genreQuery + genre;
        });
    $.ajax({
        url: `${PATH_URL}/movies?_limit=${selectItem}&tags.tags_contains=${selectSort}${langQuery}${experQuery}${genreQuery}`,
        type: 'GET'
    })
    .then(data => {        
        listLoad(data);  
        $.ajax({
            url: `${PATH_URL}/movies/count?tags.tags_contains=${selectSort}${langQuery}${experQuery}${genreQuery}`,
            type: 'GET'
        })
        .then(data => {
            let pages = Math.ceil(data/selectItem);       
            paginationLoad(pages);  
            let pageItem = $(".pagination-area a").not("#prev,#next");
            var prev = $("#prev");
            var next = $("#next");
            pageItem.click(function() {
                pageItem.removeClass("active");
                $(this).not("#prev,#next").addClass("active");
                let new_status = $(this).attr("id");
                let selectItem = $("select.show").children("option:selected").val();
                let selectSort = $("select.sortBy").children("option:selected").val();
                $.ajax({
                    url: `${PATH_URL}/movies?_start=${selectItem*(new_status-1)}&_limit=${selectItem}&tags.tags_contains=${selectSort}${langQuery}${experQuery}${genreQuery}`,
                    type: 'GET'
                })
                .then(data => {        
                    listLoad(data);  
                })
                .catch(() => {
                    alert('Server Error Issue')
                })
            });    
            next.click(function() {
                pre_next = $('.pagination-area a.active').next().attr("id");
                if (pre_next !== "next"){
                    $('.pagination-area a.active').not("#next").removeClass('active').next().addClass('active');
                    let new_status = $('.pagination-area a.active').attr('id');
                    // alert("Text: " + new_status);
                    let selectItem = $("select.show").children("option:selected").val();
                    let selectSort = $("select.sortBy").children("option:selected").val();
                    $.ajax({
                        url: `${PATH_URL}/movies?_start=${selectItem*(new_status-1)}&_limit=${selectItem}&tags.tags_contains=${selectSort}${langQuery}${experQuery}${genreQuery}`,
                        type: 'GET'
                    })
                    .then(data => {        
                        listLoad(data);  
                    })
                    .catch(() => {
                        alert('Server Error Issue')
                    })
                }        
            });
            prev.click(function() {
                pre_prev = $('.pagination-area a.active').prev().attr("id");
                if (pre_prev !== "prev"){
                    $('.pagination-area a.active').removeClass('active').prev().addClass('active');   
                    let new_status = $('.pagination-area a.active').attr('id');
                    // alert("Text: " + new_status);        
                    let selectItem = $("select.show").children("option:selected").val();
                    let selectSort = $("select.sortBy").children("option:selected").val();
                    $.ajax({
                        url: `${PATH_URL}/movies?_start=${selectItem*(new_status-1)}&_limit=${selectItem}&tags.tags_contains=${selectSort}${langQuery}${experQuery}${genreQuery}`,
                        type: 'GET'
                    })
                    .then(data => {        
                        listLoad(data);  
                    })
                    .catch(() => {
                        alert('Server Error Issue')
                    })
                };        
            });
        })      
        .catch(() => {
            alert('Server Error Issue')
        })        
    })
    .catch(() => {
        alert('Server Error Issue')
    })
}

function searchLoad(movies){
    $('#grid-ajax').html('');     
    for (item of movies) {
        let gridList = $(`
            <div class="col-sm-6 col-lg-4">                                            
                <div class="movie-grid">
                    <div class="movie-thumb c-thumb">
                        <a href="movie-details/${item.id}">                                                       
                            <img src="${PATH_URL + item.movie_thumnail.url}" alt="movie">
                        </a>                                                                                                         
                    </div>
                    <div class="movie-content bg-one">
                        <h5 class="title m-0">
                            <a href="movie-details/${item.id}">${item.movie_name}</a>
                        </h5>
                        <ul class="movie-rating-percent">
                            <li>
                                <div class="thumb">
                                    <img src="../assets/images/movie/tomato.png" alt="movie">
                                </div>
                                <span class="content">${item.tomatometer}%</span>
                            </li>
                            <li>
                                <div class="thumb">
                                    <img src="../assets/images/movie/cake.png" alt="movie">
                                </div>
                                <span class="content">${item.audience_score}%</span>
                            </li>
                        </ul>
                    </div>
                </div>                                            
            </div>
        `);
        $('#grid-ajax').append(gridList);
    } 
    $('#list-ajax').html(''); 
    for (item of movies) {
        let listList = $(`  
            <div class="movie-list">
                <div class="movie-thumb c-thumb">
                    <a href="movie-details/${item.id}" class="w-100 bg_img h-100" data-background= "${PATH_URL + item.movie_thumnail.url}">
                        <img src="${PATH_URL + item.movie_thumnail.url}" alt="movie">
                    </a>                                                
                </div>
                <div class="movie-content bg-one">
                    <h5 class="title">
                        <a href="movie-details/${item.id}">${item.movie_name}</a>
                    </h5>
                    <p class="duration">${(item.movie_duration).substring(1,2)}hrs ${(item.movie_duration).substring(3,5)}min</p>
                    <div class="movie-tags" id="${item._id}">                      
                    </div>
                    <div class="release">
                        <span>Release Date : </span> 
                         ${ (!item.timeslots || !item.timeslots.length)?`<a href="#0">Not opening yet</a>`:`<a href="#0">${(item.timeslots[0].start_date).split("-").reverse().join("-")}</a>` }                        
                    </div>
                    <ul class="movie-rating-percent">
                        <li>
                            <div class="thumb">
                                <img src="../assets/images/movie/tomato.png" alt="movie">
                            </div>
                            <span class="content">${item.tomatometer}%</span>
                        </li>
                        <li>
                            <div class="thumb">
                                <img src="../assets/images/movie/cake.png" alt="movie">
                            </div>
                            <span class="content">${item.audience_score}%</span>
                        </li>
                    </ul>
                    <div class="book-area">
                        <div class="book-ticket">
                            <div class="react-item">
                                <a href="#0">
                                    <div class="thumb">
                                        <img src="../assets/images/icons/heart.png" alt="icons">
                                    </div>
                                </a>
                            </div>
                            <div class="react-item mr-auto">
                                <a href="/movie-ticket-plan">
                                    <div class="thumb">
                                        <img src="../assets/images/icons/book.png" alt="icons">
                                    </div>
                                    <span>book ticket</span>
                                </a>
                            </div>
                            <div class="react-item">
                                <a href="${item.movie_trailer}" class="video-popup">
                                    <div class="thumb">
                                        <img src="../assets/images/icons/play-button.png" alt="icons">
                                    </div>
                                    <span>watch trailer</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        `);
        $('#list-ajax').append(listList);
        // let genrestt = false;
        // $(`#${item._id}`).html('');
        // for(genre of item.genres){       
        //     let genreID = $(`<a href="#0">${genre.name}</a>`);
        //     $(`#${item._id}`).append(genreID);
        //     if (genreID) genrestt = true;
        //     genreID = '';
        // }          
        // if (!genrestt){     
        $(`#${item._id}`).append(`<a href="#0">adventure</a>`);
        $(`#${item._id}`).append(`<a href="#0">fantasy</a>`);    
        // }                
        $('.video-popup').magnificPopup({
            type: 'iframe',
        });
    }                 
}     
