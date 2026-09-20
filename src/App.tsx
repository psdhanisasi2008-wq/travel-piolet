import React, { useState } from 'react';
import {
  ViewMode,
  DayItinerary,
  Booking,
  Expense,
  Disruption,
  AlternativeOption,
  BackupPlan,
  NotificationItem,
  ChatMessage,
  TripConstraints,
  TripSummaryData,
  ActivityItem
} from './types';

import {
  initialConstraints,
  initialSummary,
  initialBookings,
  initialDays,
  initialDisruption,
  initialAlternatives,
  initialBackupPlans,
  initialExpenses,
  initialNotifications,
  initialChatMessages,
  activityCatalog
} from './data/mockData';

import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { CommandCenter } from './components/CommandCenter';
import { ItineraryView } from './components/ItineraryView';
import { AddActivityDrawer } from './components/AddActivityDrawer';
import { OptimizeItineraryModal } from './components/OptimizeItineraryModal';
import { MapScreen } from './components/MapScreen';
import { CalendarView } from './components/CalendarView';
import { BookingsView } from './components/BookingsView';
import { BookingDetailDrawer } from './components/BookingDetailDrawer';
import { BudgetView } from './components/BudgetView';
import { DisruptionCenter } from './components/DisruptionCenter';
import { AlternativesView } from './components/AlternativesView';
import { BackupPlansView } from './components/BackupPlansView';
import { ReplanWorkspace } from './components/ReplanWorkspace';
import { AskTravelPilotView } from './components/AskTravelPilotView';
import { NotificationCenterDrawer } from './components/NotificationCenterDrawer';
import { TripSummaryView } from './components/TripSummaryView';
import { OnboardingWizard } from './components/OnboardingWizard';

export function App() {
  // Shared Connected Application State
  const [currentView, setCurrentView] = useState<ViewMode>('command-center');
  const [currentTripName, setCurrentTripName] = useState('Tokyo');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(1); // Day 2 (Oct 13)
  const [selectedActivityId, setSelectedActivityId] = useState<string>('d2-2'); // Shibuya Crossing

  // Data state
  const [constraints, setConstraints] = useState<TripConstraints>(initialConstraints);
  const [summary, setSummary] = useState<TripSummaryData>(initialSummary);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [days, setDays] = useState<DayItinerary[]>(initialDays);
  const [activeDisruption, setActiveDisruption] = useState<Disruption | undefined>(initialDisruption);
  const [alternatives, setAlternatives] = useState<AlternativeOption[]>(initialAlternatives);
  const [backupPlans, setBackupPlans] = useState<BackupPlan[]>(initialBackupPlans);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);

  // UI Drawer & Modal Toggles
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [isOptimizeOpen, setIsOptimizeOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedBookingForDrawer, setSelectedBookingForDrawer] = useState<Booking | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [demoMode, setDemoMode] = useState(true);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Computed totals across connected state
  const spentBudgetINR = expenses.reduce((sum, e) => sum + e.amountINR, 0);
  const unreadNotificationCount = notifications.filter((n) => !n.read).length;
  const activeDisruptionCount = activeDisruption && !activeDisruption.applied ? 1 : 0;

  // Helper to sync summary data when days or budget changes
  const updateConnectedSummary = (updatedDays: DayItinerary[], updatedExpenses: Expense[]) => {
    const totalActs = updatedDays.reduce((sum, d) => sum + d.items.length, 0);
    const newEstCost = updatedExpenses.reduce((sum, e) => sum + e.amountINR, 0);

    setSummary((prev) => ({
      ...prev,
      totalActivities: totalActs,
      estimatedCostINR: newEstCost,
      totalBudgetINR: constraints.totalBudgetINR
    }));
  };

  // Handler: Move activity up or down in day itinerary (Recalculate route & times)
  const handleMoveActivity = (dayIdx: number, actIdx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? actIdx - 1 : actIdx + 1;
    if (targetIdx < 0 || targetIdx >= days[dayIdx].items.length) return;

    const newDays = [...days];
    const dayItems = [...newDays[dayIdx].items];
    const [movedItem] = dayItems.splice(actIdx, 1);
    dayItems.splice(targetIdx, 0, movedItem);

    // Swap times roughly to maintain chronological order
    const updatedItems = dayItems.map((item, idx) => {
      if (idx === 0) return { ...item, time: '09:00', endTime: '10:00' };
      if (idx === 1) return { ...item, time: '10:30', endTime: '11:40' };
      if (idx === 2) return { ...item, time: '12:00', endTime: '13:00' };
      if (idx === 3) return { ...item, time: '14:00', endTime: '16:00' };
      if (idx === 4) return { ...item, time: '16:30', endTime: '18:00' };
      return { ...item, time: `${18 + idx}:00`, endTime: `${19 + idx}:00` };
    });

    newDays[dayIdx] = { ...newDays[dayIdx], items: updatedItems };
    setDays(newDays);

    // Push notification
    const newNotif: NotificationItem = {
      id: `n-${Date.now()}`,
      title: 'Itinerary Schedule Recalculated',
      message: `Reordered "${movedItem.title}". Travel times & map routes updated.`,
      type: 'conflict',
      timeAgo: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Handler: Delete activity
  const handleDeleteActivity = (dayIdx: number, actId: string) => {
    const newDays = [...days];
    newDays[dayIdx] = {
      ...newDays[dayIdx],
      items: newDays[dayIdx].items.filter((i) => i.id !== actId)
    };
    setDays(newDays);
    updateConnectedSummary(newDays, expenses);
  };

  // Handler: Add new activity from drawer catalog
  const handleAddActivityFromDrawer = (catItem: typeof activityCatalog[0], slotTime: string) => {
    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      dayId: days[selectedDayIndex].fullDate,
      dayNumber: days[selectedDayIndex].dayNumber,
      time: slotTime,
      endTime: '17:30',
      title: catItem.title,
      category: catItem.category,
      location: {
        name: catItem.location,
        address: `${catItem.location}, Tokyo`,
        lat: 35.658 + Math.random() * 0.03,
        lng: 139.701 + Math.random() * 0.05,
        city: 'Tokyo'
      },
      durationMinutes: 120,
      travelTimeFromPrevMinutes: 18,
      travelDistFromPrevKm: 2.5,
      costINR: catItem.costINR,
      bookingStatus: 'confirmed'
    };

    const newDays = [...days];
    newDays[selectedDayIndex].items.push(newAct);
    setDays(newDays);

    // Add corresponding expense
    const newExp: Expense = {
      id: `exp-${Date.now()}`,
      title: catItem.title,
      category: 'activities',
      amountINR: catItem.costINR,
      date: days[selectedDayIndex].dateStr,
      paid: true,
      dayNumber: days[selectedDayIndex].dayNumber
    };
    const newExpenses = [...expenses, newExp];
    setExpenses(newExpenses);

    updateConnectedSummary(newDays, newExpenses);

    // Push notification
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: 'Activity Added to Trip',
        message: `Added "${catItem.title}" for ${days[selectedDayIndex].dateStr} at ${slotTime}.`,
        type: 'booking',
        timeAgo: 'Just now',
        read: false
      },
      ...prev
    ]);
  };

  // Handler: Apply Day Optimization
  const handleApplyOptimization = () => {
    const newDays = [...days];
    // Reorder day 2 items to optimized sequence
    const day2 = newDays[1];
    day2.totalTravelDistKm = 3.2;
    day2.totalTravelTimeMin = 49;

    day2.items = day2.items.map((i) => {
      if (i.id === 'd2-3') return { ...i, time: '10:40', endTime: '12:00' };
      if (i.id === 'd2-4') return { ...i, time: '12:30', endTime: '13:30' };
      return i;
    });

    setDays(newDays);

    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: 'Day 2 Optimized',
        message: 'Saved 27 mins of travel time and eliminated backtracking.',
        type: 'conflict',
        timeAgo: 'Just now',
        read: false
      },
      ...prev
    ]);
  };

  // Handler: Simulate Disruption (For Judges Demonstration)
  const handleSimulateDisruption = (type: 'flight-delay' | 'activity-cancelled' | 'restaurant-unavailable') => {
    if (type === 'flight-delay') {
      setActiveDisruption({
        ...initialDisruption,
        applied: false,
        detectedAt: 'Just now'
      });

      // Update flight booking status to delayed
      setBookings((prev) =>
        prev.map((b) => (b.id === 'b-flight' ? { ...b, status: 'delayed' } : b))
      );

      // Push notification
      setNotifications((prev) => [
        {
          id: `n-${Date.now()}`,
          title: '⚠ Flight Delay Incident Triggered',
          message: 'Flight JL42 delayed by 2 hours. Review impact in Disruption Center.',
          type: 'disruption',
          timeAgo: 'Just now',
          read: false,
          actionUrl: 'disruptions'
        },
        ...prev
      ]);

      setCurrentView('disruptions');
    } else if (type === 'activity-cancelled') {
      setCurrentView('alternatives');
    } else {
      setCurrentView('disruptions');
    }
  };

  // Handler: Apply proposed disruption resolution
  const handleApplyDisruptionProposed = () => {
    if (activeDisruption) {
      setActiveDisruption({ ...activeDisruption, applied: true });
    }

    // Update flight booking back to confirmed/adjusted
    setBookings((prev) =>
      prev.map((b) => (b.id === 'b-flight' ? { ...b, status: 'confirmed', time: '11:40 - 19:10' } : b))
    );

    // Update day 1 itinerary items to new arrival times
    const newDays = [...days];
    newDays[0].items = newDays[0].items.map((item) => {
      if (item.id === 'd1-1') return { ...item, time: '19:10', endTime: '20:00' };
      if (item.id === 'd1-2') return { ...item, time: '20:15', endTime: '21:00' };
      if (item.id === 'd1-3') return { ...item, time: '21:15', endTime: '22:30' };
      return item;
    });

    setDays(newDays);

    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: 'Disruption Resolved',
        message: 'Flight delay impact resolved. Timeline & bookings synced.',
        type: 'booking',
        timeAgo: 'Just now',
        read: false
      },
      ...prev
    ]);

    setCurrentView('command-center');
  };

  // Handler: Select Alternative option
  const handleSelectAlternative = (option: AlternativeOption) => {
    const newDays = [...days];
    newDays[1].items = newDays[1].items.map((i) => {
      if (i.id === 'd2-5') {
        return {
          ...i,
          title: option.optionTitle,
          time: option.time.split(' – ')[0],
          costINR: option.costINR
        };
      }
      return i;
    });

    setDays(newDays);

    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: 'Alternative Selected',
        message: `Switched to "${option.optionTitle}". Itinerary updated.`,
        type: 'booking',
        timeAgo: 'Just now',
        read: false
      },
      ...prev
    ]);

    setCurrentView('itinerary');
  };

  // Handler: Add expense & update budget
  const handleAddExpense = (newExp: Omit<Expense, 'id'>) => {
    const created: Expense = {
      ...newExp,
      id: `exp-${Date.now()}`
    };
    const updated = [...expenses, created];
    setExpenses(updated);
    updateConnectedSummary(days, updated);
  };

  // Handler: Toggle expense paid state
  const handleToggleExpensePaid = (id: string) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, paid: !e.paid } : e))
    );
  };

  // Handler: Send chat message to TravelPilot AI assistant
  const handleSendChatMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    let replyText = `I have analyzed your trip state for "${text}". Your 7-day schedule, ₹60,000 budget, and JR train pass timings are fully optimized for this adjustment.`;

    if (text.toLowerCase().includes('teamlab')) {
      replyText = `Yes! TeamLab Borderless fit is confirmed on Oct 13 for 14:30 – 16:30. Travel from Harajuku takes 27 minutes via the Metro Hibiya line.`;
    } else if (text.toLowerCase().includes('flight')) {
      replyText = `Flight JL42 is scheduled for 09:40 departure and 17:10 arrival at Haneda Airport (HND). If a 2-hour delay occurs, your airport transfer moves to 19:45 and dinner to 21:00 with zero impact on hotel check-in.`;
    }

    const assistantMsg: ChatMessage = {
      id: `m-${Date.now() + 1}`,
      sender: 'assistant',
      text: replyText,
      timestamp: 'Just now'
    };

    setChatMessages((prev) => [...prev, userMsg, assistantMsg]);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#1a1a1e] flex flex-col font-sans">
      {/* Onboarding Wizard Overlay if opened */}
      {isOnboardingOpen && (
        <OnboardingWizard onComplete={() => setIsOnboardingOpen(false)} />
      )}

      {/* App Core Container */}
      <div className="flex-1 flex w-full">
        {/* Permanent Left Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          activeDisruptionCount={activeDisruptionCount}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar Navigation */}
          <Topbar
            currentView={currentView}
            onSimulateDisruption={handleSimulateDisruption}
            unreadNotificationCount={unreadNotificationCount}
            onToggleNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
            demoMode={demoMode}
            onToggleDemoMode={() => setDemoMode(!demoMode)}
            onSelectTrip={(name) => setCurrentTripName(name)}
            currentTripName={currentTripName}
          />

          {/* Dynamic Page Views */}
          <main className="flex-1 overflow-y-auto">
            {currentView === 'command-center' && (
              <CommandCenter
                onNavigate={(v) => setCurrentView(v)}
                todayItinerary={days[selectedDayIndex]}
                bookings={bookings}
                activeDisruption={activeDisruption}
                selectedActivityId={selectedActivityId}
                onSelectActivity={(id) => setSelectedActivityId(id)}
                onResolveConflict={() => setCurrentView('disruptions')}
                totalBudgetINR={constraints.totalBudgetINR}
                spentBudgetINR={spentBudgetINR}
              />
            )}

            {currentView === 'itinerary' && (
              <ItineraryView
                days={days}
                currentDayIndex={selectedDayIndex}
                onSelectDayIndex={(idx) => setSelectedDayIndex(idx)}
                onOpenAddActivity={() => setIsAddActivityOpen(true)}
                onOpenOptimizeDay={() => setIsOptimizeOpen(true)}
                onMoveActivity={handleMoveActivity}
                onDeleteActivity={handleDeleteActivity}
              />
            )}

            {currentView === 'map' && (
              <MapScreen
                days={days}
                selectedDayIndex={selectedDayIndex}
                onSelectDayIndex={(idx) => setSelectedDayIndex(idx)}
                onOpenAddActivity={() => setIsAddActivityOpen(true)}
              />
            )}

            {currentView === 'calendar' && <CalendarView days={days} />}

            {currentView === 'bookings' && (
              <BookingsView
                bookings={bookings}
                onSelectBooking={(b) => setSelectedBookingForDrawer(b)}
              />
            )}

            {currentView === 'budget' && (
              <BudgetView
                totalBudgetINR={constraints.totalBudgetINR}
                spentBudgetINR={spentBudgetINR}
                expenses={expenses}
                onAddExpense={handleAddExpense}
                onUpdateTotalBudget={(limit) => setConstraints({ ...constraints, totalBudgetINR: limit })}
                onToggleExpensePaid={handleToggleExpensePaid}
              />
            )}

            {currentView === 'activities' && (
              <ItineraryView
                days={days}
                currentDayIndex={selectedDayIndex}
                onSelectDayIndex={(idx) => setSelectedDayIndex(idx)}
                onOpenAddActivity={() => setIsAddActivityOpen(true)}
                onOpenOptimizeDay={() => setIsOptimizeOpen(true)}
                onMoveActivity={handleMoveActivity}
                onDeleteActivity={handleDeleteActivity}
              />
            )}

            {currentView === 'transportation' && (
              <BookingsView
                bookings={bookings.filter((b) => b.type === 'transport' || b.type === 'flight')}
                onSelectBooking={(b) => setSelectedBookingForDrawer(b)}
              />
            )}

            {currentView === 'disruptions' && (
              <DisruptionCenter
                disruption={activeDisruption || initialDisruption}
                onApplyChanges={handleApplyDisruptionProposed}
                onNavigate={(v) => setCurrentView(v)}
              />
            )}

            {currentView === 'alternatives' && (
              <AlternativesView
                alternatives={alternatives}
                onSelectAlternative={handleSelectAlternative}
                onNavigate={(v) => setCurrentView(v)}
              />
            )}

            {currentView === 'backup-plans' && (
              <BackupPlansView backupPlans={backupPlans} />
            )}

            {currentView === 'replan' && (
              <ReplanWorkspace
                constraints={constraints}
                onUpdateConstraints={(newC) => setConstraints(newC)}
                onApplyNewItinerary={() => {
                  setNotifications((prev) => [
                    {
                      id: `n-${Date.now()}`,
                      title: 'Trip Rebuilt via Replan Workspace',
                      message: 'New budget & interest constraints applied to full 7-day schedule.',
                      type: 'booking',
                      timeAgo: 'Just now',
                      read: false
                    },
                    ...prev
                  ]);
                  setCurrentView('command-center');
                }}
                onNavigate={(v) => setCurrentView(v)}
              />
            )}

            {currentView === 'ask-travelpilot' && (
              <AskTravelPilotView
                chatMessages={chatMessages}
                onSendMessage={handleSendChatMessage}
                onNavigate={(v) => setCurrentView(v)}
                onAddSuggestedActivity={() => setIsAddActivityOpen(true)}
              />
            )}

            {currentView === 'trip-summary' && (
              <TripSummaryView
                summary={summary}
                days={days}
                onNavigate={(v) => setCurrentView(v)}
                onSelectDayIndex={(idx) => setSelectedDayIndex(idx)}
              />
            )}
          </main>
        </div>
      </div>

      {/* Drawers & Modals */}
      <AddActivityDrawer
        isOpen={isAddActivityOpen}
        onClose={() => setIsAddActivityOpen(false)}
        onAddActivity={handleAddActivityFromDrawer}
      />

      <OptimizeItineraryModal
        isOpen={isOptimizeOpen}
        onClose={() => setIsOptimizeOpen(false)}
        onApplyOptimization={handleApplyOptimization}
        dayName={days[selectedDayIndex]?.dateFormatted}
      />

      <NotificationCenterDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
        onNavigate={(v) => setCurrentView(v)}
      />

      <BookingDetailDrawer
        booking={selectedBookingForDrawer}
        onClose={() => setSelectedBookingForDrawer(null)}
        onViewImpact={() => {
          setSelectedBookingForDrawer(null);
          setCurrentView('disruptions');
        }}
      />
    </div>
  );
}

export default App;
