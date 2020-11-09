$(function() {
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
 
    $('#submitContact').click(function(event, req, res){
        event.preventDefault(); 

        let formStatus = $('#submitContact').attr('value');
        if (formStatus === 'continue'){
            var newMember = {
                            'fullname': $('#nameContact').val(),
                            'mobile': $('#phoneContact').val(),
                            'email': $('#emailContact').val(),
                            }
            
            $('#nameMistake').html('');
            $('#emailMistake').html('');
            $('#phoneMistake').html('');
        
            $.ajax({
                url: '/validate-contact',
                headers: {
                    'CSRF-Token': token // <-- is the csrf token as a header
                  },
                type: 'POST',
                data: newMember,
                dataType: 'JSON'
            })
            .then(response => {
                if (response.msg === 'success'){
                    $('#nameContact').prop('readonly', true);
                    $('#nameContact').css('color','#E9D66B');
                    $('#phoneContact').prop('readonly', true);
                    $('#phoneContact').css('color','#E9D66B');
                    $('#emailContact').prop('readonly', true);
                    $('#emailContact').css('color','#E9D66B');
                    $('#submitContact').attr('value','back')
                }
                if (response.msg === 'validation'){  
                    for (let i = 0; i < response.errors.errors.length; i++) {
                        const element = response.errors.errors[i];
                        switch(element.param) {
                            case 'fullname':
                              // code block
                              if (element.msg !== 'Invalid value'){$('#nameMistake').append(element.msg);}
                              else {
                                $('#nameMistake').append('*Fullname is not empty');
                                $('#nameMistake').append('<br/>');
                              }
                              break;
                            case 'email':
                              // code block
                              if (element.msg !== 'Invalid value'){
                                $('#emailMistake').append(element.msg);
                              }
                              else {
                                $('#emailMistake').append('*Email is not empty');
                                $('#emailMistake').append('<br/>');
                              }
                              break;
                            case 'mobile':
                              // code block
                              if (element.msg !== 'Invalid value'){$('#phoneMistake').append(element.msg);}
                              else {
                                $('#phoneMistake').append('*Mobile is not empty');
                                $('#phoneMistake').append('<br/>');
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
        }else {
            $('#nameContact').prop('readonly', false);
            $('#nameContact').removeAttr('style');
            $('#phoneContact').prop('readonly', false);
            $('#phoneContact').removeAttr('style');
            $('#emailContact').prop('readonly', false);
            $('#emailContact').removeAttr('style');
            $('#submitContact').attr('value','continue');
        }        
      });     
});