import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden will-change-transform",
  {
    variants: {
      variant: {
        default:
          "z-0 border border-blue-600/80 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.2)] text-white text-shadow-sm [text-shadow:0_1px_rgba(0,11,15,0.4)] hover:border-blue-500/90 hover:from-blue-400 hover:via-blue-500 hover:to-blue-400 hover:scale-[1.02] active:scale-[0.98] active:shadow-inner rounded-lg",
        primary:
          "z-0 border border-indigo-600/80 bg-gradient-to-b from-indigo-500 via-indigo-600 to-indigo-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.2)] text-white text-shadow-sm [text-shadow:0_1px_rgba(0,11,15,0.4)] hover:border-indigo-500/90 hover:from-indigo-400 hover:via-indigo-500 hover:to-indigo-400 hover:scale-[1.02] active:scale-[0.98] active:shadow-inner rounded-lg",
        destructive:
          "z-0 border border-red-600/80 bg-gradient-to-b from-red-500 via-red-600 to-red-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.2)] text-white text-shadow-sm [text-shadow:0_1px_rgba(0,11,15,0.4)] hover:border-red-500/90 hover:from-red-400 hover:via-red-500 hover:to-red-400 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-red-500/40 rounded-lg",
        outline:
          "border border-gray-300 bg-white shadow-sm hover:bg-gray-50 hover:border-gray-400 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] active:shadow-sm text-gray-700 rounded-lg",
        secondary:
          "z-0 border border-gray-400/80 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.15)] text-gray-800 hover:border-gray-300/90 hover:from-gray-100 hover:via-gray-200 hover:to-gray-100 hover:scale-[1.02] active:scale-[0.98] rounded-lg",
        ghost:
          "hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm hover:scale-[1.01] active:scale-[0.99] text-gray-600 rounded-lg",
        link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700 transition-colors duration-200",
        success:
          "z-0 border border-green-600/80 bg-gradient-to-b from-green-500 via-green-600 to-green-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.2)] text-white text-shadow-sm [text-shadow:0_1px_rgba(0,11,15,0.4)] hover:border-green-500/90 hover:from-green-400 hover:via-green-500 hover:to-green-400 hover:scale-[1.02] active:scale-[0.98] rounded-lg",
        warning:
          "z-0 border border-amber-600/80 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.2)] text-white text-shadow-sm [text-shadow:0_1px_rgba(0,11,15,0.4)] hover:border-amber-500/90 hover:from-amber-400 hover:via-amber-500 hover:to-amber-400 hover:scale-[1.02] active:scale-[0.98] rounded-lg",
        compact:
          "justify-between items-center w-max gap-2 rounded-lg px-2 py-1 text-base text-gray-500 shadow-sm border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-200",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 px-3 py-1 text-xs gap-1.5",
        lg: "h-12 px-6 py-3 text-base font-semibold",
        icon: "size-10",
        xl: "h-14 px-8 py-4 text-lg font-bold",
        compact: "h-8 px-2 py-1 text-sm mr-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
