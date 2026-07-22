import { useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Order Received",
      message: "Order #1025 has been placed.",
      time: "5 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Low Stock Alert",
      message: "Clay Pot stock is running low.",
      time: "20 min ago",
      read: false,
    },
    {
      id: 3,
      title: "New Customer",
      message: "Priya Singh created a new account.",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 4,
      title: "New Review",
      message: "Wooden Lamp received a 5-star review.",
      time: "3 hours ago",
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter(
        (notification) => notification.id !== id
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-[#2F3A2D]">
          Notifications
        </h1>

        <span className="bg-[#556B2F] text-white px-4 py-2 rounded-full">
          {notifications.filter((n) => !n.read).length} Unread
        </span>

      </div>

      <div className="space-y-5">

        {notifications.map((notification) => (

          <div
            key={notification.id}
            className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${
              notification.read
                ? "border-gray-300"
                : "border-green-600"
            }`}
          >

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-xl font-bold">
                  {notification.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {notification.message}
                </p>

                <p className="text-sm text-gray-400 mt-3">
                  {notification.time}
                </p>

              </div>

              <div className="flex gap-3">

                {!notification.read && (

                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Mark Read
                  </button>

                )}

                <button
                  onClick={() =>
                    deleteNotification(notification.id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}