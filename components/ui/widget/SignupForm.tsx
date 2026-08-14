"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SignupFormProps {
  onSubmit?: (email: string) => any; // Changed from void | Promise<void>
  inputPlaceholder?: string;
  buttonText?: string;
  buttonColor?: 'blue' | 'green' | 'red' | 'purple' | 'indigo' | 'black';
  loading?: boolean;
  successMessage?: string | null;
  errorMessage?: string | null;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  validateEmail?: boolean; // Only boolean now, not function
  allowedDomains?: string[]; // New prop for domain validation
  initialValue?: string;
  onValueChange?: (value: string) => void;
  onSuccess?: (email: string) => void;
  onError?: (error: Error) => void;
  resetAfterSubmit?: boolean;
  loadingText?: string;
  validationRules?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    domains?: string[];
    customRegex?: string;
  };
}

const SignupForm: React.FC<SignupFormProps> = ({
  onSubmit,
  inputPlaceholder = "Enter your email",
  buttonText = "Submit",
  buttonColor = "blue",
  loading = false,
  successMessage = null,
  errorMessage = null,
  className = "",
  inputClassName = "",
  buttonClassName = "",
  validateEmail = true,
  allowedDomains = [],
  initialValue = "",
  onValueChange,
  onSuccess,
  onError,
  resetAfterSubmit = true,
  loadingText = "Loading...",
  validationRules,
}) => {
  const [email, setEmail] = useState<string>(initialValue);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setEmail(value);
    setError('');
    setSuccess('');
    if (onValueChange) onValueChange(value);
  };

  // Validation logic moved inside the component
  const validate = (email: string): { isValid: boolean; error: string } => {
    // Check if validation is enabled
    if (!validateEmail) {
      return { isValid: true, error: '' };
    }

    // Required validation
    if (!email || email.trim() === '') {
      return { isValid: false, error: 'Email is required' };
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Please enter a valid email address' };
    }

    // Custom validation rules
    if (validationRules) {
      // Min length
      if (validationRules.minLength && email.length < validationRules.minLength) {
        return { 
          isValid: false, 
          error: `Email must be at least ${validationRules.minLength} characters` 
        };
      }

      // Max length
      if (validationRules.maxLength && email.length > validationRules.maxLength) {
        return { 
          isValid: false, 
          error: `Email must be at most ${validationRules.maxLength} characters` 
        };
      }

      // Domain validation
      if (validationRules.domains && validationRules.domains.length > 0) {
        const domain = email.split('@')[1];
        if (!domain || !validationRules.domains.includes(domain)) {
          return { 
            isValid: false, 
            error: `Only ${validationRules.domains.join(', ')} domains are allowed` 
          };
        }
      }

      // Custom regex
      if (validationRules.customRegex) {
        const regex = new RegExp(validationRules.customRegex);
        if (!regex.test(email)) {
          return { 
            isValid: false, 
            error: 'Email does not match required format' 
          };
        }
      }
    }

    // Allowed domains (simple list)
    if (allowedDomains && allowedDomains.length > 0) {
      const domain = email.split('@')[1];
      if (!domain || !allowedDomains.includes(domain)) {
        return { 
          isValid: false, 
          error: `Only ${allowedDomains.join(', ')} email addresses are allowed` 
        };
      }
    }

    return { isValid: true, error: '' };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Clear previous messages
    setError('');
    setSuccess('');
    
    // Validate email
    const validation = validate(email);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    
    // Handle loading state
    const isLoadingState = loading || false;
    setIsLoading(isLoadingState);
    
    try {
      if (onSubmit) {
        await onSubmit(email);
      }
      
      // Success
      const successMsg = successMessage || 'Successfully submitted!';
      setSuccess(successMsg);
      
      // Call onSuccess callback
      if (onSuccess) {
        onSuccess(email);
      }
      
      // Reset form if needed
      if (resetAfterSubmit) {
        setEmail('');
      }
      
    } catch (error) {
      // Handle error
      const errorMsg = errorMessage || 'Something went wrong. Please try again.';
      setError(errorMsg);
      
      // Call onError callback
      if (onError && error instanceof Error) {
        onError(error);
      } else if (onError) {
        onError(new Error('Unknown error occurred'));
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  const buttonColorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500',
    green: 'bg-green-500 hover:bg-green-600 focus:ring-green-500',
    red: 'bg-red-500 hover:bg-red-600 focus:ring-red-500',
    purple: 'bg-purple-500 hover:bg-purple-600 focus:ring-purple-500',
    indigo: 'bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500',
    black: 'bg-black hover:bg-gray-800 focus:ring-gray-500',
  };

  const isDisabled = isLoading || !email;

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="flex flex-row gap-2 py-10 justify-center align-center">
        <div className="flex flex-col">
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder={inputPlaceholder}
            required={validateEmail}
            disabled={isDisabled}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              error 
                ? 'border-red-500 focus:ring-red-500' 
                : success
                ? 'border-green-500 focus:ring-green-500'
                : 'border-gray-300 focus:ring-blue-500'
            } ${inputClassName}`}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
          {success && !error && (
            <p className="text-green-500 text-sm mt-1">{success}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isDisabled}
          className={`px-6 py-2 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            buttonColorClasses[buttonColor] || buttonColorClasses.blue
          } disabled:opacity-50 disabled:cursor-not-allowed ${buttonClassName}`}
        >
          {isLoading ? loadingText : buttonText}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;