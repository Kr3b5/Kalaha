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

var p1_pits = [4,4,4,4,4,4];
var p2_pits = [4,4,4,4,4,4];

var p1_finish = [0];
var p2_finish = [0];

var p1_turn = true;  

/*=========================================================================================
                                        TURN
=========================================================================================*/

function makeTurn(row, nr){
    console.log("MAKE TURN " + row + " | " + nr)
    var id = "pit-" + row + "-" + nr;
    var stones = document.getElementById(id).innerText

    // player 1 turn 
    if( row == 1 ){
        p1Turn(stones, nr); 
    }

    // player 2 turn 
    if( row == 2 ){
        p2Turn(stones, nr);
    }


}

function p1Turn(stones, nr){
    console.log("P1 TURN " + stones + " | " + nr)
    setStones( p1_pits, p1_finish, p2_pits, stones, nr);
}

function p2Turn(stones, nr){
    console.log("P1 TURN " + stones + " | " + nr)
    setStones( p2_pits, p2_finish, p1_pits, stones, nr);
}

function setStones( row_1, finish ,row_2, stones, nr ){
    //set to Array count
    nr--;
    
    row_1[nr] = 0; 
    nr++; 

    while( stones > 0 ){

        //row 1 - stones 
        while( stones > 0 ){  
            if( nr == 6 ){
                break; 
            }    
            row_1[nr] = row_1[nr] + 1;   
            stones--; 
            nr++;  
        }

        //own finish stones 
        if( stones > 0 ){
            finish[0] = finish[0] + 1;
            stones--;
        }
        
        //row 2 - stones 
        if( stones > 0 ){
            nr = 0;
            while( stones > 0 ){  
                if( nr == 6 ){
                    break; 
                }       
                row_2[nr] = row_2[nr] + 1; 
                stones--; 
                nr++; 
            }
        }

        //reset nr for new row 
        nr = 0;
    }

    //update board with array
    updateBoard(); 
}



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
    document.getElementById("finish-p1").innerText = p1_finish[0];

    //update P2 Pits 
    for(var i = 1; i <= 6; i++){
        var id = "pit-2-" + i;  
        document.getElementById(id).innerText = p2_pits[i-1];
    }

    //update P2 finish 
    document.getElementById("finish-p2").innerText = p2_finish[0];
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
    p1_pits = [4,4,4,4,4,4];
    p2_pits = [4,4,4,4,4,4];

    p1_finish = [0];
    p2_finish = [0];

    updateBoard(); 

    //TODO update Player 
}

