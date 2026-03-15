import Navbar from "../components/Navbar";
import { issues } from "../data/issues";
import { useNavigate } from "react-router-dom";

function Reports() {

  const navigate = useNavigate();

  const getStatusColor = (status) => {
    if (status === "Critical") return "bg-red-500";
    if (status === "In Progress") return "bg-yellow-500";
    if (status === "Resolved") return "bg-green-500";
    return "bg-gray-400";
  };

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="px-10 py-8">

        {/* TITLE */}
        <div className="bg-gradient-to-r from-blue-900 to-teal-600 text-white p-8 rounded-2xl mb-8">

        <h1 className="text-3xl font-bold mb-2">
          Issue Reports Log
        </h1>

        <p className="text-gray-200">
          Complete log of all detected civic issues
        </p>
        </div>
        {/* ISSUE LIST */}

        <div className="grid grid-cols-2 gap-6">

          {issues.map((issue) => (

            <div
              key={issue.id}
              onClick={() => navigate(`/issue/${issue.id}`)}
              className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
            >

              {/* CATEGORY + STATUS */}

              <div className="flex gap-2 mb-2">

                <span className="bg-gray-200 px-2 py-1 rounded text-sm">
                  {issue.category}
                </span>

                <span
                  className={`px-2 py-1 rounded text-sm text-white ${getStatusColor(issue.status)}`}
                >
                  {issue.status}
                </span>

              </div>

              {/* TITLE */}

              <h3 className="font-semibold text-lg mb-2">
                {issue.title}
              </h3>

              {/* DESCRIPTION */}

              <p className="text-gray-500 text-sm mb-3">
                {issue.description}
              </p>

              {/* LOCATION + TIME */}

              <div className="text-sm text-gray-400 mb-2">
                📍 {issue.location} • ⏱ {issue.time} • 📷 {issue.images}
              </div>

              {/* DEPARTMENT */}

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

export default Reports;