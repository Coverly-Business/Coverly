"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/features/auth/authSlice";
import { API_BASE_URL } from "@/config/api";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/PasswordInput";

export default function ChangePasswordPage() {
    const token = useSelector(selectCurrentToken);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        if (newPassword.length < 6) {
            setError("New password must be at least 6 characters.");
            return;
        }

        setSaving(true);

        try {
            const res = await fetch(`${API_BASE_URL}/users/me/password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.error || "Failed to change password.");
                setSaving(false);
                return;
            }

            setSuccess("Password updated successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setError("Something went wrong.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-md mx-auto space-y-6">
            <h2 className="text-xl font-bold text-center">Change Password</h2>

            {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
            {success && <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-bold">New Password</label>
                    <PasswordInput value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={6} required />
                </div>

                <div>
                    <label className="text-sm font-bold">New Password</label>
                    <PasswordInput value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={6} required />
                </div>

                <div>
                    <label className="text-sm font-bold">Confirm New Password</label>
                    <PasswordInput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>

                <Button type="submit" className="w-full font-bold" disabled={saving}>
                    {saving ? "Updating..." : "Update Password"}
                </Button>
            </form>
        </div>
    );
}