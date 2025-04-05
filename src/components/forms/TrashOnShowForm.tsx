import React from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { TrashOnShowSubmissionPayload } from '../../types/formPayloads';

export interface TrashOnShowProps {
  isSubmitting: boolean;
}

export function TrashOnShowForm({ isSubmitting }: TrashOnShowProps) {
  const handleTrashOnShowSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate contact number
    const contactNumber = (e.target as HTMLFormElement).contactNumber.value;
    if (!/^(09|\+639)\d{9}$/.test(contactNumber)) {
      toast.error('Please enter a valid Philippine mobile number (e.g., 09123456789 or +639123456789)');
      return;
    }

    // Prepare payload
    const payload: TrashOnShowSubmissionPayload = {
      fullName: (e.target as HTMLFormElement).fullName.value,
      email: (e.target as HTMLFormElement).email.value,
      contactNumber: contactNumber,
      eventType: 'trash-on-show',
      organization: (e.target as HTMLFormElement).organization?.value || '',
      facebook: (e.target as HTMLFormElement).facebook.value,
      performanceDetails: {
        heroChoice: (e.target as HTMLFormElement).heroChoice.value
      },
      message: (e.target as HTMLFormElement).message?.value || ''
    };

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbw8avqqhW-9eIGCg6f2RRWW8byzfXjJqlbOLuEjZCJQFl3cQK9crA7KeNcW3y46mV_T/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        }
      );
      
      toast.success('Trash on Show registration submitted!');
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      console.error('Trash on Show submission error:', error);
      toast.error('Failed to submit. Please try again.');
    }
  };

  return (
    <form onSubmit={handleTrashOnShowSubmit} className="space-y-6">
      {/* Form Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
            Full Name <span className="text-purple-400">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                      focus:border-transparent transition-all duration-200"
            placeholder="Juan Dela Cruz"
          />
        </div>

        {/* Organization */}
        <div className="space-y-2">
          <label htmlFor="organization" className="block text-sm font-medium text-gray-300">
            School/Organization <span className="text-purple-400">*</span>
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                      focus:border-transparent transition-all duration-200"
            placeholder="SOT, SOB, SOE"
          />
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-300">
            Contact Number <span className="text-purple-400">*</span>
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                      focus:border-transparent transition-all duration-200"
            placeholder="09123456789"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email Address <span className="text-purple-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                      focus:border-transparent transition-all duration-200"
            placeholder="your@email.com"
          />
        </div>

        {/* Facebook */}
        <div className="space-y-2">
          <label htmlFor="facebook" className="block text-sm font-medium text-gray-300">
            Facebook/Messenger <span className="text-purple-400">*</span>
          </label>
          <input
            type="text"
            id="facebook"
            name="facebook"
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                      focus:border-transparent transition-all duration-200"
            placeholder="Your Facebook profile"
          />
        </div>

        {/* Hero Choice */}
        <div className="space-y-2">
          <label htmlFor="heroChoice" className="block text-sm font-medium text-gray-300">
            Hero Choice <span className="text-purple-400">*</span>
          </label>
          <input
            type="text"
            id="heroChoice"
            name="heroChoice"
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                      focus:border-transparent transition-all duration-200"
            placeholder="Name of your chosen hero to cosplay"
          />
        </div>
      </div>

      {/* Additional Notes (full width) */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-300">
          Additional Notes
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                    focus:border-transparent transition-all duration-200"
          placeholder="Any special requirements or notes"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium 
                  rounded-lg hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 
                  focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all 
                  duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            <span>Submitting...</span>
          </>
        ) : (
          'Submit Registration'
        )}
      </button>
    </form>
  );
}