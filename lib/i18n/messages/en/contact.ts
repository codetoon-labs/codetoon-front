// contact copy (contact modal + WhatsApp widget). Arabic counterpart: ../ar/contact.ts (typed against this shape).
const contact = {
    modal: {
        close: 'Close',
        title: "Let's Build Together",
        subtitle: 'Enter your details and we will get back to you soon.',
        successTitle: 'Thank You!',
        successBody: 'Your message has been received.',
        nameLabel: 'Full Name',
        namePlaceholder: 'Enter your name',
        phoneLabel: 'Phone Number',
        phonePlaceholder: 'Enter your phone number',
        sending: 'Sending...',
        send: 'Send Message',
        consent: 'By submitting, you agree to our privacy policy.',
    },
    errors: {
        tooManyAttempts: 'Too many attempts, please try again later.',
        generic: 'Something went wrong. Please try again.',
        nameRequired: 'Full name is required',
        nameTooShort: 'Name must be at least 3 characters',
        phoneRequired: 'Phone number is required',
        phoneInvalid: 'Please enter a valid phone number (e.g. +201234567890)',
    },
    whatsapp: {
        prefilledMessage: "Hi CodeToon! I'd like to learn more about your services.",
        chat: 'Chat on WhatsApp',
        callUs: 'Call us at {phone}',
    },
};

export default contact;
