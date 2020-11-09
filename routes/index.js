var express = require('express');
const { body, validationResult } = require('express-validator');
const axios = require('axios').default;
var csrf = require('csurf');
// setup route middlewares
var csrfProtection = csrf();
// protect XSRF
// app.use(csrfProtection);
var router = express.Router();

/* GET home page. */
router.get('/', csrfProtection, function(req, res, next) {     
  axios.all([
    axios.get(`${process.env.API_URL}/top-left-menu`),
    axios.get(`${process.env.API_URL}/footer-menu`)
  ])
    .then(axios.spread((resp1, resp2) => {
     header = resp1.data.body;
     footer = resp2.data.footer;
     res.render('index', {
      title: 'Monster Nodemy Ticket Sale System Online',
      status: 0,
      header,
      footer,
      csrfToken: req.csrfToken()
     });
    }))
    .catch((error) => {
     next(error);
    }); 
});
/* GET movie-grid page. */
router.get('/movie-grid', csrfProtection, function(req, res, next) {
  axios.all([
    axios.get(`${process.env.API_URL}/top-left-menu`),
    axios.get(`${process.env.API_URL}/footer-menu`),
    axios.get(`${process.env.API_URL}/movies?_limit=12&tags.tags_contains=showing`),
    axios.get(`${process.env.API_URL}/movies/count?tags.tags_contains=showing`),
    axios.get(`${process.env.API_URL}/locations`),
    axios.get(`${process.env.API_URL}/cinemas?location.city_id_contains=hanoi`),
  ])
    .then(axios.spread((resp1, resp2, resp3, resp4, resp5, resp6) => {    
      var d = new Date();
      var month = d.getMonth()+1;
          month = ((''+month).length<2 ? '0' : '') + month;
      var day = d.getDate();
          day = ((''+day).length<2 ? '0' : '') + day;
      var year = d.getFullYear();      
      header = resp1.data.body;
      footer = resp2.data.footer; 
      movies = resp3.data;
      pages  = resp4.data / 12;  
      locations = resp5.data;
      cinemas = resp6.data;      
      res.render('movie-grid', {
        title: 'Monster Nodemy Ticket Sale System Online',
        status: 1,
        header,
        footer,
        movies,
        pages,    
        locations,
        cinemas,
        day, month, year,
        current_page: 1,
        dns: process.env.API_URL,
        csrfToken: req.csrfToken()
     });
    }))
    .catch((error) => {
     next(error);
    });   
});
/* GET home page. */
router.get('/movie-details/:id', csrfProtection, function(req, res, next) {
  let movie_id = req.params.id;
  axios.all([
    axios.get(`${process.env.API_URL}/top-left-menu`),
    axios.get(`${process.env.API_URL}/footer-menu`),
    axios.get(`${process.env.API_URL}/movies/${movie_id}`)
  ])
    .then(axios.spread((resp1, resp2, resp3) => {
     header = resp1.data.body;
     footer = resp2.data.footer;   
     movie  = resp3.data;
     res.render('movie-details', {
      title: 'Monster Nodemy Ticket Sale System Online',
      status: 1,
      header,
      footer,
      movie,
      dns: process.env.API_URL,
      csrfToken: req.csrfToken()
     });
    }))
    .catch((error) => {
     next(error);
    });   
});
/* GET home page. */
router.get('/hall-area/:id', csrfProtection, function(req, res, next) {
  let movie_id = req.params.id;
  axios.all([
    axios.get(`${process.env.API_URL}/top-left-menu`),
    axios.get(`${process.env.API_URL}/footer-menu`),
    axios.get(`${process.env.API_URL}/movies/${movie_id}`),
  ])
    .then(axios.spread((resp1, resp2, resp3) => {
     let header = resp1.data.body;
     let footer = resp2.data.footer;   
     let movie  = resp3.data;
     res.render('hall-area', {
      title: 'Monster Nodemy Ticket Sale System Online',
      status: 1,
      header,
      footer, 
      movie,
      csrfToken: req.csrfToken()
     })
    }))
    .catch((error) => {
     next(error);
    });   
});
/* GET home page. */
router.get('/movie-seat-plan', csrfProtection, function(req, res, next) {
  // let selected_movie = req.query.film;
  let selected_hall = req.query.hall;
  let selected_schedule = req.query.schedule;
  // let selected_time = msToTime(time);
  axios.all([
    axios.get(`${process.env.API_URL}/top-left-menu`),
    axios.get(`${process.env.API_URL}/footer-menu`),
    axios.get(`${process.env.API_URL}/timeslots/${selected_schedule}`),
    axios.get(`${process.env.API_URL}/seats?timeslot.id=${selected_schedule}`),
    // axios.get(`${process.env.API_URL}/seats?movies.id=${selected_movie}&locations.city_id=hanoi&cinemas.cinema_name=cgv%20vincom%20bà%20triệu&halls.hall_id=${selected_hall}&timeslots.start_time=19:30:00.000`)
  ])
    .then(axios.spread((resp1, resp2, resp3, resp4) => {
     header = resp1.data.body;
     footer = resp2.data.footer;   
     timeSlot = resp3.data;
     seats = resp4.data;
    //  console.log(seats);
     let seatStatus = [];
     let seatPrice = [];
     for (item of seats) {
      if(!seatStatus.includes(item.seat_number)){
          seatStatus = [...seatStatus,item.seat_number];
          seatPrice = [...seatPrice,item.seat_price];
      }
     }
    //  console.log(seatStatus);
     dateSchedule = String(new Date(`${timeSlot.start_date}`));
     dateSchedule = dateSchedule.slice(0,15).toUpperCase();
     dateSchedule = `${dateSchedule.slice(0,3)},${dateSchedule.slice(3)}`;
     res.render(`movie-seat-plan-${selected_hall}`,{
      title: 'Monster Nodemy Ticket Sale System Online',
      status: 1,
      header,
      footer,
      timeSlot,
      seatStatus,
      seatPrice,
      dateSchedule,
      csrfToken: req.csrfToken()
     });
    }))
    .catch((error) => {
     next(error);
    });   
});
/* GET home page. */
router.get('/movie-checkout', csrfProtection, function(req, res, next) {
  axios.all([
    axios.get(`${process.env.API_URL}/top-left-menu`),
    axios.get(`${process.env.API_URL}/footer-menu`)
  ])
    .then(axios.spread((resp1, resp2) => {
     header = resp1.data.body;
     footer = resp2.data.footer;   
     res.render('movie-checkout', {
      title: 'Monster Nodemy Ticket Sale System Online',
      status: 1,
      header,
      footer,
      csrfToken: req.csrfToken()
     });
    }))
    .catch((error) => {
     next(error);
    });   
});
/* GET home page. */
router.get('/popcorn', csrfProtection, function(req, res, next) {
  let selected_tickets = req.query.tickets;
  let tickets = selected_tickets.split(",")
  let amount = req.query.amount;
  let selected_schedule = req.query.schedule;
  axios.all([
    axios.get(`${process.env.API_URL}/top-left-menu`),
    axios.get(`${process.env.API_URL}/footer-menu`),
    axios.get(`${process.env.API_URL}/timeslots/${selected_schedule}`),
    axios.get(`${process.env.API_URL}/foods`),
  ])
    .then(axios.spread((resp1, resp2, resp3, resp4) => {
     header = resp1.data.body;
     footer = resp2.data.footer;   
     timeSlot = resp3.data;
     fastFood = resp4.data;
     console.log(fastFood[0].snacks[0].type);
     dateSchedule = String(new Date(`${timeSlot.start_date}`));
     dateSchedule = dateSchedule.slice(0,15).toUpperCase();
     dateSchedule = `${dateSchedule.slice(0,3)},${dateSchedule.slice(3)}`;
     res.render('popcorn', {
      title: 'Monster Nodemy Ticket Sale System Online',
      status: 1,
      header,
      footer,
      timeSlot,
      fastFood,
      dateSchedule,
      tickets,
      amount,
      dns: process.env.API_URL,
      csrfToken: req.csrfToken()
     });
    }))
    .catch((error) => {
     next(error);
    });   
});
/* POST validate contact form */
router.post(
  '/validate-contact',
  [
    body('fullname')
      .trim()
      .not().isEmpty()
      .escape()
      .isLength({ min: 5 })
      .withMessage('*Fullname must be at least 5 chars long'),
    body('email')
      .trim()  
      .not().isEmpty()
      .escape()
      .isEmail()
      .normalizeEmail()
      .withMessage('*Email must be right format'),
    body('mobile')
      .trim()
      .not().isEmpty()
      .escape()
      .matches(/^[0-9]{10}$/)
      .withMessage('*Please put 10 digit mobile number')
  ],function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.json({ 
        errors,
        msg: 'validation'
       });
    }
    else{
      return res.json({ 
        msg: 'success' 
      });
    }
  });

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

module.exports = router;
