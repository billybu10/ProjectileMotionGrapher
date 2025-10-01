const graph = document.getElementById("graph");
const can = document.getElementById("can");
const velocity = document.getElementById("v");
const angle = document.getElementById("a");
const gravity = document.getElementById("g");
const results = document.getElementById("results");
const download = document.getElementById("dl");

const ctx = can.getContext("2d");

function init() {
    can.height = window.innerHeight*0.7;
    can.width = window.innerWidth;

    ctx.beginPath();
    ctx.clearRect(0, 0, can.width, can.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    
    ctx.moveTo(40, 30);
    ctx.lineTo(40, can.height-30);
    ctx.lineTo(can.width-20, can.height-30);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.moveTo (40, 30);
    ctx.lineTo (35, 35);
    ctx.moveTo (40, 30);
    ctx.lineTo (45, 35);
    ctx.stroke ();

    ctx.lineWidth = 1;
    ctx.moveTo (can.width-20, can.height-30);
    ctx.lineTo (can.width-25, can.height-25);
    ctx.stroke();
    ctx.moveTo (can.width-20, can.height-30);
    ctx.lineTo (can.width-25, can.height-35);
    ctx.stroke ();

    ctx.font = "13px Arial";
    ctx.fillText("h",20,30);
    ctx.fillText("[m]", 13, 43);
    ctx.stroke();


    ctx.fillText("z[m]", can.width-50, can.height-10);
    ctx.stroke();
}

init();

graph.onclick = () => {
    
    var hmax = Math.pow(velocity.value*Math.sin(angle.value*Math.PI/180),2)/(2*gravity.value);
    var z = Math.pow(velocity.value,2)*Math.sin(2*angle.value*Math.PI/180)/gravity.value;

    if(hmax !== undefined && hmax !== NaN && z !== undefined && z !== NaN){
        results.innerHTML = "";
        var maxHeightRow = document.createElement("tr");
        var maxHeightNameField = document.createElement("td");
        maxHeightNameField.innerText = "Max Height: ";
        var maxHeightValField = document.createElement("td");
        maxHeightValField.innerText = hmax.toFixed(2) + " m";
        maxHeightRow.appendChild(maxHeightNameField);
        maxHeightRow.appendChild(maxHeightValField);
        results.appendChild(maxHeightRow);


        var distanceRow = document.createElement("tr");
        var disNameField = document.createElement("td");
        disNameField.innerText = "Distance: ";
        var disValField = document.createElement("td");
        disValField.innerText = z.toFixed(2) + " m";
        distanceRow.appendChild(disNameField);
        distanceRow.appendChild(disValField);
        results.appendChild(distanceRow);

        init();
        ctx.beginPath();
        var real_end_x = z*5;
        var real_mid_y = hmax*5;
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.moveTo(40, can.height-30);
        ctx.bezierCurveTo(40 + real_end_x/3, can.height -30 -real_mid_y, 40 + real_end_x*2/3, can.height -30 -real_mid_y, 40 + real_end_x, can.height -30);
        ctx.stroke();

        

    }else{
        alert("Incorect data!");
    }
}

download.onclick = () => {
    var image = can.toDataURL();
    var aDownloadLink = document.createElement('a');
    aDownloadLink.download = 'canvas_image.png';
    aDownloadLink.href = image;
    aDownloadLink.click();
}





