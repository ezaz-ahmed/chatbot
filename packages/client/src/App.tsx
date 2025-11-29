import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/message")
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">{message}</h1>
          <p className="text-gray-500">Welcome to our application</p>
        </div>
        <Button className="w-full py-6 text-lg">Click Me</Button>
      </div>
    </div>
  );
}

export default App;
