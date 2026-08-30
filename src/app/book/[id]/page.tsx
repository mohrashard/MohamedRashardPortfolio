'use client';

import React, { useEffect, useState, use } from 'react';
import { createClient } from '@supabase/supabase-js';
import Navbar from '../../components/Navbar';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function BookingPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ id: string }>; 
  searchParams?: Promise<{ embed?: string }>; 
}) {
  const { id } = use(params);
  const sParams = searchParams ? use(searchParams) : undefined;
  const isEmbedQuery = sParams?.embed === 'true';

  const [lead, setLead] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookedLink, setBookedLink] = useState<string | null>(null);
  const [userTimeZone, setUserTimeZone] = useState<string>('');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  // Get user's actual timezone string (e.g., "America/New_York")
  useEffect(() => {
    setUserTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  // 1. Fetch Lead context
  useEffect(() => {
    async function loadLead() {
      // Check query params passed via iframe first
      const urlParams = new URLSearchParams(window.location.search);
      const qName = urlParams.get('name');
      const qEmail = urlParams.get('email');
      const qNotes = urlParams.get('notes');

      if (qName) setName(qName);
      if (qEmail) setEmail(qEmail);
      if (qNotes) setNotes(qNotes);

      if (!id || id === 'direct') return;
      const { data } = await supabase
        .from('outreach_leads')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        setLead(data);
        if (!qEmail && data.email) {
          setEmail(data.email);
        }
        if (!qName) {
          if (data.email) {
            const prefix = data.email.split('@')[0];
            if (!['info', 'contact', 'hello', 'support', 'sales', 'admin', 'team'].includes(prefix.toLowerCase())) {
              setName(prefix.charAt(0).toUpperCase() + prefix.slice(1));
            } else if (data.company_name) {
              setName(data.company_name);
            }
          } else if (data.company_name) {
            setName(data.company_name);
          }
        }
      }
    }
    loadLead();
  }, [id]);

  // Next 14 available days (skipping weekends)
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split('T')[0];
  }).filter(d => {
    const day = new Date(d).getDay();
    return day !== 0 && day !== 6; 
  });

  // 2. Fetch Slots when date is selected
  useEffect(() => {
    if (!selectedDate) return;
    async function fetchSlots() {
      setLoadingSlots(true);
      setSlots([]);
      setSelectedSlot(''); // Reset slot if they change date
      try {
        const res = await fetch(`/api/calendar/slots?date=${selectedDate}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' }
        });
        const data = await res.json();
        setSlots(data.slots || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingSlots(false);
      }
    }
    fetchSlots();
  }, [selectedDate]);

  // 3. Submit Booking
  async function handleBook() {
    setSubmitting(true);
    try {
      const res = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: id !== 'direct' ? id : null,
          date: selectedDate,
          slot: selectedSlot,
          name,
          email,
          company: lead?.company_name || '',
          domain: lead?.website_url || '',
          notes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setBookedLink(data.meetLink);
      } else {
        alert(data.error || 'Failed to book');
      }
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  const [mounted, setMounted] = useState(false);
  const [isIframe, setIsIframe] = useState(false);
  
  useEffect(() => {
    try {
      if (window.self !== window.top) {
        setIsIframe(true);
      }
    } catch (e) {
      setIsIframe(true);
    }
    setMounted(true);
  }, []);

  const isEmbed = isEmbedQuery || isIframe;

  // Success Screen
  if (bookedLink) {
    const successContent = (
      <>
        <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto text-3xl">✓</div>
        <h2 className="text-2xl font-semibold text-white">Call Confirmed</h2>
        <p className="text-zinc-400 text-sm">A calendar invite and Google Meet link have been sent to <strong>{email}</strong>.</p>
      </>
    );

    if (isEmbed) {
      return (
        <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center space-y-4 bg-black">
          {successContent}
        </div>
      );
    }

    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-start p-4 md:p-8 pt-32 md:pt-40 pb-20">
          <div className="w-full max-w-2xl bg-[#121215] border border-white/10 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
            {successContent}
          </div>
        </div>
      </>
    );
  }

  if (!mounted) {
    const loadingUI = (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-zinc-500 font-medium animate-pulse">Loading secure session...</p>
      </div>
    );

    if (isEmbedQuery) {
      return (
        <div className="w-full min-h-full bg-transparent text-white p-6 md:p-8 text-left">
          <div className="w-full max-w-2xl mx-auto">
            {loadingUI}
          </div>
        </div>
      );
    }

    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-start p-4 md:p-8 pt-32 md:pt-40 pb-20">
          <div className="w-full max-w-2xl bg-[#121215] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl text-left">
            {loadingUI}
          </div>
        </div>
      </>
    );
  }

  const innerContent = (
    <>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
              {lead?.website_url ? `Book your call about ${lead.website_url}` : 'Schedule a Working Session'}
            </h2>
            <p className="text-zinc-400 text-sm mt-2">15-min discovery & architecture review for your project</p>
          </div>

          <div className="space-y-8">
            {/* Step 1: Select Date */}
            <div>
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold block mb-3">1. Select Date</label>
              <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {availableDates.map(date => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`px-5 py-3 rounded-full text-sm font-medium border whitespace-nowrap transition-all ${
                      selectedDate === date
                        ? 'bg-white text-black border-white'
                        : 'bg-[#1a1a1d] border-white/5 text-zinc-300 hover:border-white/20 hover:bg-[#222226]'
                    }`}
                  >
                    {new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Slot */}
            {selectedDate && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold block mb-3">
                  2. Available Times <span className="text-blue-400/80 normal-case tracking-normal ml-1">({userTimeZone})</span>
                </label>
                {loadingSlots ? (
                  <div className="text-sm text-zinc-500 animate-pulse py-3">Checking calendar...</div>
                ) : slots.length === 0 ? (
                  <div className="text-sm text-zinc-500 py-3">No available slots on this day.</div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {slots.map(slot => {
                      const localTime = new Date(`${selectedDate}T${slot}:00Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      return (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-3 px-4 rounded-full text-sm font-medium border transition-all ${
                            selectedSlot === slot
                              ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                              : 'bg-[#1a1a1d] border-white/5 text-zinc-300 hover:border-white/20 hover:bg-[#222226]'
                          }`}
                        >
                          {localTime}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Progressive Disclosure Form */}
            {selectedSlot && (
              <div className="space-y-5 pt-6 border-t border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1.5">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-[#1a1a1d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Alex Smith"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-[#1a1a1d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="alex@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5">Priority Notes / Focus (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    rows={2}
                    className="w-full bg-[#1a1a1d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Specific systems to review..."
                  />
                </div>

                <button
                  disabled={submitting || !email || !name}
                  onClick={handleBook}
                  className="w-full py-3.5 bg-white text-black font-bold text-sm rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] mt-2"
                >
                  {submitting ? 'Confirming...' : 'Confirm Strategy Session'}
                </button>
              </div>
            )}
          </div>
    </>
  );

  if (isEmbed) {
    return (
      <div className="w-full min-h-full bg-transparent text-white p-6 md:p-8 text-left">
        <div className="w-full max-w-2xl mx-auto">
          {innerContent}
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-start p-4 md:p-8 pt-32 md:pt-40 pb-20">
        <div className="w-full max-w-2xl bg-[#121215] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl text-left">
          {innerContent}
        </div>
      </div>
    </>
  );
}
