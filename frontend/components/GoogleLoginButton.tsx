"use client";

import { useEffect } from "react";
import axios from "@/utils/axios";

declare global {
    interface Window {
        google?: {
            accounts?: {
                id?: {
                    initialize: (options: {
                        client_id: string;
                        callback: (response: { credential: string }) => void;
                    }) => void;
                    renderButton: (element: HTMLElement | null, options: Record<string, unknown>) => void;
                };
            };
        };
    }
}

// Google Identity Services script loader
function loadGoogleScript(onLoad: () => void) {
    if (document.getElementById('google-client-script')) {
        if (window.google && window.google.accounts && window.google.accounts.id) {
            onLoad();
        } else {
            const interval = setInterval(() => {
                if (window.google && window.google.accounts && window.google.accounts.id) {
                    clearInterval(interval);
                    onLoad();
                }
            }, 100);
        }
        return;
    }

    const script = document.createElement('script');

    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.id = 'google-client-script';
    script.onload = onLoad;

    document.body.appendChild(script);
}

export default function GoogleLoginButton() {
    useEffect(() => {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

        if (!clientId) {
            console.error("Google Client ID is not set in environment variables.");
            return;
        }

        loadGoogleScript(() => {
            if (window.google && window.google.accounts && window.google.accounts.id) {
                window.google.accounts.id.initialize({
                    client_id: clientId,
                    callback: async (response: { credential: string }) => {
                        try {
                            const { data } = await axios.post("/auth/google", { idToken: response.credential });
                            const accessToken = (data as { access_token: string }).access_token;

                            localStorage.setItem("token", accessToken);
                            window.location.href = "/dashboard/user";
                        } catch {
                            alert("Google login failed");
                        }
                    },
                });
                window.google.accounts.id.renderButton(
                    document.getElementById('google-signin-btn'),
                    { theme: 'outline', size: 'large', width: '100%' }
                );
            }
        });

        return () => {
            const btn = document.getElementById('google-signin-btn');
            if (btn) btn.innerHTML = "";
        };
    }, []);

    return (
        <div id="google-signin-btn" className="w-full mt-2 flex justify-center" />
    );
}
