// Deniss Ponomarenko 201rdb407
var player1 = 0;
var player2 = 0;
var last_button;



who_will_start = confirm("If you want the computer to start the game, press OK");
var active_player;

if (who_will_start) {
    active_player = 1;
    console.log('Computer will start the game');
    
} else {
    active_player = 2;
    console.log('Player will start the game');
}


const myTimeout = setTimeout(change_color, 2000);

function update_score(button) {
    
    last_button = (button.substring(0, 3));

    switch (last_button) {
        case 'one': last_button = 1; break;
        case 'two': last_button = 2; break;
        case 'tre': last_button = 3; break;
    }

    if (last_button == 1) {
        log(last_button);
        set_score();
    }

    if (last_button == 2) {
        let answer = confirm("Create one and one?");
        if (answer) {

            let btn1 = document.createElement("button");
            btn1.innerHTML = '1';
            btn1.setAttribute('id', 'one6');
            btn1.classList = 'btn btn-success btn-lg m-1';
            btn1.setAttribute('onclick', "update_score('one6')");
            document.getElementById('button_group').appendChild(btn1)

            let btn2 = document.createElement("button");
            btn2.innerHTML = '1';
            btn2.setAttribute('id', 'one7');
            btn2.classList = 'btn btn-success btn-lg';
            btn2.setAttribute('onclick', "update_score('one7')");
            document.getElementById('button_group').appendChild(btn2)
        } else {
            log(last_button);
            set_score();
        }
    }
    if (last_button == 3) {
        let answer = confirm("Create one and two?");
        if (answer) {
            let btn1 = document.createElement("button");
            btn1.innerHTML = '1';
            btn1.setAttribute('id', 'one8');
            btn1.classList = 'btn btn-success btn-lg m-1';
            btn1.setAttribute('onclick', "update_score('one8')");
            document.getElementById('button_group').appendChild(btn1)

            let btn2 = document.createElement("button");
            btn2.innerHTML = '2';
            btn2.setAttribute('id', 'two4');
            btn2.classList = 'btn btn-danger btn-lg';
            btn2.setAttribute('onclick', "update_score('two4')");
            document.getElementById('button_group').appendChild(btn2)
        } else {
            log(last_button);
            set_score();
        }
    }

    document.getElementById(button).remove();
    change_color();
    gemeOver();
}

function set_score() {
    point = parseInt(last_button);
    if (active_player == 1) {
        player1 = player1 + point;
        document.getElementById("playerScore1").innerHTML = user1 + ": " + player1 + " points";
        console.log('Player1: ' + player1);
    } else {
        player2 = player2 + point;
        document.getElementById("playerScore2").innerHTML = "Robot: " + player2 + " points";
        console.log('Robot: ' + player2);
    }
}

function change_color() {
    if (active_player == 1) {
        var element = document.getElementById("playerBg1");
        element.classList.remove("bg-primary");
        element.classList.add("bg-secondary");

        element = document.getElementById("playerBg2");
        element.classList.remove("bg-secondary");
        element.classList.add("bg-primary");
    } else {
        var element = document.getElementById("playerBg2");
        element.classList.remove("bg-primary");
        element.classList.add("bg-secondary");

        element = document.getElementById("playerBg1");
        element.classList.remove("bg-secondary");
        element.classList.add("bg-primary");
    }
}

function gemeOver() {
    var one = document.getElementById("1");
    var two = document.getElementById("2");
    var tree = document.getElementById("3");
    if ( !one && !two && !tree ) {
        title = document.getElementById("winner");
        if (player1 > player2) {
            title.innerHTML = user1 + " won";
            title.classList.add("text-success");
            title.classList.remove("text-danger");
            title.classList.remove("text-warning");
        } else if (player2 > player1) {
            title.innerHTML = "Robot won";
            title.classList.add("text-danger");
            title.classList.remove("text-success");
            title.classList.remove("text-warning");
        } else {
            title.innerHTML = "Draw";
            title.classList.add("text-warning");
            title.classList.remove("text-danger");
            title.classList.remove("text-success");
        }
    }
}

function log(last_button) {
    if (active_player == 1) {
        active_player = 2;
        console.log('Robot scored ' + last_button + ' points');
    } else {
        active_player = 1;
        console.log(user1 + ' scored ' + last_button + ' points');
    }
}

function robot(buttonList, score1, score2, isMaximaxing) {
    if (buttonList.length == 0) {
        if (score1 > score2) {
            return 1;
        } else if(score1 < score2){
            return -1;
        }else { return 0; }
    }
    if (isMaximaxing) {
        return Math.max(robot(getButtonList(3),  player1 + 3, player2, true),
                        robot(getButtonList(2),  player1 + 2, player2, true),
                        robot(getButtonList(1),  player1 + 1, player2, true),
                        robot(getButtonList(-3), player1,     player2, true),
                        robot(getButtonList(-2), player1,     player2, true)
                )
    } else {
        return Math.min(robot(getButtonList(3),  player1, player2 + 3, false),
                        robot(getButtonList(2),  player1, player2 + 2, false),
                        robot(getButtonList(1),  player1, player2 + 1, false),
                        robot(getButtonList(-3), player1, player2,     false),
                        robot(getButtonList(-2), player1, player2,     false)
                )
    }
}

function getButtonList(action) {

    /* Action parametr description
     * 3  - player took 3 points
     * 2  - player took 2 points
     * 1  - player took 1 point
     * -3 - split the 3 into 2 elements (1 and 2)
     * -2 - split the 2 into 2 elements (1 and 1)
     */

    var elements = document.querySelectorAll("button");
    buttonList = [];
    for (var i = 0, len = elements.length; i < len; i++) {
        buttonList.push(elements[i].textContent);
    }
    switch (action) {
        case 3:
            if (buttonList.indexOf('3') > -1) {
                buttonList.splice(buttonList.indexOf('3'), 1);
                document.querySelector(`[id*="tre"]`).remove();
            }
            break;
        case 2:
            if (buttonList.indexOf('2') > -1) {
                buttonList.splice(buttonList.indexOf('2'), 1);
                document.querySelector(`[id*="two"]`).remove();
            }
            break;
        case 1:
            if (buttonList.indexOf('1') > -1) {
                buttonList.splice(buttonList.indexOf('1'), 1);
                document.querySelector(`[id*="one"]`).remove();
            }
            break;
        case -3:
            if (buttonList.indexOf('3') > -1) {

                document.querySelector(`[id*="tre"]`).remove();

                let btn1 = document.createElement("button");
                btn1.innerHTML = '1';
                btn1.setAttribute('id', 'one8');
                btn1.classList = 'btn btn-success btn-lg m-1';
                btn1.setAttribute('onclick', "update_score('one8')");
                document.getElementById('button_group').appendChild(btn1)

                let btn2 = document.createElement("button");
                btn2.innerHTML = '2';
                btn2.setAttribute('id', 'two4');
                btn2.classList = 'btn btn-danger btn-lg';
                btn2.setAttribute('onclick', "update_score('two4')");
                document.getElementById('button_group').appendChild(btn2)
            }
            break;
        case -2:
            if (buttonList.indexOf('2') > -1) {

                document.querySelector(`[id*="two"]`).remove();

                let btn1 = document.createElement("button");
                btn1.innerHTML = '1';
                btn1.setAttribute('id', 'one6');
                btn1.classList = 'btn btn-success btn-lg m-1';
                btn1.setAttribute('onclick', "update_score('one6')");
                document.getElementById('button_group').appendChild(btn1)

                let btn2 = document.createElement("button");
                btn2.innerHTML = '1';
                btn2.setAttribute('id', 'one7');
                btn2.classList = 'btn btn-success btn-lg';
                btn2.setAttribute('onclick', "update_score('one7')");
                document.getElementById('button_group').appendChild(btn2)
            }
            break;
    }

    buttonList = [];
    for (var i = 0, len = elements.length; i < len; i++) {
        buttonList.push(elements[i].textContent);
    }

    return buttonList.map(i => Number(i))
}