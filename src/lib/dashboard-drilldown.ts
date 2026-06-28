// Mock cross-module data used to power dashboard drill-down filtering.
// In a real app these would come from server functions; here they're enough
// to demonstrate filtering related appointments / treatments / invoices.

export type DrillFilter =
  | { kind: "stat"; key: string; label: string }
  | { kind: "treatment"; label: string }
  | { kind: "weekday"; label: string; status?: string }
  | { kind: "appointment"; label: string; patient: string }
  | { kind: "revenue"; label: string };

export type RelatedAppointment = {
  id: string;
  time: string;
  patient: string;
  treatment: string;
  dentist: string;
  status: string;
  weekday: string;
};

export type RelatedTreatment = {
  id: string;
  name: string;
  patient: string;
  status: "Planned" | "In Progress" | "Completed" | "Pending Approval";
  amount: number;
};

export type RelatedInvoice = {
  id: string;
  patient: string;
  treatment: string;
  amount: number;
  status: "Paid" | "Outstanding" | "Overdue" | "Pending Insurance";
  date: string;
};

export const allAppointments: RelatedAppointment[] = [
  { id: "a1", time: "09:00", patient: "Michael Johnson", treatment: "Dental Cleaning", dentist: "Dr. John Doe", status: "Checked In", weekday: "Mon" },
  { id: "a2", time: "09:45", patient: "Sarah Williams", treatment: "Tooth Filling", dentist: "Dr. John Doe", status: "Scheduled", weekday: "Tue" },
  { id: "a3", time: "10:30", patient: "David Brown", treatment: "Root Canal", dentist: "Dr. Smith", status: "Scheduled", weekday: "Wed" },
  { id: "a4", time: "11:15", patient: "Emma Wilson", treatment: "Crown Placement", dentist: "Dr. John Doe", status: "In Treatment", weekday: "Thu" },
  { id: "a5", time: "13:00", patient: "James Taylor", treatment: "Dental Cleaning", dentist: "Dr. Smith", status: "Scheduled", weekday: "Fri" },
  { id: "a6", time: "14:00", patient: "Lisa Anderson", treatment: "Tooth Filling", dentist: "Dr. Smith", status: "Cancelled", weekday: "Tue" },
  { id: "a7", time: "15:30", patient: "Robert Miller", treatment: "Root Canal", dentist: "Dr. John Doe", status: "Completed", weekday: "Thu" },
  { id: "a8", time: "16:00", patient: "Amanda Garcia", treatment: "Dental Cleaning", dentist: "Dr. Smith", status: "No-show", weekday: "Wed" },
];

export const allTreatments: RelatedTreatment[] = [
  { id: "t1", name: "Dental Cleaning", patient: "Michael Johnson", status: "In Progress", amount: 120 },
  { id: "t2", name: "Tooth Filling", patient: "Sarah Williams", status: "Planned", amount: 240 },
  { id: "t3", name: "Root Canal", patient: "David Brown", status: "Pending Approval", amount: 980 },
  { id: "t4", name: "Crown Placement", patient: "Emma Wilson", status: "In Progress", amount: 1450 },
  { id: "t5", name: "Dental Cleaning", patient: "James Taylor", status: "Planned", amount: 120 },
  { id: "t6", name: "Tooth Filling", patient: "Lisa Anderson", status: "Completed", amount: 240 },
  { id: "t7", name: "Root Canal", patient: "Robert Miller", status: "Completed", amount: 980 },
];

export const allInvoices: RelatedInvoice[] = [
  { id: "INV-2041", patient: "Michael Johnson", treatment: "Dental Cleaning", amount: 120, status: "Paid", date: "Jun 25" },
  { id: "INV-2042", patient: "Sarah Williams", treatment: "Tooth Filling", amount: 240, status: "Pending Insurance", date: "Jun 25" },
  { id: "INV-2043", patient: "David Brown", treatment: "Root Canal", amount: 980, status: "Outstanding", date: "Jun 26" },
  { id: "INV-2044", patient: "Emma Wilson", treatment: "Crown Placement", amount: 1450, status: "Outstanding", date: "Jun 26" },
  { id: "INV-2045", patient: "James Taylor", treatment: "Dental Cleaning", amount: 120, status: "Paid", date: "Jun 27" },
  { id: "INV-2046", patient: "Lisa Anderson", treatment: "Tooth Filling", amount: 240, status: "Overdue", date: "Jun 20" },
  { id: "INV-2047", patient: "Robert Miller", treatment: "Root Canal", amount: 980, status: "Paid", date: "Jun 24" },
];

export function applyDrill(filter: DrillFilter) {
  let appts = [...allAppointments];
  let treatments = [...allTreatments];
  let invoices = [...allInvoices];

  switch (filter.kind) {
    case "treatment":
      appts = appts.filter((a) => a.treatment === filter.label);
      treatments = treatments.filter((t) => t.name === filter.label);
      invoices = invoices.filter((i) => i.treatment === filter.label);
      break;
    case "weekday":
      appts = appts.filter(
        (a) => a.weekday === filter.label && (!filter.status || a.status === filter.status),
      );
      {
        const patients = new Set(appts.map((a) => a.patient));
        treatments = treatments.filter((t) => patients.has(t.patient));
        invoices = invoices.filter((i) => patients.has(i.patient));
      }
      break;
    case "appointment":
      appts = appts.filter((a) => a.patient === filter.patient);
      treatments = treatments.filter((t) => t.patient === filter.patient);
      invoices = invoices.filter((i) => i.patient === filter.patient);
      break;
    case "revenue":
      invoices = invoices.filter((i) => i.status === "Paid");
      {
        const patients = new Set(invoices.map((i) => i.patient));
        appts = appts.filter((a) => patients.has(a.patient));
        treatments = treatments.filter((t) => patients.has(t.patient));
      }
      break;
    case "stat":
      switch (filter.key) {
        case "today-appointments":
          // keep all of today's
          break;
        case "checked-in":
          appts = appts.filter((a) => ["Checked In", "In Treatment"].includes(a.status));
          break;
        case "revenue":
          invoices = invoices.filter((i) => i.status === "Paid");
          break;
        case "outstanding":
          invoices = invoices.filter((i) => ["Outstanding", "Overdue"].includes(i.status));
          break;
        case "pending-treatments":
          treatments = treatments.filter((t) =>
            ["Planned", "Pending Approval", "In Progress"].includes(t.status),
          );
          break;
        case "low-stock":
          appts = [];
          treatments = [];
          invoices = [];
          break;
        case "claims":
          invoices = invoices.filter((i) => i.status === "Pending Insurance");
          break;
      }
      {
        const patients = new Set([
          ...appts.map((a) => a.patient),
          ...treatments.map((t) => t.patient),
          ...invoices.map((i) => i.patient),
        ]);
        if (filter.key !== "low-stock") {
          if (appts.length === 0 && patients.size)
            appts = allAppointments.filter((a) => patients.has(a.patient));
          if (treatments.length === 0 && patients.size)
            treatments = allTreatments.filter((t) => patients.has(t.patient));
        }
      }
      break;
  }

  return { appointments: appts, treatments, invoices };
}
