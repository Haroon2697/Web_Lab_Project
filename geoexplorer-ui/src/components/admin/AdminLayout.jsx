export function AdminLayout({ title, children }) {
  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-geo-p10">{title}</h1>
      </header>
      {children}
    </section>
  )
}
