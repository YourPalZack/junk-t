import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingProps {
  onSchedulePickup: () => void;
  onFullServiceClick: () => void;
  onReserveSpotClick: () => void;
}

export default function Pricing({ onSchedulePickup, onFullServiceClick, onReserveSpotClick }: PricingProps) {
  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-header">Pricing</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Transparent pricing for all your junk hauling needs
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {/* Group Dump Run */}
          <div className="bg-white rounded-lg card-shadow overflow-hidden border-0">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900">Group Dump Run</h3>
              <p className="mt-4 text-gray-500">Share a scheduled dump run with others and save</p>
              <p className="mt-6">
                <span className="text-4xl font-extrabold text-gray-900">$49</span>
                <span className="text-base font-medium text-gray-500">/ spot</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">Small to medium-sized loads</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">Scheduled weekly dates</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">Budget-friendly option</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">Dump fees included</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button 
                  onClick={onReserveSpotClick} 
                  variant="outline" 
                  className="w-full btn-outline"
                >
                  Reserve a Spot
                </Button>
              </div>
            </div>
          </div>

          {/* Standard Pickup */}
          <div className="bg-white rounded-lg card-shadow overflow-hidden border-0 relative z-10 lg:transform lg:scale-110">
            <div className="absolute top-0 inset-x-0">
              <div className="bg-[var(--accent-color)] text-white text-center text-sm font-medium py-1">Most Popular</div>
            </div>
            <div className="p-8 pt-10">
              <h3 className="text-2xl font-bold text-gray-900">Standard Pickup</h3>
              <p className="mt-4 text-gray-500">Convenient pickup service at your location</p>
              <p className="mt-6">
                <span className="text-4xl font-extrabold text-gray-900">$129</span>
                <span className="text-base font-medium text-gray-500">/ pickup</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">Up to 1/4 truck load</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">Flexible scheduling</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">We do all the loading</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">Dump fees included</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">Same-day service available</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button 
                  onClick={onSchedulePickup} 
                  className="w-full btn-accent"
                >
                  Schedule Pickup
                </Button>
              </div>
            </div>
          </div>

          {/* Full Load Service */}
          <div className="bg-white rounded-lg card-shadow overflow-hidden border-0">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900">Full Load Service</h3>
              <p className="mt-4 text-gray-500">Complete junk removal for larger projects</p>
              <p className="mt-6">
                <span className="text-4xl font-extrabold text-gray-900">$349</span>
                <span className="text-base font-medium text-gray-500">/ full truck</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">Full truck load capacity</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">Perfect for large cleanouts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">Professional hauling team</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">Commercial projects welcome</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
                  <span className="text-gray-600">All fees included</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button 
                  onClick={onFullServiceClick} 
                  variant="outline" 
                  className="w-full btn-outline"
                >
                  Get Full Service
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600">Need a custom quote for your specific situation?</p>
          <Button 
            onClick={onSchedulePickup} 
            className="mt-4 btn-secondary"
          >
            Request Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
