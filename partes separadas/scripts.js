const startup = () => {
  document.playgroudData = {
    ruuf: { x: 50, y: 50 },
    pannel: { x: 50, y: 50 },
    packedPannels: [],
    canvas: document.getElementById("canvas"),
    inputs: {
      ruuf_x: document.getElementById("ruuf_x"),
      ruuf_y: document.getElementById("ruuf_y"),
      pannel_x: document.getElementById("pannel_x"),
      pannel_y: document.getElementById("pannel_y"),
    },
    labels: {
      ruuf_x: document.getElementById("label_ruuf_x"),
      ruuf_y: document.getElementById("label_ruuf_y"),
      pannel_x: document.getElementById("label_pannel_x"),
      pannel_y: document.getElementById("label_pannel_y"),
    },
  };

  document.playgroudData.inputs.ruuf_x.addEventListener("input", (e) => {
    document.playgroudData.ruuf.x = e.target.value;
    document.playgroudData.labels.ruuf_x.innerText = `Ancho techo: ${e.target.value}`;
    calculatePannels();
    display();
  });

  document.playgroudData.inputs.ruuf_y.addEventListener("input", (e) => {
    document.playgroudData.ruuf.y = e.target.value;
    document.playgroudData.labels.ruuf_y.innerText = `Largo techo: ${e.target.value}`;
    calculatePannels();
    display();
  });

  document.playgroudData.inputs.pannel_x.addEventListener("input", (e) => {
    document.playgroudData.pannel.x = e.target.value;
    document.playgroudData.labels.pannel_x.innerText = `Ancho panel: ${e.target.value}`;
    calculatePannels();
    display();
  });

  document.playgroudData.inputs.pannel_y.addEventListener("input", (e) => {
    document.playgroudData.pannel.y = e.target.value;
    document.playgroudData.labels.pannel_y.innerText = `Largo panel: ${e.target.value}`;
    calculatePannels();
    display();
  });

  display();
};

const display = () => {
  let scale = 7.5;
  let ctx = document.playgroudData.canvas.getContext("2d");

  let ruufWidth = document.playgroudData.ruuf.x * scale;
  let masterXOffset =
    Math.abs(ruufWidth - document.playgroudData.canvas.width) / 2;

  let ruufHeight = document.playgroudData.ruuf.y * scale;
  let masterYOffset =
    Math.abs(ruufHeight - document.playgroudData.canvas.height) / 2;

  ctx.save();
  ctx.beginPath();
  ctx.clearRect(
    0,
    0,
    document.playgroudData.canvas.width,
    document.playgroudData.canvas.height
  );

  ctx.strokeStyle = "#7e7e7e";
  ctx.fillStyle = "#eeeeee";

  ctx.rect(masterXOffset, masterYOffset, ruufWidth, ruufHeight);
  ctx.fillRect(masterXOffset, masterYOffset, ruufWidth, ruufHeight);
  ctx.stroke();

  for (const i of document.playgroudData.packedPannels) {
    ctx.fillStyle = "#ff000038";
    ctx.strokeStyle = "red";

    if (i.r === 0) {
      ctx.fillRect(
        masterXOffset + i.x * scale,
        masterYOffset + i.y * scale,
        document.playgroudData.pannel.y * scale,
        document.playgroudData.pannel.x * scale
      );
      ctx.rect(
        masterXOffset + i.x * scale,
        masterYOffset + i.y * scale,
        document.playgroudData.pannel.y * scale,
        document.playgroudData.pannel.x * scale
      );
      ctx.stroke();
    } else {
      ctx.fillRect(
        masterXOffset + i.x * scale,
        masterYOffset + i.y * scale,
        document.playgroudData.pannel.x * scale,
        document.playgroudData.pannel.y * scale
      );
      ctx.rect(
        masterXOffset + i.x * scale,
        masterYOffset + i.y * scale,
        document.playgroudData.pannel.x * scale,
        document.playgroudData.pannel.y * scale
      );
      ctx.stroke();
    }
  }
};
