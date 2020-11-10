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


    - Regel : 
        -   Landet letzter Stein in Kalaha = neuer Zug 
        -   Landet letzter Stein in leere eigene Mulde = Stein + Gegenseite werden in Kalaha getan  

    - Spielende : wenn alle eigenen Mulden leer sind = gegnerische Reststeine gehen in eigenes Kalaha 


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

const text_player = "An der Reihe: Spieler "; 
const text_winner = "Gewonnen hat Spieler "; 

/*=========================================================================================
                                        TURN
=========================================================================================*/

function makeTurn(row, nr){

    console.log(end); 

    if( end == false ){
        console.log("MAKE TURN " + row + " | " + nr)
        var id = "pit-" + row + "-" + nr;
        var stones = document.getElementById(id).innerText

        // player 1 turn 
        if( stones > 0 ){
            if( row == 1 && p1_turn == true ){
                p1Turn(stones, nr); 

                //TODO Sonderregeln einbauen 

                p1_turn = false;
                updatePlayer();  
            }

            // player 2 turn 
            if( row == 2 && p1_turn == false ){
                p2Turn(stones, nr);

                //TODO Sonderregeln einbauen 
                
                p1_turn = true; 
                updatePlayer(); 
            }
        }
    }

    //check if game is finish
    checkEnd();
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
        document.getElementById("player").innerText = text_player + 1;
    }else{
        document.getElementById("player").innerText = text_player + 2;
    }
    
}

/*=========================================================================================
                                        END
=========================================================================================*/

function checkEnd(){
    if(p1_pits.every(item => item === 0)){
        movePits(p2_pits, p1_finish);        
        endGame(1); 
    }else if(p2_pits.every(item => item === 0)){
        movePits(p1_pits, p2_finish);
        endGame(2);
    }
}

function movePits(row, finish){
    for( var i = 0; i <= row.length-1; i++){
        finish[0] = finish[0] + row[i];
        row[i] = 0; 
    }
    updateBoard(); 
} 

function endGame(winner){
    end = true;
    document.getElementById("player").innerText = text_winner + winner;
}

/*=========================================================================================
                                        NEW GAME 
=========================================================================================*/

function newGame(){
    p1_pits = [4,4,4,4,4,4];
    p2_pits = [4,4,4,4,4,4];

    p1_finish = [0];
    p2_finish = [0];

    updateBoard(); 

    p1_turn = true; 
    updatePlayer(); 
    
    end = false; 
}

