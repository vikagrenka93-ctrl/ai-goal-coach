export default function PremiumBanner(props: { onUpgrade?: () => void }) {
  return (
    <div className="card premium">
      <div className="cardHeader">
        <div>
          <div className="cardTitle">✨ Premium</div>
          <div className="cardSubtitle">
            Больше целей, умные подсказки, расширенная аналитика и автоплан задач.
          </div>
        </div>
        <span className="badge">Telegram Stars</span>
      </div>
      <div className="btnRow">
        <button className="btn btnPrimary" onClick={props.onUpgrade}>
          Улучшить
        </button>
        <button className="btn">Подробнее</button>
      </div>
    </div>
  );
}

