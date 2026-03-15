import Navbar from "../components/Navbar";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { issues } from "../data/issues";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

function MapView() {

  const navigate = useNavigate();

  const getColor = (status) => {
    if (status === "Critical") return "red";
    if (status === "In Progress") return "orange";
    if (status === "Resolved") return "green";
    return "gray";
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="px-10 py-8">

        {/* TITLE */}
        <div className="bg-gradient-to-r from-blue-900 to-teal-600 text-white p-8 rounded-2xl mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Map View
        </h1>

        <p className="text-gray-200">
          View all reported issues on the city map
        </p>
        </div>

        {/* MAP CONTAINER */}

        <div className="rounded-xl overflow-hidden shadow-lg">

          <MapContainer
            center={[19.0760, 72.8777]}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
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

        {/* LEGEND */}

        <div className="flex gap-6 mt-4 text-sm text-gray-600">

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            Critical
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            In Progress
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            Resolved
          </div>

        </div>

      </div>

    </div>
  );
}

export default MapView;