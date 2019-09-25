$(document).ready(function(){

    $("#submit").on('click', function(){
        var usern = $("#username").val();
        var upw = $("#password").val();
        var data = {
            un: usern,
            upw: upw
        };
        var url = "/api/login";

        $.ajax({
            type: "POST",
            url: url,
            data: data
          }).then(function(res){
            console.log(res);
            window.location.href = './dash.html';
          }).catch(function(err){
              console.log(err);
          });

    });
});