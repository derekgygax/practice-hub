"use client"

import { useState } from "react";


interface SignUpFormProps {
  email: string;
}

export const SignUpForm = ({ email }: SignUpFormProps) => {


  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: email,
    password: '',
    password_2: ''
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.password_2) {
      newErrors.password_2 = 'Passwords must match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      // Here you would typically call an API
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4 max-w-md mx-auto p-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
            readOnly
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password_2">Confirm Password</label>
          <input
            id="password_2"
            name="password_2"
            type="password"
            value={formData.password_2}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          {errors.password_2 && <span className="text-red-500 text-sm">{errors.password_2}</span>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
