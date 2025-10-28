"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Fragment } from "react"

interface ScheduleBlock {
  id: string
  day: number // 0 = Monday, 6 = Sunday
  startHour: number
  endHour: number
  subject: string
  group: string
  room?: string
  color?: string
}

interface WeeklyScheduleProps {
  scheduleBlocks: ScheduleBlock[]
  title?: string
}

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
const hours = Array.from({ length: 14 }, (_, i) => i + 6) // 6 AM to 8 PM

const defaultColors = [
  "bg-blue-100 border-blue-300 text-blue-900",
  "bg-green-100 border-green-300 text-green-900",
  "bg-purple-100 border-purple-300 text-purple-900",
  "bg-orange-100 border-orange-300 text-orange-900",
  "bg-pink-100 border-pink-300 text-pink-900",
  "bg-teal-100 border-teal-300 text-teal-900",
]

export function WeeklySchedule({ scheduleBlocks, title = "Horario Semanal" }: WeeklyScheduleProps) {
  const getBlocksForCell = (day: number, hour: number) => {
    return scheduleBlocks.filter((block) => block.day === day && hour >= block.startHour && hour < block.endHour)
  }

  const getBlockHeight = (block: ScheduleBlock) => {
    const duration = block.endHour - block.startHour
    return duration * 60 // 60px per hour
  }

  const getColorClass = (index: number) => {
    return defaultColors[index % defaultColors.length]
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header with days */}
            <div className="grid grid-cols-8 gap-px bg-border">
              <div className="bg-card p-3 font-semibold text-sm text-muted-foreground">Hora</div>
              {days.map((day) => (
                <div key={day} className="bg-card p-3 font-semibold text-sm text-center text-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Schedule grid */}
            <div className="grid grid-cols-8 gap-px bg-border">
              {hours.map((hour) => (
                <Fragment key={`hour-row-${hour}`}>
                  {/* Hour label */}
                  <div className="bg-card p-3 text-sm text-muted-foreground font-medium">
                    {hour}:00
                  </div>

                  {/* Day cells */}
                  {days.map((_, dayIndex) => {
                    const blocks = getBlocksForCell(dayIndex, hour)
                    const isFirstHourOfBlock = blocks.some((block) => block.startHour === hour)

                    return (
                      <div key={`${dayIndex}-${hour}`} className="bg-card p-1 min-h-[60px] relative">
                        {isFirstHourOfBlock &&
                          blocks
                            .filter((block) => block.startHour === hour)
                            .map((block, index) => (
                              <div
                                key={block.id}
                                className={cn(
                                  "absolute inset-1 rounded-lg border-2 p-2 overflow-hidden",
                                  block.color || getColorClass(index),
                                )}
                                style={{
                                  height: `${getBlockHeight(block)}px`,
                                }}
                              >
                                <div className="text-xs font-semibold leading-tight">{block.subject}</div>
                                <div className="text-xs opacity-90 mt-1">Grupo {block.group}</div>
                                {block.room && <div className="text-xs opacity-75 mt-1">{block.room}</div>}
                              </div>
                            ))}
                      </div>
                    )
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
