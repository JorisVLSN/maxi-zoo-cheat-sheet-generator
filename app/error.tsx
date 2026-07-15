"use client";
export default function ErrorPage({reset}:{reset:()=>void}){return <main className="error"><h1>Er ging iets mis</h1><p>De generator kon deze handeling niet voltooien. Uw lokaal bewaarde folders blijven behouden.</p><button onClick={reset}>Opnieuw proberen</button></main>}
