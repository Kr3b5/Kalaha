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

/**
 * Make a turn
 *
 * @param {number} row The clicked row 
 * @param {number} nr  The clicked pit nr 
 */
function makeTurn(row, nr){

    //set Rules false
    R_1 = false; 
    R_2 = false; 

    //check if game is already ended 
    if( end == false ){
        console.log("Make Turn " + row + " | " + nr)
        var id = "pit-" + row + "-" + nr;
        var stones = document.getElementById(id).innerText

        //empty pit check 
        if( stones > 0 ){
            // player 1 turn 
            if( row == 1 && p1_turn == true ){
                setStones( p1_pits, p1_finish, p2_pits, stones, nr, 1, 2);

                //check if rule is triggerd after turn 
                triggerRule(false); 
            }

            // player 2 turn 
            if( row == 2 && p1_turn == false ){
                setStones( p2_pits, p2_finish, p1_pits, stones, nr, 2, 1);
                triggerRule(true); 
            }
        }
    }

    //check if game is finish
    checkEnd();
}


/**
 * set stones to the pits  
 *
 * @param {Array} row_1        first row 
 * @param {number} finish       own finish
 * @param {Array} row_2        second row 
 * @param {number} stones       number of stones  
 * @param {number} nr           clicked pit nr 
 * @param {number} a_Player active player 
 */
function setStones( row_1, finish ,row_2, stones, nr, a_Player){
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
            checkRule2(a_Player, nr, row_1[nr])

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

/**
 * Trigger the Rules 
 *
 * @param {boolean} p1Turn is player 1 active ? 
 */
function triggerRule(p1Turn){

    //Rule 1 : Last stone in own Kalaha = new turn 
    if( R_1 == false ){
        p1_turn = p1Turn; 
        updatePlayer(); 
    }

    //Rule 2 : Last stone in own empty pit = get opposite stones 
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

/**
 * Check Rule 2: Last stone in own empty pit = get opposite stones
 *
 * @param {number} row   active row 
 * @param {number} id    active pit nr 
 * @param {number} value value from pit  
 */
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

/**
 * Update the board
 */
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

/**
 * Update the player text 
 */
function updatePlayer(){
    
    if( p1_turn == true ){
        document.getElementById("player").innerText = text_player + 1;
        updateRow(1,2); 
    }else{
        document.getElementById("player").innerText = text_player + 2;
        updateRow(2,1);
    }
    
}

/**
 * Update active row 
 */
function updateRow(activeRow, disabledRow){
    for(var i = 1; i <= 6; i++){
        var activeID = "pit-" + activeRow + "-" + i;  
        document.getElementById(activeID).setAttribute("style", "background-color: rgb(255, 255, 255, .3)"); 
        var disabledID = "pit-" + disabledRow + "-" + i; 
        document.getElementById(disabledID).setAttribute("style", "background-color: rgba(0, 0, 0, .1)"); 
    }
}

/*=========================================================================================
                                        END
=========================================================================================*/

/**
 * Check if every pits from a player are empty -> end game  
 */
function checkEnd(){
    if(p1_pits.every(item => item === 0)){
        movePits(p2_pits, p1_finish);        
        endGame(); 
    }else if(p2_pits.every(item => item === 0)){
        movePits(p1_pits, p2_finish);
        endGame();
    }
}

/**
 * Move all stones to winners kalaha if game endend    
 */
function movePits(row, finish){
    for( var i = 0; i <= row.length-1; i++){
        finish[0] = finish[0] + row[i];
        row[i] = 0; 
    }
    updateBoard(); 
} 

/**
 * Write winner to label     
 */
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

/**
 * Start a new game      
 */
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

