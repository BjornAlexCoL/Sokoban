"use strict";
const mapGrid=document.getElementsByClassName("mapGrid")[0];
const scale=50;
var avatarX;
var avatarY;
var avatarLastDirection="-idle-up";

const boxes =[];


displayGridMap();

document.addEventListener('keydown',keyPressed);
document.addEventListener('keyup',keyReleased);

function keyReleased(event){
    console.log("key Released");
    event.preventDefault();
    setDirection(avatarLastDirection,"-idle"+avatarLastDirection);
    
}

function keyPressed(event){
    console.log("key pressed");
    event.preventDefault();
    var avatarDirection=avatarLastDirection;
    var dirX=0;
    var dirY=0;
    switch (event.keyCode) {
        case 39:{ //Right
            avatarDirection="-right";            
            dirX=1;           
            console.log("right");
            break;
        }
        case 37:{ //Left
            avatarDirection="-left";            
            dirX=-1;
            console.log("left");
            break;
        }   
        case 38:{ //Up
            avatarDirection="-up";            
            dirY=-1;
            console.log("up");
            break;
        }
        case 40:{//Down
            avatarDirection="-down";            
            dirY=1;
            console.log("down");
            break;
        }
        default:{
            break;
        }
        
    }
    console.log(avatarX,avatarY,dirX,dirY);
    const tileId=document.getElementById("x"+avatarX+"y"+avatarY);
    console.log(avatarLastDirection);
       
    setDirection(avatarLastDirection,avatarDirection);
    
    avatarLastDirection=avatarDirection;
    checkFreeTile(avatarX,avatarY,dirX,dirY);
}        
    
    function setDirection(oldDirection,newDirection){
        const tileId=document.getElementById("x"+avatarX+"y"+avatarY);
        console.log(oldDirection+"->"+newDirection);
           
        tileId.classList.toggle(Entities.Character+oldDirection);
        tileId.classList.toggle(Entities.Character+newDirection);
            
    }
    
    function moveObject(className,from,to){
    console.log("Class: "+ className+" From: "+ from+" To: "+ to)    
    from.classList.toggle(className);  
    to.classList.toggle(className);    

    }

    function checkFreeTile(currPosX,currPosY,dirX,dirY){
            console.log("checkFreeTile");
            var entity;
            var checkX=currPosX+dirX;
            var checkY=currPosY+dirY;
            console.log("x: " +currPosX,currPosY);
            if ((checkX<0) || (checkY<0) || (checkX>=tileMap01.width) || (checkY>=tileMap01.height))
            { 
                return;
            }
            
            const toMoveFromId=document.getElementById("x"+currPosX+"y"+currPosY);
            const toMoveToId=document.getElementById("x"+checkX+"y"+checkY);
            console.log(toMoveFromId.classList);
            
            console.log(toMoveToId.classList);

            if(toMoveToId.classList.contains(Entities.Block) && toMoveFromId.classList.contains(avatarLastDirection)){
                console.log("to: "+toMoveToId.classList+" from: " + toMoveFromId.classList);
               checkFreeTile(checkX,checkY,dirX,dirY);
              }
                          
            if (!toMoveToId.classList.contains(Entities.Block)&&(toMoveToId.classList.contains(Tiles.Space) || toMoveToId.classList.contains(Tiles.Goal))){
                console.log("move something");
                if(toMoveFromId.classList.contains(avatarLastDirection)){
                    entity=avatarLastDirection;
                    avatarX=checkX;
                    avatarY=checkY;
                }
                else
                {
                    console.log("move Block")
                    entity=(toMoveToId.classList.contains(Tiles.Goal))?Entities.BlockDone:Entities.Block;
                }
                console.log("Now we move")       
                moveObject(entity,toMoveFromId, toMoveToId);
            }
         
                   return               
             }
        
            
            function displayGridMap(){
                console.log("display grid");
                mapGrid.style.width=scale*tileMap01.width+"px";
                mapGrid.style.height=scale*tileMap01.height+"px";     
                for (var tileY=0;tileY<tileMap01.height;tileY++){
                    for (var tileX=0;tileX<tileMap01.width;tileX++){
                        var cssTileType="";
                        switch(tileMap01.mapGrid[tileY][tileX][0]){
                            case "B":{
                            cssTileType=Entities.Block+" "+Tiles.Space;
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
                console.log("Display Grid Done");
            }

            function makeTile(cssTileType,x,y){
                let tile=document.createElement('div');
                let idValue="x"+x+"y"+y;
                tile.id=idValue;
                tile.className=cssTileType;
                mapGrid.appendChild(tile);            
            }