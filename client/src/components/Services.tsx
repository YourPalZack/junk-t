import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, Users, Calendar } from 'lucide-react';
import { Check } from 'lucide-react';

const services = [
  {
    icon: <Truck className="h-5 w-5" />,
    title: 'Junk Pickup & Hauling',
    description: 'We come to your location, load your junk, and haul it away. Simple, fast, and hassle-free.',
    features: [
      'Same-day service available',
      'No hidden fees',
      'Proper disposal guaranteed'
    ],
    action: 'Learn more',
    link: '#pricing'
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Group Dump Runs',
    description: 'Save money by reserving a spot on our scheduled dump runs. Perfect for smaller loads.',
    features: [
      'Cost-effective solution',
      'Regular weekly schedule',
      'Reserved spot guarantee'
    ],
    action: 'See schedule',
    link: '#dump-runs'
  },
  {
    icon: <Calendar className="h-5 w-5" />,
    title: 'Scheduled Dump Services',
    description: 'Book our truck for regular or one-time scheduled dump runs for your specific needs.',
    features: [
      'Flexible scheduling',
      'Dedicated service',
      'Commercial options available'
    ],
    action: 'Book now',
    link: '#pricing'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Services</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Complete junk removal solutions for residential and commercial needs.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md"
            >
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary text-white mb-5">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                <p className="mt-3 text-gray-600">{service.description}</p>
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-secondary mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <a 
                    href={service.link} 
                    className="text-primary font-medium hover:text-primary/90 inline-flex items-center"
                  >
                    {service.action}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
