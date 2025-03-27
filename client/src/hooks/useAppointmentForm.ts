import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { formatDateForInput } from '@/lib/date-utils';

// Form schema for appointment
const appointmentSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  date: z.string().min(1, 'Date is required'),
  timeSlot: z.enum(['morning', 'afternoon', 'evening'], {
    required_error: 'Please select a time slot',
  }),
  serviceType: z.enum(['standard', 'full', 'custom'], {
    required_error: 'Please select a service type',
  }),
  description: z.string().min(10, 'Please provide a description of items (min 10 characters)'),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export default function useAppointmentForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize the form with default values
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: formatDateForInput(new Date()),
      timeSlot: 'morning',
      serviceType: 'standard',
      description: '',
    },
  });

  // Create mutation for form submission
  const mutation = useMutation({
    mutationFn: async (data: AppointmentFormValues) => {
      const response = await apiRequest('POST', '/api/appointments', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Appointment booked!",
        description: "We'll contact you to confirm your appointment details.",
        variant: "default",
      });
      // Invalidate any relevant queries
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
      // Reset the form
      form.reset();
    },
    onError: (error: Error) => {
      setSubmitError(error.message || 'Failed to book appointment. Please try again.');
      toast({
        title: "Error",
        description: error.message || 'Failed to book appointment',
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  const handleSubmit = form.handleSubmit((data) => {
    setSubmitError(null);
    mutation.mutate(data);
  });

  // Reset form to default values
  const resetForm = () => {
    form.reset({
      name: '',
      email: '',
      phone: '',
      date: formatDateForInput(new Date()),
      timeSlot: 'morning',
      serviceType: 'standard',
      description: '',
    });
    setSubmitError(null);
  };

  return {
    form,
    handleSubmit,
    isSubmitting: mutation.isPending,
    submitError,
    resetForm,
  };
}
