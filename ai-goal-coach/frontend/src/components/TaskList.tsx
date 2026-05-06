export type Task = {
  id: string;
  title: string;
  done: boolean;
};

export default function TaskList(props: { tasks: Task[]; onToggle?: (id: string) => void }) {
  if (props.tasks.length === 0) {
    return <div className="muted">Задач на сегодня пока нет.</div>;
  }

  return (
    <div>
      {props.tasks.map((t) => (
        <div key={t.id} className="task">
          <div>
            <div style={{ fontWeight: 650, textDecoration: t.done ? "line-through" : "none" }}>
              {t.title}
            </div>
            <div className="muted" style={{ fontSize: 12 }}>
              {t.done ? "Выполнено" : "В процессе"}
            </div>
          </div>
          <button className="btn" onClick={() => props.onToggle?.(t.id)}>
            {t.done ? "↩︎" : "✓"}
          </button>
        </div>
      ))}
    </div>
  );
}

