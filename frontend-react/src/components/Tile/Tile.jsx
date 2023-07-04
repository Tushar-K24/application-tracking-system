import "./Tile.css";

function Tile({ text, classNames, style }) {
  return (
    <div style={style} className={`tile ${classNames}`}>
      <p>{text}</p>
    </div>
  );
}

export default Tile;
