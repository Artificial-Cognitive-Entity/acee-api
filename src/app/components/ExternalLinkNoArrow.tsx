export function ExternalLinkNoArrow({
    href,
    children
  }: {
    href: string
    children: React.ReactNode
  }) {
    return (
      <a
        href={href}
        target="_blank"
        className="inline-flex flex-1 justify-center gap-1 leading-4 hover:underline z-10"
      >
        <span>{children}</span>
      </a>
    )
  }