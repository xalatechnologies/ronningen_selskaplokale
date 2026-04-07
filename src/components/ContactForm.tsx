import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { sendContactFormEmailNotification } from '../lib/contactEmail';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type ContactFormProps = {
  /** Use inside a parent card/panel so the form does not add a second outer frame. */
  embedded?: boolean;
  className?: string;
};

export const ContactForm: React.FC<ContactFormProps> = ({ embedded = false, className }) => {
  const { t, i18n } = useTranslation();

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t('contactPage.formErrName')),
        email: z.string().email(t('contactPage.formErrEmail')),
        phone: z
          .string()
          .trim()
          .refine((val) => val === '' || val.length >= 8, { message: t('contactPage.formErrPhone') }),
        message: z.string().min(10, t('contactPage.formErrMessage')),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '', message: '' },
  });

  const onSubmit = async (data: ContactFormValues) => {
    const lang = i18n.language.startsWith('no') ? 'no' : 'en';
    const prefix = lang === 'no' ? '[Kontakt skjema]' : '[Contact form]';

    try {
      const { error } = await supabase.from('inquiries').insert([
        {
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone.trim() || null,
          message: `${prefix}\n\n${data.message.trim()}`,
          language: lang,
          flexible_date: false,
          needs_catering: false,
          needs_decoration: false,
          needs_staffing: false,
          needs_viewing: false,
          event_type_id: null,
          preferred_date: null,
          guest_count: null,
          status: 'new',
        },
      ]);

      if (error) throw error;

      const messageText = `${prefix}\n\n${data.message.trim()}`;
      const emailSubject =
        lang === 'no'
          ? `[Kontakt] ${data.name.trim()}`
          : `[Contact] ${data.name.trim()}`;

      toast.success(t('contactPage.formSuccess'));

      try {
        await sendContactFormEmailNotification({
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          message: messageText,
          subject: emailSubject,
        });
      } catch (emailErr) {
        console.error('Contact form email notification:', emailErr);
        toast.warning(t('contactPage.formEmailNotifyError'));
      }

      reset();
    } catch (err) {
      console.error('Contact form submit:', err);
      toast.error(t('contactPage.formError'));
    }
  };

  const labelClass = embedded
    ? 'mb-2.5 block text-xs font-semibold uppercase tracking-[0.16em] text-brand-800'
    : 'mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700';
  const inputClass = embedded
    ? 'w-full min-h-[3.25rem] rounded-2xl border border-brand-300/90 bg-white px-5 py-3.5 text-base text-brand-950 placeholder:text-brand-500 transition focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20'
    : 'w-full rounded-xl border border-brand-300/80 bg-white px-4 py-3 text-[15px] text-brand-950 placeholder:text-brand-500 transition focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20';

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'rounded-2xl border border-brand-200/90 bg-white p-6 shadow-[0_1px_0_rgba(28,22,19,0.04)] md:p-8',
        embedded &&
          'border-brand-200/70 p-8 shadow-sm md:p-10 lg:p-12',
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
          <label htmlFor="contact-name" className={labelClass}>
            {t('contactPage.formNameLabel')}
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            {...register('name')}
            className={inputClass}
            placeholder={t('contactPage.formNamePlaceholder')}
            aria-invalid={errors.name ? 'true' : undefined}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            {t('contactPage.formEmailLabel')}
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            {...register('email')}
            className={inputClass}
            placeholder={t('contactPage.formEmailPlaceholder')}
            aria-invalid={errors.email ? 'true' : undefined}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="contact-phone" className={labelClass}>
            {t('contactPage.formPhoneLabel')}
            <span className="ml-1 font-normal normal-case tracking-normal text-brand-600">
              ({t('contactPage.formPhoneHint')})
            </span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            {...register('phone')}
            className={inputClass}
            placeholder={t('contactPage.formPhonePlaceholder')}
            aria-invalid={errors.phone ? 'true' : undefined}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="contact-message" className={labelClass}>
            {t('contactPage.formMessageLabel')}
          </label>
          <textarea
            id="contact-message"
            rows={embedded ? 7 : 5}
            {...register('message')}
            className={cn(
              inputClass,
              embedded ? 'min-h-[220px] resize-y md:min-h-[260px]' : 'min-h-[140px] resize-y'
            )}
            placeholder={t('contactPage.formMessagePlaceholder')}
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
            'leading-relaxed text-brand-800',
            embedded ? 'max-w-md text-base' : 'text-sm'
          )}
        >
          {t('contactPage.formPrivacy')}
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-brand-900 font-semibold uppercase tracking-[0.2em] text-white shadow-md transition hover:bg-brand-800 disabled:opacity-50 sm:w-auto',
            embedded
              ? 'px-14 py-5 text-sm'
              : 'px-10 py-4 text-xs tracking-[0.22em]'
          )}
        >
          {isSubmitting ? (
            t('contactPage.formSubmitting')
          ) : (
            <>
              {t('contactPage.formSubmit')}
              <Send size={embedded ? 18 : 16} strokeWidth={2} aria-hidden />
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
};
