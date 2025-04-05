import React from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { TalentSubmissionPayload } from '../../types/formPayloads';

export interface TalentFormProps {
  isSubmitting: boolean;
}

export function TalentForm({ isSubmitting }: TalentFormProps) {
  const handleTalentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate contact number
    const contactNumber = (e.target as HTMLFormElement).contactNumber.value;
    if (!/^(09|\+639)\d{9}$/.test(contactNumber)) {
      toast.error('Please enter a valid Philippine mobile number (e.g., 09123456789 or +639123456789)');
      return;
    }

    // Validate duration
    const duration = parseInt((e.target as HTMLFormElement).duration.value);
    if (isNaN(duration) || duration < 1 || duration > 10) {
      toast.error('Performance duration must be between 1 and 10 minutes');
      return;
    }

    // Prepare payload
    const payload: TalentSubmissionPayload = {
      fullName: (e.target as HTMLFormElement).fullName.value,
      email: (e.target as HTMLFormElement).email.value,
      contactNumber: contactNumber,
      eventType: 'talent',
      organization: (e.target as HTMLFormElement).organization?.value || '',
      facebook: (e.target as HTMLFormElement).facebook.value,
      performanceDetails: {
        performanceType: (e.target as HTMLFormElement).performanceType.value,
        duration: (e.target as HTMLFormElement).duration.value,
        participants: (e.target as HTMLFormElement).participants.value,
        props: (e.target as HTMLFormElement).props?.value || ''
      },
      message: (e.target as HTMLFormElement).message?.value || ''
    };

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbxSXaopMcdMcaBzjus8xe7GsNwGVC6iw0LicnIh1bWfCaOOzlb-JLx3RWSKhpDvPjN4/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      // Check if the response is OK
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      
      if (result.result === 'success') {
        toast.success(result.message || 'Talent registration submitted!');
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error: any) {
      console.error('Talent submission error:', error);
      toast.error(error?.message || 'Failed to submit. Please try again.');
    }
  };

  return (
    <form onSubmit={handleTalentSubmit} className="space-y-6">
      {/* Form Grid Layout - 2 columns on larger screens */}
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

        {/* Performance Type */}
        <div className="space-y-2">
          <label htmlFor="performanceType" className="block text-sm font-medium text-gray-300">
            Performance Type <span className="text-purple-400">*</span>
          </label>
          <input
            type="text"
            id="performanceType"
            name="performanceType"
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                      focus:border-transparent transition-all duration-200"
            placeholder="Singing, Dancing, Magic Show"
          />
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-300">
            Duration (minutes) <span className="text-purple-400">*</span>
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            required
            min="1"
            max="10"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                      focus:border-transparent transition-all duration-200"
            placeholder="2"
          />
        </div>
      </div>

      {/* Full-width fields */}
      <div className="space-y-6">
        {/* Participants */}
        <div className="space-y-2">
          <label htmlFor="participants" className="block text-sm font-medium text-gray-300">
            Participant Names <span className="text-purple-400">*</span>
          </label>
          <textarea
            id="participants"
            name="participants"
            required
            rows={3}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                      focus:border-transparent transition-all duration-200"
            placeholder="List all participants (one per line) or None"
          />
        </div>

        {/* Props */}
        <div className="space-y-2">
          <label htmlFor="props" className="block text-sm font-medium text-gray-300">
            Props/Equipment Needed
          </label>
          <textarea
            id="props"
            name="props"
            rows={3}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                      focus:border-transparent transition-all duration-200"
            placeholder="List any props or equipment you'll bring"
          />
        </div>

        {/* Additional Notes */}
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