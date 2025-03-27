import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

// Form schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  message: z.string().min(10, 'Message is required (min 10 characters)'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function useContactForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize the form with default values
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  // Create mutation for form submission
  const mutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
        variant: "default",
      });
      // Invalidate any relevant queries
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
      // Reset the form
      form.reset();
    },
    onError: (error: Error) => {
      setSubmitError(error.message || 'Failed to send message. Please try again.');
      toast({
        title: "Error",
        description: error.message || 'Failed to send message',
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  const handleSubmit = form.handleSubmit((data) => {
    setSubmitError(null);
    mutation.mutate(data);
  });

  return {
    form,
    handleSubmit,
    isSubmitting: mutation.isPending,
    submitError,
  };
}
