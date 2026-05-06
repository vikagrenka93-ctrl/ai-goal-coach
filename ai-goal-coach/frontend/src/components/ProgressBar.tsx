export default function ProgressBar(props: { value: number }) {
  const v = Math.max(0, Math.min(100, props.value));
  return (
    <div className="progressBar" aria-label={`progress ${v}%`}>
      <div className="progressFill" style={{ width: `${v}%` }} />
    </div>
  );
}

