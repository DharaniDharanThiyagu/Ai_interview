import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuX } from 'react-icons/lu';

const Drawer = ({ isOpen, onClose, title, children }) => {
  // Close drawer on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose, title]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-30"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-[64px] right-0 z-40 h-[calc(100dvh-64px)] p-4 overflow-auto bg-white w-full md:w-[40vw] shadow-2xl shadow-cyan-800/10 border-l border-gray-200 cursor-pointer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-right-label"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h5
                className="flex items-center text-base font-semibold text-black"
                id="drawer-right-label"
              >
                {title}
              </h5>

              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
                aria-label="Close Drawer"
              >
                <LuX className="text-lg" />
              </button>
            </div>

            {/* Body */}
            <div className="text-sm mx-3 mb-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
