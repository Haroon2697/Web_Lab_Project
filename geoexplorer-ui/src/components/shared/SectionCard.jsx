export function SectionCard({ title, owner, children }) {
  return (
    <section className="rounded-2xl border border-geo-p20/40 bg-geo-card p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <span className="rounded-full bg-geo-p50/20 px-3 py-1 text-xs font-semibold text-geo-p10">
          Owner: {owner}
        </span>
      </div>
      {children}
    </section>
  )
}
