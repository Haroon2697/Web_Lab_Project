type TemplateBlockProps = {
  label: string
  notes?: string
}

export function TemplateBlock({ label, notes }: TemplateBlockProps) {
  return (
    <div className="rounded-xl border border-dashed border-geo-p20/50 bg-geo-bg p-4">
      <p className="text-sm font-semibold text-geo-aqua">{label}</p>
      {notes ? <p className="mt-1 text-sm text-geo-p10">{notes}</p> : null}
    </div>
  )
}
