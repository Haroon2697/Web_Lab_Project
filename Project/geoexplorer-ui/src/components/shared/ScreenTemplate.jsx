import { SectionCard } from './SectionCard'
import { TemplateBlock } from './TemplateBlock'

export function ScreenTemplate({ screenTitle, panel, owner, blocks }) {
  return (
    <div className="space-y-6">
      <SectionCard title={screenTitle} owner={owner}>
        <p className="mb-4 text-sm text-geo-p10">{panel} Screen Template (UI scaffolding only)</p>
        <div className="grid gap-3 md:grid-cols-2">
          {blocks.map((block) => (
            <TemplateBlock key={block.label} label={block.label} notes={block.notes} />
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
