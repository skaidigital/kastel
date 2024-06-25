interface Props {
  fill: number
}

export function Star({ fill }: Props) {
  const fillPercentage = Math.min(Math.max(fill, 0), 100)

  const gradientId = `gradient-${Math.random()}`

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradientId}>
          <stop
            offset={`${fillPercentage}%`}
            stopColor="currentColor"
            className="text-brand-primary"
          />
          <stop
            offset={`${fillPercentage}%`}
            stopColor="currentColor"
            className="text-brand-light-grey"
          />
        </linearGradient>
      </defs>
      <polygon
        points="12,2 15,8.5 22,9 17,14 18,21 12,17.5 6,21 7,14 2,9 9,8.5"
        fill={`url(#${gradientId})`}
      />
    </svg>
  )
}
