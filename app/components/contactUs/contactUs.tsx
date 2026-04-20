'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import { useCreateLeadMutation } from '@/src/gql/graphql';
import { X, Phone, User, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PhoneInput, defaultCountries } from 'react-international-phone';
import 'react-international-phone/style.css';
import { isValidPhoneNumber } from 'libphonenumber-js';

export default function ContactModal() {
  const { isContactModalOpen, closeContactModal } = useModal();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string }>({});


  const [createLead, { loading }] = useCreateLeadMutation({
    onCompleted: () => {
      setIsSuccess(true);
      setName('');
      setPhoneNumber('');
      setTimeout(() => {
        setIsSuccess(false);
        closeContactModal();
      },2500);
    },
     onError: (error) => {
    if (error?.message?.includes('429')) {
      setErrorMsg('Too many attempts, please try again later.');
    } else {
      setErrorMsg(error.message || 'Something went wrong. Please try again.');
    }
  },
  });

  const validateForm = () => {
    const errors: { name?: string; phone?: string } = {};
    if (!name.trim()) {
      errors.name = 'Full name is required';
    } else if (name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }

    const phoneRegex = /^(?:\+20|0020|0)?1[0125][0-9]{8}$/;
    if (!phoneNumber.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(phoneNumber.replace(/\s+/g, ''))) {
      errors.phone = 'Please enter a valid phone number (e.g. +201234567890)';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!validateForm()) return;


    try {
      await createLead({
        variables: {
          name,
          phone_number: phoneNumber,
        },
      });
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <AnimatePresence>
      {isContactModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeContactModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-zinc-900"
          >
            {/* Header / Gradient Strip */}
            <div className="h-2 bg-linear-to-r from-[#0d71ba] via-[#0B65A7] to-[#F4D315]" />
            
            <div className="p-6 sm:p-8">
              {/* Close Button */}
              <button
                onClick={closeContactModal}
                className="absolute right-4 top-6 rounded-full cursor-pointer p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Let's Build Together</h2>
                <p className="mt-1 text-zinc-500">
                    Enter your details and we will get back to you soon.
                </p>
              </div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Thank You!</h3>
                  <p className="mt-2 text-zinc-500">Your message has been received.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                        <User className="h-5 w-5" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: "" });
                        }}
                        placeholder="Enter your name"
                        className={cn(
                          "w-full rounded-xl border bg-zinc-50 py-3 pl-10 pr-4 text-zinc-900 outline-none transition-all focus:ring-2 dark:bg-zinc-800 dark:text-zinc-50",
                          fieldErrors.name 
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                            : "border-zinc-200 focus:border-[#0d71ba] focus:ring-[#0d71ba]/20 dark:border-zinc-800"
                        )}
                      />
                    </div>
                    <AnimatePresence>
                      {fieldErrors.name && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          className="text-xs font-medium text-red-500"
                        >
                          {fieldErrors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>


                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Phone Number
                    </label>
                    <div className={cn(
                      "relative flex w-full items-center rounded-xl border bg-zinc-50 transition-all focus-within:ring-2 dark:bg-zinc-800 dark:text-zinc-50",
                      fieldErrors.phone 
                        ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20" 
                        : "border-zinc-200 focus-within:border-[#0d71ba] focus-within:ring-[#0d71ba]/20 dark:border-zinc-800"
                    )}>
                      <PhoneInput
                        defaultCountry="eg"
                        value={phoneNumber}
                        onChange={(value) => {
                           setPhoneNumber(value);
                           if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: "" });
                        }}
                        className="w-full !border-none !bg-transparent"
                        inputProps={{
                          id: "phone",
                          placeholder: "Enter your phone number"
                        }}
                        inputClassName="w-full !bg-transparent !border-none !outline-none !py-3 !h-auto pr-4 pl-2 text-zinc-900 dark:text-zinc-50 focus:ring-0"
                        countrySelectorStyleProps={{
                          buttonClassName: "!bg-transparent !border-none !outline-none py-3! h-auto! pl-4! pr-2! z-[9999]!",
                        }}
                      />
                    </div>
                    <AnimatePresence>
                      {fieldErrors.phone && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          className="text-xs font-medium text-red-500"
                        >
                          {fieldErrors.phone}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>


                  {/* Error Message */}
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full overflow-hidden cursor-pointer rounded-xl bg-[#0d71ba] py-3 font-bold text-white transition-all hover:bg-[#0B65A7] active:scale-[0.98] disabled:opacity-70"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <span>Send Message</span>
                      )}
                    </div>
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                  </button>
                </form>
              )}

              {/* Footer text */}
              {!isSuccess && (
                <p className="mt-6 text-center text-xs text-zinc-400">
                  By submitting, you agree to our privacy policy.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
