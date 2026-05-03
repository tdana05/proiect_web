import type { Announcement } from '../types'

export const mockAnnouncements: Announcement[] = [
  {
    id: "a1",
    title: "Bun venit in platforma AMiCUS!",
    content: "Dragi voluntari, platforma noastra de gestionare a fost lansata oficial. Va rugam sa va completati profilul!",
    createdBy: "u1",
    createdAt: "2026-03-01T10:00:00",
    priority: "high",
    pinned: true,
  },
  {
    id: "a2",
    title: "Inscrierile pentru Training-ul de Leadership sunt deschise",
    content: "Training-ul va avea loc pe 22-23 aprilie. Locurile sunt limitate la 20 de participanti!",
    createdBy: "u1",
    createdAt: "2026-03-10T14:30:00",
    priority: "medium",
    pinned: false,
  },
  {
    id: "a3",
    title: "Modificare program birou",
    content: "Incepand cu 1 aprilie, biroul AMiCUS va fi deschis luni-vineri, 9:00-18:00.",
    createdBy: "u1",
    createdAt: "2026-03-15T09:00:00",
    priority: "low",
    pinned: false,
  },
  {
    id: "a4",
    title: "Cautam voluntari pentru Gala de Fundraising",
    content: "Echipa de organizare cauta 10 voluntari pentru logistica evenimentului din 25 mai.",
    createdBy: "u1",
    createdAt: "2026-03-17T11:00:00",
    priority: "high",
    pinned: true,
  },
  {
    id: "a5",
    title: "Rezultatele sondajului de satisfactie",
    content: "92% dintre voluntari sunt multumiti de activitatea organizatiei!",
    createdBy: "u1",
    createdAt: "2026-03-12T16:00:00",
    priority: "low",
    pinned: false,
  },
]
