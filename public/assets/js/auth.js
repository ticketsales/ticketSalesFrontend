$(function() {
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
 
    $('#submitSignup').click(function(event, req, res){
        event.preventDefault(); 

            var newMember = {
                            'fullname': $('#fullname1').val(),
                            'mobile': $('#mobile1').val(),
                            'email': $('#email1').val(),
                            'password': $('#pass1').val(),
                            'day': $('#day').val(),
                            'month': $('#month').val()+1,
                            'year': $('#year').val(),
                            'gender': $("input[name='gender']:checked").val(),
                            }
            console.log(newMember);
            $('#nameError').html('');
            $('#emailError').html('');
            $('#phoneError').html('');
            $('#passError').html('');
        
            $.ajax({
                url: '/users/sign-up',
                headers: {
                    'CSRF-Token': token // <-- is the csrf token as a header
                  },
                type: 'POST',
                data: newMember,
                dataType: 'JSON'
            })
            .then(response => {
                if (response.msg === 'success'){
                    $('#fullname1').prop('readonly', true).css('color','#E9D66B');
                    $('#mobile1').prop('readonly', true).css('color','#E9D66B');
                    $('#email1').prop('readonly', true).css('color','#E9D66B');
                    $('#pass1').prop('readonly', true).css('color','#E9D66B');
                }
                if (response.msg === 'validation'){  
                    for (let i = 0; i < response.errors.errors.length; i++) {
                        const element = response.errors.errors[i];
                        switch(element.param) {
                            case 'fullname':
                              // code block
                              if (element.msg !== 'Invalid value'){
                                $('#nameError').append(element.msg);
                              }
                              else {
                                $('#nameError').append('*Fullname is not empty');
                                $('#nameError').append('<br/>');
                              }
                              break;
                            case 'email':
                              // code block
                              if (element.msg !== 'Invalid value'){
                                $('#emailError').append(element.msg);
                              }
                              else {
                                $('#emailError').append('*Email is not empty');
                                $('#emailError').append('<br/>');
                              }
                              break;
                            case 'password':
                              // code block
                              if (element.msg !== 'Invalid value'){
                                $('#passError').append(element.msg);
                              }
                              else {
                                $('#passError').append('*Email is not empty');
                                $('#passError').append('<br/>');
                              }
                              break;
                            case 'mobile':
                              // code block
                              $('#phoneError').append(element.msg);
                              break;
                            default:
                              // code block
                          }
                    }
                }
            })
            .catch(err => {
                alert('Server Error: ' + err);
            });
      });     

      $('#submitSignin').click(function(event, req, res){
            event.preventDefault(); 

            var newMember = {
                            'email': $('#email2').val(),
                            'password': $('#pass2').val(),
                            }
            console.log(newMember);
            $('#emailError2').html('');
            // $('#passError2').html('');
        
            $.ajax({
                url: '/users/sign-in',
                headers: {
                    'CSRF-Token': token // <-- is the csrf token as a header
                  },
                type: 'POST',
                data: newMember,
                dataType: 'JSON'
            })
            .then(response => {
                if (response.msg === 'success'){
                    $('#email2').prop('readonly', true).css('color','#E9D66B');
                    $('#pass2').prop('readonly', true).css('color','#E9D66B');
                    console.log(response.data);
                }
                if (response.msg === 'validation'){  
                    for (let i = 0; i < response.errors.errors.length; i++) {
                        const element = response.errors.errors[i];
                        switch(element.param) {
                            case 'email':
                              // code block
                              if (element.msg !== 'Invalid value'){
                                $('#emailError2').append(element.msg);
                              }
                              else {
                                $('#emailError2').append('*Email is not empty');
                                $('#emailError2').append('<br/>');
                              }
                              break;
                            default:
                              // code block
                          }
                    }
                }
            })
            .catch(err => {
                alert('Server Error: ' + err);
            });
      });  
      
      if (localStorage.chkbox && localStorage.chkbox != '') {
        $('#rememberChkBox').attr('checked', 'checked');
        $('#email2').val(localStorage.username);
        $('#pass2').val(localStorage.pass);
      } else {
        $('#rememberChkBox').removeAttr('checked');
        $('#email2').val('');
        $('#pass2').val('');
      }

      $('#rememberChkBox').click(function () {

        if ($('#rememberChkBox').is(':checked')) {
            // save username and password
            localStorage.username = $('#email2').val();
            localStorage.pass = $('#pass2').val();
            localStorage.chkbox = $('#rememberChkBox').val();
        } else {
            localStorage.username = '';
            localStorage.pass = '';
            localStorage.chkbox = '';
        }
      });
    
      $('#submitPassReset').click(function(event, req, res){
        event.preventDefault(); 

        var newMember = {
                        'email': $('#emailReset').val(),
                        }
        console.log(newMember);
        $('#emailErrorReset').html('');
    
        $.ajax({
            url: '/users/forgot-password',
            headers: {
                'CSRF-Token': token // <-- is the csrf token as a header
              },
            type: 'POST',
            data: newMember,
            dataType: 'JSON'
        })
        .then(response => {
            if (response.msg === 'success'){
                $('#emailReset').prop('readonly', true).css('color','#E9D66B');
                // console.log(response.data);
            }
            if (response.msg === 'validation'){  
                for (let i = 0; i < response.errors.errors.length; i++) {
                    const element = response.errors.errors[i];
                    switch(element.param) {
                        case 'email':
                          // code block
                          if (element.msg !== 'Invalid value'){
                            $('#emailErrorReset').append(element.msg);
                          }
                          else {
                            $('#emailErrorReset').append('*Email is not empty');
                            $('#emailErrorReset').append('<br/>');
                          }
                          break;
                        default:
                          // code block
                      }
                }
            }
        })
        .catch(err => {
            alert('Server Error: ' + err);
        });
      });  

});