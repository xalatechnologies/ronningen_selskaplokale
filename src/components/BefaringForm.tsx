import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { CalendarCheck } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import { ROUTES } from '../lib/routes';

export type BefaringFormValues = {
  name: string;
  phone: string;
  email: string;
  address: string;
  eventType: 'Privat' | 'Bedrift';
  festType: string;
  preferredDate: string;
  guestCount: number;
  message: string;
};

type BefaringFormProps = {
  embedded?: boolean;
  className?: string;
};

export const BefaringForm: React.FC<BefaringFormProps> = ({ embedded = false, className }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t('befaringForm.errName')),
        phone: z
          .string()
          .trim()
          .min(8, t('befaringForm.errPhone')),
        email: z.string().email(t('befaringForm.errEmail')),
        address: z.string().max(300),
        eventType: z.enum(['Privat', 'Bedrift'], {
          message: t('befaringForm.errEventType'),
        }),
        festType: z.string().max(120),
        preferredDate: z
          .string()
          .min(1, t('befaringForm.errDate'))
          .refine((s) => !Number.isNaN(Date.parse(s)), {
            message: t('befaringForm.errDate'),
          }),
        guestCount: z.coerce
          .number()
          .int()
          .min(0, t('befaringForm.errGuestCount'))
          .max(50_000),
        message: z.string().min(10, t('befaringForm.errMessage')),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BefaringFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      eventType: 'Privat',
      festType: '',
      preferredDate: '',
      guestCount: 0,
      message: '',
    },
  });

  const onSubmit = async (data: BefaringFormValues) => {
    const lang = i18n.language.startsWith('no') ? 'no' : 'en';

    try {
      const res = await fetch('/api/befaring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name.trim(),
          phone: data.phone.trim(),
          email: data.email.trim(),
          address: data.address.trim() || undefined,
          eventType: data.eventType,
          festType: data.festType.trim() || undefined,
          preferredEventDate: data.preferredDate,
          guestCount: data.guestCount,
          message: data.message.trim(),
          language: lang,
        }),
      });

      const payload = (await res.json().catch(() => null)) as
        | { ok?: boolean }
        | null;

      if (!res.ok || !payload?.ok) {
        toast.error(t('befaringForm.error'));
        return;
      }

      // Optional local backup in website Supabase (does not block CRM/email success).
      if (isSupabaseConfigured()) {
        const messageText = [
          lang === 'no' ? '[Befaring]' : '[Viewing request]',
          `Kundetype/eventType: ${data.eventType}`,
          data.festType.trim() ? `Type: ${data.festType.trim()}` : null,
          `Dato: ${data.preferredDate}`,
          `Gjester: ${data.guestCount}`,
          data.address.trim() ? `Adresse: ${data.address.trim()}` : null,
          '',
          data.message.trim(),
        ]
          .filter((line) => line != null)
          .join('\n');

        void supabase
          .from('inquiries')
          .insert([
            {
              name: data.name.trim(),
              email: data.email.trim(),
              phone: data.phone.trim(),
              message: messageText,
              language: lang,
              flexible_date: false,
              needs_catering: false,
              needs_decoration: false,
              needs_staffing: false,
              needs_viewing: true,
              event_type_id: null,
              preferred_date: data.preferredDate,
              guest_count: data.guestCount || null,
              status: 'new',
            },
          ])
          .then(({ error }) => {
            if (error) console.error('Befaring form Supabase backup:', error);
          });
      }

      navigate(ROUTES.takk);
    } catch (err) {
      console.error('Befaring form submit:', err);
      toast.error(t('befaringForm.error'));
    }
  };

  const labelClass = embedded
    ? 'mb-2.5 block text-xs font-semibold uppercase tracking-[0.16em] text-brand-800 dark:text-brand-200'
    : 'mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300';
  const inputClass = embedded
    ? 'w-full min-h-[3.25rem] rounded-2xl border border-brand-300/90 bg-white px-5 py-3.5 text-base text-brand-950 placeholder:text-brand-500 transition focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-brand-600 dark:bg-brand-800 dark:text-brand-50 dark:placeholder:text-brand-400 dark:focus:border-brand-400 dark:focus:ring-brand-400/20'
    : 'w-full rounded-xl border border-brand-300/80 bg-white px-4 py-3 text-[15px] text-brand-950 placeholder:text-brand-500 transition focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-brand-600 dark:bg-brand-800 dark:text-brand-50 dark:placeholder:text-brand-400 dark:focus:border-brand-400 dark:focus:ring-brand-400/20';

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'rounded-2xl border border-brand-200/90 bg-white p-6 shadow-[0_1px_0_rgba(28,22,19,0.04)] md:p-8',
        embedded && 'border-brand-200/70 p-8 shadow-sm md:p-10 lg:p-12',
        'dark:border-brand-600/70 dark:bg-brand-900/70 dark:shadow-none',
        className
      )}
      noValidate
    >
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2',
          embedded ? 'gap-7 md:gap-8' : 'gap-6'
        )}
      >
        <div>
          <label htmlFor="befaring-name" className={labelClass}>
            {t('befaringForm.nameLabel')}
          </label>
          <input
            id="befaring-name"
            type="text"
            autoComplete="name"
            {...register('name')}
            className={inputClass}
            placeholder={t('befaringForm.namePlaceholder')}
            aria-invalid={errors.name ? 'true' : undefined}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="befaring-phone" className={labelClass}>
            {t('befaringForm.phoneLabel')}
          </label>
          <input
            id="befaring-phone"
            type="tel"
            autoComplete="tel"
            {...register('phone')}
            className={inputClass}
            placeholder={t('befaringForm.phonePlaceholder')}
            aria-invalid={errors.phone ? 'true' : undefined}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="befaring-email" className={labelClass}>
            {t('befaringForm.emailLabel')}
          </label>
          <input
            id="befaring-email"
            type="email"
            autoComplete="email"
            {...register('email')}
            className={inputClass}
            placeholder={t('befaringForm.emailPlaceholder')}
            aria-invalid={errors.email ? 'true' : undefined}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="befaring-address" className={labelClass}>
            {t('befaringForm.addressLabel')}
            <span className="ml-1 font-normal normal-case tracking-normal text-brand-600 dark:text-brand-400">
              ({t('befaringForm.optional')})
            </span>
          </label>
          <input
            id="befaring-address"
            type="text"
            autoComplete="street-address"
            {...register('address')}
            className={inputClass}
            placeholder={t('befaringForm.addressPlaceholder')}
          />
        </div>

        <div>
          <label htmlFor="befaring-event-type" className={labelClass}>
            {t('befaringForm.eventTypeLabel')}
          </label>
          <select
            id="befaring-event-type"
            {...register('eventType')}
            className={inputClass}
            aria-invalid={errors.eventType ? 'true' : undefined}
          >
            <option value="Privat">{t('befaringForm.eventTypePrivate')}</option>
            <option value="Bedrift">{t('befaringForm.eventTypeBusiness')}</option>
          </select>
          {errors.eventType && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.eventType.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="befaring-fest-type" className={labelClass}>
            {t('befaringForm.festTypeLabel')}
            <span className="ml-1 font-normal normal-case tracking-normal text-brand-600 dark:text-brand-400">
              ({t('befaringForm.optional')})
            </span>
          </label>
          <input
            id="befaring-fest-type"
            type="text"
            {...register('festType')}
            className={inputClass}
            placeholder={t('befaringForm.festTypePlaceholder')}
          />
        </div>

        <div>
          <label htmlFor="befaring-date" className={labelClass}>
            {t('befaringForm.dateLabel')}
          </label>
          <input
            id="befaring-date"
            type="date"
            {...register('preferredDate')}
            className={inputClass}
            aria-invalid={errors.preferredDate ? 'true' : undefined}
          />
          {errors.preferredDate && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.preferredDate.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="befaring-guests" className={labelClass}>
            {t('befaringForm.guestCountLabel')}
            <span className="ml-1 font-normal normal-case tracking-normal text-brand-600 dark:text-brand-400">
              ({t('befaringForm.optional')})
            </span>
          </label>
          <input
            id="befaring-guests"
            type="number"
            min={0}
            inputMode="numeric"
            {...register('guestCount')}
            className={inputClass}
            aria-invalid={errors.guestCount ? 'true' : undefined}
          />
          {errors.guestCount && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.guestCount.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="befaring-message" className={labelClass}>
            {t('befaringForm.messageLabel')}
          </label>
          <textarea
            id="befaring-message"
            rows={embedded ? 6 : 5}
            {...register('message')}
            className={cn(
              inputClass,
              embedded ? 'min-h-[180px] resize-y md:min-h-[200px]' : 'min-h-[140px] resize-y'
            )}
            placeholder={t('befaringForm.messagePlaceholder')}
            aria-invalid={errors.message ? 'true' : undefined}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>
      </div>

      <div
        className={cn(
          'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
          embedded ? 'mt-10 gap-5' : 'mt-8'
        )}
      >
        <p
          className={cn(
            'leading-relaxed text-brand-800 dark:text-brand-200',
            embedded ? 'max-w-md text-base' : 'text-sm'
          )}
        >
          {t('befaringForm.privacy')}
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-brand-900 font-semibold uppercase tracking-[0.2em] text-white shadow-md transition hover:bg-brand-800 disabled:opacity-50 sm:w-auto',
            embedded ? 'px-14 py-5 text-sm' : 'px-10 py-4 text-xs tracking-[0.22em]'
          )}
        >
          {isSubmitting ? (
            t('befaringForm.submitting')
          ) : (
            <>
              {t('befaringForm.submit')}
              <CalendarCheck size={embedded ? 18 : 16} strokeWidth={2} aria-hidden />
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
};
