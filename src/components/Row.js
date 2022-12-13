import { Cell } from "./Cell";

export const Row = ({ row, playGame }) => {
    return (       
      <tr>
        {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} playGame={playGame} />)}
      </tr>
    );
}