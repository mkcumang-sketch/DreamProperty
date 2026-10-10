'use client';

import React, { useState } from 'react';
import {
  Search,
  Download,
  Trash2,
  Edit3,
  MessageCircle,
  MapPin,
  Check,
} from 'lucide-react';
import { LeadRecord } from '@/types';
import { StatusBadge } from './StatusBadge';

interface LeadsTableProps {
  initialLeads: LeadRecord[];
}

export function LeadsTable({ initialLeads }: LeadsTableProps) {
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');

  // Client-side filtering for immediate snappy responsiveness
  const filtered = leads.filter((lead) => {
    const matchesSearch =
      search === '' ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search) ||
      (lead.email && lead.email.toLowerCase().includes(search.toLowerCase())) ||
      (lead.location && lead.location.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || lead.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus as LeadRecord['status'] } : l))
      );
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoadingId(null);
    }
  };

  const handleSaveNotes = async (id: string) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: notesText }),
      });

      if (!res.ok) throw new Error('Failed to update notes');

      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, notes: notesText } : l))
      );
      setEditingNotesId(null);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete lead "${name}"? This action cannot be undone.`)) {
      return;
    }

    setLoadingId(id);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete lead');

      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search, Filter, and Export Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex flex-1 flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone, email, or area..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090d13] border border-white/10 text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-[#e0231c]"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-[#090d13] border border-white/10 text-white text-xs cursor-pointer focus:outline-none focus:border-[#e0231c]"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">NEW</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="QUOTED">QUOTED</option>
              <option value="WON">WON</option>
              <option value="LOST">LOST</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-[#090d13] border border-white/10 text-white text-xs cursor-pointer focus:outline-none focus:border-[#e0231c]"
            >
              <option value="ALL">All Roles</option>
              <option value="BUYER">BUYER</option>
              <option value="SELLER">SELLER</option>
              <option value="TENANT">TENANT</option>
              <option value="LANDLORD">LANDLORD</option>
              <option value="PARTNER">PARTNER</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              window.location.href = '/api/leads/export';
            }}
            id="admin-export-csv-btn"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-[#e0231c] text-white text-xs font-semibold transition-all border border-white/10 hover:border-transparent cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-white/10 bg-[#090d13] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-white/50 uppercase tracking-wider font-mono text-[10px]">
                <th className="py-4 px-4">Contact</th>
                <th className="py-4 px-4">Role / Scope</th>
                <th className="py-4 px-4">Location & Budget</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Notes</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-white/40">
                    No leads found matching current criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => {
                  const dateStr = new Date(lead.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                  const waUrl = `https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${lead.name}, this is Dream Properties Atelier following up on your interior enquiry.`
                  )}`;

                  return (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Contact */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white text-sm">{lead.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <a
                            href={`tel:${lead.phone}`}
                            className="font-mono text-white/60 hover:text-white"
                          >
                            {lead.phone}
                          </a>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#25D366] hover:opacity-80"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                        {lead.email && (
                          <div className="text-[11px] text-white/40 truncate max-w-[180px]">
                            {lead.email}
                          </div>
                        )}
                        <div className="text-[10px] text-white/30 font-mono mt-1">
                          {dateStr}
                        </div>
                      </td>

                      {/* Role / Scope */}
                      <td className="py-4 px-4">
                        <span className="inline-block px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/70 mb-1">
                          {lead.type}
                        </span>
                        {lead.service && (
                          <div className="text-white/80 font-medium">{lead.service}</div>
                        )}
                        {lead.propertyType && (
                          <div className="text-white/50 text-[11px]">{lead.propertyType}</div>
                        )}
                      </td>

                      {/* Location & Budget */}
                      <td className="py-4 px-4">
                        <div className="text-white/80 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#e0231c]" />
                          <span>{lead.location || 'Kanpur'}</span>
                        </div>
                        {lead.budgetRange && (
                          <div className="text-emerald-400 font-mono text-[11px] mt-1">
                            {lead.budgetRange}
                          </div>
                        )}
                        {lead.message && (
                          <p className="text-[11px] text-white/50 italic line-clamp-2 mt-1 max-w-xs">
                            &ldquo;{lead.message}&rdquo;
                          </p>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <div className="space-y-1.5">
                          <StatusBadge status={lead.status} />
                          <div>
                            <select
                              value={lead.status}
                              disabled={loadingId === lead.id}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                              className="bg-[#0e141d] border border-white/10 text-[11px] text-white/80 rounded px-1.5 py-1 focus:outline-none focus:border-[#e0231c] cursor-pointer"
                            >
                              <option value="NEW">Set NEW</option>
                              <option value="CONTACTED">Set CONTACTED</option>
                              <option value="QUOTED">Set QUOTED</option>
                              <option value="WON">Set WON</option>
                              <option value="LOST">Set LOST</option>
                            </select>
                          </div>
                        </div>
                      </td>

                      {/* Notes */}
                      <td className="py-4 px-4">
                        {editingNotesId === lead.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={notesText}
                              onChange={(e) => setNotesText(e.target.value)}
                              className="px-2 py-1 rounded bg-[#05070a] border border-white/20 text-white text-xs w-40"
                              placeholder="Add follow-up notes..."
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveNotes(lead.id)}
                              className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-500"
                              title="Save Note"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setEditingNotesId(lead.id);
                              setNotesText(lead.notes || '');
                            }}
                            className="cursor-pointer group flex items-start gap-1 max-w-[160px]"
                          >
                            <span className="text-white/60 line-clamp-2 text-[11px]">
                              {lead.notes || 'Click to add note...'}
                            </span>
                            <Edit3 className="w-3 h-3 text-white/30 group-hover:text-white shrink-0 mt-0.5" />
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(lead.id, lead.name)}
                          disabled={loadingId === lead.id}
                          className="p-1.5 rounded-lg text-white/40 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
