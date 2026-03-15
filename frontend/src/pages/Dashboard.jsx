import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { issues } from "../data/issues";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Dashboard() {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    "Road Damage",
    "Waste Management",
    "Street Lighting",
    "Water Supply",
    "Encroachment",
    "Tree Hazard",
    "Drainage",
    "Traffic"
  ];

  const getColor = (status) => {
    if (status === "Critical") return "red";
    if (status === "In Progress") return "orange";
    if (status === "Resolved") return "green";
    return "gray";
  };

  const filteredIssues = issues.filter((issue) => {

    const matchCategory =
      filter === "All" || issue.category === filter;

    const matchSearch =
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.location.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;

  });

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="px-10 py-8">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-blue-900 to-teal-600 text-white p-8 rounded-2xl mb-8">

          <h1 className="text-3xl font-bold mb-2">
            Civic Issues Dashboard
          </h1>

          <p className="text-gray-200">
            Real-time monitoring of civic issues detected across the city
          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-xl p-6 border">
            <p className="text-gray-500">Total Issues</p>
            <h2 className="text-3xl font-bold">{issues.length}</h2>
          </div>

          <div className="bg-white rounded-xl p-6 border">
            <p className="text-gray-500">Resolved</p>
            <h2 className="text-3xl font-bold text-green-600">
              {issues.filter(i => i.status === "Resolved").length}
            </h2>
          </div>

          <div className="bg-white rounded-xl p-6 border">
            <p className="text-gray-500">In Progress</p>
            <h2 className="text-3xl font-bold text-yellow-500">
              {issues.filter(i => i.status === "In Progress").length}
            </h2>
          </div>

          <div className="bg-white rounded-xl p-6 border">
            <p className="text-gray-500">Critical</p>
            <h2 className="text-3xl font-bold text-red-500">
              {issues.filter(i => i.status === "Critical").length}
            </h2>
          </div>

        </div>


        {/* MAP */}

        <h2 className="text-xl font-semibold mb-4">
          Issue Locations
        </h2>

        <div className="rounded-xl overflow-hidden shadow-lg mb-10">

          <MapContainer
            center={[19.0760, 72.8777]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {issues.map((issue) => (

              <CircleMarker
                key={issue.id}
                center={[issue.lat, issue.lng]}
                radius={8}
                pathOptions={{
                  color: getColor(issue.status),
                  fillColor: getColor(issue.status),
                  fillOpacity: 0.9
                }}
              >

                <Popup>

                  <div className="space-y-1">

                    <h3 className="font-semibold">
                      {issue.title}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {issue.location}
                    </p>

                    <p className="text-xs text-gray-500">
                      Status: {issue.status}
                    </p>

                    <button
                      onClick={() => navigate(`/issue/${issue.id}`)}
                      className="text-blue-600 text-sm mt-1"
                    >
                      View Details
                    </button>

                  </div>

                </Popup>

              </CircleMarker>

            ))}

          </MapContainer>

        </div>


        {/* RECENT ISSUES */}

        <h2 className="text-xl font-semibold mb-4">
          Recent Issues
        </h2>

        <input
          type="text"
          placeholder="Search issues by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />


        {/* FILTERS */}

        <div className="flex flex-wrap gap-3 mb-6">

          {categories.map((cat) => (

            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === cat
                  ? "bg-blue-900 text-white"
                  : "bg-gray-200"
              }`}
            >
              {cat}
            </button>

          ))}

        </div>


        {/* ISSUE CARDS */}

        <div className="grid grid-cols-2 gap-6">

          {filteredIssues.map((issue) => (

            <div
              key={issue.id}
              onClick={() => navigate(`/issue/${issue.id}`)}
              className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
            >

              <div className="flex gap-2 mb-2">

                <span className="bg-gray-200 px-2 py-1 rounded text-sm">
                  {issue.category}
                </span>

                <span
                  className={`px-2 py-1 rounded text-sm text-white ${
                    issue.status === "Critical"
                      ? "bg-red-500"
                      : issue.status === "In Progress"
                      ? "bg-yellow-500"
                      : issue.status === "Resolved"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                >
                  {issue.status}
                </span>

              </div>

              <h3 className="font-semibold text-lg mb-2">
                {issue.title}
              </h3>

              <p className="text-gray-500 text-sm mb-3">
                {issue.description}
              </p>

              <div className="text-sm text-gray-400 mb-2">
                📍 {issue.location} • ⏱ {issue.time}
              </div>

              <div className="text-green-600 text-sm">
                {issue.department}
              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;