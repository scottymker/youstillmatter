export default function Home() {
  return (
    <section className="space-y-4">
      <p className="text-lg">Calm tools and crisis resources—your data stays on your device.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <a href="/crisis" className="block border rounded-xl2 p-5">
          <h2 className="text-lg font-semibold">Crisis Quick Actions</h2>
          <p className="text-sm text-mute">Dial 988, text support, or ping a trusted contact.</p>
        </a>
        <a href="/grounding" className="block border rounded-xl2 p-5">
          <h2 className="text-lg font-semibold">5-4-3-2-1 Grounding</h2>
          <p className="text-sm text-mute">Guide your senses back to the present.</p>
        </a>
        <a href="/checkin" className="block border rounded-xl2 p-5">
          <h2 className="text-lg font-semibold">Daily Check-in</h2>
          <p className="text-sm text-mute">Quick mood slider + optional note.</p>
        </a>
      </div>
    </section>
  );
}
