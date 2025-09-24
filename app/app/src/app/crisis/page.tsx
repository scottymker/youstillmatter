export default function Crisis() {
  const crisis = [
    { label: "Call 988 (US)", href: "tel:988" },
    { label: "Crisis Text Line (US/CA/UK/IE)", href: "sms:741741" },
    { label: "Emergency Services (Local)", href: "tel:112" }
  ];
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Crisis Quick Actions</h1>
      <p className="text-mute">If you’re in immediate danger, call local emergency services.</p>
      <div className="space-y-3">
        {crisis.map((c) => (
          <a key={c.label} href={c.href} className="block border rounded-xl2 p-4 text-center text-lg font-medium">
            {c.label}
          </a>
        ))}
      </div>
      <div className="text-xs text-mute mt-6">
        This app is not monitored and does not store personal identifiers. In emergencies, use phone services directly.
      </div>
    </section>
  );
}
