$(document).ready(function () {
    var isloggedIn = false;
    var groupe = [];
    var task;
    var uc = {};
    var selectedTask;

    var url = "/api/login-check";
    $.ajax({
        type: "GET",
        url: url
    }).then(function (res) {
        isloggedIn = res.isloggedIn;
        if (isloggedIn) {
            groupe = res.groupe;
            task = res.data.tasks;
            uc.n = res.data.username;
            uc.pw = res.data.pw;
            sessionStorage.setItem('n', uc.n);
            sessionStorage.setItem('pw', uc.pw);
            ShowTask(groupe);
        }
    });

    if (!isloggedIn) {
        uc.n = sessionStorage.getItem('n');
        uc.pw = sessionStorage.getItem('pw');
        var data = {
            un: uc.n,
            upw: uc.pw
        }
        console.log(uc);
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: data
        }).then(function (res) {
            isloggedIn = res;
            if (!isloggedIn) {
                window.location.href = './index.html';
            }
        });
    }



    var school = [];
    var house = [];
    var legal = [];
    var hobbies = [];
    var general = [];
    var taskGroupe = {};

    function ShowTask(groupes) {
        task.forEach(t => {
            switch (t.groupe) {
                case 'School':
                    school.push(t);
                    break
                case 'House':
                    house.push(t);
                    break
                case 'Legal':
                    legal.push(t);
                    break
                case 'Hobbies':
                    hobbies.push(t);
                    break
                case 'General':
                    general.push(t);
                    break
                default:
                    general.push(t);
                    break
            }
        });

        taskGroupe = {
            school: school,
            house: house,
            legal: legal,
            hobbies: hobbies,
            general: general
        };

        console.log("taskGroupe: ", taskGroupe);
        var list = "<ul id='groupe-list'>"
        for (var i = 0; i < groupes.length; i++) {
            //
            switch (groupes[i]) {
                case 'School':
                    list += "<li value=" + groupes[i] + " class='grp-el' id=" + groupes[i].toLowerCase() + "><ion-icon name='school'></ion-icon>" + groupes[i] + "</li>"
                    break
                case 'House':
                    list += "<li value=" + groupes[i] + " class='grp-el' id=" + groupes[i].toLowerCase() + "><ion-icon name='home'></ion-icon>" + groupes[i] + "</li>"
                    break;
                case 'Legal':
                    list += "<li value=" + groupes[i] + " class='grp-el' id=" + groupes[i].toLowerCase() + "><ion-icon name='bookmarks'></ion-icon>" + groupes[i] + "</li>"
                    break;
                case 'Hobbies':
                    list += "<li value=" + groupes[i] + " class='grp-el' id=" + groupes[i].toLowerCase() + "><ion-icon name='wine'></ion-icon>" + groupes[i] + "</li>"
                    break;
                case 'General':
                    list += "<li value=" + groupes[i] + " class='grp-el' id=" + groupes[i].toLowerCase() + "><ion-icon name='list-box'></ion-icon>" + groupes[i] + "</li>"
                    break;
            }

        }
        list += "</ul>";
        $("#groupe").html(list);
    }

    $("#log-out").on('click', function () {
        var url = "/api/logout";
        $.ajax({
            type: "GET",
            url: url
        }).then(function (res) {
            if (res == true) {
                window.location.href = "./index.html"
            }
            console.log(res);
        })
    });

    $("#create-task").on('click', function () {
        console.log("clicked");
    });

    $('#save-ed-task').on('click', function () {
        var n_task = {};
        n_task.taskTitle = $("#ed-title").val();
        n_task.groupe = $("#ed-groupe").val();
        n_task.assignedTo = $("#ed-assigned-to").val();
        n_task.dueDate = $("#ed-due-date").val() + "T00:00:00.000Z";
        n_task.dateOfCreation = new Date().toISOString();
        n_task.creator = uc.n;
        n_task.state = "To Do";
        n_task.taskBody = $("#ed-body").val();
        n_task.priority = "Medium";

        if ($("#ed-high")[0].checked) {
            n_task.priority = "High";
        } else if ($("#ed-low")[0].checked) {
            n_task.priority = "Low";
        }
        if (n_task.assignedTo == "") {
            n_task.assignedTo = uc.n;
        }
        n_task.uc = uc;

        console.log(n_task);
        var url = "/api/new-task";
        $.ajax({
            type: "POST",
            url: url,
            data: n_task
        }).then(function (res) {
            if (res == true) {
                window.location.href = "./index.html"
            }
            console.log(res);
        })

    });

    $('#save-n-task').on('click', function () {
        var n_task = {};
        n_task.taskTitle = $("#n-title").val();
        n_task.groupe = $("#n-groupe").val();
        n_task.assignedTo = $("#n-assigned-to").val();
        n_task.dueDate = $("#n-due-date").val() + "T00:00:00.000Z";
        n_task.dateOfCreation = new Date().toISOString();
        n_task.creator = uc.n;
        n_task.state = "To Do";
        n_task.taskBody = $("#n-body").val();
        n_task.priority = "Medium";

        if ($("#n-high")[0].checked) {
            n_task.priority = "High";
        } else if ($("#n-low")[0].checked) {
            n_task.priority = "Low";
        }
        if (n_task.assignedTo == "") {
            n_task.assignedTo = uc.n;
        }
        n_task.uc = uc;

        console.log(n_task);
        var url = "/api/new-task";
        $.ajax({
            type: "POST",
            url: url,
            data: n_task
        }).then(function (res) {
            if (res == true) {
                $("#createTaskModal").modal('hide');
            }
        })

    });

    $(document).on('click', '.grp-el', function () {
        document.getElementById("school").classList.remove("selected-groupe");
        document.getElementById("house").classList.remove("selected-groupe");
        document.getElementById("legal").classList.remove("selected-groupe");
        document.getElementById("hobbies").classList.remove("selected-groupe");
        document.getElementById("general").classList.remove("selected-groupe");
        var val = $(this).text();
        switch (val) {
            case 'School':
                document.getElementById("school").classList.add("selected-groupe");
                var ul = "<ul id='task-ls'>"
                if (taskGroupe.school.length > 0) {
                    for (var i = 0; i < taskGroupe.school.length; i++) {
                        ul += "<li value='School-" + i + "' class='task-el'>" + taskGroupe.school[i].taskTitle + "</li>"
                    }
                } else {
                    ul += "<li value='School-none' class='null'>No task for this Groupe!</li>"
                }

                ul += "</ul>"
                $("#task-list").html(ul);
                break;
            case 'House':
                document.getElementById("house").classList.add("selected-groupe");
                var ul = "<ul id='task-ls'>"
                if (taskGroupe.house.length > 0) {
                    for (var i = 0; i < taskGroupe.house.length; i++) {
                        ul += "<li value='House-" + i + "' class='task-el'>" + taskGroupe.house[i].taskTitle + "</li>"
                    }
                } else {
                    ul += "<li value='School-none' class='null'>No task for this Groupe!</li>"
                }

                ul += "</ul>"
                $("#task-list").html(ul);
                break;
            case 'Legal':
                document.getElementById("legal").classList.add("selected-groupe");
                var ul = "<ul id='task-ls'>"
                if (taskGroupe.legal.length > 0) {
                    for (var i = 0; i < taskGroupe.legal.length; i++) {
                        ul += "<li value='Legal-" + i + "' class='task-el'>" + taskGroupe.legal[i].taskTitle + "</li>"
                    }
                } else {
                    ul += "<li value='School-none' class='null'>No task for this Groupe!</li>"
                }

                ul += "</ul>"
                $("#task-list").html(ul);
                break;
            case 'Hobbies':
                document.getElementById("hobbies").classList.add("selected-groupe");
                var ul = "<ul id='task-ls'>"
                if (taskGroupe.hobbies.length > 0) {
                    for (var i = 0; i < taskGroupe.hobbies.length; i++) {
                        ul += "<li value='Hobbies-" + i + "' class='task-el'>" + taskGroupe.hobbies[i].taskTitle + "</li>"
                    }

                } else {
                    ul += "<li value='School-none' class='null'>No task for this Groupe!</li>"
                }
                ul += "</ul>"
                $("#task-list").html(ul);
                break;
            case 'General':
                document.getElementById("general").classList.add("selected-groupe");
                var ul = "<ul id='task-ls'>"
                if (taskGroupe.general.length > 0) {
                    for (var i = 0; i < taskGroupe.general.length; i++) {
                        ul += "<li value='General-" + i + "' class='task-el'>" + taskGroupe.general[i].taskTitle + "</li>"
                    }

                } else {
                    ul += "<li value='School-none' class='null'>No task for this Groupe!</li>"
                }
                ul += "</ul>"
                $("#task-list").html(ul);
                break;
        }
    });

    function taskDisplay(groupe) {
        var dDate = groupe.dueDate.split("T")[0].split("-").reverse().join("/");
        $("#priority").html("<span> Priority: " + groupe.priority + "</span>");
        $("#due-date").html("<span> Due date: " + dDate + "</span>");
        $("#state").html("<span> Status: " + groupe.state + "</span>");
        $("#creator").html("<span> By " + groupe.creator + "</span>");
        $("#assigned-to").html("<span> Assigned to " + groupe.assignedTo + "</span>");
        $("#task-body").html("<span>" + groupe.taskBody + "</span>");
        switch (groupe.priority) {
            case 'High':
                $("#priority").attr('class', 't-high');
                break;
            case 'Medium':
                $("#priority").attr('class', 't-medium');
                break;
            case 'Low':
                $("#priority").attr('class', 't-low');
                break;
        }
        switch (groupe.state) {
            case 'To Do':
                $("#state").attr('class', 't-to-do');
                break;
            case 'In Progress':
                $("#state").attr('class', 't-in-progress');
                break;
            case 'Done':
                $("#state").attr('class', 't-done');
                break;
        }
    }

    $(document).on('click', '.task-el', function () {
        $(".task-el").css({ 'background-color': 'rgb(255, 112, 136)' });
        $(this).css({ 'background-color': 'rgb(253, 192, 202)' });
        selectedTask = $(this).attr('value').split('-');
        var value = $(this).attr('value').split('-');
        var groupe = value[0];
        var i = value[1];

        switch (groupe) {
            case 'School':
                taskDisplay(taskGroupe.school[i]);
                break;
            case 'House':
                taskDisplay(taskGroupe.house[i]);
                break;
            case 'Legal':
                taskDisplay(taskGroupe.legal[i]);
                break;
            case 'Hobbies':
                taskDisplay(taskGroupe.hobbies[i]);
                break;
            case 'General':
                taskDisplay(taskGroupe.general[i]);
                break;

        }

    });
});