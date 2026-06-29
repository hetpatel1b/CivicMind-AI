import React from "react"
import { cn } from "../utilities/cn"
import { MeshOverlay } from "./MeshOverlay"
import { GridOverlay } from "./GridOverlay"
import { NoiseOverlay } from "./NoiseOverlay"
import { CornerLight } from "./CornerLight"

export interface AmbientCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  withMesh?: boolean
  withGrid?: boolean
  withNoise?: boolean
  withCornerLights?: boolean
}

export const AmbientCanvas = React.forwardRef<HTMLDivElement, AmbientCanvasProps>(
  ({ className, withMesh = true, withGrid = false, withNoise = true, withCornerLights = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("fixed inset-0 pointer-events-none z-canvas overflow-hidden", className)}
        {...props}
      >
        {withMesh && <MeshOverlay />}
        {withGrid && <GridOverlay />}
        {withCornerLights && (
          <>
            <CornerLight position="top-left" color="primary" />
            <CornerLight position="bottom-right" color="accent" />
          </>
        )}
        {withNoise && <NoiseOverlay />}
      </div>
    )
  }
)
AmbientCanvas.displayName = "AmbientCanvas"
