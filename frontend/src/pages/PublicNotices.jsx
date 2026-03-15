import Navbar from "../components/Navbar";
import { useState } from "react";
import { notices as initialNotices } from "../data/notices";

function PublicNotices() {

  const [notices, setNotices] = useState(initialNotices);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("info");

  const getStyle = (type) => {
    if (type === "alert") return "border-red-300 bg-red-50";
    if (type === "warning") return "border-yellow-300 bg-yellow-50";
    return "border-gray-200 bg-white";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNotice = {
      id: Date.now(),
      title,
      department,
      description,
      type,
      date: new Date().toLocaleDateString(),
    };

    setNotices([newNotice, ...notices]);

    setTitle("");
    setDepartment("");
    setDescription("");
    setShowForm(false);
  };

  const deleteNotice = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (confirmDelete) {
      setNotices(notices.filter((notice) => notice.id !== id));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="px-10 py-8">

        {/* TITLE */}

        <div className="bg-gradient-to-r from-blue-900 to-teal-600 text-white p-8 rounded-2xl mb-8">

          <h1 className="text-3xl font-bold mb-2">
            Public Notices
          </h1>

          <p className="text-gray-200">
            Government announcements and public notifications
          </p>

        </div>

        {/* CREATE NOTICE BUTTON */}

        <div className="mb-6">

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg"
          >
            Create Notice
          </button>

        </div>

        {/* NOTICE FORM */}

        {showForm && (

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow mb-8 space-y-4"
          >

            <h2 className="text-xl font-semibold">
              Create New Notice
            </h2>

            <input
              type="text"
              placeholder="Notice Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border p-3 rounded-lg"
              required
            />

            <textarea
              placeholder="Notice Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-3 rounded-lg"
              required
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border p-3 rounded-lg"
            >
              <option value="info">Normal</option>
              <option value="warning">Warning</option>
              <option value="alert">Alert</option>
            </select>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Publish Notice
            </button>

          </form>

        )}

        {/* NOTICES */}

        <div className="space-y-6">

          {notices.map((notice) => (

            <div
              key={notice.id}
              className={`border rounded-xl p-6 shadow-sm relative ${getStyle(notice.type)}`}
            >

              {/* DELETE BUTTON */}

              <button
                onClick={() => deleteNotice(notice.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-lg"
              >
                🗑
              </button>

              <div className="flex gap-4">

                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  📢
                </div>

                <div className="flex-1">

                  <h3 className="font-semibold text-lg mb-1">
                    {notice.title}
                  </h3>

                  <div className="text-sm text-gray-500 mb-3">
                    {notice.department} • {notice.date}
                  </div>

                  <p className="text-gray-600">
                    {notice.description}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default PublicNotices;