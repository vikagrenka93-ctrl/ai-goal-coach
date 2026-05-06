import { useMemo, useState } from "react";

export default function AddGoalModal(props: {
  open: boolean;
  onClose: () => void;
  onCreate: (goal: { title: string; description?: string }) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const canCreate = useMemo(() => title.trim().length >= 2, [title]);

  if (!props.open) return null;

  return (
    <div className="modalBackdrop" onMouseDown={props.onClose} role="dialog" aria-modal="true">
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="cardTitle">➕ Новая цель</div>
        <div className="cardSubtitle">Коротко и конкретно — что хотите изменить?</div>

        <div className="field">
          <label className="muted" style={{ fontSize: 12 }}>
            Название
          </label>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: Подготовиться к собеседованию"
          />
        </div>

        <div className="field">
          <label className="muted" style={{ fontSize: 12 }}>
            Описание (опционально)
          </label>
          <textarea
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Контекст, ограничения, дедлайн..."
          />
        </div>

        <div className="btnRow">
          <button
            className={`btn btnPrimary`}
            disabled={!canCreate}
            onClick={() => {
              props.onCreate({ title: title.trim(), description: description.trim() || undefined });
              setTitle("");
              setDescription("");
              props.onClose();
            }}
          >
            Создать
          </button>
          <button className="btn" onClick={props.onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

