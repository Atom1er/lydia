$(document).ready(function(){

    $("#submit").on('click', function(event){
        event.preventDefault();
        var usern = $("#username").val();
        var upw = $("#password").val();
        var data = {
            un: usern,
            upw: upw
        };
        console.log("data: ",data)
        var url = "/api/login";

        $.ajax({
            type: "POST",
            url: url,
            data: data
          }).then(function(res){
            console.log(res);
            if(res){
                window.location.href = './dash.html';
            } else{
                alert('Wrong User name or Passport. Please try again!');
                $("#password").val('');
            }

          }).catch(function(err){
              console.log(err);
          });

    });
});