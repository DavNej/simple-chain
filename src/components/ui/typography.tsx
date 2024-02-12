import { cn } from '@/lib/utils'

export type HeadingProps = React.BaseHTMLAttributes<HTMLHeadingElement>

export function H1(props: HeadingProps) {
  return (
    <h1
      {...props}
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        props.className,
      )}
    />
  )
}

export function H2(props: HeadingProps) {
  return (
    <h2
      {...props}
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        props.className,
      )}
    />
  )
}

export function H3(props: HeadingProps) {
  return (
    <h3
      {...props}
      className={cn(
        'scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0',
        props.className,
      )}
    />
  )
}
