import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { issues } from "../data/issues";

import { FaCamera, FaArrowLeft } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { FiUpload } from "react-icons/fi";

function IssueDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const issue = issues.find(i => i.id === parseInt(id));

  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUpload = (e) => {

    const files = Array.from(e.target.files);

    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setUploadedImages([...uploadedImages, ...newImages]);
  };

  if (!issue) {
    return <div>Issue not found</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="container mx-auto px-10 py-8">

        {/* BACK */}

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 mb-6"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* TAGS */}

        <div className="flex gap-3 mb-3">

          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
            {issue.category}
          </span>

          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            {issue.status}
          </span>

        </div>

        {/* TITLE */}

        <h1 className="text-3xl font-bold mb-6">
          {issue.title}
        </h1>

        {/* INFO CARD */}

        <div className="bg-white p-6 rounded-xl border grid grid-cols-2 gap-6 mb-8">

          <div className="flex items-center gap-3 text-gray-600">
            <IoLocationOutline />
            {issue.location}
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <MdAccessTime />
            {issue.time}
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            🏢 {issue.department}
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            📷 4 images captured
          </div>

        </div>

        {/* DESCRIPTION */}

        <h2 className="font-semibold text-lg mb-2">
          Description
        </h2>

        <p className="text-gray-600 mb-10">
          {issue.description}
        </p>

        {/* CCTV IMAGES */}

        <h2 className="font-semibold text-lg mb-4">
          CCTV Captured Images
        </h2>

        <div className="grid grid-cols-2 gap-6 mb-10">

          {[1,2,3,4].map((i) => (

            <div
              key={i}
              className="bg-gray-200 h-52 rounded-xl flex flex-col items-center justify-center text-gray-500"
            >

              <FaCamera size={26} />

              <p className="mt-2 text-sm">
                CCTV Frame {i}
              </p>

            </div>

          ))}

        </div>

        {/* UPLOAD */}

        <h2 className="font-semibold text-lg mb-2">
          Upload Your Own Images
        </h2>

        <p className="text-gray-500 mb-4">
          Help us by uploading additional photos of this issue
        </p>

        <label className="border-2 border-dashed border-gray-300 rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 mb-6">

          <FiUpload size={24} />

          <p className="text-gray-500 mt-2">
            Upload additional images
          </p>

          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleUpload}
          />

        </label>

        {/* PREVIEW */}

        {uploadedImages.length > 0 && (

          <div className="grid grid-cols-4 gap-4 mb-8">

            {uploadedImages.map((img, index) => (

              <img
                key={index}
                src={img.preview}
                alt="upload"
                className="h-32 w-full object-cover rounded-lg"
              />

            ))}

          </div>

        )}

        {/* CRITICAL WARNING */}

        {issue.status === "Critical" && (

          <div className="border border-red-400 bg-red-50 text-red-700 p-4 rounded-xl">

            <p className="font-semibold mb-1">
              Critical Issue
            </p>

            <p className="text-sm">
              This issue has been flagged as critical and requires immediate attention from {issue.department}.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default IssueDetail;