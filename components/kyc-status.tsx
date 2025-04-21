import type { FC } from "react"
import { AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

type KycStatus = "verified" | "pending" | "required"

interface KycStatusProps {
  status: KycStatus
  className?: string
}

export const KycStatus: FC<KycStatusProps> = ({ status, className }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "verified":
        return {
          icon: <CheckCircle2 className="h-4 w-4" />,
          title: "KYC Verified",
          description: "Your identity has been verified.",
          variant: "success",
        }
      case "pending":
        return {
          icon: <Clock className="h-4 w-4" />,
          title: "KYC Pending",
          description: "Your verification is being processed.",
          variant: "warning",
        }
      case "required":
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          title: "KYC Required",
          description: "Please complete identity verification to unlock all features.",
          variant: "destructive",
        }
      default:
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          title: "KYC Required",
          description: "Please complete identity verification.",
          variant: "destructive",
        }
    }
  }

  const config = getStatusConfig()

  return (
    <Alert
      className={cn(
        "gradient-border",
        config.variant === "success" && "border-green-500/20 bg-green-500/10",
        config.variant === "warning" && "border-yellow-500/20 bg-yellow-500/10",
        config.variant === "destructive" && "border-red-500/20 bg-red-500/10",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {config.icon}
        <AlertTitle>{config.title}</AlertTitle>
      </div>
      <AlertDescription className="mt-1">{config.description}</AlertDescription>
    </Alert>
  )
}
