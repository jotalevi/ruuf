const calculatePannels = () => {
  let packed_a = pseudoPackPannels(
    document.playgroudData.ruuf,
    document.playgroudData.pannel,
    true
  );
  let packed_b = pseudoPackPannels(document.playgroudData.ruuf, {
    x: document.playgroudData.pannel.y,
    y: document.playgroudData.pannel.x,
  });

  document.playgroudData.packedPannels =
    packed_a.length > packed_b.length ? packed_a : packed_b;
};

const pseudoPackPannels = (ruuf, pannel, flipOrientation) => {
  let squaredRows = Math.floor(ruuf.x / pannel.x);
  let squaredColumns = Math.floor(ruuf.y / pannel.y);

  let placedPannels = [];
  for (let i = 0; i < squaredRows; i++) {
    for (let j = 0; j < squaredColumns; j++) {
      placedPannels.push({
        x: i * pannel.x,
        y: j * pannel.y,
        r: flipOrientation ? 1 : 0,
      });
    }
  }

  if (ruuf.x - squaredRows * pannel.x >= pannel.y) {
    let startingAt = squaredRows * pannel.x;
    let spaceLeftRow = ruuf.x - startingAt;

    let extraRows = Math.floor(spaceLeftRow / pannel.y);
    let extraColumns = Math.floor(ruuf.y / pannel.x);

    for (let i = 0; i < extraRows; i++) {
      for (let j = 0; j < extraColumns; j++) {
        placedPannels.push({
          x: startingAt + i * pannel.y,
          y: j * pannel.x,
          r: flipOrientation ? 0 : 1,
        });
      }
    }
  } else if (ruuf.y - squaredColumns * pannel.y >= pannel.x) {
    let startingAt = squaredColumns * pannel.y;
    let spaceLeftCol = ruuf.y - startingAt;

    let extraColumns = Math.floor(spaceLeftCol / pannel.x);
    let extraRows = Math.floor(ruuf.x / pannel.y);

    for (let i = 0; i < extraColumns; i++) {
      for (let j = 0; j < extraRows; j++) {
        placedPannels.push({
          x: j * pannel.y,
          y: startingAt + i * pannel.x,
          r: flipOrientation ? 0 : 1,
        });
      }
    }
  }

  return placedPannels;
};
