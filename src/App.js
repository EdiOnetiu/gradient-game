import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Tile from './Components/Tile';

const title = "Gradient Game";
const description = 'Welcome to the Gradient game! In this game, you will be presented with a grid of colored tiles. Your goal is to rearrange the tiles so that they are in the correct order. Simply click on a tile to select it and then click on another tile to swap their positions. Try to solve the puzzle with as few moves as possible and restore the grid to the correct configuration. Good luck!';

function ColorGrid() {
  const [colors, setColors] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);

  const [moveCounter, setMoveCounter] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [initialConfig, setInitialConfig] = useState([]);

  useEffect(() => {
    // Initialize the colors array with 36 random colors
    const initColors = [];
    for (let i = 0; i < 36; i++) {
      initColors.push(generateColorsMemoized(Math.floor(i / 6), i % 6, 'rgb(50, 50, 50)'));
    }
    setInitialConfig(initColors);
    setColors(initColors);
  }, []);

  useEffect(() => {
    if (isGameStarted && colors.join() === initialConfig.join()) {
      window.alert(`Congratulations! You solved the puzzle in ${moveCounter} moves!`);
    }
  }, [isGameStarted, colors]);

  function resetGame() {
    setMoveCounter(0);
    setColors(initialConfig);
    setIsGameStarted(false);
  }
  const generateColorsMemoized = useMemo(() => {
    function generateColors(row, col) {
      // Initialize the first tile's color
      if (row === 0 && col === 0) {
        return 'rgb(50, 50, 50)';
      }

      // Generate the colors for the rest of the grid based on the first tile's color
      const red = 50 + row * 40;
      const green = 50 + row * 10 + col * 10;
      const blue = 50 + col * 40;
      return `rgb(${red}, ${green}, ${blue})`;
    }
    return generateColors;
  }, []);

  function shuffleTiles() {
    const shuffledTiles = colors.slice();
    for (let i = 0; i < 36; i++) {
      if (i !== 0 && i !== 5 && i !== 30 && i !== 35) {
        let randomIndex = Math.floor(Math.random() * 36);
        while (randomIndex === 0 || randomIndex === 5 || randomIndex === 30 || randomIndex === 35 || randomIndex === i) {
          randomIndex = Math.floor(Math.random() * 36);
        }
        [shuffledTiles[i], shuffledTiles[randomIndex]] = [shuffledTiles[randomIndex], shuffledTiles[i]];
      }
    }
    setColors(shuffledTiles);
  }

  function handleTileClick(index) {
    // If no tile is currently selected, select this tile
    if (selectedTile === null) {
      setSelectedTile(index);
      return;
    }

    // If the selected tile is the same as the clicked tile, deselect it and return
    if (selectedTile === index) {
      setSelectedTile(null);
      return;
    }

    // Swap the colors of the selected and clicked tiles
    const newColors = [...colors];
    const tempColor = newColors[index];
    newColors[index] = newColors[selectedTile];
    newColors[selectedTile] = tempColor;
    setColors(newColors);

    // Increment the move counter
    setMoveCounter(moveCounter + 1);

    // Deselect the tiles
    setSelectedTile(null);
  }

  function handleStartButtonClick() {
    setIsGameStarted(true);
    setMoveCounter(0);
    shuffleTiles();
  }


  return (
    <div className="container">
      <p className="title">{title}</p>
      <div style={{
        width: '700px',
        fontFamily: 'Oxygen',
        fontSize: '16px',
        color: '#333',
        textAlign: 'center',
        margin: '10px'
      }}>{description}</div>
      <div className="color-grid">
        {colors.map((color, index) => (
          <Tile
            key={index}
            index={index}
            color={color}
            onClick={() => handleTileClick(index)}
            selected={index === selectedTile}
          />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="buttons" style={{ backgroundColor: 'gray', marginRight: '10px' }} onClick={() => shuffleTiles()}>
          Shuffle Tiles
        </button>
        {isGameStarted ? (
          <button className="buttons" style={{ backgroundColor: 'red' }} onClick={resetGame}>
            Reset game
          </button>
        ) : (
          <button className="buttons" style={{ backgroundColor: 'green' }} onClick={handleStartButtonClick}>
            Start game
          </button>
        )}
      </div>

      {isGameStarted && (
        <div style={{ marginTop: '5px' }}>
          <p className="description">Total moves: {moveCounter}</p>
        </div>
      )}

    </div>
  );
}

function App() {
  return (
    <ColorGrid />
  );
}

export default App;
