import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ManageBatch = () => {
  const selector = useSelector((state) => state.toggleTheme.value);
  const { role } = useSelector((state) => state.auth); // ✅ get role from Redux

  // Build links based on role
  const basePath = role === "admin" ? "/admin" : "/teacher";

  const actions = [
    { title: "➕ Create Batch", description: "Add a new batch for students", link: `${basePath}/createbatch` },
    { title: "✏️ Edit Batch", description: "Update batch details and information", link: `${basePath}/editbatch` },
    { title: "🗑 Remove Batch", description: "Delete an existing batch", link: `${basePath}/removebatch` },
    { title: "🔍 View Batch Details", description: "See batch codes and student info", link: `${basePath}/viewbatch` },
  ];

  useEffect(() => {
    if (selector === "Dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [selector]);

  return (
    <div
      className="w-screen flex items-center justify-center py-16 
      bg-gradient-to-br from-white via-blue-100 to-blue-500 
      dark:from-gray-900 dark:via-black dark:to-emerald-900"
    >
      <main className="grid grid-cols-1 md:grid-cols-2 gap-10 w-11/12 md:w-4/5">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="h-52 rounded-xl 
              bg-white/40 dark:bg-black/40 backdrop-blur-md 
              border border-sky-200 dark:border-emerald-600 
              shadow-lg hover:shadow-2xl 
              flex flex-col items-center justify-center 
              text-sky-900 dark:text-emerald-200 
              hover:scale-105 hover:brightness-110 
              transition-transform duration-300"
          >
            <h2 className="text-2xl font-bold mb-2">{action.title}</h2>
            <p className="text-sm opacity-90 text-center px-4">
              {action.description}
            </p>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default ManageBatch;