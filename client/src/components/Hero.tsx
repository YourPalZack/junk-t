import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';

interface HeroProps {
  onSchedulePickup: () => void;
  onGroupDumpClick: () => void;
}

export default function Hero({ onSchedulePickup, onGroupDumpClick }: HeroProps) {
  return (
    <div className="relative bg-gray-800">
      <div className="absolute inset-0">
        <img 
          className="h-full w-full object-cover" 
          src="https://images.unsplash.com/photo-1610641377033-67cdeb76249b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
          alt="Junk removal service in Colorado" 
        />
        <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-60"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Fast & Affordable Junk Removal
        </h1>
        <p className="mt-6 max-w-xl text-xl text-gray-100">
          Let us handle your junk hauling needs in Colorado. Professional service with convenient scheduling options.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={onSchedulePickup}
            className="bg-accent hover:bg-accent/90 text-white inline-flex items-center"
            size="lg"
          >
            Schedule Pickup
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            onClick={onGroupDumpClick}
            className="bg-secondary hover:bg-secondary/90 text-white inline-flex items-center"
            size="lg"
          >
            Join Group Dump Run
            <Users className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
