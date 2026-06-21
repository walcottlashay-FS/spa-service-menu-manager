import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://spa-service-menu-manager-api.onrender.com/api/services";

function HomePage() {
  const [services, setServices] = useState([]);
  const [editId, setEditId] = useState(null);

  const [editForm, setEditForm] = useState({
    serviceName: "",
    category: "",
    price: "",
  });

  // Gets the current spa services from the API and displays them on the menu.
  async function getServices() {
    try {
      const response = await axios.get(API_URL);
      setServices(response.data);
    } catch (error) {
      console.error("Error getting services:", error);
    }
  }

  // Loads the services when the page first opens.
  useEffect(() => {
    getServices();
  }, []);

  // Opens the edit form for the selected service card.
  function startEdit(service) {
    setEditId(service._id);
    setEditForm({
      serviceName: service.serviceName,
      category: service.category,
      price: service.price,
    });
  }

  // Saves updated service details to the API.
  async function updateService(id) {
    try {
      await axios.patch(`${API_URL}/${id}`, {
        serviceName: editForm.serviceName,
        category: editForm.category,
        price: Number(editForm.price),
      });

      setEditId(null);
      getServices();
    } catch (error) {
      console.error("Error updating service:", error);
    }
  }

  // Removes a service from the menu and refreshes the service list.
  async function deleteService(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this service from the menu?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      getServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  }

  return (
    <section className="page-section">
      <div className="hero">
        <p className="eyebrow">Spa Menu Studio</p>
        <h1>A polished service menu manager for modern spas.</h1>
        <p>
          Keep your spa menu organized, updated, and easy to manage from one
          clean dashboard. Add new treatments, adjust pricing, update
          categories, and remove outdated services as your business grows.
        </p>

        <div className="hero-actions">
          <Link className="primary-link" to="/add-service">
            Add a Service
          </Link>

          <a className="soft-link" href="#service-list">
            View Menu
          </a>
        </div>
      </div>

      <div className="section-heading" id="service-list">
        <p className="eyebrow">Current Menu</p>
        <h2>Your Service Collection</h2>
        <p>
          Review the treatments currently listed on your spa menu and make quick
          updates when pricing, categories, or offerings change.
        </p>
      </div>

      <div className="service-grid">
        {services.length === 0 ? (
          <div className="empty-card">
            <h3>No services added yet</h3>
            <p>
              Start building your menu by adding your first facial, massage,
              peel, body treatment, or wellness service.
            </p>

            <Link className="primary-link" to="/add-service">
              Create First Service
            </Link>
          </div>
        ) : (
          services.map((service) => (
            <article className="service-card" key={service._id}>
              {editId === service._id ? (
                <div className="edit-form">
                  <input
                    value={editForm.serviceName}
                    onChange={(event) =>
                      setEditForm({
                        ...editForm,
                        serviceName: event.target.value,
                      })
                    }
                    placeholder="Service name"
                  />

                  <input
                    value={editForm.category}
                    onChange={(event) =>
                      setEditForm({
                        ...editForm,
                        category: event.target.value,
                      })
                    }
                    placeholder="Category"
                  />

                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(event) =>
                      setEditForm({
                        ...editForm,
                        price: event.target.value,
                      })
                    }
                    placeholder="Price"
                  />

                  <div className="button-row">
                    <button onClick={() => updateService(service._id)}>
                      Save Update
                    </button>

                    <button
                      className="secondary"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="card-category">{service.category}</p>
                  <h3>{service.serviceName}</h3>
                  <p className="price">${service.price}</p>

                  <p className="date">
                    Added{" "}
                    {new Date(service.created_at).toLocaleDateString()}
                  </p>

                  <div className="button-row">
                    <button onClick={() => startEdit(service)}>
                      Edit Service
                    </button>

                    <button
                      className="danger"
                      onClick={() => deleteService(service._id)}
                    >
                      Remove
                    </button>
                  </div>
                </>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}

function AddServicePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    price: "",
  });

  // Sends a new spa service to the API and returns the manager to the menu.
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await axios.post(API_URL, {
        serviceName: formData.serviceName,
        category: formData.category,
        price: Number(formData.price),
      });

      setFormData({
        serviceName: "",
        category: "",
        price: "",
      });

      navigate("/");
    } catch (error) {
      console.error("Error adding service:", error);
    }
  }

  return (
    <section className="page-section">
      <div className="form-card">
        <p className="eyebrow">New Menu Item</p>
        <h1>Add a service to your spa menu.</h1>
        <p>
          Create a clear, organized listing for a treatment your team offers.
          Add the service name, choose a category, and set the price so your
          menu stays easy to manage.
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Service Name
            <input
              type="text"
              value={formData.serviceName}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  serviceName: event.target.value,
                })
              }
              placeholder="Hydrating Glow Facial"
              required
            />
          </label>

          <label>
            Category
            <input
              type="text"
              value={formData.category}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  category: event.target.value,
                })
              }
              placeholder="Facial"
              required
            />
          </label>

          <label>
            Price
            <input
              type="number"
              value={formData.price}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  price: event.target.value,
                })
              }
              placeholder="139"
              required
            />
          </label>

          <div className="button-row">
            <button type="submit">Save Service</button>

            <Link className="soft-link" to="/">
              Back to Menu
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="page-section">
      <div className="form-card">
        <p className="eyebrow">About the App</p>
        <h1>Designed to help spa managers keep their menu moving.</h1>

        <p>
          Spa Menu Studio gives spa managers, estheticians, and wellness
          business owners a simple way to manage service offerings without
          digging through scattered notes, old price lists, or separate files.
        </p>

        <p>
          The app is built around the everyday needs of a growing spa: adding
          new treatments, updating prices, organizing services by category, and
          removing anything that is no longer offered.
        </p>

        <p>
          Whether the menu includes facials, peels, massage, body treatments, or
          specialty wellness services, Spa Menu Studio keeps everything clean,
          current, and easy to review.
        </p>
      </div>
    </section>
  );
}

function App() {
  return (
    <main className="app-shell">
      <nav className="navbar">
        <Link to="/" className="logo">
          Spa Menu Studio
        </Link>

        <div>
          <Link to="/">Services</Link>
          <Link to="/add-service">Add Service</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-service" element={<AddServicePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </main>
  );
}

export default App;