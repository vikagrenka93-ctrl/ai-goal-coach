import ProgressBar from "./ProgressBar";

export type Goal = {
  id: string;
  title: string;
  description?: string;
  completedTasks: number;
  totalTasks: number;
};

export default function GoalCard(props: { goal: Goal; onOpen?: () => void }) {
  const pct = props.goal.totalTasks === 0 ? 0 : (props.goal.completedTasks / props.goal.totalTasks) * 100;

  return (
    <div className="card">
      <div className="cardHeader">
        <div>
          <div className="cardTitle">🎯 {props.goal.title}</div>
          {props.goal.description ? (
            <div className="cardSubtitle">{props.goal.description}</div>
          ) : (
            <div className="cardSubtitle">Без описания</div>
          )}
        </div>
        <div className="badge">
          {props.goal.completedTasks}/{props.goal.totalTasks}
        </div>
      </div>

      <div className="progressWrap">
        <ProgressBar value={pct} />
      </div>

      <div className="hr" />

      <div className="btnRow">
        <button className="btn btnPrimary" onClick={props.onOpen}>
          Открыть
        </button>
        <button className="btn">Чек‑ин</button>
      </div>
    </div>
  );
}

