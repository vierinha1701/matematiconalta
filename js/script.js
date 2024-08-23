(function(){    
    //Variaveis
    var cnv = document.getElementById("fase1");
    var ctx = cnv.getContext("2d");

    // Carregue a imagem
    var img = new Image();
    img.src = "assets/imagens/planetas.jpg";

    // Desenhe a imagem de fundo no canvas
    img.onload = function () {
        ctx.drawImage(img, 0, 0, 800, 463);
    };

     //Carregue a imagem
     var nave = new Image();
     nave.src = "assets/imagens/nave_rigth.png";

     //Desenhe a imagem de fundo no canvas
     nave.onload = function () {
        ctx.drawImage(nave, 0, 0, 0, 0);
    };

    //Teclas
    var LEFT = 37;
    var UP = 38;
    var RIGTH = 39;
    var DOWN = 40;
    //Movimentos 
    var mvLeft = mvUp = mvRigth = mvDown = false;
    //Arrays
    var sprites = [];
    var blocks = []; 
    //Stancia Objetos
    var character = new Sprites(50, 175, 50, 50, "#00f", "assets/imagens/nave.png");    
    sprites.push(character);

    var block1 = new Sprites(500, 100, 50, 50, "#f00", "");
    block1.block = false;
    sprites.push(block1);
    blocks.push(block1);

    var block2 = new Sprites(200, 300, 100, 50, "#f00", "");
    sprites.push(block2);
    blocks.push(block2);

    var block3 = new Sprites(100, 100, 60, 50, "#f05", "assets/imagens/vida.png");
    block3.pegar = true;
    sprites.push(block3);
    blocks.push(block3);
    
    window.addEventListener("keydown", function(e){
        
        var key = e.keyCode;
        
        switch(key){
            case LEFT:
                mvLeft = true;
                break;
            case UP:
                mvUp = true;
                break;
            case RIGTH:
                mvRigth = true;
                break;
            case DOWN:
                mvDown = true;
                break;
        }
    }, false);

    window.addEventListener("keyup", function(e){
        var key = e.keyCode;
        
        switch(key){
            case LEFT:
                mvLeft = false;
                break;
            case UP:
                mvUp = false;
                break;
            case RIGTH:
                mvRigth = false;
                break;
            case DOWN:
                mvDown = false;
                break;
        }
    }, false);

   
    
    function update(){

        if(mvLeft && !mvRigth){
            character.posX -= character.speed;
        }

        if(mvRigth && !mvLeft){
            character.posX += character.speed;
        }

        if(mvUp && !mvDown){
            character.posY -= character.speed;
        }
        if(mvDown && !mvUp){
            character.posY += character.speed;
        }
        
        //Limita a posição do personagem dentro da tela
        character.posX = Math.max(0, (Math.min(cnv.width - character.width, character.posX)));
        character.posY = Math.max(0, (Math.min(cnv.height - character.height, character.posY)));

        //Colisões
        for(var i in blocks){
            //Verifica
            var bloco = blocks[i];

            if(bloco.visible){

                if(bloco.block == true){
                    blockRect(character, bloco);
                }else{
                    blockRect(bloco, character);
                }
            }             
        }
    }
    
    //Fucnção para Renderizar
    function render(){
        //Limpa os os elementos para redirecionar reposicionando
        ctx.clearRect(0, 0, cnv.width, cnv.height);

        // Desenhe a imagem de fundo no canvas
        ctx.drawImage(img, 0, 0, 800, 463);
        
        for(i=0; i < sprites.length; i++){
            var spr = sprites[i];
            if (spr.visible){
                if(spr.src != ""){ 
                    
                    if(spr.pegar){
                        var vida = new Image();
                        vida.src = spr.src;
                        ctx.drawImage(vida, spr.posX, spr.posY, spr.width, spr.height);
                    }else{
                        
                        if(mvLeft){                        
                            nave.src = "assets/imagens/nave_left.png";
                            ctx.drawImage(nave, spr.posX, spr.posY, spr.width, spr.height);
                        }else if(mvUp){
                            nave.src = "assets/imagens/nave_up.png";
                            ctx.drawImage(nave, spr.posX, spr.posY, spr.width, spr.height);
                        }else if(mvRigth){
                            nave.src = "assets/imagens/nave_rigth.png";
                            ctx.drawImage(nave, spr.posX, spr.posY, spr.width, spr.height);
                        }else if(mvDown){
                            nave.src = "assets/imagens/nave_down.png";
                            ctx.drawImage(nave, spr.posX, spr.posY, spr.width, spr.height);
                        } else{
                            ctx.drawImage(nave, spr.posX, spr.posY, spr.width, spr.height);
                        }
                    }
                    


                                    
                }else{
                    ctx.fillStyle = spr.color;
                    ctx.fillRect(spr.posX, spr.posY, spr.width, spr.height);                
                }    
            }            
        }            
    } 

     //funcão que atualiza a po jogo
     function loop(){
        window.requestAnimationFrame(loop, cnv);
        update();
        render();    
    } 

    loop();
}());
