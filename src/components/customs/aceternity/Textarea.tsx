// Aceternity UI — Textarea component
// Adapted for Algorithmic Atelier design system (matching Input.tsx)

'use client';
import * as React from 'react';
import { cn } from '@utils/core/cn';
import { useMotionTemplate, useMotionValue, motion } from 'motion/react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const radius = 100;
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
      currentTarget,
      clientX,
      clientY,
    }: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
              var(--sys-secondary-main),
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-lg p-[2px] transition duration-300"
      >
        <textarea
          className={cn(
            `shadow-input flex w-full rounded-md border-none px-3 py-2 text-sm
            bg-ct-surface-container-lowest text-ct-on-surface
            font-label-grotesk resize-none
            placeholder:text-ct-outline/50 placeholder:italic placeholder:font-light
            focus-visible:ring-2 focus-visible:ring-ct-secondary/40 focus-visible:outline-none
            disabled:cursor-not-allowed disabled:opacity-50
            transition duration-400
            dark:bg-ct-surface-container dark:shadow-[0px_0px_1px_1px_var(--sys-outline-variant)]`,
            className,
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
