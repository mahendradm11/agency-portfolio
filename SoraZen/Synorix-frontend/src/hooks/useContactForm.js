import { useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  service: '',
  budget: '',
  timeline: '',
  message: '',
};

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const validate = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.';
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (values.phone.trim() && !/^\+?[0-9\s()-]{7,20}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (!values.service) {
    errors.service = 'Please select a service.';
  }

  if (!values.budget) {
    errors.budget = 'Please choose a budget range.';
  }

  if (!values.timeline) {
    errors.timeline = 'Please choose a timeline.';
  }

  if (!values.message.trim()) {
    errors.message = 'Tell us about your project.';
  }

  return errors;
};

export default function useContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prevErrors) => {
      const newErrors = validate({ ...form, [name]: event.target.value });
      return { ...prevErrors, [name]: newErrors[name] };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      service: true,
      budget: true,
      timeline: true,
      message: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      setStatus('error');
      setServerError('Please fix the highlighted fields before submitting.');
      return;
    }

    setStatus('loading');
    setServerError('');

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit contact request.');
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setServerError(error.message || 'Something went wrong while sending your message. Please try again.');
    }
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setTouched({});
    setStatus('idle');
    setServerError('');
  };

  return {
    form,
    errors,
    touched,
    status,
    serverError,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}
