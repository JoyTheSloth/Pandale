'use client';

import React, { useState } from 'react';
import { PANDALS_DATA } from '@/data/pandals';
import { METRO_STATIONS_DATA } from '@/data/metro';
import { Pandal, ZoneArea, CrowdLevel } from '@/types';
import { 
  ShieldCheck, 
  Plus, 
  Save, 
  RefreshCw, 
  MapPin, 
  Train, 
  CheckCircle2, 
  AlertTriangle,
  Code,
  Sparkles
} from 'lucide-react';
import InstagramIcon from '@/components/icons/InstagramIcon';

export default function AdminPage() {
  const [pandalsList, setPandalsList] = useState<Pandal[]>(PANDALS_DATA);
  const [selectedPandalId, setSelectedPandalId] = useState<string>(PANDALS_DATA[0].id);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  
  // Instagram Sync state
  const [syncStatus, setSyncStatus] = useState<{
    loading: boolean;
    result?: any;
    error?: string;
  }>({ loading: false });

  // Form State for editing
  const activePandal = pandalsList.find((p) => p.id === selectedPandalId) || pandalsList[0];
  const [formData, setFormData] = useState<Pandal>(activePandal);

  const handleSelectPandal = (id: string) => {
    setSelectedPandalId(id);
    const found = pandalsList.find((p) => p.id === id);
    if (found) setFormData(found);
    setSaveSuccess(null);
  };

  const handleInputChange = (field: keyof Pandal, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/pandals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(`Pandal "${formData.name}" successfully updated!`);
        // Update local list
        setPandalsList((prev) =>
          prev.map((p) => (p.id === formData.id ? { ...formData } : p))
        );
        setTimeout(() => setSaveSuccess(null), 3000);
      } else {
        alert(data.error || 'Failed to save pandal');
      }
    } catch (err: any) {
      alert('Error updating pandal: ' + err.message);
    }
  };

  const handleCreateNew = () => {
    const newId = `pandal-${Date.now()}`;
    const fresh: Pandal = {
      id: newId,
      name: 'New 2026 Durga Puja Pandal',
      slug: `new-pandal-${Date.now()}`,
      description: 'Detailed description of this Kolkata Durga Puja celebration...',
      theme: '2026 Art Theme Preview',
      area: 'North Kolkata',
      locality: 'Kolkata',
      latitude: 22.5726,
      longitude: 88.3639,
      google_place_id: '',
      google_maps_url: '',
      nearest_metro: 'Central',
      walking_distance: '500m',
      walking_time_mins: 6,
      metro_details: [],
      tags: ['Must Visit', 'Near Metro'],
      puja_committee: 'Sarbojanin Durgotsav Committee',
      best_time: 'Evening (6:00 PM – 10:00 PM)',
      crowd_status: {
        level: 'moderate',
        source: 'Estimated',
        last_updated: 'Just now'
      },
      recommended_days: ['Saptami', 'Ashtami', 'Nabami', 'Tonight'],
      featured_image: 'https://images.unsplash.com/photo-1601659972322-263a48e65e6d?auto=format&fit=crop&w=1200&q=80',
      images: [],
      latest_images: [],
      trending_score: 85,
      saves_count: 100,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setPandalsList([fresh, ...pandalsList]);
    setSelectedPandalId(newId);
    setFormData(fresh);
    setSaveSuccess('New draft created. Fill in coordinates and details then click Save.');
  };

  // Trigger Instagram pipeline sync
  const handleTriggerSync = async () => {
    setSyncStatus({ loading: true });
    try {
      const res = await fetch('/api/instagram/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pandalId: formData.id })
      });
      const data = await res.json();
      setSyncStatus({ loading: false, result: data });
    } catch (err: any) {
      setSyncStatus({ loading: false, error: err.message });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E2D8]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-mono mb-2 border border-stone-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Admin & Content Management Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-[#181513]">
            Pujo 2026 Data Hub
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E] mt-1">
            Add or edit pandals, update themes, adjust metro walking times, and trigger authorized Instagram sync.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-2xl bg-[#D43827] hover:bg-[#B52819] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Pandal</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* Main Dual Editor Layout */}
      <div className="grid grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Pandal Picker */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl border border-[#E9E2D8] p-5 shadow-xs space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8E857B]">
            All Pandals ({pandalsList.length})
          </span>
          <div className="space-y-1.5 max-h-[600px] overflow-y-auto no-scrollbar pr-1">
            {pandalsList.map((p) => {
              const isSelected = p.id === selectedPandalId;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPandal(p.id)}
                  className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#181513] text-white'
                      : 'bg-stone-50 hover:bg-[#FAF8F5] text-[#181513]'
                  }`}
                >
                  <div className="truncate">
                    <div className="text-xs font-bold truncate">{p.name}</div>
                    <div className={`text-[10px] truncate ${isSelected ? 'text-amber-200' : 'text-[#8E857B]'}`}>
                      {p.area} • {p.nearest_metro}
                    </div>
                  </div>
                  {isSelected && <span className="text-xs">✏️</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Edit Form & Instagram Sync */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Edit Form */}
          <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#E9E2D8] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E9E2D8]">
              <h2 className="text-xl font-bold font-editorial text-[#181513]">
                Edit: {formData.name}
              </h2>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#181513] hover:bg-[#2A2623] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-4 h-4 text-amber-300" />
                <span>Save Changes</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#8E857B] block mb-1">Pandal Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E2DAD0] text-xs font-medium focus:ring-1 focus:ring-[#D43827]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8E857B] block mb-1">Zone Area</label>
                <select
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value as ZoneArea)}
                  className="w-full p-2.5 rounded-xl border border-[#E2DAD0] text-xs font-medium focus:ring-1 focus:ring-[#D43827]"
                >
                  <option value="North Kolkata">North Kolkata</option>
                  <option value="South Kolkata">South Kolkata</option>
                  <option value="Central Kolkata">Central Kolkata</option>
                  <option value="East Kolkata">East Kolkata</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8E857B] block mb-1">Locality</label>
                <input
                  type="text"
                  value={formData.locality}
                  onChange={(e) => handleInputChange('locality', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E2DAD0] text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8E857B] block mb-1">Puja Committee</label>
                <input
                  type="text"
                  value={formData.puja_committee}
                  onChange={(e) => handleInputChange('puja_committee', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E2DAD0] text-xs font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#8E857B] block mb-1">Theme (2026 Art Preview)</label>
                <input
                  type="text"
                  value={formData.theme}
                  onChange={(e) => handleInputChange('theme', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E2DAD0] text-xs font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#8E857B] block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E2DAD0] text-xs font-medium"
                />
              </div>

              {/* Exact Geolocation */}
              <div>
                <label className="text-xs font-semibold text-[#8E857B] block mb-1">Latitude</label>
                <input
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => handleInputChange('latitude', parseFloat(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-[#E2DAD0] text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8E857B] block mb-1">Longitude</label>
                <input
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => handleInputChange('longitude', parseFloat(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-[#E2DAD0] text-xs font-mono"
                />
              </div>

              {/* Metro Connection */}
              <div>
                <label className="text-xs font-semibold text-[#8E857B] block mb-1">Nearest Metro Station</label>
                <input
                  type="text"
                  value={formData.nearest_metro}
                  onChange={(e) => handleInputChange('nearest_metro', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E2DAD0] text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8E857B] block mb-1">Walking Distance & Time</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.walking_distance}
                    onChange={(e) => handleInputChange('walking_distance', e.target.value)}
                    placeholder="e.g. 650m"
                    className="w-full p-2.5 rounded-xl border border-[#E2DAD0] text-xs"
                  />
                  <input
                    type="number"
                    value={formData.walking_time_mins}
                    onChange={(e) => handleInputChange('walking_time_mins', parseInt(e.target.value, 10))}
                    placeholder="e.g. 8"
                    className="w-full p-2.5 rounded-xl border border-[#E2DAD0] text-xs"
                  />
                </div>
              </div>

              {/* Featured Image */}
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#8E857B] block mb-1">Featured Photo URL</label>
                <input
                  type="url"
                  value={formData.featured_image}
                  onChange={(e) => handleInputChange('featured_image', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E2DAD0] text-xs font-mono"
                />
              </div>

            </div>

            <div className="pt-4 border-t border-[#E9E2D8] flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-[#D43827] hover:bg-[#B52819] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save Pandal</span>
              </button>
            </div>
          </form>

          {/* Instagram API Sync Pipeline Panel */}
          <div className="bg-white rounded-3xl border border-[#E9E2D8] p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-pink-600">
              <InstagramIcon className="w-5 h-5" />
              <h3 className="text-lg font-bold font-editorial text-[#181513]">
                Authorized Instagram Pipeline
              </h3>
            </div>
            <p className="text-xs text-[#5C554E] leading-relaxed">
              Trigger the server-side sync pipeline for <strong>{formData.name}</strong>. Calls official Meta Graph API when <code>INSTAGRAM_ACCESS_TOKEN</code> is supplied in <code>.env.local</code>, validates payload, and associates media with this pandal.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleTriggerSync}
                disabled={syncStatus.loading}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncStatus.loading ? 'animate-spin' : ''}`} />
                <span>{syncStatus.loading ? 'Syncing...' : 'Trigger Instagram Sync'}</span>
              </button>
            </div>

            {syncStatus.result && (
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E9E2D8] text-xs font-mono space-y-1">
                <div className="font-bold text-emerald-700">✓ Sync Pipeline Completed</div>
                <div>Status Message: {syncStatus.result.message}</div>
                <div>Source Mode: {syncStatus.result.source}</div>
                <div>Has Live Token: {syncStatus.result.hasTokenConfigured ? 'Yes (Live Graph API)' : 'No (Sample Feed Preview Ready)'}</div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
