import React, { useState, useRef, useEffect } from 'react';
import { useForm } from '@formspree/react';
import { EVENTS } from '../constants';
import { EventCard } from './EventCard';
import { TalentForm } from './forms/TalentForm';
import { TrashOnShowForm } from './forms/TrashOnShowForm';
import { GameForm } from './forms/GameForm';
import {
  Clock, Mic2, Image, Gamepad2, Sword, ClipboardList, LucideIcon
} from 'lucide-react';

type IconName = 'Mic2' | 'Image' | 'Gamepad2' | 'Sword' | 'ClipboardList';

export function RegistrationForm() {
  const [state, handleSubmit] = useForm("your-formspree-id");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const iconMap: Record<IconName, LucideIcon> = {
    Mic2,
    Image,
    Gamepad2,
    Sword,
    ClipboardList,
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const progress = (scrollY / (docHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
      color: `hsl(${Math.random() * 60 + 200}, 80%, ${Math.random() * 30 + 50}%)`,
      direction: Math.random() * Math.PI * 2
    }));

    // Circuit lines
    const circuitNodes = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      connections: [] as number[]
    }));

    // Create some connections
    circuitNodes.forEach((node, i) => {
      const connections = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < connections; j++) {
        const target = Math.floor(Math.random() * circuitNodes.length);
        if (target !== i && !node.connections.includes(target)) {
          node.connections.push(target);
        }
      }
    });

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(100, 100, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw circuit connections with pulsing effect
      ctx.strokeStyle = `rgba(100, 255, 255, ${0.3 + Math.sin(time * 0.02) * 0.2})`;
      ctx.lineWidth = 1.5;
      circuitNodes.forEach(node => {
        node.connections.forEach(connIndex => {
          const target = circuitNodes[connIndex];
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        });
      });

      // Draw circuit nodes
      circuitNodes.forEach(node => {
        ctx.fillStyle = `rgba(100, 255, 255, ${0.5 + Math.sin(time * 0.03) * 0.3})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Digital HUD elements
      ctx.fillStyle = 'rgba(100, 255, 255, 0.2)';
      ctx.font = '12px monospace';
      ctx.fillText(`SYSTEM STATUS: ONLINE`, 20, 30);
      ctx.fillText(`SCAN: ${Math.floor(time/10) % 100}% COMPLETE`, 20, 50);
      ctx.fillText(`EVENT_REGISTRATION_2025`, canvas.width - 200, 30);

      // Scroll progress indicator
      ctx.strokeStyle = 'rgba(100, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 2);
      ctx.lineTo((canvas.width * scrollProgress) / 100, canvas.height - 2);
      ctx.stroke();

      time++;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollProgress]);

  const selectedEventData = selectedEvent 
    ? EVENTS.find(event => event.id === selectedEvent)
    : null;

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const handleEventSelect = (eventId: string) => {
    setSelectedEvent(eventId);
    setTimeout(scrollToForm, 100);
  };

  const renderForm = () => {
    if (!selectedEventData) return (
      <div className="text-center py-12 relative z-10">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-gray-900/50 border border-purple-500/30 mb-4">
          <Clock size={24} className="text-purple-400 animate-pulse" />
        </div>
        <h3 className="text-xl font-medium text-gray-300 glitch-text" data-text="Select an event to register">
          Select an event to register
        </h3>
        <p className="mt-2 text-gray-400 max-w-md mx-auto">
          Choose from our exciting lineup of IT Week events by clicking on any event card.
        </p>
      </div>
    );

    const commonProps = {
      onSubmit: handleSubmit,
      isSubmitting: state.submitting,
    };

    switch (selectedEventData.formType) {
      case 'talent':
        return <TalentForm {...commonProps} />;
      case 'trash on show':
        return <TrashOnShowForm {...commonProps} />;
      case 'game':
        return (
          <GameForm
            {...commonProps}
            teamSize={selectedEventData.id === 'mobile-legends' ? 5 : 4}
            gameType={
              selectedEventData.id === 'mobile-legends' ? 'mobile-legends' :
              selectedEventData.id === 'call-of-duty' ? 'call-of-duty' : 'other'
            }
          />
        );
      default:
        return (
          <div className="text-center py-12 relative z-10">
            <h3 className="text-xl font-medium text-gray-400 glitch-text" data-text="Registration form coming soon">
              Registration form coming soon
            </h3>
            <p className="mt-2 text-gray-500">We're still preparing the registration for this event.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Animated canvas background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Glitch overlay effects */}
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/assets/glitch.gif')] bg-cover mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('/assets/scanlines.png')] opacity-30"></div>
      </div>

      {/* Corner decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-purple-500/50 z-0"></div>
      <div className="fixed top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-cyan-500/50 z-0"></div>
      <div className="fixed bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-cyan-500/50 z-0"></div>
      <div className="fixed bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-purple-500/50 z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="text-center mb-10 sm:mb-14 relative">
          {/* Animated background pulses */}
          <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-purple-500/10 filter blur-xl animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-cyan-500/10 filter blur-xl animate-pulse delay-300"></div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            <span className="glitch-text" data-text="IT WEEK 2025">IT WEEK 2025</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-400 mb-4">
            Register for the most exciting tech events of the year!
          </p>

          {/* Deadline Tag (Responsive) */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 mb-4 bg-gray-900/50 border border-purple-500/30 text-purple-300 rounded-full text-xs sm:text-sm backdrop-blur-sm w-full sm:w-auto text-center">
            <Clock size={16} className="shrink-0" />
            <span className="whitespace-normal">
              Registration Deadline: April 11, 2025 @ 11:59 PM
            </span>
          </div>

          {/* Guidelines */}
          <div className="mx-auto max-w-lg p-4 mb-4 bg-yellow-500/10 border border-yellow-500 text-yellow-300 rounded-lg text-sm font-medium backdrop-blur-sm">
            ⚠️ <span className="font-semibold uppercase tracking-wide">Read EVENT Guidelines!</span>
            &nbsp;Make sure to check all event rules and requirements before registering. Ignorance of the rules will not be accepted as
            an excuse during disputes or violations.
          </div>
        </div>

        {/* Grid layout for Events and Form */}
        <div className="grid gap-8 lg:grid-cols-2 relative">
          {/* Grid background overlay */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10"></div>
          </div>

          {/* Events List */}
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300 px-2">
              Available Events
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {EVENTS.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  isSelected={selectedEvent === event.id}
                  onClick={() => handleEventSelect(event.id)}
                />
              ))}
            </div>
          </div>

          {/* Registration Form */}
          <div
            ref={formRef}
            className="bg-gray-900/70 rounded-xl p-4 sm:p-6 md:p-8 shadow-xl border border-purple-600/20 backdrop-blur-sm relative overflow-hidden"
          >
            {/* Blurred decorative elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg ${
                selectedEventData
                  ? 'bg-gradient-to-br from-purple-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-500 border border-gray-700/50'
              }`}>
                {selectedEventData?.icon && iconMap[selectedEventData.icon as IconName]
                  ? React.createElement(iconMap[selectedEventData.icon as IconName], { size: 24 })
                  : <ClipboardList size={24} />}
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                {selectedEventData ? (
                  <>Register for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">{selectedEventData.name}</span></>
                ) : (
                  'Event Registration'
                )}
              </h2>
            </div>

            {renderForm()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-6 bg-gray-900/50 border-t border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-center sm:text-left">
            <div className="text-sm text-gray-400">
              © 2025 School of Technology. All rights reserved.
            </div>
            <div className="text-xs text-gray-500">
              Developed by <span className="text-cyan-400">JFD</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Add this to your global CSS for glitch text effect
/*
.glitch-text {
  position: relative;
}
.glitch-text::before, .glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}
.glitch-text::before {
  color: #0ff;
  z-index: -1;
  animation: glitch-effect 3s infinite;
}
.glitch-text::after {
  color: #f0f;
  z-index: -2;
  animation: glitch-effect 2s infinite reverse;
}
@keyframes glitch-effect {
  0% { transform: translate(0); }
  20% { transform: translate(-3px, 3px); }
  40% { transform: translate(-3px, -3px); }
  60% { transform: translate(3px, 3px); }
  80% { transform: translate(3px, -3px); }
  100% { transform: translate(0); }
}
*/