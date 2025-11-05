"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    href?: string;
  };
  variant?: "default" | "minimal" | "card" | "hero";
  className?: string;
  spacing?: "sm" | "md" | "lg" | "xl";
}

const spacingClasses = {
  sm: "py-8",
  md: "py-12", 
  lg: "py-16",
  xl: "py-20"
};

const variantClasses = {
  default: "text-center",
  minimal: "text-center py-8",
  card: "text-center rounded-2xl p-12",
  hero: "text-center rounded-3xl p-16"
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.15,
      // No delay - instant rendering
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.15,
      // No delay - instant rendering
    }
  }
};

export default function EmptyState({
  title,
  description,
  icon,
  action,
  variant = "default",
  className = "",
  spacing = "lg"
}: EmptyStateProps) {
  const baseClasses = variantClasses[variant];
  const spacingClass = spacingClasses[spacing];
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={`${baseClasses} ${spacingClass} ${className}`}
    >
      <div className="max-w-md mx-auto">
        {icon && (
          <motion.div
            variants={iconVariants}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
          >
            <div className="text-4xl text-gray-400">
              {icon}
            </div>
          </motion.div>
        )}
        
        <motion.div variants={contentVariants} className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800 leading-tight">
            {title}
          </h3>
          <p className="text-gray-500 leading-relaxed">
            {description}
          </p>
        </motion.div>

        {action && (
          <motion.div variants={buttonVariants} className="mt-8">
            {action.href ? (
              <a href={action.href}>
                <Button variant="secondary">
                  {action.label}
                </Button>
              </a>
            ) : (
              <Button variant="secondary" onClick={action.onClick}>
                {action.label}
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Pre-configured empty state components for common use cases
export const ComingSoonEmptyState = ({ 
  title = "Coming Soon", 
  description = "We are working on bringing you amazing content. Please check back soon!",
  className = ""
}: {
  title?: string;
  description?: string;
  className?: string;
}) => (
  <EmptyState
    title={title}
    description={description}
    icon={
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    }
    variant="card"
    spacing="xl"
    className={className}
  />
);

export const NoDataEmptyState = ({ 
  title = "No Data Available", 
  description = "There's no content to display at the moment.",
  action,
  className = ""
}: {
  title?: string;
  description?: string;
  action?: EmptyStateProps['action'];
  className?: string;
}) => (
  <EmptyState
    title={title}
    description={description}
    icon={
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    }
    variant="card"
    spacing="lg"
    action={action}
    className={className}
  />
);

export const NotFoundEmptyState = ({ 
  title = "Not Found", 
  description = "The content you're looking for doesn't exist or has been moved.",
  action,
  className = ""
}: {
  title?: string;
  description?: string;
  action?: EmptyStateProps['action'];
  className?: string;
}) => (
  <EmptyState
    title={title}
    description={description}
    icon={
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    }
    variant="card"
    spacing="lg"
    action={action}
    className={className}
  />
);
