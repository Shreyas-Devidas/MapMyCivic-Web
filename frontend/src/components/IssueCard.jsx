import { useNavigate } from "react-router-dom";

function IssueCard({ issue }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/issue/${issue.id}`)}
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
    >
      <div className="flex gap-2 mb-2">

        <span className="bg-gray-200 text-sm px-2 py-1 rounded">
          {issue.category}
        </span>

        <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
          {issue.status}
        </span>

      </div>

      <h3 className="text-lg font-semibold mb-2">
        {issue.title}
      </h3>

      <p className="text-gray-500 text-sm mb-3">
        {issue.description}
      </p>

      <div className="text-sm text-gray-400">
        {issue.location} • {issue.time}
      </div>

      <div className="text-sm text-green-600 mt-2">
        {issue.department}
      </div>

    </div>
  );
}

export default IssueCard;