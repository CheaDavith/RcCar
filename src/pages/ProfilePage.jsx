import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import "./AuthPage.css";

export default function ProfilePage() {
  const currentUser = auth.currentUser;
  const [name, setName] = useState(currentUser?.displayName || "");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleUpdate(e) {
    e.preventDefault();
    if (!currentUser) return;

    setStatus("submitting");
    setMessage("");

    try {
      await updateProfile(currentUser, {
        displayName: name.trim(),
      });
      setStatus("success");
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      setStatus("error");
      setMessage("Failed to update profile. Please try again.");
    }
  }

  if (!currentUser) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1>Please sign in</h1>
          <p className="auth-card__subtitle">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleUpdate} noValidate>
        <h1>My Profile</h1>
        <p className="auth-card__subtitle">View and manage your account details.</p>

        {message && (
          <div className={status === "success" ? "auth-success" : "auth-error"}>
            {message}
          </div>
        )}

        <label className="auth-field">
          <span>Email (Read-only)</span>
          <input type="email" value={currentUser.email || ""} disabled />
        </label>

        <label className="auth-field">
          <span>Display Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>

        <button type="submit" className="auth-submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}