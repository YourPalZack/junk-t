import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, InfoIcon } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, getDay } from 'date-fns';
import useGroupDumpForm from '@/hooks/useGroupDumpForm';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { formatDate } from '@/lib/date-utils';
import type { GroupDumpRun } from '@shared/schema';

export default function GroupDumpRuns() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRunId, setSelectedRunId] = useState<number | null>(null);

  // Fetch group dump runs
  const { data: groupDumpRuns, isLoading } = useQuery<GroupDumpRun[]>({
    queryKey: ['/api/group-dump-runs'],
  });

  const { form, handleSubmit, resetForm, isSubmitting, submitError } = useGroupDumpForm(selectedRunId, resetSelection);

  function resetSelection() {
    setSelectedDate(null);
    setSelectedRunId(null);
  }

  // Date navigation functions
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Calendar data
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);

  // Find available runs for the current month view
  const availableRuns = groupDumpRuns?.filter(run => {
    const runDate = new Date(run.runDate);
    return isSameMonth(runDate, currentMonth) && run.spotsRemaining > 0;
  }) || [];

  // Check if a date has an available run
  const getRunForDate = (date: Date) => {
    return availableRuns.find(run => {
      const runDate = new Date(run.runDate);
      return runDate.getDate() === date.getDate() &&
             runDate.getMonth() === date.getMonth() &&
             runDate.getFullYear() === date.getFullYear();
    });
  };

  // Update form when a date is selected
  useEffect(() => {
    if (selectedDate) {
      const run = getRunForDate(selectedDate);
      if (run) {
        form.setValue('date', formatDate(selectedDate));
        setSelectedRunId(run.id);
      }
    }
  }, [selectedDate, availableRuns]);

  // Blank days to fill start of calendar
  const blankDays = [];
  for (let i = 0; i < startDay; i++) {
    blankDays.push(i);
  }

  // Handle date selection
  const handleDateClick = (date: Date) => {
    const run = getRunForDate(date);
    if (run) {
      setSelectedDate(date);
      setSelectedRunId(run.id);
    }
  };

  return (
    <section id="dump-runs" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Group Dump Runs</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Reserve your spot on our scheduled dump runs and save money
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Calendar Column */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="px-4 py-5 border-b border-gray-200 sm:px-6 bg-gray-50 flex flex-row justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {format(currentMonth, 'MMMM yyyy')}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Click on an available date to reserve your spot
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={prevMonth} 
                    aria-label="Previous month"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={nextMonth}
                    aria-label="Next month"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-4 py-5 sm:p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-64 w-full" />
                  </div>
                ) : (
                  <>
                    {/* Calendar Days Header */}
                    <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-700 mb-2">
                      <div>Sun</div>
                      <div>Mon</div>
                      <div>Tue</div>
                      <div>Wed</div>
                      <div>Thu</div>
                      <div>Fri</div>
                      <div>Sat</div>
                    </div>
                    
                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-2">
                      {/* Blank days */}
                      {blankDays.map(day => (
                        <div key={`blank-${day}`} className="text-gray-400 text-center py-2 aspect-square"></div>
                      ))}
                      
                      {/* Month days */}
                      {monthDays.map((day, index) => {
                        const isCurrentDay = isToday(day);
                        const run = getRunForDate(day);
                        const isAvailable = !!run;
                        const isSelected = selectedDate && day.getDate() === selectedDate.getDate() && 
                                          day.getMonth() === selectedDate.getMonth() &&
                                          day.getFullYear() === selectedDate.getFullYear();
                        
                        return (
                          <div 
                            key={index}
                            className={`
                              text-center py-2 aspect-square flex flex-col justify-center items-center
                              ${isCurrentDay ? 'font-bold' : ''}
                              ${isAvailable 
                                ? 'bg-green-100 border border-green-300 rounded-md cursor-pointer hover:bg-green-200' 
                                : ''}
                              ${isSelected ? 'bg-green-200 border-2 border-green-500' : ''}
                            `}
                            onClick={() => isAvailable && handleDateClick(day)}
                          >
                            {day.getDate()}
                            {isAvailable && (
                              <div className="text-xs text-green-700 mt-1">Available</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-100 border border-green-300 rounded-sm mr-2"></div>
                    <span>Available for booking</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-100 border border-red-300 rounded-sm mr-2"></div>
                    <span>Fully booked</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Reservation Form Column */}
          <div>
            <Card className="bg-gray-50">
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900">Reserve Your Spot</h3>
              </CardHeader>
              <CardContent>
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
                    <Label htmlFor="date">Selected Date</Label>
                    <Input
                      id="date"
                      readOnly
                      className="bg-gray-100"
                      {...form.register('date')}
                    />
                    {!selectedDate && (
                      <p className="text-sm text-amber-600 mt-1 flex items-center">
                        <InfoIcon className="h-4 w-4 mr-1" />
                        Please select a date from the calendar
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="loadSize">Estimated Load Size</Label>
                    <Select 
                      onValueChange={(value) => form.setValue('loadSize', value)} 
                      defaultValue={form.getValues('loadSize')}
                    >
                      <SelectTrigger id="loadSize">
                        <SelectValue placeholder="Select load size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (1-3 items)</SelectItem>
                        <SelectItem value="medium">Medium (4-6 items)</SelectItem>
                        <SelectItem value="large">Large (7+ items)</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.loadSize && (
                      <p className="text-sm text-red-500 mt-1">{form.formState.errors.loadSize.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Special Instructions</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any additional information about your items"
                      rows={3}
                      {...form.register('notes')}
                    />
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-500 mt-1">{submitError}</p>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-white mt-4"
                    disabled={isSubmitting || !selectedRunId}
                  >
                    {isSubmitting ? 'Processing...' : 'Confirm Reservation'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
