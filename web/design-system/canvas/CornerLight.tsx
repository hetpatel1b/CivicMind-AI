import React from "react"

import { BackgroundGlow, BackgroundGlowProps } from "./BackgroundGlow"

export const CornerLight = React.forwardRef<HTMLDivElement, BackgroundGlowProps>(
  (props, ref) => {
    return <BackgroundGlow ref={ref} size="xl" {...props} />
  }
)
CornerLight.displayName = "CornerLight"
