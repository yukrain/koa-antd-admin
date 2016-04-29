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

    return function*(next) {

        var canvas = new Canvas(params.canvasWidth, params.canvasHeight)
        var ctx = canvas.getContext('2d')

        ctx.antialias = 'gray'
        ctx.fillStyle = params.background
        ctx.fillRect(0, 0, params.canvasWidth, params.canvasHeight)
        ctx.strokeRect(0, 0, params.canvasWidth, params.canvasHeight)
        ctx.fillStyle = params.color
        ctx.lineWidth = params.lineWidth
        ctx.strokeStyle = params.color
        ctx.addFont(enFont);
        ctx.font = 'normal normal '+params.fontSize + 'px enFont'

        for (var i = 0; i < 2; i++) {
            ctx.moveTo(10, Math.random() * params.canvasHeight)
            ctx.bezierCurveTo(80, Math.random() * params.canvasHeight, 160, Math.random() * params.canvasHeight, params.canvasWidth - 20, Math.random() * params.canvasHeight)
            ctx.stroke()
        }

        var text = params.text || Math.random().toString(32).substr(2, params.codeLength).toLocaleUpperCase();
        for (i = 0; i < text.length; i++) {
            ctx.setTransform(
                Math.random() * 0.5 + 1,
                Math.random() * 0.4,
                Math.random() * 0.4,
                Math.random() * 0.2 + 1,
                (params.canvasWidth / params.codeLength) * i + params.fontSize/10,
                params.canvasHeight - (params.canvasHeight - params.fontSize + 10 ) / 2)
            ctx.fillText(text.charAt(i), 0, 0)
        }

        return yield new Promise(function(resolve, reject) {
            canvas.toBuffer(function(err, data) {
                if (err) {
                    return reject(err)
                } else {
                    return resolve([text,data])
                }
            })
        });
    }
}