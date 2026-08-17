import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import "./AuthPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error for the field being edited
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
      firebase: undefined,
    }));
  }

  // Validate form
  function validate() {
    const next = {};

    // Name
    if (!form.name.trim()) {
      next.name = "Enter your name.";
    }

    // Email
    if (!form.email.trim()) {
      next.email = "Enter your email.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      next.email = "Enter a valid email address.";
    }

    // Password
    if (!form.password) {
      next.password = "Enter a password.";
    } else if (form.password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }

    // Confirm password
    if (!form.confirmPassword) {
      next.confirmPassword = "Confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      next.confirmPassword = "Passwords don't match.";
    }

    return next;
  }

  // Register account
  async function handleSubmit(e) {
    e.preventDefault();

    // Validate form
    const next = validate();

    setErrors(next);

    // Stop if validation failed
    if (Object.keys(next).length > 0) {
      return;
    }

    setStatus("submitting");

    try {
      // Create Firebase Authentication account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );

      // Save user's name to Firebase Authentication profile
      await updateProfile(userCredential.user, {
        displayName: form.name.trim(),
      });

      console.log("Account created:", userCredential.user);

      // Show success message
      setStatus("success");

      // Redirect to login page
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Register error:", error);

      let message = "Something went wrong. Please try again.";

      switch (error.code) {
        case "auth/email-already-in-use":
          message = "This email is already registered.";
          break;

        case "auth/invalid-email":
          message = "Invalid email address.";
          break;

        case "auth/weak-password":
          message = "Password must be at least 6 characters.";
          break;

        case "auth/network-request-failed":
          message =
            "Network error. Please check your internet connection.";
          break;

        case "auth/operation-not-allowed":
          message =
            "Email/password registration is not enabled in Firebase.";
          break;

        case "auth/too-many-requests":
          message =
            "Too many attempts. Please wait a while and try again.";
          break;

        default:
          message = error.message || message;
      }

      setErrors({
        firebase: message,
      });

      setStatus("idle");
    }
  }

  return (
    <div className="auth-page">
      <form
        className="auth-card"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Title */}
        <h1>Create account</h1>

        <p className="auth-card__subtitle">
          Join RC CAR to track orders, save favorites, and leave reviews.
        </p>

        {/* Firebase error */}
        {errors.firebase && (
          <div className="auth-error">
            {errors.firebase}
          </div>
        )}

        {/* Name */}
        <label className="auth-field">
          <span>Name</span>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Rider"
            autoComplete="name"
            aria-invalid={!!errors.name}
          />

          {errors.name && (
            <small className="auth-error">
              {errors.name}
            </small>
          )}
        </label>

        {/* Email */}
        <label className="auth-field">
          <span>Email</span>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
          />

          {errors.email && (
            <small className="auth-error">
              {errors.email}
            </small>
          )}
        </label>

        {/* Password */}
        <label className="auth-field">
          <span>Password</span>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            autoComplete="new-password"
            aria-invalid={!!errors.password}
          />

          {errors.password && (
            <small className="auth-error">
              {errors.password}
            </small>
          )}
        </label>

        {/* Confirm password */}
        <label className="auth-field">
          <span>Confirm password</span>

          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
          />

          {errors.confirmPassword && (
            <small className="auth-error">
              {errors.confirmPassword}
            </small>
          )}
        </label>

        {/* Submit button */}
        <button
          type="submit"
          className="auth-submit"
          disabled={status === "submitting"}
        >
          {status === "submitting"
            ? "Creating account..."
            : status === "success"
            ? "Account created ✓"
            : "Create account"}
        </button>

        {/* Login link */}
        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}