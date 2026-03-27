import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { inquirySchema, type InquiryFormValues } from '../lib/validations';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export const InquiryForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      language: i18n.language as 'no' | 'en',
      flexible_date: false,
      needs_catering: false,
      needs_decoration: false,
      needs_staffing: false,
      needs_viewing: false,
    },
  });

  const onSubmit = async (data: InquiryFormValues) => {
    try {
      const { error } = await supabase.from('inquiries').insert([
        {
          ...data,
          status: 'new',
        },
      ]);

      if (error) throw error;

      toast.success(i18n.language === 'no' ? 'Forespørsel sendt!' : 'Inquiry sent successfully!');
      reset();
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error(i18n.language === 'no' ? 'Noe gikk galt. Prøv igjen.' : 'Something went wrong. Please try again.');
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-brand-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-brand-700">Event Type</label>
          <select 
            {...register('event_type')}
            className="w-full p-3 bg-brand-50 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          >
            <option value="">Select event type...</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate</option>
            <option value="private">Private Celebration</option>
            <option value="other">Other</option>
          </select>
          {errors.event_type && <p className="text-red-500 text-xs">{errors.event_type.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-brand-700">Preferred Date</label>
          <input 
            type="date"
            {...register('preferred_date')}
            className="w-full p-3 bg-brand-50 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          />
          {errors.preferred_date && <p className="text-red-500 text-xs">{errors.preferred_date.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-brand-700">Guest Count</label>
          <input 
            type="number"
            {...register('guest_count', { valueAsNumber: true })}
            className="w-full p-3 bg-brand-50 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          />
          {errors.guest_count && <p className="text-red-500 text-xs">{errors.guest_count.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-brand-700">Name</label>
          <input 
            {...register('name')}
            className="w-full p-3 bg-brand-50 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-brand-700">Email</label>
          <input 
            type="email"
            {...register('email')}
            className="w-full p-3 bg-brand-50 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-brand-700">Phone</label>
          <input 
            {...register('phone')}
            className="w-full p-3 bg-brand-50 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-widest text-brand-700">Message</label>
        <textarea 
          {...register('message')}
          rows={4}
          className="w-full p-3 bg-brand-50 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" {...register('needs_catering')} className="rounded border-brand-300 text-brand-700 focus:ring-brand-500" />
          <span className="text-xs uppercase tracking-wider text-brand-600">Catering</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" {...register('needs_decoration')} className="rounded border-brand-300 text-brand-700 focus:ring-brand-500" />
          <span className="text-xs uppercase tracking-wider text-brand-600">Decoration</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" {...register('needs_staffing')} className="rounded border-brand-300 text-brand-700 focus:ring-brand-500" />
          <span className="text-xs uppercase tracking-wider text-brand-600">Staffing</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" {...register('needs_viewing')} className="rounded border-brand-300 text-brand-700 focus:ring-brand-500" />
          <span className="text-xs uppercase tracking-wider text-brand-600">Viewing</span>
        </label>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-brand-800 text-white py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-brand-900 transition-all disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Inquiry'}
      </button>
    </motion.form>
  );
};
