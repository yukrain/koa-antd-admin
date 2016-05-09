var Canvas = require('canvas');
var Font = Canvas.Font;
var path = require("path");

if (!Font) {
    throw new Error('Need to compile with font support');
}
var enFont = new Font('enFont', path.join(__dirname, '../public/font/Pfennig.ttf'));

module.exports = function(params) {

    params.color = params.color || 'rgb(0,0,0)'
    params.background = params.background || 'rgb(255,255,255)'
    params.lineWidth = params.lineWidth || 1
    params.fontSize = params.fontSize || 30
    params.codeLength = params.length || 5
    params.canvasWidth = params.width || 250
    params.canvasHeight = params.height || 150
    params.type = params.type || 'normal';     //normal 普通  number 仅数字 letter 仅字母 arithmetic 算数题

    return function*(next) {

        var canvas = new Canvas(params.canvasWidth, params.canvasHeight)
        var ctx = canvas.getContext('2d')

        ctx.antialias = 'gray'
        ctx.fillStyle = params.background
        ctx.fillRect(0, 0, params.canvasWidth, params.canvasHeight)
        ctx.strokeRect(0, 0, params.canvasWidth, params.canvasHeight)
        ctx.fillStyle = params.color
        ctx.lineWidth = params.lineWidth

        ctx.addFont(enFont);
        ctx.font = 'normal normal '+params.fontSize + 'px enFont'

        ctx.strokeStyle = 'grey'
        for (var i = 0; i < 3; i++) {
            ctx.moveTo(10, Math.random() * params.canvasHeight)
            ctx.bezierCurveTo(80, Math.random() * params.canvasHeight, 160, Math.random() * params.canvasHeight, params.canvasWidth - 20, Math.random() * params.canvasHeight)
            ctx.stroke()
        }

        ctx.strokeStyle = params.color
        var text;
        var result;
       switch ( params.type ){
           case 'number':
               result = text =  Math.random().toString(10).substr(2, params.codeLength).toLocaleUpperCase();
               break;
           case 'letter':
               for(var i =0; i<params.codeLength; i++){
                   text +=  String.fromCharCode(Math.ceil(Math.random() * 25) + 65).toLocaleUpperCase();
               }
               result = text;
               break;
           case 'arithmetic':


               switch( Math.ceil(Math.random() * 4) ){
                   //加
                   case 1:
                       var num1 = Math.floor(Math.random() * 100);
                       var num2 = Math.floor(Math.random() * 100);
                       text =  [num1, "+", num2, "="];
                       result = num1 + num2;
                       break;
                   //减
                   case 2:
                       var num1 = Math.floor(Math.random() * 100);
                       var num2 = Math.floor(Math.random() * 100);
                       if(num1 > num2){
                           text =  [num1, "-", num2, "="];
                           result = num1 - num2;
                       }else{
                           text =  [num2, "-", num1, "="];
                           result = num2 - num1;
                       }
                       break;
                   //乘
                   case 3:
                       var num1 = Math.ceil(Math.random() * 20);
                       var num2 = Math.ceil(Math.random() * 9);
                       text =  [num1, "×", num2, "="];
                       result = num1 * num2;

                       break;
                   //除
                   case 4:
                       var num1 = Math.ceil(Math.random() * 9);
                       var num2 = Math.ceil(Math.random() * 8 + 1);
                       text =  [ num1 * num2, "÷", num1, "="];
                       result = num2;
                       break;

               }

               params.codeLength = 4;
               break;
           default:
               result =text =  Math.random().toString(35).substr(2, params.codeLength).toLocaleUpperCase();
       }

        text = params.text || text;

            for (i = 0; i < text.length; i++) {
                ctx.setTransform(
                    Math.random() * 0.5 + 1,
                    Math.random() * 0.4,
                    Math.random() * 0.4,
                    Math.random() * 0.2 + 1,
                    (params.canvasWidth / params.codeLength) * i + params.fontSize/10,
                    params.canvasHeight - (params.canvasHeight - params.fontSize + 16 ) / 2);

                if(typeof text == 'string'){
                    ctx.fillText(text.charAt(i), 0, 0)
                }else if(typeof text == 'object'){
                    ctx.fillText(text[i], 0, 0)
                }
            }

        return yield new Promise(function(resolve, reject) {
            canvas.toBuffer(function(err, data) {
                if (err) {
                    return reject(err)
                } else {
                    return resolve([result,data])
                }
            })
        });
    }
}