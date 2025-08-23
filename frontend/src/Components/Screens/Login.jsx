import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post('/api/auth/login', values, {
          withCredentials: true,
        });
        
        toast.success('Login successful!');
        navigate('/');
      } catch (error) {
        const message = error.response?.data?.error || 'Login failed';
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="card">
          <h2 className="text-center mb-20">Login to CodeHub</h2>
          
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px' }}>
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Enter your password"
              />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '5px' }}>
                  {formik.errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="text-center mt-20">
            <p style={{ color: '#e0e0e0' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#667eea', textDecoration: 'none' }}>
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
