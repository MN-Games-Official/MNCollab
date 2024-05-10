// Client-side JavaScript
const socket = io();

const whiteboard = document.getElementById('whiteboard');
const ctx = whiteboard.getContext('2d');

whiteboard.addEventListener('mousedown', startDrawing);
whiteboard.addEventListener('mousemove', draw);
whiteboard.addEventListener('mouseup', stopDrawing);
whiteboard.addEventListener('mouseout', stopDrawing);

let isDrawing = false;

function startDrawing(event) {
    isDrawing = true;
    draw(event);
}

function draw({ offsetX, offsetY }) {
    if (!isDrawing) return;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);

    socket.emit('draw', { offsetX, offsetY });
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

socket.on('draw', ({ offsetX, offsetY }) => {
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
});
