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

// Gets all spa services from the deployed Express API.
export async function getServices() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to get services.");
  }

  return response.json();
}

// Sends a new spa service to the API and saves it in the database.
export async function createService(serviceData: NewSpaService) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serviceData),
  });

  if (!response.ok) {
    throw new Error("Unable to create service.");
  }

  return response.json();
}

// Removes one spa service from the database using its ID.
export async function deleteService(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Unable to delete service.");
  }

  return response.json();
}

// Updates an existing spa service using its ID.
export async function updateService(id: string, serviceData: NewSpaService) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serviceData),
  });

  if (!response.ok) {
    throw new Error("Unable to update service.");
  }

  return response.json();
}

