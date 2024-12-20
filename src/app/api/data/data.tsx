export type Site = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  Location: string;
  date: string;
  PhoneNo: string;
  email: string;
  sitePlan: string;
  labourInvolved: number; // Number of labour involved for the site
  startDate: string;      // Start date of the work at the site
  endDate: string;        // End date of the work at the site
  description : string
};

const data: Site[] = [
  {
    id: "m5gr84i9",
    amount: 2000000,
    status: "success",
    Location: "New CCC Building",
    date: '2024-10-14',
    PhoneNo: "99999999",
    email: '22070963@ycce.in',
    sitePlan: "/images/sample.png",
    labourInvolved: 150, // Example number of labourers involved
    startDate: '2024-01-01', // Start date
    endDate: '2024-12-31',   // End date
    description : "Renovation work is going on."
  },
  {
    id: "3u1reuv4",
    amount: 2400000,
    status: "success",
    Location: "SDMP Auditorium",
    date: '2024-10-14',
    PhoneNo: "99999999",
    email: '22070963@ycce.in',
    sitePlan: "/images/sample.png",
    labourInvolved: 120, // Example number of labourers involved
    startDate: '2024-02-01', // Start date
    endDate: '2024-11-30',   // End date
    description : "Renovation work is going on."
  },
  {
    id: "derv1ws0",
    amount: 300000,
    status: "processing",
    Location: "Parking",
    date: '2024-10-14',
    PhoneNo: "99999999",
    email: '22070963@ycce.in',
    sitePlan: "/images/sample.png",
    labourInvolved: 80, // Example number of labourers involved
    startDate: '2024-03-01', // Start date
    endDate: '2024-09-30',   // End date
    description : "Renovation work is going on."
  },
  {
    id: "5kma53ae",
    amount: 5400000,
    status: "success",
    Location: "Old Science Building",
    date: '2024-10-14',
    PhoneNo: "99999999",
    email: '22070963@ycce.in',
    sitePlan: "/images/sample.png",
    labourInvolved: 200, // Example number of labourers involved
    startDate: '2024-05-01', // Start date
    endDate: '2024-12-15',   // End date
    description : "Renovation work is going on."
  },
  {
    id: "UIu83biwb",
    amount: 900000,
    status: "success",
    Location: "CT-Lab 6",
    date: '2024-10-14',
    PhoneNo: "99999999",
    email: '22070963@ycce.in',
    sitePlan: "/images/sample.png",
    labourInvolved: 50, // Example number of labourers involved
    startDate: '2024-06-01', // Start date
    endDate: '2024-10-31',   // End date
    description : "Renovation work is going on."
  }
];

export { data };
