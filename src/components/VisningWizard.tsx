import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Building2, Heart, PartyPopper, Sparkles, type LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import {
  getUpcomingFridays,
  type FridaySlot,
  type FridaySlotTime,
} from '../lib/visningSlots';
import {
  VENUE_CONTACT_PHONE_DISPLAY,
  VENUE_CONTACT_PHONE_HREF,
  sendVisningEmailNotification,
} from '../lib/contactEmail';

type WizardStep = 'arrangement' | 'calendar' | 'contact';
type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

type ArrangementId = 'bryllup' | 'bedrift' | 'selskap' | 'annet';

const ARRANGEMENT_IDS: ArrangementId[] = ['bryllup', 'bedrift', 'selskap', 'annet'];

const ARRANGEMENT_ICONS: Record<ArrangementId, LucideIcon> = {
  bryllup: Heart,
  bedrift: Building2,
  selskap: PartyPopper,
  annet: Sparkles,
};

type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

type WizardState = {
  arrangementType: ArrangementId | '';
  selectedDate: string;
  selectedTime: FridaySlotTime | '';
  displayDate: string;
};

const STEP_ORDER: { id: WizardStep; labelKey: string }[] = [
  { id: 'arrangement', labelKey: 'visningWizard.stepArrangement' },
  { id: 'calendar', labelKey: 'visningWizard.stepCalendar' },
  { id: 'contact', labelKey: 'visningWizard.stepContact' },
];

export const VisningWizard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const trackedRef = useRef(false);
  const [step, setStep] = useState<WizardStep>('arrangement');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [wizard, setWizard] = useState<WizardState>({
    arrangementType: '',
    selectedDate: '',
    selectedTime: '',
    displayDate: '',
  });

  const locale = i18n.resolvedLanguage ?? i18n.language ?? 'no';

  const fridays = useMemo(
    () => getUpcomingFridays(8, new Date(), locale),
    [locale]
  );

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t('visningWizard.errName')),
        email: z.string().email(t('visningWizard.errEmail')),
        phone: z
          .string()
          .trim()
          .min(8, t('visningWizard.errPhone')),
        message: z.string().max(2000, t('visningWizard.errMessage')),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '', email: '', message: '' },
  });

  const currentStepIndex = STEP_ORDER.findIndex((s) => s.id === step);

  const arrangementLabel = useCallback(
    (id: ArrangementId) => t(`visningWizard.arrangements.${id}.label`),
    [t]
  );

  const selectArrangement = useCallback((id: ArrangementId) => {
    setWizard((prev) => ({ ...prev, arrangementType: id }));
    setStep('calendar');
  }, []);

  const selectTime = useCallback((friday: FridaySlot, time: FridaySlotTime) => {
    setWizard((prev) => ({
      ...prev,
      selectedDate: friday.dateStr,
      selectedTime: time,
      displayDate: friday.displayDate,
    }));
    setStep('contact');
  }, []);

  const goToStep = useCallback(
    (target: WizardStep) => {
      const targetIndex = STEP_ORDER.findIndex((s) => s.id === target);
      if (targetIndex <= currentStepIndex) {
        setStep(target);
      }
    },
    [currentStepIndex]
  );

  useEffect(() => {
    if (status !== 'success' || trackedRef.current) return;
    trackedRef.current = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'form_submit',
      form_name: 'visning',
    });
  }, [status]);

  const onSubmit = handleSubmit(async (values) => {
    if (!wizard.arrangementType || !wizard.selectedDate || !wizard.selectedTime) return;

    setStatus('loading');
    try {
      await sendVisningEmailNotification({
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        message: values.message?.trim() || undefined,
        arrangementType: arrangementLabel(wizard.arrangementType),
        displayDate: wizard.displayDate,
        selectedTime: wizard.selectedTime,
        language: locale.startsWith('no') ? 'no' : 'en',
      });

      setStatus('success');
    } catch (err) {
      console.error('Visning form email:', err);
      setStatus('error');
    }
  });

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-brand-300/80 bg-brand-900 p-8 text-center text-white shadow-lg dark:border-brand-600/80 md:p-10">
        <p className="text-4xl" aria-hidden>
          ✓
        </p>
        <h2 className="mt-4 font-serif text-2xl tracking-tight md:text-3xl">
          {t('visningWizard.successHeading')}
        </h2>
        <p className="mt-3 text-sm font-semibold text-brand-100">
          {wizard.displayDate} {t('visningWizard.atTime')} {wizard.selectedTime}
        </p>
        <p className="mt-1 text-sm text-brand-200">
          {wizard.arrangementType ? arrangementLabel(wizard.arrangementType) : ''}
        </p>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-brand-100">
          {t('visningWizard.successBody')}
        </p>
        <p className="mt-6 text-xs text-brand-300">
          {t('visningWizard.successPhone')}{' '}
          <a href={VENUE_CONTACT_PHONE_HREF} className="font-semibold underline underline-offset-4">
            {VENUE_CONTACT_PHONE_DISPLAY}
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-brand-300/80 bg-white p-5 shadow-sm dark:border-brand-600/80 dark:bg-brand-900/50 sm:p-6 md:p-8">
      <div
        className="mb-8 flex flex-wrap items-center gap-2"
        aria-label={t('visningWizard.stepIndicatorAria')}
      >
        {STEP_ORDER.map((s, index) => {
          const isComplete = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          return (
            <div key={s.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToStep(s.id)}
                disabled={index > currentStepIndex}
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors',
                  isComplete && 'cursor-pointer bg-brand-900 text-white dark:bg-brand-100 dark:text-brand-900',
                  isCurrent && 'bg-brand-900 text-white dark:bg-brand-100 dark:text-brand-900',
                  !isComplete && !isCurrent && 'bg-brand-100 text-brand-500 dark:bg-brand-800 dark:text-brand-400'
                )}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isComplete ? '✓' : index + 1}
              </button>
              <span
                className={cn(
                  'hidden text-xs sm:inline',
                  isCurrent
                    ? 'font-semibold text-brand-950 dark:text-brand-50'
                    : 'text-brand-600 dark:text-brand-300'
                )}
              >
                {t(s.labelKey)}
              </span>
              {index < STEP_ORDER.length - 1 ? (
                <span className="text-brand-300 dark:text-brand-600" aria-hidden>
                  ›
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      {step === 'arrangement' ? (
        <div>
          <h2 className="font-serif text-xl tracking-tight text-brand-950 md:text-2xl dark:text-brand-50">
            {t('visningWizard.arrangementHeading')}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ARRANGEMENT_IDS.map((id) => {
              const Icon = ARRANGEMENT_ICONS[id];
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => selectArrangement(id)}
                  className="flex flex-col items-start gap-2 rounded-2xl border border-brand-200 bg-brand-50/50 p-4 text-left transition hover:border-brand-400 hover:bg-white dark:border-brand-600 dark:bg-brand-800/40 dark:hover:border-brand-400 dark:hover:bg-brand-800/70"
                >
                  <Icon size={22} className="text-brand-800 dark:text-brand-200" aria-hidden />
                  <span className="font-semibold text-brand-950 dark:text-brand-50">
                    {t(`visningWizard.arrangements.${id}.label`)}
                  </span>
                  <span className="text-sm text-brand-700 dark:text-brand-300">
                    {t(`visningWizard.arrangements.${id}.desc`)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {step === 'calendar' ? (
        <div>
          <h2 className="font-serif text-xl tracking-tight text-brand-950 md:text-2xl dark:text-brand-50">
            {t('visningWizard.calendarHeading')}
          </h2>
          <p className="mt-2 text-sm text-brand-700 dark:text-brand-300">
            {t('visningWizard.calendarIntro')}
          </p>
          <p className="mt-1 text-sm font-medium text-brand-800 dark:text-brand-200">
            {t('visningWizard.fridayOnlyNote')}
          </p>

          <div className="mt-6 space-y-3">
            {fridays.map((friday) => (
              <div
                key={friday.dateStr}
                className="rounded-2xl border border-brand-200 bg-brand-50/40 dark:border-brand-600 dark:bg-brand-800/30"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                  <p className="font-semibold capitalize text-brand-950 dark:text-brand-50">
                    {friday.displayDate}
                  </p>
                  <span className="text-xs font-medium text-[#c9a84c] dark:text-[#d4b55e]">
                    {friday.spotsLeft === 1
                      ? t('visningWizard.spotsLeftOne')
                      : t('visningWizard.spotsLeft', { count: friday.spotsLeft })}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 px-4 pb-3">
                  {friday.times.map((time) => (
                    <button
                      key={`${friday.dateStr}-${time}`}
                      type="button"
                      onClick={() => selectTime(friday, time)}
                      className="rounded-full border border-brand-300 bg-white px-4 py-2 text-sm font-medium text-brand-900 transition hover:border-brand-900 hover:bg-brand-900 hover:text-white dark:border-brand-500 dark:bg-brand-900 dark:text-brand-100 dark:hover:border-brand-100 dark:hover:bg-brand-100 dark:hover:text-brand-900"
                    >
                      {t('visningWizard.timeAt', { time })}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setStep('arrangement')}
            className="mt-6 text-sm text-brand-600 underline underline-offset-4 hover:text-brand-900 dark:text-brand-300 dark:hover:text-brand-100"
          >
            {t('visningWizard.back')}
          </button>
        </div>
      ) : null}

      {step === 'contact' ? (
        <div>
          <div className="mb-6 rounded-2xl border border-brand-200 bg-brand-50/60 p-4 dark:border-brand-600 dark:bg-brand-800/40">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-brand-950 dark:text-brand-50">
                  {wizard.displayDate} {t('visningWizard.atTime')} {wizard.selectedTime}
                </p>
                <p className="mt-1 text-sm text-brand-700 dark:text-brand-300">
                  {wizard.arrangementType ? arrangementLabel(wizard.arrangementType) : ''}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep('calendar')}
                className="text-sm text-brand-600 underline underline-offset-4 hover:text-brand-900 dark:text-brand-300"
              >
                {t('visningWizard.change')}
              </button>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="visning-name" className="mb-1.5 block text-sm font-medium text-brand-900 dark:text-brand-100">
                {t('visningWizard.nameLabel')}
              </label>
              <input
                id="visning-name"
                type="text"
                autoComplete="name"
                placeholder={t('visningWizard.namePlaceholder')}
                className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-brand-950 outline-none focus:border-brand-500 dark:border-brand-600 dark:bg-brand-900 dark:text-brand-50"
                {...register('name')}
              />
              {errors.name ? (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="visning-phone" className="mb-1.5 block text-sm font-medium text-brand-900 dark:text-brand-100">
                {t('visningWizard.phoneLabel')}
              </label>
              <input
                id="visning-phone"
                type="tel"
                autoComplete="tel"
                placeholder={t('visningWizard.phonePlaceholder')}
                className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-brand-950 outline-none focus:border-brand-500 dark:border-brand-600 dark:bg-brand-900 dark:text-brand-50"
                {...register('phone')}
              />
              {errors.phone ? (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="visning-email" className="mb-1.5 block text-sm font-medium text-brand-900 dark:text-brand-100">
                {t('visningWizard.emailLabel')}
              </label>
              <input
                id="visning-email"
                type="email"
                autoComplete="email"
                placeholder={t('visningWizard.emailPlaceholder')}
                className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-brand-950 outline-none focus:border-brand-500 dark:border-brand-600 dark:bg-brand-900 dark:text-brand-50"
                {...register('email')}
              />
              {errors.email ? (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="visning-message" className="mb-1.5 block text-sm font-medium text-brand-900 dark:text-brand-100">
                {t('visningWizard.messageLabel')}{' '}
                <span className="font-normal text-brand-600 dark:text-brand-400">
                  ({t('visningWizard.messageOptional')})
                </span>
              </label>
              <textarea
                id="visning-message"
                rows={4}
                placeholder={t('visningWizard.messagePlaceholder')}
                className="w-full resize-y rounded-xl border border-brand-200 bg-white px-4 py-3 text-brand-950 outline-none focus:border-brand-500 dark:border-brand-600 dark:bg-brand-900 dark:text-brand-50"
                {...register('message')}
              />
              {errors.message ? (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
              ) : null}
            </div>

            <p className="text-xs text-brand-600 dark:text-brand-400">{t('visningWizard.emailHelper')}</p>

            {status === 'error' ? (
              <p className="text-sm text-red-600 dark:text-red-400">{t('visningWizard.submitError')}</p>
            ) : null}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand-900 px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-brand-800 disabled:opacity-60 dark:bg-brand-100 dark:text-brand-900 dark:hover:bg-white"
            >
              {status === 'loading' ? t('visningWizard.submitting') : t('visningWizard.submit')}
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};
