import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./AuthPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
      firebase: undefined,
    }));
  }

  function validate() {
    const next = {};

    if (!form.email.trim()) {
      next.email = "Enter your email.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }

    if (!form.password) {
      next.password = "Enter your password.";
    } else if (form.password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }

    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const next = validate();
    setErrors(next);

    if (Object.keys(next).length > 0) {
      return;
    }

    setStatus("submitting");
    console.log("1. Starting login process..."); // មើលក្នុង Console

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );
      
      console.log("2. Login success:", userCredential.user); // មើលក្នុង Console

      setStatus("success");
      navigate("/");
    } catch (error) {
      console.error("3. Login error catch:", error); // មើលក្នុង Console

      let message = "Login failed. Please try again.";
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        message = "Incorrect email or password.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address.";
      } else if (error.code === "auth/user-disabled") {
        message = "This account has been disabled.";
      } else if (error.code === "auth/network-request-failed") {
        message = "Network error. Please check your internet connection.";
      }

      setErrors({
        firebase: message,
      });

      setStatus("idle");
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h1>Sign in</h1>

        <p className="auth-card__subtitle">
          Welcome back — enter your details to continue.
        </p>

        {errors.firebase && (
          <div className="auth-error">
            {errors.firebase}
          </div>
        )}

        <label className="auth-field">
          <span>Email</span>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
          />

          {errors.email && (
            <small className="auth-error">
              {errors.email}
            </small>
          )}
        </label>

        <label className="auth-field">
          <span>Password</span>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            aria-invalid={!!errors.password}
          />

          {errors.password && (
            <small className="auth-error">
              {errors.password}
            </small>
          )}
        </label>

        <button
          type="submit"
          className="auth-submit"
          disabled={status === "submitting"}
        >
          {status === "submitting"
            ? "Signing in…"
            : status === "success"
            ? "Signed in ✓"
            : "Sign in"}
        </button>

        <p className="auth-switch">
          Don&apos;t have an account?{" "}
          <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  );
}