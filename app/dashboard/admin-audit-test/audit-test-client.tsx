"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type TestVendor = {
  id: string;
  name: string;
  status: string;
};

type HistoryRecord = {
  id: string;
  previous_status: string | null;
  new_status: string;
  reason: string | null;
  changed_by: string | null;
  created_at: string;
};

export default function AuditTestClient({ userId }: { userId: string }) {
  const [vendor, setVendor] = useState<TestVendor | null>(null);
  const [reason, setReason] = useState("Audit system test: vendor approval");
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function createTestVendor() {
    setBusy(true);
    setMessage("");
    setHistory([]);

    try {
      const supabase = createClient();

      const uniqueId = crypto.randomUUID().slice(0, 8);

      const { data, error } = await supabase
        .from("vendors")
        .insert({
          owner_id: userId,
          name: `AUDIT TEST Vendor ${uniqueId}`,
          slug: `audit-test-vendor-${uniqueId}`,
          tagline: "Temporary vendor for audit testing",
        })
        .select("id, name, status")
        .single();

      if (error) {
        throw error;
      }

      setVendor(data);
      setMessage(
        "Test vendor created successfully. Initial status: " + data.status,
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not create test vendor.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function approveTestVendor() {
    if (!vendor) return;

    if (!reason.trim()) {
      setMessage("Please provide an audit reason.");
      return;
    }

    setBusy(true);
    setMessage("");

    try {
      const supabase = createClient();

      const { data, error } = await supabase.rpc("approve_vendor", {
        p_vendor_id: vendor.id,
        p_reason: reason.trim(),
      });

      if (error) {
        throw error;
      }

      if (data !== vendor.id) {
        throw new Error("Unexpected approval response.");
      }

      setVendor({
        ...vendor,
        status: "published",
      });

      // Retrieve the audit records using admin RLS policy
      const { data: records, error: historyError } = await supabase
        .from("vendor_status_history")
        .select(
          "id, previous_status, new_status, reason, changed_by, created_at",
        )
        .eq("vendor_id", vendor.id)
        .order("created_at", { ascending: true });

      if (historyError) {
        throw historyError;
      }

      setHistory((records ?? []) as HistoryRecord[]);
      setMessage("Vendor approved successfully. Audit history retrieved.");
    } catch (error) {
      console.error("Vendor approval test error:", error);

      if (error && typeof error === "object" && "message" in error) {
        setMessage(`Database rejected request: ${String(error.message)}`);
      } else {
        setMessage(JSON.stringify(error));
      }
    } finally {
      setBusy(false);
    }
  }

  async function testEmptyReason() {
    if (!vendor) return;

    setBusy(true);
    setMessage("");

    try {
      const supabase = createClient();

      const { data, error } = await supabase.rpc("approve_vendor", {
        p_vendor_id: vendor.id,
        p_reason: "",
      });

      if (error) {
        setMessage(
          `PASS: Database rejected empty reason. Error: ${error.message}`,
        );
      } else {
        setMessage(`FAIL: Empty reason was accepted. Response: ${data}`);
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unexpected test error.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Step 1: Create test vendor</h2>

        <p className="mt-2 text-sm text-gray-600">
          Creates a vendor listing using your authenticated admin account. The
          database default status should be pending.
        </p>

        <button
          type="button"
          onClick={createTestVendor}
          disabled={busy || !!vendor}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-3
            text-sm font-medium text-white disabled:opacity-50"
        >
          {busy ? "Please wait..." : "Create Test Vendor"}
        </button>

        <button
          type="button"
          onClick={testEmptyReason}
          disabled={busy || !vendor}
          className="mt-3 ml-2 rounded-lg bg-gray-700 px-5 py-3
    text-sm font-medium text-white disabled:opacity-50"
        >
          Test Empty Reason Protection
        </button>
      </div>

      {vendor && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Step 2: Approve test vendor</h2>

          <div className="mt-4 space-y-2 text-sm">
            <p>
              <strong>Name:</strong> {vendor.name}
            </p>
            <p className="break-all">
              <strong>Vendor ID:</strong> {vendor.id}
            </p>
            <p>
              <strong>Status:</strong> {vendor.status}
            </p>
          </div>

          <label className="mt-5 block text-sm font-medium">Audit reason</label>

          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            maxLength={1000}
            rows={3}
            className="mt-2 w-full rounded-lg border p-3 text-sm"
          />

          <button
            type="button"
            onClick={approveTestVendor}
            disabled={busy || vendor.status !== "pending"}
            className="mt-4 rounded-lg bg-green-600 px-5 py-3
              text-sm font-medium text-white disabled:opacity-50"
          >
            {busy ? "Please wait..." : "Approve Test Vendor"}
          </button>
        </div>
      )}

      {message && (
        <div className="rounded-lg border bg-white p-4 text-sm">{message}</div>
      )}

      {history.length > 0 && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Step 3: Audit history</h2>

          <div className="mt-4 space-y-4">
            {history.map((record) => (
              <div key={record.id} className="border-b pb-4 text-sm">
                <p>
                  <strong>Previous status:</strong>{" "}
                  {record.previous_status ?? "None"}
                </p>

                <p>
                  <strong>New status:</strong> {record.new_status}
                </p>

                <p>
                  <strong>Reason:</strong> {record.reason ?? "None"}
                </p>

                <p className="break-all">
                  <strong>Changed by:</strong> {record.changed_by ?? "NULL"}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(record.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
