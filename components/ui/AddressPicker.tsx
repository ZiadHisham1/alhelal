// components/ui/AddressPicker.tsx
"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface AddressPickerProps {
  onAddress: (data: {
    address_1: string;
    city: string;
    postal_code: string;
    lat?: number;
    lng?: number;
  }) => void;
  className?: string;
}

export function AddressPicker({ onAddress, className }: AddressPickerProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUseLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("متصفحك لا يدعم تحديد الموقع");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const key = process.env.NEXT_PUBLIC_LOCATIONIQ_KEY;

          if (!key) {
            setError("خدمة تحديد الموقع غير مهيأة");
            setLoading(false);
            return;
          }

          // ✅ Richer query — zoom=18, namedetails, extratags
          const res = await fetch(
            `https://us1.locationiq.com/v1/reverse?key=${key}` +
              `&lat=${latitude}&lon=${longitude}` +
              `&format=json` +
              `&accept-language=ar` +
              `&addressdetails=1` +
              `&namedetails=1` +
              `&extratags=1` +
              `&zoom=18`,
            { headers: { Accept: "application/json" } }
          );

          if (!res.ok) {
            setError("لم نتمكن من تحديد العنوان");
            setLoading(false);
            return;
          }

          const data = await res.json();
          const addr = data.address ?? {};
          const tags = data.extratags ?? {};

          // ─── Build the most precise address line possible ───

          // 1. Street + number (best case)
          const parts: string[] = [];

          if (addr.house_number && addr.road) {
            parts.push(`${addr.house_number} ${addr.road}`);
          } else if (addr.road) {
            parts.push(addr.road);
          } else if (addr.pedestrian) {
            parts.push(addr.pedestrian);
          } else if (addr.footway) {
            parts.push(addr.footway);
          } else if (addr.path) {
            parts.push(addr.path);
          }

          // 2. Landmark (amenity/shop/building)
          const landmark =
            addr.amenity ||
            addr.shop ||
            addr.building ||
            tags.amenity ||
            tags.shop ||
            tags.building ||
            "";

          if (landmark && !parts.some((p) => p.includes(landmark))) {
            parts.push(`بجوار ${landmark}`);
          }

          // 3. Neighborhood context
          const neighborhood =
            addr.neighbourhood ||
            addr.suburb ||
            addr.quarter ||
            addr.city_district ||
            "";

          if (neighborhood && !parts.some((p) => p.includes(neighborhood))) {
            parts.push(neighborhood);
          }

          const addressLine = parts.filter(Boolean).join("، ");

          // ─── City + district ───
          const city =
            addr.city ||
            addr.town ||
            addr.village ||
            addr.municipality ||
            addr.county ||
            addr.state ||
            "";

          const district =
            addr.city_district ||
            addr.district ||
            addr.borough ||
            addr.suburb ||
            "";

          const fullCity =
            district && district !== city ? `${district}، ${city}` : city;

          const postal = addr.postcode || "";

          onAddress({
            address_1: addressLine || data.display_name || "",
            city: String(fullCity),
            postal_code: String(postal),
            lat: latitude,
            lng: longitude,
          });

          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        } catch (e) {
          setError("فشل الاتصال بخدمة العناوين");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("تم رفض صلاحية تحديد الموقع");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("الموقع غير متاح حالياً");
            break;
          case err.TIMEOUT:
            setError("انتهت المهلة");
            break;
          default:
            setError("حدث خطأ في تحديد الموقع");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, [onAddress]);

  return (
    <div className={cn("space-y-2", className)}>
      <button
        type="button"
        onClick={handleUseLocation}
        disabled={loading}
        className={cn(
          "w-full h-12 rounded-[10px]",
          "flex items-center justify-center gap-2",
          "font-lalezar text-base",
          "transition-all duration-200",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          success
            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
            : "bg-white text-ink ring-1 ring-ink/10 hover:bg-cream-50"
        )}
      >
        {loading ? (
          <>
            <span className="animate-spin inline-block w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full" />
            <span>جاري تحديد موقعك...</span>
          </>
        ) : success ? (
          <>
            <svg
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                d="M4 10l4 4 8-8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>تم تحديد موقعك</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                d="M10 18s6-5.5 6-10a6 6 0 1 0-12 0c0 4.5 6 10 6 10z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="8" r="2.5" />
            </svg>
            <span>استخدم موقعي الحالي</span>
          </>
        )}
      </button>

      {error && (
        <p className="text-sm text-rose-600 font-lalezar text-center">
          {error}
        </p>
      )}
    </div>
  );
}