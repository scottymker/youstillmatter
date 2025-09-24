export default function Home() {
  return (
    <section className="space-y-4">
      <p className="text-lg">
        Calm tools and crisis resources—your data stays on your device.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <a href="/self-care" className="card">
          <h2>Self-Care Menu</h2>
          <p>Quick actions when you need a gentle nudge.</p>
        </a>

        <a href="/grounding" className="card">
          <h2>5-4-3-2-1 Grounding</h2>
          <p>Guide your senses back to the present.</p>
        </a>

        <a href="/crisis" className="card">
          <h2>Crisis Quick Actions</h2>
          <p>Dial 988, text support, or ping a trusted contact.</p>
        </a>

        <a href="/checkin" className="card">
          <h2>Daily Check-in</h2>
          <p>Quick mood slider + optional note.</p>
        </a>
      </div>
    </section>
  );
}
