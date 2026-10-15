// src/config/api.js
// Centralized API configuration for StorySprout.
// When deployed on Vercel, requests use relative paths (/api/...) by default to seamlessly hit
// Vercel Serverless Functions on the same origin without CORS issues.
// If an external backend is specified via VITE_API_BASE_URL (e.g. on Render/Railway), it will be used.

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export const API_ENDPOINTS = {
  signup: `${API_BASE_URL}/api/auth/signup`,
  login: `${API_BASE_URL}/api/auth/login`,
  googleAuth: `${API_BASE_URL}/api/auth/google`,
  createStory: `${API_BASE_URL}/api/story/create`,
  allStories: `${API_BASE_URL}/api/story/all`,
  createGift: `${API_BASE_URL}/api/gift/create`,
  excuse: `${API_BASE_URL}/api/excuse`,
  health: `${API_BASE_URL}/api/health`,
};

export default API_ENDPOINTS;
