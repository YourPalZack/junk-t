import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';

interface HeroProps {
  onSchedulePickup: () => void;
  onGroupDumpClick: () => void;
}

export default function Hero({ onSchedulePickup, onGroupDumpClick }: HeroProps) {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Material Design inspired hero layout */}
      <div className="relative z-10 bg-gradient-to-r from-primary to-accent pt-12 pb-16 sm:pb-20 lg:pt-16 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Content Grid */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left column - Text Content */}
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                <span className="block">Fast & Affordable</span>
                <span className="block mt-1">Junk Removal</span>
              </h1>
              <p className="mt-6 text-xl leading-7 text-gray-100">
                Let us handle your junk hauling needs in Colorado. Professional service with convenient scheduling options.
              </p>
              {/* CTA Buttons with Material Design style elevation */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                <Button 
                  onClick={onSchedulePickup}
                  className="btn-accent inline-flex items-center justify-center px-6 py-3"
                  size="lg"
                >
                  Schedule Pickup
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={onGroupDumpClick}
                  className="btn-secondary inline-flex items-center justify-center px-6 py-3"
                  size="lg"
                >
                  Join Group Dump Run
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Right column - Material Design "wave" illustration */}
            <div className="hidden lg:block relative">
              <div className="absolute right-0 bottom-0 w-full h-full">
                <svg className="absolute right-0 transform translate-x-1/3" width="500" height="500" fill="none" viewBox="0 0 500 500">
                  <defs>
                    <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M500 0H0V500H500V0Z"
                    fill="url(#hero-gradient)"
                  />
                  <path 
                    d="M50 0C120 80 190 120 300 100C410 80 450 140 500 200V0H50Z" 
                    fill="white" 
                    fillOpacity="0.2" 
                  />
                  <path 
                    d="M0 0C70 40 120 80 200 80C280 80 320 40 400 30C480 20 490 50 500 80V0H0Z" 
                    fill="white" 
                    fillOpacity="0.1" 
                  />
                </svg>
              </div>
              <div className="mt-10 lg:mt-0 rounded-xl overflow-hidden shadow-2xl transform transition duration-500 hover:scale-105">
                <img 
                  src="https://images.unsplash.com/photo-1610641377033-67cdeb76249b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
                  alt="Junk removal service in Colorado" 
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Material Design inspired decorative shapes */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      {/* Mobile hero image (visible only on smaller screens) */}
      <div className="lg:hidden relative mt-6 px-4 sm:px-6">
        <div className="rounded-lg overflow-hidden shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1610641377033-67cdeb76249b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
            alt="Junk removal service in Colorado" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}
