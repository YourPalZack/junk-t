import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import useContactForm from '@/hooks/useContactForm';
import { MapPin, Clock, Phone, Mail, Facebook, Instagram, Twitter, Rss } from 'lucide-react';

export default function ContactForm() {
  const { form, handleSubmit, isSubmitting, submitError } = useContactForm();

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Contact Us</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Have questions? Get in touch with our team.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <Card className="bg-gray-50 h-full">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your full name"
                      {...form.register('name')}
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-red-500 mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com"
                      {...form.register('email')}
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-500 mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      placeholder="(xxx) xxx-xxxx"
                      {...form.register('phone')}
                    />
                    {form.formState.errors.phone && (
                      <p className="text-sm text-red-500 mt-1">{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="How can we help you?"
                      rows={4}
                      {...form.register('message')}
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-red-500 mt-1">{form.formState.errors.message.message}</p>
                    )}
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-500 mt-1">{submitError}</p>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-gray-50 h-full">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Our Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-md font-medium text-gray-900">Service Area</h4>
                      <p className="mt-1 text-gray-600">
                        Serving all of Colorado including Denver, Boulder, Colorado Springs, and surrounding areas.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-primary">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-md font-medium text-gray-900">Business Hours</h4>
                      <p className="mt-1 text-gray-600">
                        Monday - Friday: 7am - 6pm<br />
                        Saturday: 8am - 4pm<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-md font-medium text-gray-900">Phone</h4>
                      <p className="mt-1 text-gray-600">(555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-md font-medium text-gray-900">Email</h4>
                      <p className="mt-1 text-gray-600">info@junk-t.com</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-gray-500">
                        <Rss className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
