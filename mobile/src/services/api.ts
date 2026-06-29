const API_URL = "https://spa-service-menu-manager-api.onrender.com/api/services";

export type SpaService = {
  _id: string;
  serviceName: string;
  category: string;
  price: number;
  created_at?: string;
};

export type NewSpaService = {
  serviceName: string;
  category: string;
  price: number;
};

// Adds the login token to protected API requests.
function getAuthHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Gets all spa services from the protected API.
export async function getServices(token: string) {
  const response = await fetch(API_URL, {
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    throw new Error("Unable to get services.");
  }

  return response.json();
}

// Sends a new spa service to the protected API.
export async function createService(serviceData: NewSpaService, token: string) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(serviceData),
  });

  if (!response.ok) {
    throw new Error("Unable to create service.");
  }

  return response.json();
}

// Removes one spa service from the database using its ID.
export async function deleteService(id: string, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    throw new Error("Unable to delete service.");
  }

  return response.json();
}

// Updates an existing spa service using its ID.
export async function updateService(
  id: string,
  serviceData: NewSpaService,
  token: string
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(token),
    body: JSON.stringify(serviceData),
  });

  if (!response.ok) {
    throw new Error("Unable to update service.");
  }

  return response.json();
}