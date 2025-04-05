import React, { useState } from 'react';
import { Loader2, Plus, X, ChevronDown } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { GameSubmissionPayload } from '../../types/formPayloads';

export interface GameFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  teamSize: number;
  gameType: 'mobile-legends' | 'call-of-duty' | 'other';
}

export interface TeamMember {
  name: string;
  inGameName: string;
  role?: string;
  isSubstitute?: boolean;
}

export function GameForm({ isSubmitting, teamSize, gameType }: GameFormProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([{ name: '', inGameName: '' }]);
  const [substitutes, setSubstitutes] = useState<TeamMember[]>([]);
  const [showRoleDropdown, setShowRoleDropdown] = useState<number | null>(null);

  const roles = [
    'Exp Lane',
    'Gold Lane',
    'Mid Lane',
    'Roamer',
    'Jungler',
    'Marksman',
    'Support',
    'Tank',
    'Assassin',
    'Mage'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget as HTMLFormElement);
  
    const payload = {
      fullName: formData.get('fullName') as string,
      organization: formData.get('organization') as string,
      contactNumber: formData.get('contactNumber') as string,
      email: formData.get('email') as string,
      facebook: formData.get('facebook') as string,
      teamName: formData.get('teamName') as string,
      message: formData.get('message') as string,
      teamMembers,
      substitutes
    };
  
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxUqERauAtHweG6bKdZNviM6yYUJh-5bEw8578O0QBwCwX4lc-HGMxEgduAi_SZafZn/exec', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const result = await response.json();
  
      if (result.success) {
        toast.success('Registration submitted!');
      } else {
        toast.error('Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit the form.');
    }
  };
  

  const addTeamMember = () => {
    if (teamMembers.length < teamSize) {
      setTeamMembers([...teamMembers, { name: '', inGameName: '' }]);
    }
  };

  const addSubstitute = () => {
    if (substitutes.length < 1) {
      setSubstitutes([...substitutes, { name: '', inGameName: '', isSubstitute: true }]);
    }
  };

  const removeTeamMember = (index: number, isSubstitute: boolean = false) => {
    if (isSubstitute) {
      setSubstitutes(substitutes.filter((_, i) => i !== index));
    } else {
      setTeamMembers(teamMembers.filter((_, i) => i !== index));
    }
  };

  const updateTeamMember = (
    index: number,
    field: keyof TeamMember,
    value: string | boolean,
    isSubstitute: boolean = false
  ) => {
    if (isSubstitute) {
      const newSubstitutes = [...substitutes];
      newSubstitutes[index] = { ...newSubstitutes[index], [field]: value };
      setSubstitutes(newSubstitutes);
    } else {
      const newTeamMembers = [...teamMembers];
      newTeamMembers[index] = { ...newTeamMembers[index], [field]: value };
      setTeamMembers(newTeamMembers);
    }
  };

  const toggleRoleDropdown = (index: number) => {
    setShowRoleDropdown(showRoleDropdown === index ? null : index);
  };

  const selectRole = (index: number, role: string) => {
    updateTeamMember(index, 'role', role);
    setShowRoleDropdown(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Team Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Team Captain */}
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
            Team Captain's Name <span className="text-purple-400">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                      focus:border-transparent transition-all duration-200"
            placeholder="John Doe"
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

        {/* Team Name */}
        <div className="space-y-2">
          <label htmlFor="teamName" className="block text-sm font-medium text-gray-300">
            Team Name <span className="text-purple-400">*</span>
          </label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                      focus:border-transparent transition-all duration-200"
            placeholder="Your team name"
          />
        </div>
      </div>

      {/* Team Members Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-300">
            Team Members ({teamMembers.length}/{teamSize})
          </h3>
          {teamMembers.length < teamSize && (
            <button
              type="button"
              onClick={addTeamMember}
              className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 font-medium"
            >
              <Plus size={16} />
              Add Member
            </button>
          )}
        </div>

        {teamMembers.map((member, index) => (
          <div key={`member-${index}`} className="relative rounded-lg border border-gray-700 p-4 bg-gray-800/50">
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeTeamMember(index)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                aria-label="Remove member"
              >
                <X size={16} />
              </button>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Full Name <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={member.name}
                  onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                            focus:border-transparent transition-all duration-200"
                  placeholder="Member's full name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  In-Game Name <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={member.inGameName}
                  onChange={(e) => updateTeamMember(index, 'inGameName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                            focus:border-transparent transition-all duration-200"
                  placeholder="In-game username"
                />
              </div>
            </div>

            {(gameType === 'mobile-legends' || gameType === 'call-of-duty') && (
              <div className="mt-4 space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Preferred Role
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleRoleDropdown(index)}
                    className="flex items-center justify-between w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                              focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <span>{member.role || 'Select role'}</span>
                    <ChevronDown size={16} className={`transition-transform ${showRoleDropdown === index ? 'rotate-180' : ''}`} />
                  </button>
                  {showRoleDropdown === index && (
                    <div className="absolute z-10 mt-1 w-full rounded-lg bg-gray-800 shadow-lg border border-gray-700 max-h-60 overflow-auto">
                      {roles.map((role) => (
                        <div
                          key={role}
                          onClick={() => selectRole(index, role)}
                          className="px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer"
                        >
                          {role}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Substitutes Section */}
      {(gameType === 'mobile-legends' || gameType === 'call-of-duty') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-300">
              Substitutes (Optional, max 1)
            </h3>
            {substitutes.length < 1 && (
              <button
                type="button"
                onClick={addSubstitute}
                className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 font-medium"
              >
                <Plus size={16} />
                Add Substitute
              </button>
            )}
          </div>

          {substitutes.map((sub, index) => (
            <div key={`sub-${index}`} className="relative rounded-lg border border-purple-700/30 p-4 bg-purple-900/20">
              <button
                type="button"
                onClick={() => removeTeamMember(index, true)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                aria-label="Remove substitute"
              >
                <X size={16} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={sub.name}
                    onChange={(e) => updateTeamMember(index, 'name', e.target.value, true)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                              focus:border-transparent transition-all duration-200"
                    placeholder="Substitute's full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    In-Game Name
                  </label>
                  <input
                    type="text"
                    value={sub.inGameName}
                    onChange={(e) => updateTeamMember(index, 'inGameName', e.target.value, true)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                              focus:border-transparent transition-all duration-200"
                    placeholder="In-game username"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Preferred Role
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleRoleDropdown(index + 100)}
                    className="flex items-center justify-between w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                              focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <span>{sub.role || 'Select role'}</span>
                    <ChevronDown size={16} className={`transition-transform ${showRoleDropdown === index + 100 ? 'rotate-180' : ''}`} />
                  </button>
                  {showRoleDropdown === index + 100 && (
                    <div className="absolute z-10 mt-1 w-full rounded-lg bg-gray-800 shadow-lg border border-gray-700 max-h-60 overflow-auto">
                      {roles.map((role) => (
                        <div
                          key={`sub-${role}`}
                          onClick={() => {
                            updateTeamMember(index, 'role', role, true);
                            setShowRoleDropdown(null);
                          }}
                          className="px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer"
                        >
                          {role}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
          placeholder="Any special requests or additional information..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || teamMembers.length < teamSize}
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