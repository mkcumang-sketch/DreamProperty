'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Loader2, AlertCircle } from 'lucide-react';
import { leadFormSchema, LeadFormInput } from '@/lib/validations';
import { useT } from '@/lib/i18n/useT';
import { FormField } from './FormField';
import { SuccessState } from './SuccessState';

interface LeadFormProps {
  initialType?: 'BUYER' | 'SELLER' | 'TENANT' | 'LANDLORD' | 'PARTNER' | 'OTHER';
  inlineSuccess?: boolean;
}

export function LeadForm({ initialType = 'BUYER', inlineSuccess = true }: LeadFormProps) {
  const { t, locale } = useT();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LeadFormInput>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      type: initialType,
      language: locale,
      hp: '',
      name: '',
      phone: '',
      email: '',
      service: '',
      propertyType: '',
      location: '',
      budgetRange: '',
      message: '',
    },
  });

  useEffect(() => {
    setValue('language', locale);
  }, [locale, setValue]);

  useEffect(() => {
    if (initialType) {
      setValue('type', initialType);
    }
  }, [initialType, setValue]);

  const onSubmit = async (data: LeadFormInput) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit enquiry. Please try again.');
      }

      setSubmittedLeadId(json.id);
      setSubmittedName(data.name);

      if (!inlineSuccess) {
        router.push(`/thank-you?id=${json.id}&name=${encodeURIComponent(data.name)}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please call us directly.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedLeadId(null);
    setSubmittedName(null);
    setErrorMessage(null);
    reset({
      type: initialType,
      language: locale,
      hp: '',
      name: '',
      phone: '',
      email: '',
      service: '',
      propertyType: '',
      location: '',
      budgetRange: '',
      message: '',
    });
  };

  if (submittedLeadId && inlineSuccess) {
    return (
      <SuccessState
        leadId={submittedLeadId}
        name={submittedName || undefined}
        onReset={handleReset}
      />
    );
  }

  const inputClasses =
    'w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#e0231c] focus:ring-1 focus:ring-[#e0231c] transition-all';
  const selectClasses =
    'w-full px-4 py-3 rounded-xl bg-[#0d121a] border border-white/10 text-white text-sm focus:outline-none focus:border-[#e0231c] focus:ring-1 focus:ring-[#e0231c] transition-all cursor-pointer';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 sm:p-8 rounded-2xl bg-[#090d13]/80 border border-white/10 backdrop-blur-md shadow-2xl space-y-5"
      noValidate
      id="lead-enquiry-form"
    >
      {/* Honeypot anti-spam field */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('hp')}
        />
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-[#ff3b30]/10 border border-[#ff3b30]/30 text-[#ff8077] text-sm flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          id="lead-name"
          label={t.form.nameLabel}
          required
          error={errors.name?.message}
        >
          <input
            id="lead-name"
            type="text"
            placeholder={t.form.namePlaceholder}
            className={inputClasses}
            {...register('name')}
          />
        </FormField>

        <FormField
          id="lead-phone"
          label={t.form.phoneLabel}
          required
          hint="10-digit mobile"
          error={errors.phone?.message}
        >
          <input
            id="lead-phone"
            type="tel"
            placeholder={t.form.phonePlaceholder}
            className={inputClasses}
            {...register('phone')}
          />
        </FormField>
      </div>

      {/* Row 2: Email & Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          id="lead-email"
          label={t.form.emailLabel}
          error={errors.email?.message}
        >
          <input
            id="lead-email"
            type="email"
            placeholder={t.form.emailPlaceholder}
            className={inputClasses}
            {...register('email')}
          />
        </FormField>

        <FormField
          id="lead-type"
          label={t.form.typeLabel}
          required
          error={errors.type?.message}
        >
          <select id="lead-type" className={selectClasses} {...register('type')}>
            <option value="BUYER">{t.form.typeBuyer}</option>
            <option value="SELLER">{t.form.typeSeller}</option>
            <option value="TENANT">{t.form.typeTenant}</option>
            <option value="LANDLORD">{t.form.typeLandlord}</option>
            <option value="PARTNER">{t.form.typePartner}</option>
            <option value="OTHER">{t.form.typeOther}</option>
          </select>
        </FormField>
      </div>

      {/* Row 3: Service & Property Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          id="lead-service"
          label={t.form.serviceLabel}
          error={errors.service?.message}
        >
          <select id="lead-service" className={selectClasses} {...register('service')}>
            <option value="">Select interest...</option>
            <option value="Home Staging">Home Staging for Faster Sale</option>
            <option value="Rental Furnishing">Rental-Ready Furnishing</option>
            <option value="Turnkey Interior">Turnkey Interior Design</option>
            <option value="Commercial Fitout">Commercial / Hotel Fit-out</option>
            <option value="Modular Kitchen & Wardrobes">Modular Kitchens & Wardrobes</option>
            <option value="Vastu Planning">Vastu-Aware Architectural Layout</option>
          </select>
        </FormField>

        <FormField
          id="lead-property-type"
          label={t.form.propertyTypeLabel}
          error={errors.propertyType?.message}
        >
          <select id="lead-property-type" className={selectClasses} {...register('propertyType')}>
            <option value="">Select property...</option>
            <option value="2 BHK Apartment">2 BHK Apartment</option>
            <option value="3 BHK Apartment">3 BHK Apartment</option>
            <option value="4+ BHK / Penthouse">4+ BHK / Penthouse</option>
            <option value="Independent Villa / Kothi">Independent Villa / Kothi</option>
            <option value="Commercial Showroom / Office">Commercial Showroom / Office</option>
            <option value="Plot / New Construction">Plot / New Construction</option>
          </select>
        </FormField>
      </div>

      {/* Row 4: Location & Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          id="lead-location"
          label={t.form.locationLabel}
          error={errors.location?.message}
        >
          <input
            id="lead-location"
            type="text"
            placeholder={t.form.locationPlaceholder}
            className={inputClasses}
            {...register('location')}
          />
        </FormField>

        <FormField
          id="lead-budget"
          label={t.form.budgetLabel}
          error={errors.budgetRange?.message}
        >
          <select id="lead-budget" className={selectClasses} {...register('budgetRange')}>
            <option value="">Estimated budget...</option>
            <option value="Under ₹3 Lakhs">Under ₹3 Lakhs (Staging / Minor Refresh)</option>
            <option value="₹3 - ₹7 Lakhs">₹3 - ₹7 Lakhs (Rental Furnishing)</option>
            <option value="₹7 - ₹15 Lakhs">₹7 - ₹15 Lakhs (Full Interior - Mid Range)</option>
            <option value="₹15 - ₹30 Lakhs">₹15 - ₹30 Lakhs (Premium Turnkey)</option>
            <option value="₹30 Lakhs+">₹30 Lakhs+ (Luxury Architectural Residence)</option>
          </select>
        </FormField>
      </div>

      {/* Message */}
      <FormField
        id="lead-message"
        label={t.form.messageLabel}
        error={errors.message?.message}
      >
        <textarea
          id="lead-message"
          rows={3}
          placeholder={t.form.messagePlaceholder}
          className={`${inputClasses} resize-none`}
          {...register('message')}
        />
      </FormField>

      {/* Submit Button */}
      <button
        type="submit"
        id="lead-form-submit-btn"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#e0231c] hover:bg-[#c91e17] text-white font-semibold text-sm transition-all shadow-[0_0_25px_rgba(224,35,28,0.4)] hover:shadow-[0_0_35px_rgba(224,35,28,0.6)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting details...</span>
          </>
        ) : (
          <>
            <span>{t.form.submitButton}</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-[11px] text-center text-white/40">
        Dream Properties partner desk strictly protects your contact privacy. No telemarketing spam.
      </p>
    </form>
  );
}
