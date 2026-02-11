"use client";

import { Expert } from "@/types";

interface FormationInstructorProps {
  expert: Expert;
}

export function FormationInstructor({ expert }: FormationInstructorProps) {
  return (
    <div className="space-y-6">
      {/* Profile */}
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-cpu-orange to-orange-600 flex items-center justify-center text-white text-3xl font-bold">
          {expert.prenom[0]}
          {expert.nom[0]}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-900 mb-1">
            {expert.prenom} {expert.nom}
          </h3>
          <p className="text-slate-600 mb-4">{expert.bio}</p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-cpu-orange"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{expert.notemoyenne}/5 note moyenne</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span>{expert.nbApprenants?.toLocaleString()} apprenants</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>{expert.nbCours} cours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Domaines d'expertise */}
      <div>
        <h4 className="font-semibold text-slate-900 mb-3">
          Domaines d'expertise
        </h4>
        <div className="flex flex-wrap gap-2">
          {expert.domaines.map((domaine, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-cpu-orange/10 text-cpu-orange rounded-full text-sm font-medium"
            >
              {domaine}
            </span>
          ))}
        </div>
      </div>

      {/* Réalisations */}
      <div>
        <h4 className="font-semibold text-slate-900 mb-3">Réalisations</h4>
        <ul className="space-y-2">
          {expert.realisations.map((realisation, index) => (
            <li key={index} className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              <span className="text-slate-700">{realisation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Location */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2 text-slate-600">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>
            {expert.ville ? `${expert.ville}, ` : ""}
            {expert.region}
          </span>
        </div>
      </div>
    </div>
  );
}

