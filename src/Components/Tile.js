import React from 'react';

export default function Tile({ index, color, selected, onClick }) {
    const row = Math.floor(index / 6);
    const col = index % 6;
    const isCornerTile = (row === 0 && col === 0) || (row === 0 && col === 5) || (row === 5 && col === 0) || (row === 5 && col === 5);
    const style = {
        width: '100px',
        height: '100px',
        backgroundColor: color,
        border: selected ? '2px solid blue' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div style={style} onClick={isCornerTile ? null : onClick}>
            {isCornerTile && (
                <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>x</span>
            )}
        </div>
    );
}