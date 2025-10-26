import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "destructive";
  size?: "sm" | "default" | "lg" | "icon";
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", fullWidth = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles - consistent across all buttons
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105",
          // Size variants - standardized sizes
          {
            "h-9 px-4 py-2 text-sm": size === "sm",
            "h-11 px-6 py-3 text-base": size === "default", 
            "h-12 px-8 py-3 text-lg": size === "lg",
            "h-10 w-10 p-0": size === "icon",
          },
          // Color variants - consistent color scheme
          {
            "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg hover:shadow-xl hover:from-amber-700 hover:to-amber-800": variant === "primary",
            "bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg hover:shadow-xl hover:from-gray-700 hover:to-gray-800": variant === "secondary",
            "border-2 border-amber-500 bg-transparent text-amber-600 hover:bg-amber-500 hover:text-white hover:shadow-lg": variant === "outline",
            "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900": variant === "ghost",
            "text-amber-600 underline-offset-4 hover:underline hover:text-amber-700": variant === "link",
            "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-800": variant === "destructive",
          },
          // Full width option
          fullWidth && "w-full",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
