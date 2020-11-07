/**
 * Copyright (c) 2020
 *
 * Kalaha Game - DHGE PI18 
 *
 * @summary Main functions Kalaha 
 * @author Kevin Lempert
 * @author Jonas Renz
 */



function newGame(){
    //Reset Pits 
    var pits = document.getElementsByClassName("pit");
    for (var i = 0; i < pits.length; i++) {
        pits[i].childNodes[0].innerText = "4";
    }

    //Reset Finish
    var pits = document.getElementsByClassName("finish");
    for (var i = 0; i < pits.length; i++) {
        pits[i].childNodes[0].innerText = "0";
    }

    //Reset Player 
    document.getElementById("player").innerText="1";
    //TODO: SET Player One in JS
}