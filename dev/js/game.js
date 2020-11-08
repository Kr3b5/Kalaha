/**
 * Copyright (c) 2020
 *
 * Kalaha Game - DHGE PI18 
 *
 * @summary Main functions Kalaha 
 * @author Kevin Lempert
 * @author Jonas Renz
 */

/*=========================================================================================
                                        GLOBAL
=========================================================================================*/

var p1_pits = [1,2,3,4,5,6];
var p2_pits = [7,8,9,10,11,12];

var p1_finish = 1;
var p2_finish = 2;

var p1_turn = true;  

/*=========================================================================================
                                        UPDATE
=========================================================================================*/


function updateBoard(){
    //update P1 pits 
    for(var i = 1; i <= 6; i++){
        var id = "pit-1-" + i;  
        document.getElementById(id).innerText = p1_pits[i-1];
    }

    //update P1 finish 
    document.getElementById("finish-p1").innerText = p1_finish;

    //update P2 Pits 
    for(var i = 1; i <= 6; i++){
        var id = "pit-2-" + i;  
        document.getElementById(id).innerText = p2_pits[i-1];
    }

    //update P2 finish 
    document.getElementById("finish-p2").innerText = p2_finish;
}

function updatePlayer(){
    
    if( p1_turn == true ){
        document.getElementById("player").innerText = 1;
    }else{
        document.getElementById("player").innerText = 2;
    }
    
}



/*=========================================================================================
                                        NEW GAME 
=========================================================================================*/


/* KL*/
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