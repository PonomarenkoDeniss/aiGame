// Deniss Ponomarenko 201rdb407
var player1 = 0;
var player2 = 0;
var last_button;



who_will_start = confirm("If you want the computer to start the game, press OK");
var active_player;

setTimeout(() => {
  if (who_will_start) {
    active_player = 'ai';
    console.log('Computer will start the game');
	console.log('Map: ' + getButtonList());
	robot_step( robot(getButtonList(), player1, player2, true));
    
} else {
    active_player = 'user';
    console.log( user1 +' will start the game');
}

}, 2000)


const myTimeout = setTimeout(change_color, 2000);

function user_step(button) {
    
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
            btn1.setAttribute('onclick', "user_step('one6')");
            document.getElementById('button_group').appendChild(btn1)

            let btn2 = document.createElement("button");
            btn2.innerHTML = '1';
            btn2.setAttribute('id', 'one7');
            btn2.classList = 'btn btn-success btn-lg';
            btn2.setAttribute('onclick', "user_step('one7')");
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
            btn1.setAttribute('onclick', "user_step('one8')");
            document.getElementById('button_group').appendChild(btn1)

            let btn2 = document.createElement("button");
            btn2.innerHTML = '2';
            btn2.setAttribute('id', 'two4');
            btn2.classList = 'btn btn-danger btn-lg';
            btn2.setAttribute('onclick', "user_step('two4')");
            document.getElementById('button_group').appendChild(btn2)
        } else {
            log(last_button);
            set_score();
        }
    }

    document.getElementById(button).remove();
    gemeOver();
	change_color();
	robot_step( robot(getButtonList(), player1, player2, true));
}

function set_score() {
    point = parseInt(last_button);
    if (active_player == 'ai') {
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
    if (active_player == 'ai') {
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
    if (active_player == 'ai') {
        active_player = 'user';
        console.log('Robot scored ' + last_button + ' points');
    } else {
        active_player = 'ai';
        console.log(user1 + ' scored ' + last_button + ' points');
    }
}

function robot(buttonList, score1, score2, isMaximaxing) {
    if (buttonList.length == 0) {
        if (score1 > score2) {
            return -1;
        } else if(score1 < score2){
            return -2;
        }else { return 0; }
    }
	
	take1Array = buttonList;
	if (take1Array.indexOf('1') > -1) {
		take1Array.splice(buttonList.indexOf('1'), 1);
	}
	
	take2Array = buttonList;
	if (take2Array.indexOf('1') > -1) {
		take2Array.splice(buttonList.indexOf('1'), 1);
	}
	
	take3Array = buttonList;
	if (take3Array.indexOf('1') > -1) {
		take3Array.splice(buttonList.indexOf('1'), 1);
	}
	
	split3Array = buttonList;
	if (split3Array.indexOf('3') > -1) {
		split3Array.splice(buttonList.indexOf('3'), 1);
		split3Array.push('2');
		split3Array.push('1');		
	}
	
	split2Array = buttonList;
	if (split2Array.indexOf('2') > -1) {
		split2Array.splice(buttonList.indexOf('2'), 1);
		split2Array.push('1');
		split2Array.push('1');		
	}
	
	
    if (isMaximaxing) {
		return Math.max(Math.max.apply(Math, take1Array),
						Math.max.apply(Math, take2Array),
						Math.max.apply(Math, take2Array),
						Math.max.apply(Math, split2Array),
						Math.max.apply(Math, split3Array)
				
		)
	}else{
		return Math.min(Math.min.apply(Math, take1Array),
						Math.min.apply(Math, take2Array),
						Math.min.apply(Math, take2Array),
						Math.min.apply(Math, split2Array),
						Math.min.apply(Math, split3Array)
		)
	}
		
} 

function robot_step(take_button){
		
	switch(take_button){
		case 1:
			document.querySelector(`[id*="one"]`).remove();
			player2 = player2 + 1;
		break;
		
		case 2:
			document.querySelector(`[id*="two"]`).remove();
			player2 = player2 + 2;
		break;
		
		case 3:
			document.querySelector(`[id*="tre"]`).remove();
			player2 = player2 + 3;
		break;
	}
	active_player = 'user';
	console.log('Robot scored ' + take_button + ' points');
	document.getElementById("playerScore2").innerHTML = "Robot: " + player2 + " points";
	change_color();
	gemeOver();
}

function getButtonList() {

    var elements = document.querySelectorAll("button");
    buttonList = [];
    for (var i = 0, len = elements.length; i < len; i++) {
        buttonList.push(elements[i].textContent);
    }

    return buttonList.map(i => parseInt(i))
}