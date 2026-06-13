export default function HandAnimations() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-center gap-4">
        <div className="hand flex items-center justify-center">👇</div>
        <div className="hand flex items-center justify-center">👇</div>
      </div>
      <p className="text-center text-lg font-bold text-[var(--color-urgency)]">
        ¡No dejes pasar esta oferta!
      </p>
    </div>
  );
}
