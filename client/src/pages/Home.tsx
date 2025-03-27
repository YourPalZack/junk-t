import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import HowItWorks from '@/components/HowItWorks';
import GroupDumpRuns from '@/components/GroupDumpRuns';
import Pricing from '@/components/Pricing';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import AppointmentModal from '@/components/modals/AppointmentModal';

export default function Home() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSchedulePickup={() => setIsAppointmentModalOpen(true)} />
      <main>
        <Hero 
          onSchedulePickup={() => setIsAppointmentModalOpen(true)} 
          onGroupDumpClick={() => {
            document.getElementById('dump-runs')?.scrollIntoView({ behavior: 'smooth' });
          }} 
        />
        <Services />
        <HowItWorks onGetStarted={() => setIsAppointmentModalOpen(true)} />
        <GroupDumpRuns />
        <Pricing 
          onSchedulePickup={() => setIsAppointmentModalOpen(true)} 
          onFullServiceClick={() => setIsAppointmentModalOpen(true)}
          onReserveSpotClick={() => {
            document.getElementById('dump-runs')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <ContactForm />
      </main>
      <Footer />
      
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </div>
  );
}
