import Tile from "../Tile/Tile";

function SkillsList({ skills }) {
  return (
    <div className="skills-list">
      {skills.map((skill) => (
        <Tile key={skill} text={skill} />
      ))}
    </div>
  );
}

export default SkillsList;
