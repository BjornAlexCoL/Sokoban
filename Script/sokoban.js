"use strict";
const mapGrid=document.getElementsByClassName("mapGrid")[0];
const scale=50;
var avatarX;
var avatarY;
var avatarLastDirection="-idle-up";
var moveCounter=0;
var block=0;
var totalBlocks;

displayGridMap(); // Draw Map

document.addEventListener('keydown',keyPressed);//Time to Move
document.addEventListener('keyup',keyReleased); //Make avatar idle

function keyReleased(event){ //Set idle
    event.preventDefault();
    setDirection(avatarLastDirection,"-idle"+avatarLastDirection);
    avatarLastDirection="-idle"+avatarLastDirection;
}

function keyPressed(event){
    event.preventDefault();
    var avatarDirection=avatarLastDirection;
    var dirX=0;
    var dirY=0;
    switch (event.keyCode) {
        case 39:{ //Right
            avatarDirection="-right";            
            dirX=1;           
            break;
        }
        case 37:{ //Left
            avatarDirection="-left";            
            dirX=-1;
            break;
        }   
        case 38:{ //Up
            avatarDirection="-up";            
            dirY=-1;
            break;
        }
        case 40:{//Down
            avatarDirection="-down";            
            dirY=1;
            break;
        }
        default:{
            break;
        }
    }
    setDirection(avatarLastDirection,avatarDirection); //Set Dirextion of avatar.
    avatarLastDirection=avatarDirection;
    checkFreeTile(avatarX,avatarY,dirX,dirY); //Check if free move avatar and block if possible.
}        
    
    function setDirection(oldDirection,newDirection){//Set direction of avatar
        const tileId=document.getElementById("x"+avatarX+"y"+avatarY);
        tileId.classList.toggle(Entities.Character+oldDirection);
        tileId.classList.toggle(Entities.Character+newDirection);
    }
    
    function checkFreeTile(currPosX,currPosY,dirX,dirY){
            var avatar=Entities.Character+avatarLastDirection;	
            var checkX=currPosX+dirX;
            var checkY=currPosY+dirY;
            if ((checkX<0) || (checkY<0) || (checkX>=tileMap01.width) || (checkY>=tileMap01.height))
            { 
                return;
            }
            

            const toMoveFromId=document.getElementById("x"+currPosX+"y"+currPosY);
            const toMoveToId=document.getElementById("x"+checkX+"y"+checkY);

            //Check and move block if movable
            if((toMoveToId.classList.contains(Entities.Block)||toMoveToId.classList.contains(Entities.BlockDone)) && toMoveFromId.classList.contains(avatar)){
               checkFreeTile(checkX,checkY,dirX,dirY); //Check if block is movable.
              }
              
            //Move block or avatar if possible   
            if ((!toMoveToId.classList.contains(Entities.Block)&&!toMoveToId.classList.contains(Entities.BlockDone))&&(toMoveToId.classList.contains(Tiles.Space) || toMoveToId.classList.contains(Tiles.Goal))){
                if(toMoveFromId.classList.contains(avatar)){//Move Avatar
                    toMoveFromId.classList.toggle(avatar);  
                    toMoveToId.classList.toggle(avatar);
                    avatarX=checkX;
                    avatarY=checkY;
                    moveCounter++;    
                }
                else
                {   //Move Block
                    toMoveFromId.classList.toggle((toMoveFromId.classList.contains(Entities.Block))?Entities.Block:Entities.BlockDone);
                    toMoveToId.classList.toggle((toMoveToId.classList.contains(Tiles.Goal))?Entities.BlockDone:Entities.Block);
                    //Change BlockCounter
                    toMoveToId.classList.contains(Tiles.Goal)?(toMoveFromId.classList.contains(Tiles.Space)?block++:0):(toMoveFromId.classList.contains(Tiles.Goal)?block--:0);
                }                  
            }
            displayScore();
              return               
             }
        
            //Draw map
            function displayGridMap(){
                mapGrid.style.width=scale*tileMap01.width+"px";
                mapGrid.style.height=scale*tileMap01.height+"px";     
                for (var tileY=0;tileY<tileMap01.height;tileY++){
                    for (var tileX=0;tileX<tileMap01.width;tileX++){
                        var cssTileType="";
                        switch(tileMap01.mapGrid[tileY][tileX][0]){
                            case "B":{
                            cssTileType=Entities.Block+" "+Tiles.Space;
                            totalBlocks++;
                            break;        
                            }
                            case "W":{
                            cssTileType=Tiles.Wall;
                            break;        
                            }
                            case "P":{
                            cssTileType=Tiles.Space+" "+Entities.Character+"-idle-up";
                                avatarX=tileX;
                                avatarY=tileY;
                                break;
                            }
                            case "G":{
                                cssTileType=Tiles.Goal;
                                break;
                            }
                            default:
                                cssTileType=Tiles.Space;
                                break;
                        }
                        makeTile("tile "+cssTileType,tileX,tileY);
                    }
                }
                displayScore();
            }

            //Draw Tile
            function makeTile(cssTileType,x,y){
                let tile=document.createElement('div');
                let idValue="x"+x+"y"+y;
                tile.id=idValue;
                tile.className=cssTileType;
                mapGrid.appendChild(tile);            
            }

            function displayScore(){
                document.getElementsByClassName("counter")[0].innerHTML=moveCounter;
                document.getElementsByClassName("block")[0].innerHTML=block;
                

            }