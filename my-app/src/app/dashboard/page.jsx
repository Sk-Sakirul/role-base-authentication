"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) {
      router.push("/login");
      return;
    }

    if (role === "user") {
      router.push("/user/dashboard");
    } else if (role === "admin") {
      router.push("/admin/dashboard");
    } else if (role === "superadmin") {
      router.push("/superadmin/dashboard");
    }
  }, []);

  return <p>Redirecting...</p>;
}
