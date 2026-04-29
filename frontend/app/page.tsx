"use client";

import { useEffect, useState } from "react";

export default function Home() {
	const [health, setHealth] = useState("Checking...");
	const [message, setMessage] = useState("");

	const backendUrl =
		process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

	useEffect(() => {
		fetch(`${backendUrl}/health`)
			.then((res) => res.json())
			.then((data) => setHealth(data.status))
			.catch(() => setHealth("Backend unreachable"));
	}, [backendUrl]);

	const getMessage = async () => {
		try {
			const res = await fetch(`${backendUrl}/api/message`);
			const data = await res.json();
			setMessage(data.message);
		} catch {
			setMessage("Failed to connect to backend");
		}
	};

	return (
		<main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-8">
			<section className="max-w-3xl w-full rounded-3xl bg-slate-900 border border-slate-700 p-8 shadow-2xl">
				<p className="text-sm text-cyan-400 mb-2">DevOps + AI Platform</p>
				<h1 className="text-4xl font-bold mb-4">AstraOps AI - Version 1</h1>

				<p className="text-slate-300 mb-6">
					A cloud-native DevOps project starter using Next.js, Express, Docker,
					and Kubernetes.
				</p>

				<div className="rounded-xl bg-slate-800 p-4 mb-4">
					<span className="font-semibold">Backend Health:</span> {health}
				</div>

				<button
					onClick={getMessage}
					className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950"
				>
					Call Backend API
				</button>

				{message && (
					<div className="mt-6 rounded-xl bg-slate-800 p-4 border border-slate-700">
						{message}
					</div>
				)}
			</section>
		</main>
	);
}
