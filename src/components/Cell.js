import '../styles/game.css';

export const Cell = ({ value, columnIndex, playGame }) => {    
    let color = 'white';
    if (value === 1) {
      color = 'red';
    } else if (value === 2) {
      color = 'yellow';
    }
      
    return (
      <td>
        <div className='cell' onClick={() => {playGame(columnIndex)}}>
          <div className={color}></div>
        </div>
      </td>
    );
}