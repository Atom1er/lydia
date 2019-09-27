$(document).ready(function () {
    var isloggedIn = false;
    var groupe = [];
    var task;
    var url = "/api/login-check";
    $.ajax({
        type: "GET",
        url: url
    }).then(function (res) {
        console.log(res.groupe);
        isloggedIn = res.isloggedIn;
        groupe = res.groupe;
        task = res.task;
        if (isloggedIn) {
            console.log("res is " + res.isloggedIn);
            ShowTask(groupe);
        } else {
            window.location.href = './index.html';
        }
    });

    function ShowTask(groupes){
        $.ajax({
            type: "GET",
            url: "/"
        }).then(function (res) {

        });
        var list = "<ul id='groupe-list'>"
        for(var i=0; i < groupes.length ; i++){
            //
            switch(groupes[i]){
                case 'School':
                list += "<li value="+groupes[i]+" class='grp-el' id="+groupes[i].toLowerCase()+"><ion-icon name='school'></ion-icon>"+groupes[i]+"</li>"
                break
                case 'House':
                list += "<li value="+groupes[i]+" class='grp-el' id="+groupes[i].toLowerCase()+"><ion-icon name='home'></ion-icon>"+groupes[i]+"</li>"
                break;
                case 'Legal':
                list += "<li value="+groupes[i]+" class='grp-el' id="+groupes[i].toLowerCase()+"><ion-icon name='bookmarks'></ion-icon>"+groupes[i]+"</li>"
                break;
                case 'Hobbies':
                list += "<li value="+groupes[i]+" class='grp-el' id="+groupes[i].toLowerCase()+"><ion-icon name='wine'></ion-icon>"+groupes[i]+"</li>"
                break;
                case 'None':
                list += "<li value="+groupes[i]+" class='grp-el' id="+groupes[i].toLowerCase()+"><ion-icon name='list-box'></ion-icon>"+groupes[i]+"</li>"
                break;
            }
            
        }
        list += "</ul>";
        $("#groupe").html(list);
    }

    $(document).on('click', '.grp-el', function(){
        document.getElementById("school").classList.remove("selected-groupe");
        document.getElementById("house").classList.remove("selected-groupe");
        document.getElementById("legal").classList.remove("selected-groupe");
        document.getElementById("hobbies").classList.remove("selected-groupe");
        document.getElementById("none").classList.remove("selected-groupe");
        var val = $(this).text();
        switch (val){
            case 'School':
                document.getElementById("school").classList.add("selected-groupe");
                var ul = "<ul id='task-ls'>"
                for(var i=0; i < task.school.length ; i++){
                    ul += "<li value="+task.school[i]+" class='task-el'>"+task.school[i]+"</li>"
                }
                ul += "</ul>"
                $("#task-list").html(ul);
            break;
            case 'House':
                document.getElementById("house").classList.add("selected-groupe");
                var ul = "<ul id='task-ls'>"
                for(var i=0; i < task.house.length ; i++){
                    ul += "<li value="+task.house[i]+" class='task-el'>"+task.house[i]+"</li>"
                }
                ul += "</ul>"
                $("#task-list").html(ul);
            break;
            case 'Legal':
                document.getElementById("legal").classList.add("selected-groupe");
                var ul = "<ul id='task-ls'>"
                for(var i=0; i < task.legal.length ; i++){
                    ul += "<li value="+task.legal[i]+" class='task-el'>"+task.legal[i]+"</li>"
                }
                ul += "</ul>"
                $("#task-list").html(ul);
            break;
            case 'Hobbies':
                document.getElementById("hobbies").classList.add("selected-groupe");
                var ul = "<ul id='task-ls'>"
                for(var i=0; i < task.hobbies.length ; i++){
                    ul += "<li value="+task.hobbies[i]+" class='task-el'>"+task.hobbies[i]+"</li>"
                }
                ul += "</ul>"
                $("#task-list").html(ul);
            break;
            case 'None':
                document.getElementById("none").classList.add("selected-groupe");
                var ul = "<ul id='task-ls'>"
                for(var i=0; i < task.none.length ; i++){
                    ul += "<li value="+task.none[i]+" class='task-el'>"+task.none[i]+"</li>"
                }
                ul += "</ul>"
                $("#task-list").html(ul);
            break;
        }
    })
});