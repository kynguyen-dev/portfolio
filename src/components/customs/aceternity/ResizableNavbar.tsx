/**
 * Resizable Navbar — Aceternity UI Pattern
 * Ported from https://ui.aceternity.com/components/resizable-navbar
 *
 * Adapted to use the project's `cn` utility, Phosphor icons, and
 * Algorithmic Atelier design system tokens instead of default tailwind colors.
 */
import React, { useRef, useState } from 'react';
import { cn } from '@utils/core/cn';
import { ListIcon, XIcon } from '@phosphor-icons/react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'motion/react';

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, 'change', latest => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        'fixed inset-x-0 top-0 z-50 w-full transition-all duration-300',
        className
      )}
    >
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? 'blur(16px)' : 'none',
        boxShadow: visible
          ? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
          : 'none',
        width: visible ? '45%' : '100%',
        y: visible ? 20 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: visible ? '800px' : '100%',
      }}
      className={cn(
        'relative z-[60] mx-auto hidden w-full max-w-screen-2xl flex-row items-center justify-between self-start rounded-full bg-transparent px-8 py-4 lg:flex',
        visible &&
          'bg-ct-surface/60 border border-ct-outline-variant/30 px-6 py-2 shadow-[0_20px_50px_rgba(13,17,23,0.5)]',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-xs uppercase tracking-widest font-label-grotesk font-medium text-ct-on-surface-variant/80 transition duration-200 lg:flex lg:space-x-2',
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className='relative px-4 py-2 text-ct-on-surface-variant hover:text-ct-secondary transition-colors cursor-pointer'
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId='hovered'
              className='absolute inset-0 h-full w-full rounded-full bg-ct-secondary/10'
            />
          )}
          <span className='relative z-20'>{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? 'blur(16px)' : 'none',
        boxShadow: visible
          ? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
          : 'none',
        width: visible ? '90%' : '100%',
        paddingRight: visible ? '16px' : '0px',
        paddingLeft: visible ? '16px' : '0px',
        borderRadius: visible ? '1rem' : '0rem',
        y: visible ? 16 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        'relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-6 py-4 lg:hidden',
        visible &&
          'bg-ct-surface/60 border border-ct-outline-variant/30 shadow-[0_20px_50px_rgba(13,17,23,0.5)]',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        'flex w-full flex-row items-center justify-between',
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'absolute inset-x-0 top-full mt-4 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-xl bg-ct-surface-container border border-ct-outline-variant/30 p-6 shadow-2xl overflow-hidden glass-panel',
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className='p-2 text-ct-secondary hover:bg-ct-secondary/10 rounded-full transition-colors'
      aria-label='Toggle mobile menu'
    >
      {isOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
    </button>
  );
};

// We don't port NavbarLogo and NavbarButton here as the project already has
// specific components and layouts for those.
