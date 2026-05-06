export default function SettingsPage() {
  return (
    <div className="card">
      <div className="cardTitle">⚙️ Настройки</div>
      <div className="cardSubtitle">Заглушка. Здесь будут timezone, уведомления, premium и т.д.</div>
      <div className="hr" />
      <div className="btnRow">
        <button className="btn">Уведомления</button>
        <button className="btn btnDanger">Сбросить данные</button>
      </div>
    </div>
  );
}

