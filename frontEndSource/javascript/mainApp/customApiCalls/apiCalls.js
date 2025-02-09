// apiClient.js
import Cookies from "js-cookie";

const backendLink = "";

// Base API client function
const apiRequest = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-CSRFToken': Cookies.get('csrftoken'),
    // 'Cache-Control': 'no-cache, no-store, must-revalidate',
    // 'Pragma': 'no-cache',
    // 'Expires': '0'
  };

  const config = {
    headers: defaultHeaders,
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: 'no-store'
  };

  try {
    const response = await fetch(`${backendLink}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

export const getCrewMembersData = async () => {
  const response = await apiRequest('/api/crew-members/', {
    method: 'GET',
  });
  return response;
};

export const createCrewMember = async (crewMemberData) => {
  const response = await apiRequest('/api/crew-members-create/', {
    method: 'POST',
    body: crewMemberData,  // Pass the data object directly
  });
  return response;
};

export const createHealthProblem = async (healthProblemData) => {
  const response = await apiRequest('/api/health-problems-create/', {
    method: 'POST',
    body: healthProblemData,
  });
  return response;
};

export const createHealthReport = async (healthReportData) => {
  const response = await apiRequest('/api/health-reports-create/', {
    method: 'POST',
    body: healthReportData,
  });
  return response;
};

