import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000/api/services";

function HomePage() {
  const [services, setServices] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    serviceName: "",
    category: "",
    price: "",
  });

  async function getServices() {
    try {
      const response = await axios.get(API_URL);
      setServices(response.data);
    } catch (error) {
      console.error("Error getting services:", error);
    }
  }

  useEffect(() => {
    getServices();
  }, []);

  function startEdit(service) {
    setEditId(service._id);
    setEditForm({
      serviceName: service.serviceName,
      category: service.category,
      price: service.price,
    });
  }

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

  async function deleteService(id) {
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
        <p className="eyebrow">Spa Service Menu</p>
        <h1>Curate and manage your spa services with ease.</h1>
        <p>
          This menu manager keeps your facial, body, and wellness services
          organized in one simple place. Add new treatments, update pricing, and
          remove outdated services as your spa menu grows.
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
        <h2>Service Collection</h2>
        <p>
          Each card is connected to the API and stored in the MongoDB database.
        </p>
      </div>

      <div className="service-grid">
        {services.length === 0 ? (
          <div className="empty-card">
            <h3>No services added yet</h3>
            <p>
              Start by adding your first spa service, such as a facial, massage,
              peel, or body treatment.
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
                    Added {new Date(service.created_at).toLocaleDateString()}
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
        <h1>Add a spa service</h1>
        <p>
          Create a new menu item for your spa. This form sends the service
          details to the Express API and saves them in the database.
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
        <h1>Built for a simple spa menu workflow.</h1>
        <p>
          Spa Menu Studio is a MERN application created to manage a small list
          of spa services. The React front end connects to a RESTful Express API,
          while MongoDB stores each service with a name, category, price, and
          created date.
        </p>
        <p>
          This project demonstrates basic CRUD functionality: creating,
          reading, updating, and deleting service records.
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