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
			.catch(() => setHealth("Backend Unreachable"));
	}, [backendUrl]);

	const getMessage = async () => {
		const res = await fetch(`${backendUrl}/api/message`);
		const data = await res.json();
		setMessage(data.message);
	};

	return (
		<main className="min-h-screen bg-[#050816] text-white px-8 py-6">
			<nav className="flex justify-between items-center mb-10">
				<h1 className="text-2xl font-bold text-cyan-400">AstraOps AI</h1>
				<span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 border border-green-500">
					System Online
				</span>
			</nav>

			<section className="grid md:grid-cols-2 gap-8 items-center mb-10">
				<div>
					<p className="text-cyan-400 mb-3">AI Powered DevOps Platform</p>
					<h2 className="text-5xl font-extrabold leading-tight mb-5">
						Build. Deploy. Monitor. Automate.
					</h2>
					<p className="text-slate-300 text-lg mb-6">
						AstraOps AI is a cloud-native DevOps platform that demonstrates
						Docker, Kubernetes, CI/CD automation, and future AI-based incident
						troubleshooting.
					</p>

					<button
						onClick={getMessage}
						className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-cyan-300"
					>
						Test Backend API
					</button>

					{message && (
						<p className="mt-4 text-green-400 font-medium">{message}</p>
					)}
				</div>

				<div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl">
					<h3 className="text-xl font-bold mb-5">Live Platform Status</h3>

					<div className="space-y-4">
						<Status title="Frontend" value="Running" color="green" />
						<Status title="Backend Health" value={health} color="cyan" />
						<Status title="Docker Build" value="Successful" color="green" />
						<Status title="Kubernetes Pods" value="Running" color="green" />
						<Status title="GitHub Actions" value="Passed" color="green" />
					</div>
				</div>
			</section>

			<section className="grid md:grid-cols-4 gap-5 mb-10">
				<Card title="Docker" value="Containerized" />
				<Card title="Kubernetes" value="Orchestrated" />
				<Card title="CI/CD" value="Automated" />
				<Card title="AI Ready" value="Planned" />
			</section>

			<section className="bg-white/10 border border-white/10 rounded-3xl p-6">
				<h3 className="text-2xl font-bold mb-4">Project Workflow</h3>
				<div className="grid md:grid-cols-5 gap-4 text-center">
					{[
						"Code Push",
						"CI Build",
						"Docker Image",
						"K8s Deploy",
						"Monitor",
					].map((item, i) => (
						<div
							key={i}
							className="bg-black/30 rounded-2xl p-4 border border-slate-700"
						>
							<div className="text-cyan-400 text-2xl font-bold mb-2">
								0{i + 1}
							</div>
							<p>{item}</p>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}

function Card({ title, value }: { title: string; value: string }) {
	return (
		<div className="bg-white/10 border border-white/10 rounded-2xl p-5">
			<p className="text-slate-400">{title}</p>
			<h4 className="text-xl font-bold mt-2">{value}</h4>
		</div>
	);
}

function Status({
	title,
	value,
	color,
}: {
	title: string;
	value: string;
	color: string;
}) {
	return (
		<div className="flex justify-between bg-black/30 p-4 rounded-xl">
			<span>{title}</span>
			<span className={`text-${color}-400 font-bold`}>{value}</span>
		</div>
	);
}
