/**
 * Copyright (c) 2020
 *
 * Kalaha Game - DHGE PI18 
 *
 * @summary Main functions Kalaha 
 * @author Kevin Lempert
 * @author Jonas Renz
 */

/*
    TODO

*/

/*=========================================================================================
                                        GLOBAL
=========================================================================================*/

var p1_pits = [4,4,4,4,4,4];
var p2_pits = [4,4,4,4,4,4];

var p1_finish = [0];
var p2_finish = [0];

var p1_turn = true; 

var end = false; 

// Rules
var R_1 = false;
var R_2 = false; 

//last Pit for Rule 2 [row, id]
var lastPit = [0,0];

const text_player = "An der Reihe: Spieler "; 
const text_winner = "Gewonnen hat Spieler "; 
const text_draw = "Unentschieden"; 

/*=========================================================================================
                                        TURN
=========================================================================================*/

function makeTurn(row, nr){

    //set Rules false
    R_1 = false; 
    R_2 = false; 

    if( end == false ){
        console.log("MAKE TURN " + row + " | " + nr)
        var id = "pit-" + row + "-" + nr;
        var stones = document.getElementById(id).innerText

        // player 1 turn 
        if( stones > 0 ){
            if( row == 1 && p1_turn == true ){
                p1Turn(stones, nr); 

                makeRule(false); 
            }

            // player 2 turn 
            if( row == 2 && p1_turn == false ){
                p2Turn(stones, nr);

                makeRule(true); 
            }
        }
    }

    //check if game is finish
    checkEnd();
}

function p1Turn(stones, nr){
    console.log("P1 TURN " + stones + " | " + nr)
    setStones( p1_pits, p1_finish, p2_pits, stones, nr, 1, 2);
}

function p2Turn(stones, nr){
    console.log("P2 TURN " + stones + " | " + nr)
    setStones( p2_pits, p2_finish, p1_pits, stones, nr, 2, 1);
}

function setStones( row_1, finish ,row_2, stones, nr, row_1_player){
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

            //check Rule 2 : last own Pit empty
            checkRule2(row_1_player, nr, row_1[nr])

            row_1[nr] = row_1[nr] + 1;   
            stones--; 
            nr++;  
        }

        //own finish stones 
        if( stones > 0 ){
            finish[0] = finish[0] + 1;
            stones--;
            R_1 = true;  
        }
        
        //row 2 - stones 
        if( stones > 0 ){
            R_1 = false; 
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

function makeRule(p1Turn){

    //Rule 1 : Last stone in own Kalaha 
    if( R_1 == false ){
        p1_turn = p1Turn; 
        updatePlayer(); 
    }

    if( R_2 == true ){
        opPit = 5 - lastPit[1];
        if( lastPit[0] == 1 ){
            p1_pits[lastPit[1]] = p2_pits[opPit] + 1;
            p2_pits[opPit] = 0; 
        }else if( lastPit[0] == 2 ){
            p2_pits[lastPit[1]] = p1_pits[opPit] + 1;
            p1_pits[opPit] = 0; 
        }else{
            console.log("Error - Wrong Row")
        }
        updateBoard(); 
    }
}

function checkRule2(row, id, value){
    if(value == 0){
        lastPit[0] = row; 
        lastPit[1] = id; 
        R_2 = true; 
    }else{
        R_2 = false;
    }
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
        document.getElementById("player").innerText = text_player + 1;
        updateRow(1,2); 
    }else{
        document.getElementById("player").innerText = text_player + 2;
        updateRow(2,1);
    }
    
}

//Mark active row 
function updateRow(activeRow, disabledRow){
    for(var i = 1; i <= 6; i++){
        var activeID = "pit-" + activeRow + "-" + i;  
        document.getElementById(activeID).setAttribute("style", "background-color: rgba(255, 255, 255, .05)"); 
        var disabledID = "pit-" + disabledRow + "-" + i; 
        document.getElementById(disabledID).setAttribute("style", "background-color: rgba(0, 0, 0, .1)"); 
    }
}

/*=========================================================================================
                                        END
=========================================================================================*/

function checkEnd(){
    if(p1_pits.every(item => item === 0)){
        movePits(p2_pits, p1_finish);        
        endGame(); 
    }else if(p2_pits.every(item => item === 0)){
        movePits(p1_pits, p2_finish);
        endGame();
    }
}

function movePits(row, finish){
    for( var i = 0; i <= row.length-1; i++){
        finish[0] = finish[0] + row[i];
        row[i] = 0; 
    }
    updateBoard(); 
} 

function endGame(){
    end = true;
    
    if( p1_finish > p2_finish ){
        document.getElementById("player").innerText = text_winner + 1;
    }else if( p1_finish < p2_finish ) {
        document.getElementById("player").innerText = text_winner + 2;
    }else{
        document.getElementById("player").innerText = text_draw;
    }
    
}

/*=========================================================================================
                                        NEW GAME 
=========================================================================================*/

function newGame(){
    p1_pits = [4,4,4,4,4,4];
    p2_pits = [4,4,4,4,4,4];

    p1_finish = [0];
    p2_finish = [0];

    //update Board 
    updateBoard(); 

    //set Player 1 row marked 
    updateRow(1,2);

    //set Player 1 for first turn 
    p1_turn = true; 
    updatePlayer(); 
    
    //game not ended 
    end = false; 
}

