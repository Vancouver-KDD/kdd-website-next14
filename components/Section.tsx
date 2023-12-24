import clsx from 'clsx'

type SectionProps = {
  title?: string
  className?: string
  children: React.ReactNode
}
export default function Section({title, className, children, ...restProps}: SectionProps) {
  return (
    <section className={clsx('flex-center py-8', className)} {...restProps}>
      <div className="w-[calc(100vw-2rem)] max-w-5xl">
        {title && (
          <div className="flex-col flex-center gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center">{title}</h2>
            <div className="w-36 h-0.5 bg-red-500" />
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
