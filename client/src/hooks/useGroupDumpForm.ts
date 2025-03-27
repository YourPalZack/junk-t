import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

// Form schema for group dump reservation
const reservationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  date: z.string().min(1, 'Date is required'),
  loadSize: z.enum(['small', 'medium', 'large'], {
    required_error: 'Please select a load size',
  }),
  notes: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

export default function useGroupDumpForm(runId: number | null, onSuccess: () => void) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize the form with default values
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: '',
      loadSize: 'small',
      notes: '',
    },
  });

  // Create mutation for form submission
  const mutation = useMutation({
    mutationFn: async (data: ReservationFormValues) => {
      if (!runId) {
        throw new Error('Please select a date from the calendar');
      }
      
      // Combine form data with run ID
      const reservationData = {
        ...data,
        groupDumpRunId: runId,
      };
      
      const response = await apiRequest('POST', '/api/group-dump-reservations', reservationData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Reservation confirmed!",
        description: "Your spot has been reserved for the selected date.",
        variant: "default",
      });
      // Invalidate any relevant queries
      queryClient.invalidateQueries({ queryKey: ['/api/group-dump-runs'] });
      // Reset the form and selection
      form.reset();
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      setSubmitError(error.message || 'Failed to make reservation. Please try again.');
      toast({
        title: "Error",
        description: error.message || 'Failed to make reservation',
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  const handleSubmit = form.handleSubmit((data) => {
    setSubmitError(null);
    
    if (!runId) {
      setSubmitError('Please select a date from the calendar');
      return;
    }
    
    mutation.mutate(data);
  });

  // Reset form to default values
  const resetForm = useCallback(() => {
    form.reset({
      name: '',
      email: '',
      phone: '',
      date: '',
      loadSize: 'small',
      notes: '',
    });
    setSubmitError(null);
  }, [form]);

  return {
    form,
    handleSubmit,
    isSubmitting: mutation.isPending,
    submitError,
    resetForm,
  };
}
