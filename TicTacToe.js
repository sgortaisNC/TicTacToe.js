
class TicTacToe {
    nbCase = 9;
    _text = "X";
    _win = ['123','456','789','147','258','369','159','357'];
    socket = new WebSocket("ws://localhost:1234");

    constructor(main) {
        let that = this;


        this.socket.onopen = function(e) {

        };
        this.socket.onmessage = function(event) {
            let ob = JSON.parse(event.data);
            that._text = ob.text;
            let htmlElement = document.getElementById('case'+ ob.case);
            that.clickCase(htmlElement,that,false);
        };

        this.socket.onclose = function(event) {

        };

        this.socket.onerror = function(error) {

        };


        this.todolist();
        let container = document.getElementById(main);
        let game = document.createElement('DIV');
        game.classList.add('game-container');
        container.appendChild(game);
        for (let i = 0; i < this.nbCase; i++) {
            let game_case = document.createElement('DIV');
            let idCase = i + 1;
            game_case.id = "case"+idCase;
            game_case.classList.add('case');
            game_case.dataset.idCase = '' + idCase;
            game_case.addEventListener('click', function () {
                that.clickCase(this,that,true);
            });
            game.appendChild(game_case);
        }
    }

    todolist() {
        //TODO
        console.log({
            1: "Changer l'alerte",
            2: "Traduire/rendre traduisible"
        })
    }

    win(_text) {
        let isWin = _text + _text + _text;
        let cases = document.getElementsByClassName('case');
        for (let i = 0; i < this._win.length; i++) {
            let str = '';
            for (let j = 0; j < cases.length; j++) {
                for (let k = 0; k < 3; k++) {
                    if (cases.item(j).dataset.idCase === this._win[i][k]) {
                        str += cases.item(j).innerHTML
                    }
                }
            }
            if (str === isWin) {
                return true;
            }
        }
    }

    clickCase(htmlElement, that, b) {
        if (!htmlElement.classList.contains('clicked')) {
            htmlElement.innerText = that._text;
            htmlElement.classList.add('clicked');
            htmlElement.classList.add(that._text);
            if (b){
                that.socket.send('{"case": '+htmlElement.dataset.idCase+', "text": "'+that._text+'"}');
            }
            if (that.win(that._text)) {
                alert(that._text + " WIN !");
                if (b){
                    that.socket.send('{"win": "'+that._text+'"}');
                }
                window.location.reload();
            }
            if (that._text === "X") {
                that._text = "O";
            } else {
                that._text = 'X'
            }
        }
    }
}
