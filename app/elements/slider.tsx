import React from 'react'
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
 
type SliderProps = React.ComponentProps<typeof Slider>
const slider = ({ className, ...props }: SliderProps) => {
  return (
    <div>
       <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn("w-[60%]", className)}
      {...props}
    />
    </div>
  )
}

export default slider
