import React, { useState } from 'react';
import { Event } from '../types';
import { Mic2, Image, Gamepad2, Sword, ChevronDown, X, LucideIcon, Zap } from 'lucide-react';
import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';

type IconName = 'Mic2' | 'Image' | 'Gamepad2' | 'Sword';

const iconMap: Record<IconName, LucideIcon> = {
  Mic2,
  Image,
  Gamepad2,
  Sword,
} as const;

interface EventCardProps {
  event: Event;
  isSelected: boolean;
  onClick: () => void;
  scrollToForm?: () => void;
}

export function EventCard({ event, isSelected, onClick, scrollToForm }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = event.icon in iconMap ? iconMap[event.icon as IconName] : null;

  const handleClick = () => {
    onClick();
    scrollToForm?.();
  };

  const renderGuidelines = () => {
    return event.guidelines.map((guideline, index) => {
      if (!guideline.trim()) return <br key={index} />;
      
      const isHeader = /^[^\w]*[\u{1F300}-\u{1F9FF}][^\w]*/u.test(guideline);
      const isBulletPoint = guideline.startsWith('•') || guideline.startsWith('-');
      const isSeparator = /^={3,}$|^-{3,}$/.test(guideline.trim());
      const isImportant = guideline.includes('❗') || guideline.includes('⚠️');
      const isQuestion = guideline.trim().endsWith('?');
  
      return (
        <React.Fragment key={index}>
          {isSeparator ? (
            <div className="my-6 py-2 border-t border-b border-gray-200/10 text-center">
              <span className="text-xs font-mono text-purple-400/60 tracking-widest">
                ✦ ✦ ✦
              </span>
            </div>
          ) : isHeader ? (
            <h4 className="mt-8 mb-4 text-lg font-bold text-white flex items-center gap-2">
              <span>{guideline}</span>
            </h4>
          ) : isBulletPoint ? (
            <div className="flex items-start mb-2">
              <span className="text-purple-400 mr-2">•</span>
              <span className={`text-gray-300 ${isImportant ? 'font-medium text-yellow-100' : ''}`}>
                {guideline.replace(/^[•-]\s*/, '').trim()}
              </span>
            </div>
          ) : isQuestion ? (
            <p className="text-gray-300 mb-3 font-medium italic">
              {guideline.trim()}
            </p>
          ) : (
            <p className={`text-gray-300 mb-4 ${isImportant ? 'font-medium text-yellow-100' : ''}`}>
              {guideline}
            </p>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={clsx(
          'cursor-pointer rounded-xl p-6 transition-all duration-300 relative overflow-hidden',
          'border hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2',
          isSelected
            ? 'border-transparent bg-gradient-to-br from-purple-900/30 to-gray-900/10 shadow-lg shadow-purple-500/20 backdrop-blur-sm'
            : 'border-gray-800/50 bg-gray-900/5 hover:border-purple-400/30 backdrop-blur-sm',
          isHovered && !isSelected && 'shadow-purple-500/10'
        )}
        tabIndex={0}
        role="button"
        aria-label={`Select ${event.name} event`}
        aria-pressed={isSelected}
      >
        {/* Animated background elements */}
        {isSelected && (
          <>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
          </>
        )}

        <div className="relative flex items-start gap-4 z-10">
          <div
            className={clsx(
              'rounded-lg p-3 flex-shrink-0 transition-all duration-300 relative',
              isSelected 
                ? 'bg-gradient-to-br from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-gray-800/50 text-purple-400 hover:bg-gray-800/70 border border-gray-700/50 hover:border-purple-500/30'
            )}
            aria-hidden="true"
          >
            {Icon && <Icon size={24} />}
            {isSelected && (
              <div className="absolute -inset-1 rounded-lg bg-purple-500/20 animate-pulse"></div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-100">{event.name}</h3>
              {isSelected && (
                <span className="flex items-center text-xs font-mono px-2 py-1 rounded bg-purple-900/50 text-purple-300 border border-purple-700/50">
                  <Zap size={12} className="mr-1" /> SELECTED
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-400 line-clamp-2">{event.description}</p>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className={clsx(
                'mt-4 flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900/50',
                isSelected
                  ? 'bg-gray-800/70 text-gray-200 border border-gray-700/50 hover:bg-gray-800 hover:border-purple-500/30 hover:shadow-purple-500/10'
                  : 'bg-gray-800/50 text-gray-300 border border-gray-700/30 hover:bg-gray-800/70 hover:border-purple-500/20'
              )}
              aria-label={`View guidelines for ${event.name}`}
            >
              <span>View Event Guidelines</span>
              <ChevronDown 
                size={16} 
                className={clsx(
                  'transition-transform duration-200',
                  isModalOpen && 'transform rotate-180'
                )} 
                aria-hidden="true" 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Futuristic Modal */}
      <Transition show={isModalOpen} as={React.Fragment}>
        <Dialog 
          onClose={() => setIsModalOpen(false)} 
          className="relative z-50"
          aria-labelledby={`${event.id}-guidelines-title`}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-md" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel 
                className="w-full max-w-2xl rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl overflow-hidden border border-gray-700/50"
                aria-modal="true"
              >
                <div className="relative bg-gradient-to-r from-purple-900/70 to-gray-900 p-5 text-white overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiBvcGFjaXR5PSIwLjEiPjxwYXRoIGQ9Ik0wIDBoNjAwdjYwMEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMDAgMzAwTDQ1MCA0NTBNMzAwIDMwMEwxNTAgNDUwTTMwMCAzMDBMMzAwIDBMNDUwIDE1ME0zMDAgMzAwTDMwMCA2MDBMMTUwIDQ1ME0zMDAgMzAwTDQ1MCA0NTBNMzAwIDMwMEwxNTAgNDUwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWRhc2hhcnJheT0iMTAsMTAiLz48L3N2Zz4=')]"></div>
                  <div className="relative flex items-center justify-between">
                    <Dialog.Title 
                      id={`${event.id}-guidelines-title`}
                      className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-cyan-300"
                    >
                      {event.name} Guidelines
                    </Dialog.Title>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="p-1 rounded-full hover:bg-gray-800/30 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                      aria-label="Close guidelines"
                    >
                      <X size={20} className="text-gray-300" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="mt-1 text-purple-200/80">{event.description}</p>
                </div>

                <div 
                  className="p-6 max-h-[70vh] overflow-y-auto bg-gray-900/50"
                  tabIndex={0}
                >
                  <div className="prose prose-invert max-w-none">
                    <div className="font-mono text-sm space-y-4">
                      {renderGuidelines()}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-800 bg-gray-900/50 flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg shadow-purple-500/20"
                  >
                    Close Guidelines
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}