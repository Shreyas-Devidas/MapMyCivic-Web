import Navbar from "../components/Navbar";
import { issues } from "../data/issues";

function AdminPanel() {

  const total = issues.length;
  const resolved = issues.filter(i => i.status === "Resolved").length;
  const progress = issues.filter(i => i.status === "In Progress").length;
  const critical = issues.filter(i => i.status === "Critical").length;

  const departments = {};

  issues.forEach(issue => {
    if (!departments[issue.department]) {
      departments[issue.department] = { total: 0, resolved: 0 };
    }

    departments[issue.department].total++;

    if (issue.status === "Resolved") {
      departments[issue.department].resolved++;
    }
  });

  const categories = {};

  issues.forEach(issue => {
    if (!categories[issue.category]) {
      categories[issue.category] = 0;
    }
    categories[issue.category]++;
  });

  const criticalIssues = issues.filter(
    issue => issue.status === "Critical"
  );

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="px-10 py-8">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-blue-900 to-teal-600 text-white p-8 rounded-2xl mb-8">

          <p className="text-sm mb-1">
            Agency Admin Panel
          </p>

          <h1 className="text-3xl font-bold mb-1">
            Administrative Dashboard
          </h1>

          <p className="text-gray-200">
            Manage and track civic issues across all departments
          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-4 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl border">
            <p className="text-gray-500">Total Issues</p>
            <h2 className="text-3xl font-bold">{total}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl border">
            <p className="text-gray-500">Resolved</p>
            <h2 className="text-3xl font-bold text-green-600">
              {resolved}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl border">
            <p className="text-gray-500">In Progress</p>
            <h2 className="text-3xl font-bold text-yellow-500">
              {progress}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl border">
            <p className="text-gray-500">Critical</p>
            <h2 className="text-3xl font-bold text-red-500">
              {critical}
            </h2>
          </div>

        </div>

        {/* PERFORMANCE + CATEGORY */}

        <div className="grid grid-cols-2 gap-6 mb-8">

          {/* AGENCY PERFORMANCE */}

          <div className="bg-white p-6 rounded-xl border">

            <h2 className="font-semibold mb-4">
              Agency Performance
            </h2>

            {Object.keys(departments).map(dep => {

              const total = departments[dep].total;
              const resolved = departments[dep].resolved;

              const percent = (resolved / total) * 100;

              return (

                <div key={dep} className="mb-4">

                  <div className="flex justify-between text-sm mb-1">
                    <span>{dep}</span>
                    <span>
                      {resolved}/{total} resolved
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded">

                    <div
                      className="bg-blue-900 h-2 rounded"
                      style={{ width: `${percent}%` }}
                    ></div>

                  </div>

                </div>

              );

            })}

          </div>

          {/* ISSUES BY CATEGORY */}

          <div className="bg-white p-6 rounded-xl border">

            <h2 className="font-semibold mb-4">
              Issues by Category
            </h2>

            {Object.keys(categories).map(cat => (

              <div
                key={cat}
                className="flex justify-between mb-3 text-sm"
              >

                <span>{cat}</span>

                <div className="flex items-center gap-3">

                  <div className="w-32 bg-gray-200 h-2 rounded">

                    <div
                      className="bg-teal-600 h-2 rounded"
                      style={{
                        width: `${categories[cat] * 20}px`
                      }}
                    ></div>

                  </div>

                  <span>{categories[cat]}</span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* CRITICAL ISSUES */}

        <div className="bg-white p-6 rounded-xl border">

          <h2 className="text-lg font-semibold mb-4 text-red-600">
            Critical Issues Requiring Attention
          </h2>

          {criticalIssues.map(issue => (

            <div
              key={issue.id}
              className="border border-red-300 bg-red-50 p-4 rounded-lg mb-3 flex justify-between"
            >

              <div>

                <p className="font-medium">
                  {issue.title}
                </p>

                <p className="text-sm text-gray-600">
                  {issue.location} • {issue.department}
                </p>

              </div>

              <span className="text-red-500 text-sm">
                {issue.time}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminPanel;