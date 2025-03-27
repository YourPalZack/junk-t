import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useAppointmentForm from '@/hooks/useAppointmentForm';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const { 
    form, 
    handleSubmit, 
    isSubmitting, 
    submitError,
    resetForm
  } = useAppointmentForm();

  // Reset form when modal is opened
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Junk Pickup</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
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
            <Label htmlFor="date">Preferred Date</Label>
            <Input 
              id="date" 
              type="date" 
              {...form.register('date')}
            />
            {form.formState.errors.date && (
              <p className="text-sm text-red-500 mt-1">{form.formState.errors.date.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="timeSlot">Preferred Time</Label>
            <Select 
              onValueChange={(value: "morning" | "afternoon" | "evening") => form.setValue('timeSlot', value)} 
              defaultValue={form.getValues('timeSlot') as "morning" | "afternoon" | "evening" | undefined}
            >
              <SelectTrigger id="timeSlot">
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (8am - 12pm)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12pm - 4pm)</SelectItem>
                <SelectItem value="evening">Evening (4pm - 7pm)</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.timeSlot && (
              <p className="text-sm text-red-500 mt-1">{form.formState.errors.timeSlot.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="serviceType">Service Type</Label>
            <Select 
              onValueChange={(value: "standard" | "full" | "custom") => form.setValue('serviceType', value)} 
              defaultValue={form.getValues('serviceType') as "standard" | "full" | "custom" | undefined}
            >
              <SelectTrigger id="serviceType">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Pickup ($129)</SelectItem>
                <SelectItem value="full">Full Load Service ($349)</SelectItem>
                <SelectItem value="custom">Custom Service (Quote Needed)</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.serviceType && (
              <p className="text-sm text-red-500 mt-1">{form.formState.errors.serviceType.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="description">Description of Items</Label>
            <Textarea 
              id="description" 
              placeholder="Please describe the items you need hauled away"
              rows={3}
              {...form.register('description')}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-500 mt-1">{form.formState.errors.description.message}</p>
            )}
          </div>

          {submitError && (
            <p className="text-sm text-red-500 mt-1">{submitError}</p>
          )}

          <DialogFooter className="mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Booking...' : 'Book Appointment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
