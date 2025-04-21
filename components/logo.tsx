import type { FC } from "react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export const Logo: FC<LogoProps> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-light to-orange-dark rounded-md animate-pulse-glow"></div>
      <div className="absolute inset-0 flex items-center justify-center font-bold text-white">
        <span className={`${size === "sm" ? "text-xl" : size === "md" ? "text-2xl" : "text-3xl"}`}>K</span>
      </div>
    </div>
  )
}
