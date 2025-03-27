import { Button } from '@/components/ui/button';

interface HowItWorksProps {
  onGetStarted: () => void;
}

export default function HowItWorks({ onGetStarted }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-header">How It Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Easy steps to get your junk hauled away with Junk-T.com
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-gray-50 text-lg font-medium text-gray-500">Simple Process</span>
            </div>
          </div>

          <div className="mt-8 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            <div className="relative">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white font-bold text-lg">1</div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Schedule Your Service</h3>
              <p className="mt-2 text-base text-gray-500">
                Choose between pickup service or reserving a spot on our group dump runs through our online form or by phone.
              </p>
            </div>

            <div className="relative">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white font-bold text-lg">2</div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">We Arrive On Time</h3>
              <p className="mt-2 text-base text-gray-500">
                Our professional team arrives at the scheduled time ready to handle your junk removal needs.
              </p>
            </div>

            <div className="relative">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white font-bold text-lg">3</div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Junk Gone, Worry Free</h3>
              <p className="mt-2 text-base text-gray-500">
                We handle the hauling and ensure proper disposal while you enjoy your cleared space.
              </p>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Button 
              onClick={onGetStarted}
              className="btn-accent"
              size="lg"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
