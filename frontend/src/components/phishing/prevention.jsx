const tips = [
    "Check the sender's email address.",
    "Do not click on suspicious links.",
    "Enable two-factor authentication."
  ];
  
  export default function PreventionGuide() {
    return (
      <div className="p-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-gray-200 p-3 rounded mb-2 shadow hover:bg-gray-300"
          >
            {tip}
          </div>
        ))}
      </div>
    );
  }
  