import React from 'react';

const TeacherMainBody = () => {
  const features = [
    { title: "Batch", description: "View and manage student batches" },
    { title: "Manage Batch", description: "Add, edit, or remove batches" },
    { title: "Assignments", description: "Create and review assignments" },
    { title: "Announcements", description: "Post important updates for students" },
  ];

  return (
    <div className="w-screen flex items-center justify-center py-16">
      <main className="grid grid-cols-1 md:grid-cols-2 gap-10 w-11/12 md:w-4/5">
        {features.map((feature, index) => (
          <div
            key={index}
            className="cont h-52 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl shadow-lg flex flex-col items-center justify-center text-white hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-2xl font-bold mb-2">{feature.title}</h2>
            <p className="text-sm opacity-90 text-center px-4">{feature.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default TeacherMainBody;