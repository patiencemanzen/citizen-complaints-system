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
                            document.cookie = `token=${accessToken}; path=/;`;

                            try {
                                const decoded = JSON.parse(atob(accessToken.split('.')[1]));
                                const userRole = decoded.roles && Array.isArray(decoded.roles) && decoded.roles.length > 0
                                    ? decoded.roles[0]
                                    : decoded.role;
                                    
                                if (userRole === 'SUPER_ADMIN') window.location.href = '/admin';
                                else if (userRole === 'AGENCY_USER') window.location.href = '/agencies';
                                else window.location.href = '/users/complaints';
                            } catch {
                                window.location.href = '/users/complaints';
                            }
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
