// function doFirst(){
// 	mytry = document. getElementById('trytry');
// 	mytry.addEventListener("dragstart", startDrag, false);
// 	leftbox = document. getElementById('leftbox');
// 	leftbox.addEventListener("dragenter", function(e){e.preventDefault();} , false);
// 	leftbox.addEventListener("dragover", function(e){e.preventDefault();} , false);
// 	leftbox.addEventListener("drop", dropped, false);
// }

// function startDrag(e) {
// 	var code = '<img src="img/e1.jpg">';
// 	e.dataTransfer.setData('leftbox', code);
// }

// function dropped(e) {
// 	e.preventDefault();
// 	leftbox.innerHTML = e.dataTransfer.getData('leftbox');
// }

// window.onload = function() {      
//          var canvas =document.getElementById("leftbox");      
//          var context2D =canvas.getContext("2d");      
//          var pic = new Image();   
//          pic.onload=function(){  
//          context2D.drawImage(pic,0, 0);  }
//     }     


// window.addEventListener("load", doFirst, false);
// 
// 
//var context2D = "undefined";

//window.onload = function() {      

//         var canvas =document.getElementById("leftbox");      
//         context2D = canvas.getContext("2d");      
//         var element01 = new Image();
//         var element02 = new Image();
//         var element03 = new Image();
//         var element04 = new Image();
//         var element05 = new Image();
  //       var element06 = new Image();
   //      var element07 = new Image();
  //       element01.src = "img/point.svg";
//         element02.src = "img/line.svg";
//         element03.src = "img/face.svg";    
//         element04.src = "img/nature.svg";    
 //        element05.src = "img/deal.svg";    
//         element06.src = "img/drama.svg";
//         element07.src = "img/echo.svg";              
//         
//        element01.onload = function(){ 
//			drawElement(element01,0, 0); 
//		}
//		element02.onload = function(){ 
//			drawElement(element02,50, 0);
//		}
//		element03.onload = function(){
//			drawElement(element03,100, 0); 
//		}
//		element04.onload = function(){
//			drawElement(element04,150, 0);
//		}
//		element05.onload = function(){
//			drawElement(element05,200, 0);
//						}
//		element06.onload = function(){
//			drawElement(element06,250, 0); 
//		}
//		element07.onload = function(){
//			drawElement(element07,300, 0);
//		} 


//	}

//	function drawElement(elementName, xPos, yPos ){ 
//			context2D.drawImage(elementName, xPos, yPos, 50, 50); 
			

    	// context.fillStyle = "#000000";
    	// context.fillRect (xPos, yPos, 4, 4);
//	}

//	function dragElement(){
//		var rect = elementName.getBoundingClientRect();
 //      		return {
//          	xPos: xPos.clientX - rect.left,
//          	yPos: yPos.clientY - rect.top
//        };
//        var pos = getMousePos(canvas, evt);
//	};
//	function dropElement(){}; 


// window.addEventListener("load", doFirst, false);
// 
// 
// if( mouseX > imgXpos && mouseX < (imgXpos + imgWidth) //width
//  && mouseY > imgYpos && mouseY < (imgYpos + imgHeight) //height
//  
//  
//  
    var width = window.innerWidth;
    var height = window.innerHeight;
    var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height
    });
    var layer = new Konva.Layer();
    stage.add(layer);
    var tempLayer = new Konva.Layer();
    stage.add(tempLayer);
    var text = new Konva.Text({
        fill : 'black'
    });
    layer.add(text);
    var star;
    for (var i = 0; i < 10; i++) {
        star = new Konva.Star({
            x : stage.width() * Math.random(),
            y : stage.height() * Math.random(),
            fill : "blue",
            numPoints :10,
            innerRadius : 20,
            outerRadius : 25,
            draggable: true,
            name : 'star ' + i,
            shadowOffsetX : 5,
            shadowOffsetY : 5
        });
        layer.add(star);
    }
    layer.draw();
    stage.on("dragstart", function(e){
        e.target.moveTo(tempLayer);
        text.text('Moving ' + e.target.name());
        layer.draw();
    });
    var previousShape;
    stage.on("dragmove", function(evt){
        var pos = stage.getPointerPosition();
        var shape = layer.getIntersection(pos);
        if (previousShape && shape) {
            if (previousShape !== shape) {
                // leave from old targer
                previousShape.fire('dragleave', {
                    type : 'dragleave',
                    target : previousShape,
                    evt : evt.evt
                }, true);
                // enter new targer
                shape.fire('dragenter', {
                    type : 'dragenter',
                    target : shape,
                    evt : evt.evt
                }, true);
                previousShape = shape;
            } else {
                previousShape.fire('dragover', {
                    type : 'dragover',
                    target : previousShape,
                    evt : evt.evt
                }, true);
            }
        } else if (!previousShape && shape) {
            previousShape = shape;
            shape.fire('dragenter', {
                type : 'dragenter',
                target : shape,
                evt : evt.evt
            }, true);
        } else if (previousShape && !shape) {
            previousShape.fire('dragleave', {
                type : 'dragleave',
                target : previousShape,
                evt : evt.evt
            }, true);
            previousShape = undefined;
        }
    });
    stage.on("dragend", function(e){
        var pos = stage.getPointerPosition();
        var shape = layer.getIntersection(pos);
        if (shape) {
            previousShape.fire('drop', {
                type : 'drop',
                target : previousShape,
                evt : e.evt
            }, true);
        }
        previousShape = undefined;
        e.target.moveTo(layer);
        layer.draw();
        tempLayer.draw();
    });
    stage.on("dragenter", function(e){
        e.target.fill('green');
        text.text('dragenter ' + e.target.name());
        layer.draw();
    });
    stage.on("dragleave", function(e){
        e.target.fill('blue');
        text.text('dragleave ' + e.target.name());
        layer.draw();
    });
    stage.on("dragover", function(e){
        text.text('dragover ' + e.target.name());
        layer.draw();
    });
    stage.on("drop", function(e){
        e.target.fill('red');
        text.text('drop ' + e.target.name());
        layer.draw();
    });